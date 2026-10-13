import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { facts, formatInt } from 'config/facts';
import { trackEvent } from 'utils/analytics';

// The portfolio is not one of its own project cards: its stack and test count live on this
// line, measured in facts.json like every other figure, next to the link to its public source.
const site = facts.projects.dtpf;

function Footer() {
  const { t, i18n } = useTranslation();
  const v = site.versions;

  return (
    <footer className="print:hidden mx-auto w-full max-w-[1100px] border-t border-border px-6 py-12 text-center">
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
          <span className="sr-only"> ({t('open_new_window')})</span>
        </a>
        <a
          href="https://github.com/DTPF"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-text-muted transition-colors hover:text-accent"
          onClick={() => trackEvent('footer:github')}
        >
          GitHub
          <span className="sr-only"> ({t('open_new_window')})</span>
        </a>
        <a
          href="mailto:davidpizarrofrick@gmail.com"
          className="text-[13px] text-text-muted transition-colors hover:text-accent"
          onClick={() => trackEvent('footer:email')}
        >
          Email
        </a>
      </div>
      <p className="mb-2 font-mono text-[11px] text-text-muted">
        {t('footer_site_label')}: React {v.react} · TypeScript {v.typescript} · Tailwind CSS v{v.tailwind} ·
        Vite {v.vite} · {t('footer_site_tests', { tests: formatInt(site.tests.total, i18n.language) })} ·{' '}
        <a
          href="https://github.com/dtpf-apps/dtpf-web"
          target="_blank"
          rel="noreferrer"
          className="underline-offset-2 transition-colors hover:text-accent hover:underline"
          onClick={() => trackEvent('footer:site-source')}
        >
          {t('footer_site_source')}
          <span className="sr-only"> ({t('open_new_window')})</span>
        </a>
      </p>
      <p className="text-xs text-text-muted">{t('footer_copy')}</p>
    </footer>
  );
}

export default memo(Footer);
