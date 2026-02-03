'use client';

import { useEffect, useState } from 'react';
import { StatCard } from '@/components/StatCard';
import { DeploymentInfo } from '@/components/DeploymentInfo';

export default function Home() {
  const [buildTime, setBuildTime] = useState<string>('');

  useEffect(() => {
    setBuildTime(new Date().toISOString());
  }, []);

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">
          Welcome to GitHub Actions Exercise - Part 2
        </h2>
        <p className="text-xl text-white text-opacity-90 mb-8">
          This is a production-ready Next.js application deployed via GitHub Actions
          with automated testing, S3 deployment, and CloudFront CDN caching.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="GitHub Actions"
          description="Automated CI/CD Pipeline"
          icon="⚙️"
        />
        <StatCard
          title="Next.js 14"
          description="React Framework"
          icon="⚛️"
        />
        <StatCard
          title="AWS + CloudFront"
          description="Global CDN Distribution"
          icon="🌍"
        />
      </section>

      <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">
          Deployment Information
        </h3>
        <DeploymentInfo buildTime={buildTime} />
      </section>

      <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          What&apos;s Included
        </h3>
        <ul className="text-white space-y-3">
          <li className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            Unit tests with Jest and React Testing Library
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            ESLint code quality checks
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            Standalone Next.js build for efficient deployment
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            Automated S3 sync and CloudFront cache invalidation
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            Path-based workflow triggers (only deploy on /src/** changes)
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">✅</span>
            GitHub Actions status badge
          </li>
        </ul>
      </section>
    </div>
  );
}
