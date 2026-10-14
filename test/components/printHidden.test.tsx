import { render } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Header from '../../src/views/components/navigation/Header';
import Footer from '../../src/views/components/navigation/Footer';

// The printed CV is the page alone: every piece of the shell is dropped from the sheet.
describe('shell is hidden when printing', () => {
  it('header', () => {
    const { container } = renderWithProviders(<Header />);
    expect(container.querySelector('header')).toHaveClass('print:hidden');
  });

  it('footer', () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container.querySelector('footer')).toHaveClass('print:hidden');
  });

  it('staging badge', async () => {
    // isStaging is read once at import time, so the hostname is faked before a fresh import.
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, hostname: 'dev.dtpf.es' },
      writable: true,
      configurable: true,
    });
    vi.resetModules();
    try {
      const { default: StagingBadge } = await import('../../src/views/components/StagingBadge');
      const { getByText } = render(<StagingBadge />);
      expect(getByText('Staging')).toHaveClass('print:hidden');
    } finally {
      Object.defineProperty(window, 'location', {
        value: originalLocation,
        writable: true,
        configurable: true,
      });
      vi.resetModules();
    }
  });
});
