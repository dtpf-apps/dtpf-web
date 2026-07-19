import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from 'router/paths';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <title>404 — David T. Pizarro Frick</title>
      <div className="mx-auto flex max-w-[460px] flex-col items-center px-6 py-40 text-center">
        <span className="mb-5 font-heading text-[140px] font-bold leading-none tracking-[-8px] text-transparent bg-clip-text bg-gradient-to-br from-accent to-warm">
          404
        </span>
        <h1 className="mb-3 font-heading text-[22px] font-bold">{t('not_found_title')}</h1>
        <p className="mb-8 text-[15px] text-text-secondary">{t('not_found_desc')}</p>
        <Link
          to={paths.home}
          className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-accent-hover"
        >
          {t('not_found_cta')}
        </Link>
      </div>
    </>
  );
}
