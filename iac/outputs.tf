output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.deployment.id
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = aws_s3_bucket.deployment.arn
}

output "s3_website_endpoint" {
  description = "S3 static website endpoint"
  value       = aws_s3_bucket_website_configuration.deployment.website_endpoint
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.deployment.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.deployment.domain_name
}

output "github_oidc_role_arn" {
  description = "IAM role ARN for GitHub OIDC"
  value       = aws_iam_role.github_actions.arn
}

output "github_oidc_role_name" {
  description = "IAM role name for GitHub OIDC"
  value       = aws_iam_role.github_actions.name
}

output "oidc_provider_arn" {
  description = "OIDC provider ARN"
  value       = aws_iam_openid_connect_provider.github.arn
}
