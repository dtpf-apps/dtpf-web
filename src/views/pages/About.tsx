import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { facts } from 'config/facts';
import { trackEvent } from 'utils/analytics';
import { stagger, fadeUp } from 'utils/animations';
import useRouteLang from 'router/useRouteLang';
import Seo from 'views/components/Seo';
import { personJsonLd } from 'config/site';
import { experience, tools } from 'config/profile';
import { LocalizedLink as Link } from 'router/LocalizedLink';
import { paths } from 'router/paths';

export default function About() {
  const { t } = useTranslation();
  const routeLang = useRouteLang();

  return (
    <>
      <Seo
        titleKey="about_title"
        description={t('seo_desc_about')}
        ogKey="about"
        type="profile"
        jsonLd={personJsonLd(routeLang)}
      />

      <div className="mx-auto max-w-[1100px] px-6 pt-14">
        <h1 className="font-heading text-4xl font-bold tracking-tight">{t('about_title')}</h1>
      </div>

      <div className="mx-auto max-w-[800px] px-6 py-12 pb-24">
        {/* Profile card */}
        <div className="mb-12 flex flex-col items-center gap-7 rounded-2xl border border-border bg-bg-surface p-7 sm:flex-row sm:items-center">
          <div className="flex h-[88px] w-[88px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-warm font-heading text-[28px] font-bold text-[#0B0F19]">
            DP
          </div>
          <div className="text-center sm:text-left">
            <p className="mb-0.5 font-heading text-xl font-bold tracking-tight">David T. Pizarro Frick</p>
            <p className="mb-0.5 text-sm font-medium text-accent">{t('about_role')}</p>
            <p className="text-[13px] text-text-muted">{t('about_location')}</p>
            <p className="mb-3 text-[13px] text-text-secondary">{t('availability')}</p>
            <div className="flex justify-center gap-2 sm:justify-start">
              <a
                href="https://www.linkedin.com/in/david-tomas-pizarro-frick"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border px-3 py-1 text-xs font-medium text-text-secondary transition hover:border-accent hover:text-accent"
                onClick={() => trackEvent('about:linkedin')}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/DTPF"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border px-3 py-1 text-xs font-medium text-text-secondary transition hover:border-accent hover:text-accent"
                onClick={() => trackEvent('about:github')}
              >
                GitHub ↗
              </a>
              <Link
                to={paths.cv}
                className="rounded-md border border-border px-3 py-1 text-xs font-medium text-text-secondary transition hover:border-accent hover:text-accent"
                onClick={() => trackEvent('about:cv')}
              >
                {t('about_cv')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-12">
          <p className="mb-3.5 text-[15px] leading-relaxed text-text-secondary">{t('about_bio_p1')}</p>
          <p className="mb-3.5 text-[15px] leading-relaxed text-text-secondary">
            {t('about_bio_p2', { apps: facts.apps.production, publicApps: facts.apps.public })}
          </p>
          <p className="text-[15px] leading-relaxed text-text-secondary">{t('about_bio_p3')}</p>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <h2 className="mb-5 border-b border-border pb-3 font-heading text-xl font-bold tracking-tight">
            {t('about_experience')}
          </h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-2.5"
          >
            {experience.map((exp) => (
              <motion.div
                key={exp.roleKey}
                variants={fadeUp}
                className="flex gap-4 rounded-xl border border-border bg-bg-surface p-5 transition-colors hover:border-border-hover"
              >
                <div className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <div>
                  <h3 className="text-sm font-semibold">{t(exp.roleKey)}</h3>
                  <p className="text-[13px] font-medium text-accent">{t(exp.companyKey)}</p>
                  <p className="mb-1.5 font-mono text-[11px] text-text-muted">{t(exp.periodKey)}</p>
                  <p className="text-[13px] leading-relaxed text-text-secondary">{t(exp.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tools */}
        <div>
          <h2 className="mb-5 border-b border-border pb-3 font-heading text-xl font-bold tracking-tight">
            {t('about_tools')}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((group) => (
              <div key={group.titleKey} className="rounded-xl border border-border bg-bg-surface p-5">
                <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[1px] text-text-muted">
                  {t(group.titleKey)}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-text-secondary">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
