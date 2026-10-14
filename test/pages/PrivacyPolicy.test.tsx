import { screen } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import PrivacyPolicy from '../../src/views/pages/PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('renders privacy policy heading', () => {
    renderWithProviders(<PrivacyPolicy />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Política de Privacidad/i);
  });

  it('mentions RGPD/LOPD', () => {
    renderWithProviders(<PrivacyPolicy />);
    expect(screen.getByText(/RGPD/)).toBeInTheDocument();
  });

  it('declares the cookieless analytics instead of asking for consent', () => {
    renderWithProviders(<PrivacyPolicy />);
    const analytics = screen.getByRole('heading', { level: 2, name: /Analítica/ });
    const section = analytics.nextElementSibling?.textContent ?? '';
    expect(section).toMatch(/Umami/);
    expect(section).toMatch(/sin cookies/i);
    expect(section).toMatch(/no se almacena tu dirección IP/i);
    expect(screen.queryByText(/si aceptas las cookies/i)).not.toBeInTheDocument();
  });
});
