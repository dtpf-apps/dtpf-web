import { useTranslation } from 'react-i18next';
import { useParams, Link, Navigate } from 'react-router';
import { projects } from 'config/projects';
import { paths } from 'router/paths';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to={paths.projects} replace />;

  return (
    <>
      <title>{t(project.nameKey)} — David T. Pizarro Frick</title>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[860px] px-6 py-12 pb-24"
      >
        <Link to={paths.projects} className="mb-10 inline-flex items-center gap-1.5 font-mono text-[13px] tracking-wide text-text-muted transition-colors hover:text-accent">
          <ArrowLeft size={14} /> {t('projects_back')}
        </Link>

        <h1 className="mb-3 font-heading text-5xl font-bold tracking-[-2px]">{t(project.nameKey)}</h1>
        <p className="mb-7 text-lg leading-relaxed text-text-secondary">
          {project.slug === 'dauth' && project.slug ? t('project_dauth_tagline_long') : t(project.taglineKey)}
        </p>

        <div className="mb-12 flex gap-3">
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-6 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-accent-hover">
            {t('detail_visit')} {t(project.urlKey)} <ExternalLink size={14} />
          </a>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-hover hover:bg-bg-tertiary">
              {t('detail_github')} <ExternalLink size={14} />
            </a>
          )}
        </div>

        <hr className="border-border" />

        {/* Case study body */}
        {project.problemKey && (
          <div className="mt-9">
            <p className="mb-4 text-base leading-[1.85] text-text-secondary">
              <strong className="text-text-primary">{t('detail_problem')}</strong> {t(project.problemKey)}
            </p>
            <p className="mb-4 text-base leading-[1.85] text-text-secondary">
              <strong className="text-text-primary">{t('detail_solution')}</strong> {t(project.solutionKey!)}
            </p>
            <p className="mb-4 text-base leading-[1.85] text-text-secondary">
              <strong className="text-text-primary">{t('detail_result')}</strong> {t(project.resultKey!)}
            </p>
          </div>
        )}

        {!project.problemKey && (
          <p className="mt-9 text-base leading-[1.85] text-text-secondary">{t(project.descKey)}</p>
        )}

        <hr className="mt-9 border-border" />

        {/* Stack + Metrics */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[1.5px] text-text-muted">{t('detail_stack')}</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-lg border border-border px-3.5 py-1.5 text-[13px] font-medium text-text-secondary">{s}</span>
              ))}
            </div>
          </div>

          {project.metrics && (
            <div>
              <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[1.5px] text-text-muted">{t('detail_metrics')}</h4>
              {project.metrics.map((m) => (
                <div key={m.labelKey} className="flex justify-between border-b border-border py-2.5 text-sm last:border-b-0">
                  <span className="text-text-secondary">{m.label}</span>
                  <span className="font-semibold text-text-primary">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
