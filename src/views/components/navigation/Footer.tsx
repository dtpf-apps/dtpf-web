import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from 'utils/analytics';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mx-auto w-full max-w-[1100px] border-t border-border px-6 py-12 text-center">
      <p className="mb-1 font-heading text-sm font-semibold text-text-primary">David T. Pizarro Frick</p>
      <div className="mb-4 flex justify-center gap-5">
        <a
          href="https://www.linkedin.com/in/david-tomas-pizarro-frick"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-text-muted transition-colors hover:text-accent"
          onClick={() => trackEvent('footer:linkedin')}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/DTPF"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-text-muted transition-colors hover:text-accent"
          onClick={() => trackEvent('footer:github')}
        >
          GitHub
        </a>
        <a
          href="mailto:davidpizarrofrick@gmail.com"
          className="text-[13px] text-text-muted transition-colors hover:text-accent"
          onClick={() => trackEvent('footer:email')}
        >
          Email
        </a>
      </div>
      <p className="text-xs text-text-muted">{t('footer_copy')}</p>
    </footer>
  );
}

export default memo(Footer);
