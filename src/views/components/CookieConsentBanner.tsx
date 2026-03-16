import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie } from 'lucide-react';
import { COOKIE_CONSENT_KEY, getStoredConsent, type CookieConsent } from 'utils/cookieConsent';
import { initAnalytics, trackEvent } from 'utils/analytics';

function CookieConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => !getStoredConsent());

  const handleConsent = useCallback((analytics: boolean) => {
    const consent: CookieConsent = { necessary: true, analytics };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setVisible(false);
    if (analytics) {
      initAnalytics();
      trackEvent('cookie:accept');
    } else {
      trackEvent('cookie:necessary-only');
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto flex max-w-lg flex-col gap-3 rounded-xl border border-border bg-bg-secondary p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="min-w-0 flex-1 text-sm text-text-secondary">{t('cookie_text')}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleConsent(false)}
            className="rounded-lg px-3 py-1.5 text-sm text-text-secondary hover:bg-bg-tertiary"
          >
            {t('cookie_necessary_only')}
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-bg-primary hover:bg-accent-hover"
          >
            {t('cookie_accept')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CookieConsentBanner);
