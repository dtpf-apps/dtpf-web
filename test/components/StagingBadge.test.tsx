import { render, screen } from '@testing-library/react';

describe('StagingBadge', () => {
  const originalLocation = window.location;

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
    vi.resetModules();
  });

  async function renderWithHostname(hostname: string) {
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, hostname },
      writable: true,
      configurable: true,
    });
    vi.resetModules();
    const { default: StagingBadge } = await import('../../src/views/components/StagingBadge');
    return render(<StagingBadge />);
  }

  it('renders badge on staging domain', async () => {
    await renderWithHostname('dev.dtpf.es');

    expect(screen.getByText('Staging')).toBeInTheDocument();
  });

  it('does not render on production domain', async () => {
    await renderWithHostname('dtpf.es');

    expect(screen.queryByText('Staging')).not.toBeInTheDocument();
  });

  it('does not render on localhost', async () => {
    await renderWithHostname('localhost');

    expect(screen.queryByText('Staging')).not.toBeInTheDocument();
  });
});
