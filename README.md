# GitHub Actions + AWS Deployment Exercise

Complete CI/CD pipeline with GitHub Actions, AWS OIDC, S3 deployment, and CloudFront CDN.

## Build Status

![CI Status](https://github.com/helpfiles11/github-actions-exercise/actions/workflows/ci.yml/badge.svg)
![Deploy Status](https://github.com/helpfiles11/github-actions-exercise/actions/workflows/deploy.yml/badge.svg)

## Project Structure

```
.
├── .github/workflows/        # GitHub Actions workflows
│   ├── ci.yml               # Basic CI pipeline (Part 1)
│   ├── deploy.yml           # Full deployment pipeline (Part 2)
│   └── terraform.yml        # Infrastructure as code (Part 3)
├── src/                     # Next.js application
│   ├── app/
│   ├── components/
│   ├── __tests__/
│   ├── package.json
│   └── next.config.js
├── iac/                     # Terraform infrastructure
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── providers.tf
├── test-files/              # Test files for Part 1
├── .gitignore
└── README.md
```

## Part 1: GitHub Actions Basics + AWS OIDC + S3

- ✅ GitHub Actions workflow setup
- ✅ GitHub Variables and Secrets
- ✅ AWS OIDC authentication
- ✅ S3 bucket deployment

## Part 2: Next.js Application + CI/CD

- ✅ Next.js application with standalone build
- ✅ Unit tests with Jest
- ✅ Linting with ESLint
- ✅ CloudFront CDN integration
- ✅ Cache invalidation

## Part 3: Infrastructure as Code (Optional)

- ✅ Terraform configuration
- ✅ Automated infrastructure deployment
- ✅ Version-controlled resources

## Getting Started

See workflow files in `.github/workflows/` for deployment details.
