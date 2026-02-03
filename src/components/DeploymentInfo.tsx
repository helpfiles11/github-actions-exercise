'use client';

export interface DeploymentInfoProps {
  buildTime: string;
}

export function DeploymentInfo({ buildTime }: DeploymentInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white border-opacity-20 pb-3">
        <span className="text-white text-opacity-75">Build Time:</span>
        <span className="text-white font-mono">{buildTime}</span>
      </div>
      <div className="flex justify-between items-center border-b border-white border-opacity-20 pb-3">
        <span className="text-white text-opacity-75">Environment:</span>
        <span className="text-white font-mono">Production (S3 + CloudFront)</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-white text-opacity-75">Framework:</span>
        <span className="text-white font-mono">Next.js 14 (Standalone)</span>
      </div>
    </div>
  );
}
