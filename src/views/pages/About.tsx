import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const experience = [
  { roleKey: 'exp_hub4retail_role', companyKey: 'exp_hub4retail_company', periodKey: 'exp_hub4retail_period', descKey: 'exp_hub4retail_desc' },
  { roleKey: 'exp_palmira_role', companyKey: 'exp_palmira_company', periodKey: 'exp_palmira_period', descKey: 'exp_palmira_desc' },
  { roleKey: 'exp_assembler_role', companyKey: 'exp_assembler_company', periodKey: 'exp_assembler_period', descKey: 'exp_assembler_desc' },
];

const tools: { titleKey: string; items: string[] }[] = [
  { titleKey: 'about_tools_frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
  { titleKey: 'about_tools_backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'WebSockets'] },
  { titleKey: 'about_tools_devops', items: ['Docker', 'GitHub Actions', 'PM2', 'Linux', 'Cloudflare'] },
  { titleKey: 'about_tools_ai', items: ['Claude', 'Claude Code', 'Cursor', 'Git', 'Grafana'] },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <title>{t('about_title')} — David T. Pizarro Frick</title>

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
            <h2 className="mb-0.5 font-heading text-xl font-bold tracking-tight">David T. Pizarro Frick</h2>
            <p className="mb-0.5 text-sm font-medium text-accent">{t('about_role')}</p>
            <p className="mb-3 text-[13px] text-text-muted">{t('about_location')}</p>
            <div className="flex justify-center gap-2 sm:justify-start">
              <a href="https://www.linkedin.com/in/david-tomas-pizarro-frick" target="_blank" rel="noreferrer" className="rounded-md border border-border px-3 py-1 text-xs font-medium text-text-secondary transition hover:border-accent hover:text-accent">LinkedIn ↗</a>
              <a href="https://github.com/DTPF" target="_blank" rel="noreferrer" className="rounded-md border border-border px-3 py-1 text-xs font-medium text-text-secondary transition hover:border-accent hover:text-accent">GitHub ↗</a>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-12">
          <p className="mb-3.5 text-[15px] leading-relaxed text-text-secondary">{t('about_bio_p1')}</p>
          <p className="mb-3.5 text-[15px] leading-relaxed text-text-secondary">{t('about_bio_p2')}</p>
          <p className="text-[15px] leading-relaxed text-text-secondary">{t('about_bio_p3')}</p>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <h2 className="mb-5 border-b border-border pb-3 font-heading text-xl font-bold tracking-tight">{t('about_experience')}</h2>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-2.5">
            {experience.map((exp) => (
              <motion.div key={exp.roleKey} variants={fadeUp} className="flex gap-4 rounded-xl border border-border bg-bg-surface p-5 transition-colors hover:border-border-hover">
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
          <h2 className="mb-5 border-b border-border pb-3 font-heading text-xl font-bold tracking-tight">{t('about_tools')}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {tools.map((group) => (
              <div key={group.titleKey} className="rounded-xl border border-border bg-bg-surface p-5">
                <h4 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[1px] text-text-muted">{t(group.titleKey)}</h4>
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
