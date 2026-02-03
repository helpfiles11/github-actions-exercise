variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "github-actions-exercise"
}

variable "aws_account_id" {
  description = "AWS Account ID"
  type        = string
  # Set in terraform.tfvars
}

variable "github_repo_owner" {
  description = "GitHub repository owner"
  type        = string
  default     = "helpfiles11"
}

variable "github_repo_name" {
  description = "GitHub repository name"
  type        = string
  default     = "github-actions-exercise"
}

variable "github_oidc_thumbprint" {
  description = "GitHub OIDC thumbprint"
  type        = string
  default     = "2b18947a6a9fc7764fd8b5fb18a863b0c6dac24f"
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
}

variable "enable_s3_backend" {
  description = "Enable S3 backend for Terraform state"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}
