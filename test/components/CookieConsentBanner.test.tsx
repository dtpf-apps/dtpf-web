import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CookieConsentBanner from '../../src/views/components/CookieConsentBanner';
import { COOKIE_CONSENT_KEY } from '../../src/utils/cookieConsent';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        cookie_text:
          'We use analytics cookies to improve your experience. You can accept or decline their use.',
        cookie_accept: 'Accept',
        cookie_necessary_only: 'Necessary only',
      };
      return translations[key] ?? key;
    },
  }),
}));

vi.mock('../../src/utils/analytics', () => ({
  initAnalytics: vi.fn(),
  trackEvent: vi.fn(),
}));

import { initAnalytics, trackEvent } from '../../src/utils/analytics';

describe('CookieConsentBanner', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('shows banner when no consent is stored', () => {
    render(<CookieConsentBanner />);

    expect(
      screen.getByText(
        'We use analytics cookies to improve your experience. You can accept or decline their use.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Necessary only')).toBeInTheDocument();
  });

  it('does NOT show banner when consent already exists', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ necessary: true, analytics: true }));

    render(<CookieConsentBanner />);

    expect(
      screen.queryByText(
        'We use analytics cookies to improve your experience. You can accept or decline their use.'
      )
    ).not.toBeInTheDocument();
  });

  it('"Accept" stores consent with analytics true and hides banner', async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner />);

    await user.click(screen.getByText('Accept'));

    expect(
      screen.queryByText(
        'We use analytics cookies to improve your experience. You can accept or decline their use.'
      )
    ).not.toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY)!);
    expect(stored).toEqual({ necessary: true, analytics: true });
  });

  it('"Accept" initializes analytics and tracks cookie:accept event', async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner />);

    await user.click(screen.getByText('Accept'));

    expect(initAnalytics).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith('cookie:accept');
  });

  it('"Necessary only" stores consent with analytics false and hides banner', async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner />);

    await user.click(screen.getByText('Necessary only'));

    expect(
      screen.queryByText(
        'We use analytics cookies to improve your experience. You can accept or decline their use.'
      )
    ).not.toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY)!);
    expect(stored).toEqual({ necessary: true, analytics: false });
  });

  it('"Necessary only" does NOT initialize analytics but tracks event', async () => {
    const user = userEvent.setup();
    render(<CookieConsentBanner />);

    await user.click(screen.getByText('Necessary only'));

    expect(initAnalytics).not.toHaveBeenCalled();
    expect(trackEvent).toHaveBeenCalledWith('cookie:necessary-only');
  });
});
