import { render } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Header from '../../src/views/components/navigation/Header';
import Footer from '../../src/views/components/navigation/Footer';
import CookieConsentBanner from '../../src/views/components/CookieConsentBanner';

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

  it('cookie banner', () => {
    localStorage.removeItem('dtpf-cookie-consent');
    const { getByRole } = render(<CookieConsentBanner />);
    expect(getByRole('alertdialog')).toHaveClass('print:hidden');
  });
});
