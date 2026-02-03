'use client';

export default function About() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-white mb-8">About This Project</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Part 1: Foundations</h3>
          <p className="text-white text-opacity-90 mb-4">
            Set up the basics of GitHub Actions with AWS OIDC authentication and S3 deployment.
          </p>
          <ul className="text-white text-opacity-90 space-y-2">
            <li>• GitHub Actions workflow setup</li>
            <li>• GitHub Variables and Secrets</li>
            <li>• AWS OIDC identity provider</li>
            <li>• S3 bucket deployment</li>
          </ul>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Part 2: Production Application</h3>
          <p className="text-white text-opacity-90 mb-4">
            Build a real Next.js application with comprehensive testing and deployment.
          </p>
          <ul className="text-white text-opacity-90 space-y-2">
            <li>• Next.js 14 application</li>
            <li>• Unit and integration tests</li>
            <li>• ESLint code quality</li>
            <li>• CloudFront CDN integration</li>
          </ul>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Part 3: Infrastructure (Optional)</h3>
          <p className="text-white text-opacity-90 mb-4">
            Manage infrastructure as code using Terraform.
          </p>
          <ul className="text-white text-opacity-90 space-y-2">
            <li>• Terraform configuration</li>
            <li>• Automated infrastructure deployment</li>
            <li>• Version-controlled resources</li>
            <li>• Reproducible setup</li>
          </ul>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
          <p className="text-white text-opacity-90 mb-4">
            This project demonstrates modern CI/CD practices.
          </p>
          <ul className="text-white text-opacity-90 space-y-2">
            <li>• No static AWS credentials (OIDC)</li>
            <li>• Automated testing in CI</li>
            <li>• Path-based workflow triggers</li>
            <li>• Global CDN distribution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
