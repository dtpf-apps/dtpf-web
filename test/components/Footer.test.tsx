import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Footer from '../../src/views/components/navigation/Footer';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
  identifyUser: vi.fn(),
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('clicking LinkedIn tracks footer:linkedin event', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithProviders(<Footer />);
    await user.click(getByText('LinkedIn'));
    expect(trackEvent).toHaveBeenCalledWith('footer:linkedin');
  });

  it('clicking GitHub tracks footer:github event', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithProviders(<Footer />);
    await user.click(getByText('GitHub'));
    expect(trackEvent).toHaveBeenCalledWith('footer:github');
  });

  it('clicking Email tracks footer:email event', async () => {
    const user = userEvent.setup();
    const { getByText } = renderWithProviders(<Footer />);
    await user.click(getByText('Email'));
    expect(trackEvent).toHaveBeenCalledWith('footer:email');
  });

  it('renders author name', () => {
    const { getByText } = renderWithProviders(<Footer />);
    expect(getByText('David T. Pizarro Frick')).toBeInTheDocument();
  });
});
