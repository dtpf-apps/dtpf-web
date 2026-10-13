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
});
