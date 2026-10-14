import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import { initAnalytics } from '../src/utils/analytics';

vi.mock('../src/utils/analytics', () => ({
  initAnalytics: vi.fn(),
  trackPageView: vi.fn(),
  trackEvent: vi.fn(),
}));
vi.mock('../src/hooks/useSWUpdate', () => ({ default: vi.fn() }));
vi.mock('../src/utils/errorTracking', () => ({ initErrorTracking: vi.fn() }));

describe('App', () => {
  it('starts Umami on every visit, with no consent gate in front of it', async () => {
    localStorage.clear();
    render(<App />);

    await waitFor(() => expect(initAnalytics).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole('button', { name: /accept|necessary only/i })).not.toBeInTheDocument();
  });
});
