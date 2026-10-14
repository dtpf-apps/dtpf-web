import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LocalizedLink as Link } from 'router/LocalizedLink';
import { paths, projectDetailPath } from 'router/paths';
import Seo from 'views/components/Seo';
import ArchitectureDiagram from 'views/components/ArchitectureDiagram';
import { platformCards, platformFigures } from 'config/platform';
import { projects } from 'config/projects';
import { platformVars } from 'config/facts';
import { trackEvent } from 'utils/analytics';
import { stagger, fadeUp } from 'utils/animations';

const DIAGRAM_HEADING_ID = 'platform-diagram-heading';

export default function Platform() {
  const { t, i18n } = useTranslation();
  const vars = platformVars(i18n.language);

  return (
    <>
      <Seo titleKey="platform_seo_title" description={t('seo_desc_platform')} ogKey="platform" />

      <div className="mx-auto max-w-[1100px] px-6 pt-14">
        <h1 className="mb-3 font-heading text-4xl font-bold tracking-tight">{t('platform_title')}</h1>
        <p className="max-w-[640px] text-base text-text-secondary md:text-lg">{t('platform_desc')}</p>

        <section aria-labelledby="platform-figures-heading" className="mt-10">
          <h2 id="platform-figures-heading" className="sr-only">
            {t('platform_figures_heading')}
          </h2>
          <motion.ul
            role="list"
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3 lg:grid-cols-6"
          >
            {platformFigures.map((f) => (
              <motion.li key={f.varKey} variants={fadeUp} className="bg-bg-surface px-4 py-5 lg:px-5">
                <span className="block font-heading text-[28px] font-bold leading-none tracking-tight text-text-primary md:text-[32px]">
                  {vars[f.varKey]}
                </span>
                <span className="mt-2 block text-[13px] leading-snug text-text-secondary">
                  {t(f.labelKey, vars)}
                </span>
              </motion.li>
            ))}
          </motion.ul>
          <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-text-secondary">
            <span
              aria-hidden="true"
              className="mt-[7px] inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success"
            />
            <span>
              {t('platform_measured_at', vars)} {t('platform_policy')}
            </span>
          </p>
        </section>
      </div>

      <section aria-labelledby={DIAGRAM_HEADING_ID} className="mx-auto max-w-[1100px] px-6 pt-20 md:pt-24">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">
          {t('platform_diagram_label')}
        </p>
        <h2 id={DIAGRAM_HEADING_ID} className="mb-2 font-heading text-[32px] font-bold tracking-tight">
          {t('platform_diagram_heading')}
        </h2>
        <p className="max-w-[520px] text-base text-text-secondary">{t('platform_diagram_desc')}</p>
        <div className="mt-10">
          <ArchitectureDiagram headingId={DIAGRAM_HEADING_ID} vars={vars} />
        </div>
      </section>

      <section aria-labelledby="platform-cards-heading" className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">
          {t('platform_cards_label')}
        </p>
        <h2 id="platform-cards-heading" className="mb-2 font-heading text-[32px] font-bold tracking-tight">
          {t('platform_cards_heading')}
        </h2>
        <p className="max-w-[520px] text-base text-text-secondary">{t('platform_cards_desc')}</p>

        <motion.ul
          role="list"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {platformCards.map((card) => {
            const Icon = card.icon;
            const used = (card.usedBy ?? []).flatMap((slug) => projects.filter((p) => p.slug === slug));
            return (
              <motion.li
                key={card.id}
                variants={fadeUp}
                data-card={card.id}
                className="flex flex-col rounded-2xl border border-border bg-bg-surface p-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/15 bg-accent-subtle text-accent"
                >
                  <Icon size={20} />
                </span>
                <h3 className="mb-2 font-heading text-lg font-bold tracking-tight md:text-[20px]">
                  {t(card.titleKey)}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-text-secondary">{t(card.bodyKey, vars)}</p>

                {card.tools && (
                  <dl className="space-y-3">
                    {card.tools.map((tool) => (
                      <div key={tool.name}>
                        <dt className="font-mono text-[12px] font-semibold text-text-primary">{tool.name}</dt>
                        <dd className="text-[13px] text-text-secondary">{t(tool.descKey)}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {(card.metaKey || used.length > 0) && (
                  <div className="mt-auto border-t border-border pt-4">
                    {card.metaKey && (
                      <p className="font-mono text-[12px] leading-relaxed text-text-secondary">
                        {t(card.metaKey, vars)}
                      </p>
                    )}
                    {used.length > 0 && (
                      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-text-secondary">
                        <span>{t('platform_card_inference_used')}</span>
                        {used.map((p, i) => (
                          <Fragment key={p.slug}>
                            {i > 0 && <span aria-hidden="true">·</span>}
                            <Link
                              to={projectDetailPath(p.slug)}
                              onClick={() => trackEvent('platform:project-link', { slug: p.slug })}
                              className="font-medium text-text-primary underline-offset-2 hover:text-accent hover:underline"
                            >
                              {t(p.nameKey)}
                            </Link>
                          </Fragment>
                        ))}
                      </p>
                    )}
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-surface p-14 text-center">
          <div className="pointer-events-none absolute -right-[30%] -top-1/2 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)]" />
          <h2 className="relative mb-3 font-heading text-[28px] font-bold tracking-tight">
            {t('platform_cta_heading')}
          </h2>
          <p className="relative mx-auto mb-7 max-w-[560px] text-[15px] text-text-secondary">
            {t('platform_cta_desc')}
          </p>
          <div className="relative flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={paths.projects}
              onClick={() => trackEvent('platform:cta-projects')}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-semibold text-[#0B0F19] transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_0_40px_var(--color-accent-glow)]"
            >
              {t('platform_cta_projects')}
            </Link>
            <Link
              to={paths.contact}
              onClick={() => trackEvent('platform:cta-contact')}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border px-7 py-3.5 text-[15px] font-semibold text-text-primary transition-all hover:border-border-hover hover:bg-bg-tertiary"
            >
              {t('hero_cta_contact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
