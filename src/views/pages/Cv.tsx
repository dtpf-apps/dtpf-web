import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import { facts, projectVars } from 'config/facts';
import { experience, tools } from 'config/profile';
import { projects } from 'config/projects';
import { AUTHOR, SITE_URL, cvPdfPath, displayUrl } from 'config/site';
import { trackEvent } from 'utils/analytics';
import useRouteLang from 'router/useRouteLang';
import Seo from 'views/components/Seo';
import ProjectStatusBadge from 'views/components/ProjectStatusBadge';

const SECTION_HEADING =
  'mb-3 border-b border-border pb-1.5 font-heading text-base font-bold uppercase tracking-wider print:text-[11pt]';
const LINK = 'text-accent underline-offset-2 hover:underline';

// Plain elements on purpose, no Framer Motion: this page is also what the build prints to PDF, and
// an entrance animation caught mid-flight would put half-transparent text in the file.
export default function Cv() {
  const { t, i18n } = useTranslation();
  const lang = useRouteLang();

  return (
    <>
      <Seo pageName={t('cv_title')} description={t('seo_desc_cv')} ogKey="cv" />

      <article className="mx-auto max-w-[820px] px-6 py-12 pb-24 print:max-w-none print:p-0 print:text-[9.5pt] print:leading-snug">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:mb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight print:text-[22pt]">
              {AUTHOR.name}
            </h1>
            <p className="mt-1 text-base font-medium text-accent">{t('about_role')}</p>
            <p className="text-sm text-text-secondary">{t('about_location')}</p>
            <p className="text-sm text-text-secondary">{t('availability')}</p>
          </div>
          <div className="flex flex-col gap-1 text-sm sm:items-end">
            <a href={`mailto:${AUTHOR.email}`} className={LINK}>
              {AUTHOR.email}
            </a>
            <a href={AUTHOR.linkedin} target="_blank" rel="noreferrer" className={LINK}>
              {displayUrl(AUTHOR.linkedin)}
            </a>
            <a href={AUTHOR.github} target="_blank" rel="noreferrer" className={LINK}>
              {displayUrl(AUTHOR.github)}
            </a>
            <a href={SITE_URL} className={LINK}>
              dtpf.es
            </a>
          </div>
        </header>

        <a
          href={cvPdfPath(lang)}
          download
          onClick={() => trackEvent('cv:download', { lang })}
          className="mb-8 inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:bg-accent-hover print:hidden"
        >
          <Download size={15} aria-hidden="true" />
          {t('cv_download')}
        </a>

        <section className="mb-7 print:mb-4">
          <h2 className={SECTION_HEADING}>{t('cv_profile')}</h2>
          <p className="mb-2 text-sm leading-relaxed text-text-secondary">{t('about_bio_p1')}</p>
          <p className="mb-2 text-sm leading-relaxed text-text-secondary">
            {t('about_bio_p2', { apps: facts.apps.production, publicApps: facts.apps.public })}
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">{t('about_bio_p3')}</p>
        </section>

        <section className="mb-7 print:mb-4">
          <h2 className={SECTION_HEADING}>{t('about_experience')}</h2>
          <div className="flex flex-col gap-3">
            {experience.map((job) => (
              <div key={job.roleKey} className="break-inside-avoid">
                <h3 className="text-sm font-semibold">{t(job.roleKey)}</h3>
                <p className="text-[13px] text-text-secondary">
                  <span className="font-medium text-accent">{t(job.companyKey)}</span>
                  {' · '}
                  <span className="font-mono text-[11px]">{t(job.periodKey)}</span>
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">{t(job.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-7 print:mb-4">
          <h2 className={SECTION_HEADING}>{t('cv_projects')}</h2>
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <div key={project.slug} className="break-inside-avoid">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <h3 className="text-sm font-semibold">{t(project.nameKey)}</h3>
                  <ProjectStatusBadge status={project.status} />
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className={`${LINK} text-xs`}>
                      {t(project.urlKey)}
                    </a>
                  )}
                </div>
                <p className="mt-0.5 text-[13px] leading-relaxed text-text-secondary">
                  {t(project.taglineLongKey ?? project.taglineKey, projectVars(project.slug, i18n.language))}
                </p>
                <ul className="mt-1 flex flex-wrap gap-1">
                  {project.stack.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-border px-1.5 py-px font-mono text-[10px] text-text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={SECTION_HEADING}>{t('about_tools')}</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 print:grid-cols-2">
            {tools.map((group) => (
              <div key={group.titleKey} className="break-inside-avoid">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[1px] text-text-muted">
                  {t(group.titleKey)}
                </h3>
                <ul className="mt-0.5 flex flex-wrap gap-x-3 text-[13px] text-text-secondary">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
