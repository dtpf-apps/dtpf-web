import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronUp, Globe, Network } from 'lucide-react';
import {
  clusterFrameKey,
  clusterTiers,
  edgeNodes,
  opsCaptionKey,
  opsNodes,
  type DiagramNode,
} from 'config/platform';
import { trackEvent } from 'utils/analytics';
import { stagger, fadeUp } from 'utils/animations';

const SUMMARY_ID = 'platform-diagram-summary';

type Vars = Record<string, string>;

const captionClass = 'mb-2 font-mono text-[11px] font-semibold uppercase tracking-[1px] text-text-secondary';

function NodeBox({ node, vars, ops = false }: { node: DiagramNode; vars: Vars; ops?: boolean }) {
  const { t } = useTranslation();
  const Icon = node.icon;
  return (
    <div
      data-node={node.id}
      className={`flex h-full items-start gap-3 rounded-lg border bg-bg-surface px-3 py-2.5 md:px-4 md:py-3 ${
        ops ? 'border-dashed border-border-hover' : 'border-border'
      }`}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-accent-subtle text-accent"
      >
        <Icon size={15} />
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-[14px] font-semibold leading-tight text-text-primary md:text-[15px]">
          {node.name ?? t(node.nameKey ?? '')}
        </span>
        {(node.sub || node.subKey) && (
          <span className="mt-0.5 block text-[12px] leading-snug text-text-secondary md:text-[13px]">
            {node.sub ?? t(node.subKey ?? '', vars)}
          </span>
        )}
        {node.relationKey && (
          <span className="mt-1.5 block font-mono text-[11px] text-text-secondary">
            {t(node.relationKey)}
          </span>
        )}
      </span>
    </div>
  );
}

/** Vertical request arrow; the dashed upward variant is the operations link on narrow screens. */
function Arrow({ operations = false, className = '' }: { operations?: boolean; className?: string }) {
  const Chevron = operations ? ChevronUp : ChevronDown;
  const line = operations ? 'w-0 border-l-2 border-dashed border-text-secondary' : 'w-0.5 bg-accent';
  const tone = operations ? 'text-text-secondary' : 'text-accent';
  return (
    <span
      aria-hidden="true"
      data-connector={operations ? 'arrow-ops' : 'arrow'}
      className={`flex items-center py-0.5 ${operations ? 'flex-col-reverse' : 'flex-col'} ${className}`}
    >
      <span className={`block h-5 ${line}`} />
      <Chevron size={14} strokeWidth={2.5} className={`${operations ? '-mb-1.5' : '-mt-1.5'} ${tone}`} />
    </span>
  );
}

/** Three-column bus (md and up): `fan-out` splits one parent into three, `ladder` joins rows. */
function Bus({ variant }: { variant: 'fan-out' | 'ladder' }) {
  const horizontal = (i: number) => {
    const edges = ['left-1/2 -right-1.5', '-left-1.5 -right-1.5', '-left-1.5 right-1/2'];
    return edges[i];
  };
  return (
    <span
      aria-hidden="true"
      data-connector={`bus-${variant}`}
      className="hidden h-8 grid-cols-3 gap-3 md:grid"
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="relative block">
          <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-accent" />
          <span
            className={`absolute h-0.5 bg-accent ${variant === 'fan-out' ? 'top-0' : 'top-1/2'} ${horizontal(i)}`}
          />
          <ChevronDown
            size={14}
            strokeWidth={2.5}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-accent"
          />
        </span>
      ))}
    </span>
  );
}

function Stub() {
  return (
    <span aria-hidden="true" data-connector="stub" className="mx-auto hidden h-4 w-0.5 bg-accent md:block" />
  );
}

export default function ArchitectureDiagram({ headingId, vars }: { headingId: string; vars: Vars }) {
  const { t } = useTranslation();
  const viewport = { once: true, margin: '-50px' } as const;
  const { firewall, proxy, apps, data } = clusterTiers;

  return (
    <motion.figure
      aria-labelledby={headingId}
      aria-describedby={SUMMARY_ID}
      onViewportEnter={() => trackEvent('platform:diagram-visible')}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl border border-border bg-bg-primary p-4 md:p-6 lg:p-8"
      style={{
        backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <p id={SUMMARY_ID} className="sr-only">
        {t('platform_diagram_summary', vars)}
      </p>

      <div className="grid gap-6 lg:grid-cols-12">
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="lg:col-span-8"
        >
          <motion.li variants={fadeUp} className="flex justify-center">
            <span
              data-node={edgeNodes.internet.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-surface px-3 py-1 font-mono text-[12px] text-text-secondary"
            >
              <Globe size={13} aria-hidden="true" />
              {edgeNodes.internet.name}
            </span>
          </motion.li>

          <motion.li variants={fadeUp}>
            <Arrow />
            <div className="md:mx-auto md:max-w-[320px]">
              <NodeBox node={edgeNodes.cloudflare} vars={vars} />
            </div>
          </motion.li>

          <motion.li variants={fadeUp}>
            <Arrow />
            {/* Below 360px the frame label would wrap over the border, so it sits inside as a plain line */}
            <div className="relative rounded-xl border border-border-hover p-3 min-[360px]:pt-7 md:p-5 md:pt-8">
              <p className="mb-2 inline-flex items-center gap-1.5 bg-bg-primary px-2 font-mono text-[11px] font-semibold uppercase tracking-[1px] text-text-secondary min-[360px]:absolute min-[360px]:-top-2.5 min-[360px]:left-3 min-[360px]:mb-0">
                <Network size={12} aria-hidden="true" />
                {t(clusterFrameKey, vars)}
              </p>

              <motion.ol variants={stagger}>
                <motion.li variants={fadeUp}>
                  <p className={captionClass}>{t(firewall.captionKey)}</p>
                  <div className="relative">
                    {/* Two 90px boxes cannot hold the node text at 320px, so the pair stacks until 360px */}
                    <ul
                      role="list"
                      className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 min-[360px]:gap-8 md:gap-20"
                    >
                      {firewall.nodes.map((n) => (
                        <li key={n.id}>
                          <NodeBox node={n} vars={vars} />
                        </li>
                      ))}
                    </ul>
                    <span
                      aria-hidden="true"
                      data-connector="carp"
                      className="pointer-events-none absolute left-1/2 top-1/2 hidden h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 bg-accent min-[360px]:block md:w-20"
                    >
                      {/* The pill is wider than the mobile gap, so below md the tier caption alone names CARP */}
                      <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-bg-primary px-2 py-0.5 font-mono text-[11px] font-semibold text-text-primary md:block">
                        CARP
                      </span>
                    </span>
                  </div>
                </motion.li>

                <motion.li variants={fadeUp}>
                  <Arrow />
                  <div className="md:mx-auto md:max-w-[320px]">
                    <NodeBox node={proxy.node} vars={vars} />
                  </div>
                </motion.li>

                <motion.li variants={fadeUp}>
                  <Arrow className="md:hidden" />
                  <Stub />
                  <Bus variant="fan-out" />
                  <p className={captionClass}>{t(apps.captionKey)}</p>
                  <ul role="list" className="grid gap-3 md:grid-cols-3">
                    {apps.nodes.map((n) => (
                      <li key={n.id}>
                        <NodeBox node={n} vars={vars} />
                      </li>
                    ))}
                  </ul>
                </motion.li>

                <motion.li variants={fadeUp}>
                  <Arrow className="md:hidden" />
                  <Bus variant="ladder" />
                  <p className={captionClass}>{t(data.captionKey)}</p>
                  <ul role="list" className="grid gap-3 md:grid-cols-3">
                    {data.nodes.map((n) => (
                      <li key={n.id}>
                        <NodeBox node={n} vars={vars} />
                      </li>
                    ))}
                  </ul>
                </motion.li>
              </motion.ol>
            </div>
          </motion.li>
        </motion.ol>

        <div className="lg:col-span-4 lg:self-center">
          <Arrow operations className="lg:hidden" />
          <p className={captionClass}>{t(opsCaptionKey)}</p>
          <div className="relative">
            <span
              aria-hidden="true"
              data-connector="ops-link"
              className="absolute -left-6 top-1/2 hidden w-6 -translate-y-1/2 items-center lg:flex"
            >
              <ChevronLeft size={14} strokeWidth={2.5} className="-mr-1 flex-shrink-0 text-text-secondary" />
              <span className="block flex-1 border-t-2 border-dashed border-text-secondary" />
            </span>
            <motion.ul
              role="list"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid gap-3 md:grid-cols-3 lg:grid-cols-1 lg:border-l-2 lg:border-dashed lg:border-text-secondary lg:pl-4"
            >
              {opsNodes.map((n) => (
                <motion.li key={n.id} variants={fadeUp}>
                  <NodeBox node={n} vars={vars} ops />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      <figcaption className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-text-secondary">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 bg-accent" />
          {t('platform_legend_request')}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="w-6 border-t-2 border-dashed border-text-secondary" />
          {t('platform_legend_ops')}
        </span>
      </figcaption>
    </motion.figure>
  );
}
