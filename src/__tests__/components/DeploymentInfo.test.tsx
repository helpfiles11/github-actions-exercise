import { render, screen } from '@testing-library/react';
import { DeploymentInfo } from '@/components/DeploymentInfo';

describe('DeploymentInfo Component', () => {
  it('renders build time', () => {
    const testTime = '2024-01-15T10:30:00Z';
    render(<DeploymentInfo buildTime={testTime} />);

    expect(screen.getByText(testTime)).toBeInTheDocument();
  });

  it('displays environment information', () => {
    render(<DeploymentInfo buildTime="2024-01-15T10:30:00Z" />);

    expect(screen.getByText('Production (S3 + CloudFront)')).toBeInTheDocument();
  });

  it('shows framework information', () => {
    render(<DeploymentInfo buildTime="2024-01-15T10:30:00Z" />);

    expect(screen.getByText('Next.js 14 (Standalone)')).toBeInTheDocument();
  });

  it('renders all deployment details', () => {
    const { container } = render(<DeploymentInfo buildTime="2024-01-15T10:30:00Z" />);

    expect(screen.getByText('Build Time:')).toBeInTheDocument();
    expect(screen.getByText('Environment:')).toBeInTheDocument();
    expect(screen.getByText('Framework:')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });
});
