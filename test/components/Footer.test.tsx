import { renderWithProviders } from '../helpers/renderWithProviders';
import Footer from '../../src/views/components/navigation/Footer';

describe('Footer', () => {
  it('renders LinkedIn link', () => {
    const { getByText } = renderWithProviders(<Footer />);
    const link = getByText('LinkedIn');
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/david-tomas-pizarro-frick');
  });

  it('renders GitHub link', () => {
    const { getByText } = renderWithProviders(<Footer />);
    const link = getByText('GitHub');
    expect(link).toHaveAttribute('href', 'https://github.com/DTPF');
  });

  it('renders email link as mailto', () => {
    const { getByText } = renderWithProviders(<Footer />);
    const link = getByText('Email');
    expect(link).toHaveAttribute('href', 'mailto:davidpizarrofrick@gmail.com');
  });
});
