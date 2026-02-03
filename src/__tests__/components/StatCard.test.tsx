import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/StatCard';

describe('StatCard Component', () => {
  it('renders title and description', () => {
    render(
      <StatCard
        title="Test Title"
        description="Test Description"
        icon="🧪"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays the icon', () => {
    render(
      <StatCard
        title="Icon Test"
        description="Testing icon display"
        icon="⚛️"
      />
    );

    expect(screen.getByText('⚛️')).toBeInTheDocument();
  });

  it('renders all props correctly', () => {
    const { container } = render(
      <StatCard
        title="GitHub Actions"
        description="Automated CI/CD"
        icon="⚙️"
      />
    );

    const title = screen.getByText('GitHub Actions');
    const description = screen.getByText('Automated CI/CD');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });
});
