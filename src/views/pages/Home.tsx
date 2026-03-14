import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths, projectDetailPath } from 'router/paths';
import { projects } from 'config/projects';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const featured = projects.filter((p) => p.slug !== 'dtpf');

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const } },
};

const stackItems = [
  { abbr: 'R', name: 'React' },
  { abbr: 'TS', name: 'TypeScript' },
  { abbr: 'N', name: 'Node.js' },
  { abbr: 'M', name: 'MongoDB' },
  { abbr: 'TW', name: 'Tailwind' },
  { abbr: 'V', name: 'Vite' },
  { abbr: 'D', name: 'Docker' },
  { abbr: 'GH', name: 'GitHub Actions' },
  { abbr: 'AI', name: 'Claude' },
  { abbr: 'L', name: 'Linux' },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <title>David T. Pizarro Frick — Software Developer</title>
      <meta name="description" content={`${t('hero_tagline_1')} ${t('hero_tagline_2')}`} />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-[20%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.07)_0%,rgba(251,191,36,0.03)_40%,transparent_70%)]" />
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
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
          {t('hero_tagline_1')}{' '}
          <strong className="font-medium text-accent">{t('hero_tagline_2')}</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="relative z-10 mt-6 flex flex-col items-center gap-2 font-mono text-[13px] text-text-muted md:flex-row md:gap-6"
        >
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            <span className="font-semibold text-text-primary">5</span> {t('hero_proof_apps')}
          </span>
          <span className="hidden text-text-muted md:inline">·</span>
          <span><span className="font-semibold text-text-primary">3+</span> {t('hero_proof_saas')}</span>
          <span className="hidden text-text-muted md:inline">·</span>
          <span><span className="font-semibold text-text-primary">6.100+</span> {t('hero_proof_tests')}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link to={paths.projects} className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-semibold text-[#0B0F19] transition-all hover:bg-accent-hover hover:shadow-[0_0_40px_var(--color-accent-glow)] hover:-translate-y-0.5">
            {t('hero_cta_projects')}
          </Link>
          <Link to={paths.contact} className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border px-7 py-3.5 text-[15px] font-semibold text-text-primary transition-all hover:border-border-hover hover:bg-bg-tertiary">
            {t('hero_cta_contact')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative z-10 mt-20 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[2px] text-text-muted"
        >
          scroll
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-text-muted to-transparent" />
        </motion.div>
      </section>

      {/* ── Featured Projects — Bento Grid ── */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">{t('home_projects_label')}</p>
        <h2 className="mb-2 font-heading text-[32px] font-bold tracking-tight">{t('home_projects_heading')}</h2>
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
                i === 0 ? 'col-span-12 md:col-span-7' :
                i === 1 ? 'col-span-12 md:col-span-5' :
                i === 2 ? 'col-span-12 md:col-span-5' :
                'col-span-12 md:col-span-7'
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
                {p.featuredKey ? t(p.featuredKey) : t(p.taglineKey)}
              </p>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-md border border-accent/15 bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Link to={projectDetailPath(p.slug)} className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-[#0B0F19] transition-all hover:bg-accent-hover">
                  {t('home_projects_case_study')} <ArrowRight size={14} />
                </Link>
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-[13px] font-semibold text-text-primary transition-all hover:border-border-hover hover:bg-bg-tertiary">
                  {t('home_projects_visit')} <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Manifesto ── */}
      <section className="mx-auto max-w-[640px] px-6 py-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 font-heading text-[28px] font-semibold leading-snug tracking-tight"
        >
          {t('manifesto_line1')}<br />
          <span className="text-accent">{t('manifesto_line2')}</span>
        </motion.p>
        <p className="mx-auto max-w-[500px] text-[15px] leading-relaxed text-text-secondary">
          {t('manifesto_body')}
        </p>
      </section>

      {/* ── Stack ── */}
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[2px] text-accent">{t('home_stack_label')}</p>
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
          <h2 className="relative mb-3 font-heading text-[28px] font-bold tracking-tight">{t('home_cta_title')}</h2>
          <p className="relative mb-7 text-[15px] text-text-secondary">{t('home_cta_desc')}</p>
          <Link to={paths.contact} className="relative inline-flex items-center gap-2 rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-semibold text-[#0B0F19] transition-all hover:bg-accent-hover hover:shadow-[0_0_40px_var(--color-accent-glow)] hover:-translate-y-0.5">
            {t('home_cta_button')}
          </Link>
        </div>
      </section>
    </>
  );
}
