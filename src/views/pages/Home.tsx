import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from 'router/LocalizedLink';
import useRouteLang from 'router/useRouteLang';
import { paths, projectDetailPath } from 'router/paths';
import Seo from 'views/components/Seo';
import { personJsonLd } from 'config/site';
import { projects } from 'config/projects';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Cpu, ExternalLink, FlaskConical, GitBranch } from 'lucide-react';
import { facts, formatInt, platformVars, projectVars, roundDownToThousand, yearsSince } from 'config/facts';
import { trackEvent } from 'utils/analytics';
import { stagger, fadeUp } from 'utils/animations';

// The bento grid holds four cards; which four is decided in config/projects.ts, in array order.
const featured = projects.filter((p) => p.featured);

// "How I work": four habits, each pointing at the page that proves it. The copy lives in the
// locales under home_how_<n>_*; the figures it interpolates come from facts.json.
const howCards = [
  { n: 1, Icon: FlaskConical, to: paths.projects },
  { n: 2, Icon: GitBranch, to: projectDetailPath('dcompany') },
  { n: 3, Icon: Activity, to: paths.platform },
  { n: 4, Icon: Cpu, to: projectDetailPath('dcompany'), alt: projectDetailPath('dinventory') },
] as const;

const stackItems = [
  { abbr: 'R', name: 'React' },
  { abbr: 'TS', name: 'TypeScript' },
  { abbr: 'N', name: 'Node.js' },
  { abbr: 'M', name: 'MongoDB' },
  { abbr: 'TW', name: 'Tailwind' },
  { abbr: 'V', name: 'Vite' },
  { abbr: 'D', name: 'Docker' },
  { abbr: 'PX', name: 'Proxmox' },
  { abbr: 'GH', name: 'GitHub Actions' },
  { abbr: 'AI', name: 'Claude Code' },
  { abbr: 'L', name: 'Linux' },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const routeLang = useRouteLang();
  // Rounded down to the thousand: the exact total is a moving target, the floor is not.
  const testsFigure = `${formatInt(roundDownToThousand(facts.tests.total), lang)}+`;
  const saasYears = yearsSince(facts.saasSince);
  const howVars = { ...platformVars(lang), tests: testsFigure };

  return (
    <>
      <Seo
        title="David T. Pizarro Frick — Senior Full-Stack Engineer"
        description={t('seo_desc_home')}
        ogKey="home"
        type="profile"
        jsonLd={personJsonLd(routeLang)}
      />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-[20%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.07)_0%,rgba(251,191,36,0.03)_40%,transparent_70%)]" />
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 whitespace-pre-line font-heading text-5xl font-bold leading-[1.0] tracking-[-3px] text-transparent bg-clip-text bg-gradient-to-br from-text-primary to-text-secondary md:text-7xl md:tracking-[-3.5px]"
        >
          {t('hero_name')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
          className="relative z-10 mt-6 max-w-[480px] text-lg text-text-secondary md:text-xl"
        >
          {t('hero_tagline_1')} <strong className="font-medium text-accent">{t('hero_tagline_2')}</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="relative z-10 mt-6 flex flex-col items-center gap-2 font-mono text-[13px] text-text-muted md:flex-row md:gap-6"
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            <span className="font-semibold text-text-primary">{facts.apps.production}</span>{' '}
            {t('hero_proof_apps')}
          </span>
          <span className="hidden text-text-muted md:inline">·</span>
          <span>
            <span className="font-semibold text-text-primary">{facts.apps.public}</span>{' '}
            {t('hero_proof_public')}
          </span>
          <span className="hidden text-text-muted md:inline">·</span>
          <span>
            <span className="font-semibold text-text-primary">{testsFigure}</span> {t('hero_proof_tests')}
          </span>
          <span className="hidden text-text-muted md:inline">·</span>
          <span>
            <span className="font-semibold text-text-primary">{saasYears}</span> {t('hero_proof_saas')}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="relative z-10 mt-4 text-[13px] text-text-secondary"
        >
          {t('availability')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to={paths.projects}
            onClick={() => trackEvent('home:hero-view-projects')}
            className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-semibold text-on-accent transition-all hover:bg-accent-hover hover:shadow-[0_0_40px_var(--color-accent-glow)] hover:-translate-y-0.5"
          >
            {t('hero_cta_projects')}
          </Link>
          <Link
            to={paths.contact}
            onClick={() => trackEvent('home:hero-get-in-touch')}
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border px-7 py-3.5 text-[15px] font-semibold text-text-primary transition-all hover:border-border-hover hover:bg-bg-tertiary"
          >
            {t('hero_cta_contact')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          aria-hidden="true"
          className="relative z-10 mt-20 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[2px] text-text-muted"
        >
          scroll
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-text-muted to-transparent" />
        </motion.div>
      </section>

      {/* ── Featured Projects — Bento Grid ── */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">
          {t('home_projects_label')}
        </p>
        <h2 className="mb-2 font-heading text-[32px] font-bold tracking-tight">
          {t('home_projects_heading')}
        </h2>
        <p className="mb-12 max-w-[520px] text-base text-text-secondary">{t('home_projects_desc')}</p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-12 gap-4"
        >
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-hover hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] ${
                i === 0
                  ? 'col-span-12 md:col-span-7'
                  : i === 1
                    ? 'col-span-12 md:col-span-5'
                    : i === 2
                      ? 'col-span-12 md:col-span-5'
                      : 'col-span-12 md:col-span-7'
              }`}
            >
              {/* Top hover line */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent to-warm opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.8px] text-success">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                {t(p.urlKey)}
              </div>
              <h3 className="mb-2 font-heading text-[22px] font-bold tracking-tight">{t(p.nameKey)}</h3>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {p.featuredKey ? t(p.featuredKey, projectVars(p.slug, lang)) : t(p.taglineKey)}
              </p>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-accent/15 bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to={projectDetailPath(p.slug)}
                  onClick={() => trackEvent('home:project-card', { slug: p.slug })}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-on-accent transition-all hover:bg-accent-hover"
                >
                  {t('home_projects_case_study')} <ArrowRight size={14} aria-hidden="true" />
                </Link>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-[13px] font-semibold text-text-primary transition-all hover:border-border-hover hover:bg-bg-tertiary"
                    onClick={() => trackEvent('home:visit-project', { slug: p.slug })}
                  >
                    {t('home_projects_visit')} <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How I work ── */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">
          {t('home_how_label')}
        </p>
        <h2 className="mb-2 font-heading text-[32px] font-bold tracking-tight">{t('home_how_heading')}</h2>
        <p className="mb-12 max-w-[520px] text-base text-text-secondary">{t('home_how_desc')}</p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          onViewportEnter={() => trackEvent('home:how-visible')}
          className="grid gap-4 md:grid-cols-2"
        >
          {howCards.map((card) => (
            <motion.article
              key={card.n}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-border bg-bg-surface p-7"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                <card.Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-heading text-[20px] font-bold tracking-tight">
                {t(`home_how_${card.n}_title`)}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                {t(`home_how_${card.n}_body`, howVars)}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  to={card.to}
                  onClick={() => trackEvent('home:how-card', { card: card.n })}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors hover:text-accent-hover"
                >
                  {t(`home_how_${card.n}_link`)} <ArrowRight size={14} aria-hidden="true" />
                </Link>
                {'alt' in card && (
                  <Link
                    to={card.alt}
                    onClick={() => trackEvent('home:how-card', { card: card.n })}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors hover:text-accent-hover"
                  >
                    {t(`home_how_${card.n}_link_alt`)} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── Stack ── */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">
          {t('home_stack_label')}
        </p>
        <h2 className="mb-2 font-heading text-[32px] font-bold tracking-tight">{t('home_stack_heading')}</h2>
        <p className="mb-12 max-w-[520px] text-base text-text-secondary">{t('home_stack_desc')}</p>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="flex flex-wrap justify-center gap-3"
        >
          {stackItems.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className="flex items-center gap-2 rounded-[10px] border border-border bg-bg-surface px-4 py-2.5 text-[13px] font-medium text-text-secondary transition-all hover:border-accent hover:bg-accent-subtle hover:text-accent"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-bg-tertiary font-mono text-[10px] font-bold text-accent">
                {item.abbr}
              </span>
              {item.name}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-surface p-14 text-center">
          <div className="pointer-events-none absolute -right-[30%] -top-1/2 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-glow),transparent_70%)]" />
          <h2 className="relative mb-3 font-heading text-[28px] font-bold tracking-tight">
            {t('home_cta_title')}
          </h2>
          <p className="relative mb-7 text-[15px] text-text-secondary">{t('home_cta_desc')}</p>
          <Link
            to={paths.contact}
            onClick={() => trackEvent('home:final-cta')}
            className="relative inline-flex items-center gap-2 rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-semibold text-on-accent transition-all hover:bg-accent-hover hover:shadow-[0_0_40px_var(--color-accent-glow)] hover:-translate-y-0.5"
          >
            {t('home_cta_button')}
          </Link>
        </div>
      </section>
    </>
  );
}
