import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { projects } from 'config/projects';
import { projectVars } from 'config/facts';
import { projectDetailPath } from 'router/paths';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { trackEvent } from 'utils/analytics';
import { stagger, fadeUp } from 'utils/animations';

export default function Projects() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <title>{t('projects_title')} — David T. Pizarro Frick</title>

      <div className="mx-auto max-w-[1100px] px-6 pt-14">
        <h1 className="mb-2 font-heading text-4xl font-bold tracking-tight">{t('projects_title')}</h1>
        <p className="text-base text-text-secondary">{t('projects_desc')}</p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-[1100px] flex-col gap-4 px-6 py-10 pb-24"
      >
        {projects.map((p) => (
          <motion.div
            key={p.slug}
            variants={fadeUp}
            className="group relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl border border-border bg-bg-surface p-8 transition-all duration-300 hover:border-border-hover hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] md:grid-cols-[1fr_auto]"
          >
            {/* Left accent bar on hover */}
            <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-accent opacity-0 transition-opacity group-hover:opacity-100" />

            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="font-mono text-xs text-text-muted">{t(p.urlKey)}</span>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    p.slug === 'dtpf'
                      ? 'border border-accent/20 bg-accent-subtle text-accent'
                      : 'border border-success/20 bg-success/10 text-success'
                  }`}
                >
                  {p.slug === 'dtpf' ? t('projects_badge_this') : t('projects_badge_production')}
                </span>
              </div>
              <h3 className="mb-1.5 font-heading text-[22px] font-bold tracking-tight">{t(p.nameKey)}</h3>
              <p className="mb-3.5 max-w-[620px] text-sm leading-relaxed text-text-secondary">
                {t(p.descKey, projectVars(p.slug, i18n.language))}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border px-2.5 py-0.5 text-xs font-medium text-text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-2 md:flex-col md:items-end">
              <Link
                to={projectDetailPath(p.slug)}
                onClick={() => trackEvent('projects:case-study', { slug: p.slug })}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-[#0B0F19] transition hover:bg-accent-hover"
              >
                {t('projects_case_study')} <ArrowRight size={14} aria-hidden="true" />
              </Link>
              {p.slug !== 'dtpf' && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-[13px] font-semibold text-text-primary transition hover:border-border-hover hover:bg-bg-tertiary"
                  onClick={() => trackEvent('projects:visit-live', { slug: p.slug })}
                >
                  {t('projects_visit')} <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
