# ==========================================
# S3 Bucket for Deployment (Data Source)
# ==========================================
# Since the S3 bucket was created manually in Part 1,
# we use a data source to reference it and manage its configuration

data "aws_s3_bucket" "deployment" {
  bucket = "${var.project_name}-${var.aws_account_id}"
}

# Use the existing bucket via data source
locals {
  s3_bucket_id  = data.data.aws_s3_bucket.deployment.id
  s3_bucket_arn = data.data.aws_s3_bucket.deployment.arn
}

# Block public access settings
resource "aws_s3_bucket_public_access_block" "deployment" {
  bucket = data.aws_s3_bucket.deployment.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Static website hosting configuration
resource "aws_s3_bucket_website_configuration" "deployment" {
  bucket = data.aws_s3_bucket.deployment.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  depends_on = [aws_s3_bucket_public_access_block.deployment]
}

# Bucket policy for public read access
resource "aws_s3_bucket_policy" "deployment" {
  bucket = data.aws_s3_bucket.deployment.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "PublicReadGetObject"
        Effect = "Allow"
        Principal = {
          AWS = "*"
        }
        Action   = "s3:GetObject"
        Resource = "${data.aws_s3_bucket.deployment.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.deployment]
}

# ==========================================
# CloudFront Distribution
# ==========================================

resource "aws_cloudfront_distribution" "deployment" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.deployment.website_endpoint
    origin_id   = "S3WebsiteOrigin"

    # S3 website endpoint doesn't support HTTPS, so we use HTTP
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = var.cloudfront_price_class

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3WebsiteOrigin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.project_name}-cloudfront"
    }
  )

  depends_on = [aws_s3_bucket_website_configuration.deployment]
}

# ==========================================
# GitHub OIDC Provider (Data Source)
# ==========================================
# Since the OIDC provider was created manually in Part 1,
# we use a data source to reference it instead of creating it

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

locals {
  github_oidc_arn = data.aws_iam_openid_connect_provider.github.arn
}

# ==========================================
# IAM Role for GitHub Actions
# ==========================================

resource "aws_iam_role" "github_actions" {
  name = "${var.project_name}-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = local.github_oidc_arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo_owner}/${var.github_repo_name}:*"
          }
        }
      }
    ]
  })

  tags = merge(
    var.tags,
    {
      Name = "${var.project_name}-github-actions-role"
    }
  )
}

# ==========================================
# IAM Policies for GitHub Actions
# ==========================================

# S3 permissions
resource "aws_iam_role_policy" "s3_access" {
  name = "${var.project_name}-s3-access"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          data.aws_s3_bucket.deployment.arn,
          "${data.aws_s3_bucket.deployment.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListAllMyBuckets"
        ]
        Resource = "*"
      }
    ]
  })
}

# CloudFront permissions
resource "aws_iam_role_policy" "cloudfront_access" {
  name = "${var.project_name}-cloudfront-access"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation"
        ]
        Resource = "*"
      }
    ]
  })
}

# Terraform permissions (for Part 3 workflow)
resource "aws_iam_role_policy" "terraform_access" {
  name = "${var.project_name}-terraform-access"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "iam:CreateOpenIDConnectProvider",
          "iam:DeleteOpenIDConnectProvider",
          "iam:GetOpenIDConnectProvider",
          "iam:ListOpenIDConnectProviders",
          "iam:CreateRole",
          "iam:DeleteRole",
          "iam:GetRole",
          "iam:ListRoles",
          "iam:PutRolePolicy",
          "iam:DeleteRolePolicy",
          "iam:ListRolePolicies",
          "iam:GetRolePolicy",
          "iam:TagResource",
          "iam:UntagResource",
          "iam:ListInstanceProfilesForRole",
          "s3:CreateBucket",
          "s3:DeleteBucket",
          "s3:GetBucket*",
          "s3:ListBucket",
          "s3:PutBucket*",
          "s3:UpdateBucket*",
          "s3:PutObjectAcl",
          "cloudfront:CreateDistribution",
          "cloudfront:DeleteDistribution",
          "cloudfront:GetDistribution*",
          "cloudfront:ListDistributions",
          "cloudfront:UpdateDistribution",
          "cloudfront:TagResource",
          "cloudfront:UntagResource"
        ]
        Resource = "*"
      }
    ]
  })
}
