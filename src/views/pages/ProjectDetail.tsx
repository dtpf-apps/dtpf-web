import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { LocalizedLink as Link, LocalizedNavigate as Navigate } from 'router/LocalizedLink';
import Seo from 'views/components/Seo';
import { softwareJsonLd } from 'config/site';
import { projects } from 'config/projects';
import { formatInt, projectVars } from 'config/facts';
import { paths } from 'router/paths';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { trackEvent } from 'utils/analytics';
import ProjectStatusBadge from 'views/components/ProjectStatusBadge';
import ProjectGallery from 'views/components/ProjectGallery';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to={paths.projects} replace />;

  const vars = projectVars(project.slug, i18n.language);
  // A private app has nothing a visitor can open: no button row at all, rather than a dead one.
  const hasLinks = Boolean(project.liveUrl || project.storeUrl || project.githubUrl);

  return (
    <>
      <Seo
        title={`${t(project.nameKey)} — David T. Pizarro Frick`}
        description={t(project.taglineLongKey ?? project.taglineKey, vars)}
        ogKey={`project-${project.slug}`}
        type="article"
        jsonLd={softwareJsonLd({
          name: t(project.nameKey),
          description: t(project.taglineLongKey ?? project.taglineKey, vars),
          url: project.liveUrl,
          android: Boolean(project.storeUrl),
        })}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[860px] px-6 py-12 pb-24"
      >
        <Link
          to={paths.projects}
          onClick={() => trackEvent('project:back')}
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-[13px] tracking-wide text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} aria-hidden="true" /> {t('projects_back')}
        </Link>

        <h1 className="mb-3 font-heading text-5xl font-bold tracking-[-2px]">{t(project.nameKey)}</h1>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <ProjectStatusBadge status={project.status} />
          {project.statusNoteKey && (
            <span className="font-mono text-[13px] text-text-muted">{t(project.statusNoteKey)}</span>
          )}
        </div>
        <p className={`${hasLinks ? 'mb-7' : 'mb-12'} text-lg leading-relaxed text-text-secondary`}>
          {t(project.taglineLongKey ?? project.taglineKey)}
        </p>

        {hasLinks && (
          <div className="mb-12 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-accent-hover"
                onClick={() => trackEvent('project:visit-live', { slug: project.slug })}
              >
                {t('detail_visit')} {t(project.urlKey)} <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
            {project.storeUrl && (
              <a
                href={project.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
                onClick={() => trackEvent('project:store', { slug: project.slug })}
              >
                {/* Official Google Play artwork: shown as supplied, never restyled. */}
                <img
                  src={
                    i18n.language.startsWith('en')
                      ? '/badges/google-play-en.png'
                      : '/badges/google-play-es.png'
                  }
                  alt={t('detail_store')}
                  width={646}
                  height={250}
                  className="h-14 w-auto"
                  loading="lazy"
                />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-hover hover:bg-bg-tertiary"
                onClick={() => trackEvent('project:github', { slug: project.slug })}
              >
                {t('detail_github')} <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        )}

        <hr className="border-border" />

        {/* Case study body */}
        {project.problemKey && (
          <div className="mt-9">
            <p className="mb-4 text-base leading-[1.85] text-text-secondary">
              <strong className="text-text-primary">{t('detail_problem')}</strong>{' '}
              {t(project.problemKey, vars)}
            </p>
            <p className="mb-4 text-base leading-[1.85] text-text-secondary">
              <strong className="text-text-primary">{t('detail_solution')}</strong>{' '}
              {t(project.solutionKey!, vars)}
            </p>
            <p className="mb-4 text-base leading-[1.85] text-text-secondary">
              <strong className="text-text-primary">{t('detail_result')}</strong>{' '}
              {t(project.resultKey!, vars)}
            </p>
          </div>
        )}

        {!project.problemKey && (
          <p className="mt-9 text-base leading-[1.85] text-text-secondary">{t(project.descKey, vars)}</p>
        )}

        <hr className="mt-9 border-border" />

        {project.media?.length ? (
          <section aria-labelledby="gallery-heading" className="mt-10">
            <h2
              id="gallery-heading"
              className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[1.5px] text-text-muted"
            >
              {t('detail_gallery')}
            </h2>
            <ProjectGallery media={project.media} projectName={t(project.nameKey)} />
          </section>
        ) : null}

        {/* Stack + Metrics */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[1.5px] text-text-muted">
              {t('detail_stack')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-border px-3.5 py-1.5 text-[13px] font-medium text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {project.metrics && (
            <div>
              <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[1.5px] text-text-muted">
                {t('detail_metrics')}
              </h2>
              {project.metrics.map((m) => (
                <div
                  key={m.labelKey}
                  className="flex justify-between border-b border-border py-2.5 text-sm last:border-b-0"
                >
                  <span className="text-text-secondary">{t(m.labelKey)}</span>
                  <span className="font-semibold text-text-primary">
                    {m.valueKey
                      ? t(m.valueKey)
                      : typeof m.value === 'number'
                        ? formatInt(m.value, i18n.language)
                        : m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
