import { facts, roundDownToTen, type ProjectVersions } from './facts';

export interface ProjectMetric {
  labelKey: string;
  /** A literal (brand names, numbers) or, via `valueKey`, a translated phrase. */
  value?: string | number;
  valueKey?: string;
}

/**
 * How a project is reachable, which decides its badge and whether it has a visit link:
 * `production` answers on a public URL; `beta` answers publicly but access is granted on
 * request; `client` is work delivered for a brand; `private` has no public URL at all.
 */
export type ProjectStatus = 'production' | 'beta' | 'client' | 'private';

export interface Project {
  slug: string;
  nameKey: string;
  taglineKey: string;
  /** Longer tagline for the detail page header; the detail page falls back to `taglineKey`. */
  taglineLongKey?: string;
  descKey: string;
  featuredKey?: string;
  /** One of the four cards on the home bento grid, in array order. */
  featured?: boolean;
  status: ProjectStatus;
  /** One line under the detail title: how the project is accessed today. */
  statusNoteKey?: string;
  urlKey: string;
  /** Absent for private apps: there is nothing a visitor can open. */
  liveUrl?: string;
  storeUrl?: string;
  githubUrl?: string;
  stack: string[];
  metrics?: ProjectMetric[];
  problemKey?: string;
  solutionKey?: string;
  resultKey?: string;
}

/** The MERN-style stack every first-party app shares, with the versions measured in facts.json. */
function fullStack(versions: ProjectVersions, ci: string, extras: string[]): string[] {
  return [
    `React ${versions.react}`,
    `TypeScript ${versions.typescript}`,
    `Node.js ${versions.node}`,
    `Express ${versions.express}`,
    `MongoDB ${versions.mongodb}`,
    `Tailwind CSS v${versions.tailwind}`,
    ...extras,
    `Vite ${versions.vite}`,
    ci,
  ];
}

const dcompany = facts.projects.dcompany;
const dauth = facts.projects.dauth;
const dinventory = facts.projects.dinventory;
const dalist = facts.projects.dalist;
const airam = facts.projects.airam;
const dstash = facts.projects.dstash;
const dwealth = facts.projects.dwealth;
const audity = facts.projects.audity;

/** "280+" from the measured tool count: floored to the ten so the live catalogue never undercuts it. */
const mcpToolsFigure = dcompany.mcpTools !== undefined ? `${roundDownToTen(dcompany.mcpTools)}+` : undefined;

export const projects: Project[] = [
  {
    slug: 'dcompany',
    nameKey: 'project_dcompany_name',
    taglineKey: 'project_dcompany_tagline',
    descKey: 'project_dcompany_desc',
    featuredKey: 'project_dcompany_featured',
    featured: true,
    status: 'beta',
    statusNoteKey: 'project_dcompany_status',
    urlKey: 'project_dcompany_url',
    liveUrl: 'https://dcompany.tech',
    stack: fullStack(dcompany.versions, dcompany.ci, [
      'MCP',
      'Stripe',
      'LXC / Proxmox',
      'podman + Trivy + Cosign',
    ]),
    metrics: [
      { labelKey: 'tests', value: dcompany.tests.total },
      ...(mcpToolsFigure ? [{ labelKey: 'tools', value: mcpToolsFigure }] : []),
      { labelKey: 'isolation', valueKey: 'metric_isolation_tenant' },
      { labelKey: 'billing', value: 'Stripe' },
      { labelKey: 'deploy', value: dcompany.ci },
    ],
    problemKey: 'project_dcompany_problem',
    solutionKey: 'project_dcompany_solution',
    resultKey: 'project_dcompany_result',
  },
  {
    slug: 'dauth',
    nameKey: 'project_dauth_name',
    taglineKey: 'project_dauth_tagline',
    taglineLongKey: 'project_dauth_tagline_long',
    descKey: 'project_dauth_desc',
    featuredKey: 'project_dauth_featured',
    featured: true,
    status: 'production',
    urlKey: 'project_dauth_url',
    liveUrl: 'https://dauth.ovh',
    stack: fullStack(dauth.versions, dauth.ci, ['WebAuthn']),
    metrics: [
      { labelKey: 'tenants', value: facts.dauthTenants },
      { labelKey: 'tests', value: dauth.tests.total },
      { labelKey: 'auth', value: 'Passwordless' },
      { labelKey: 'monitoring', value: 'Grafana + Loki' },
      { labelKey: 'deploy', value: dauth.ci },
    ],
    problemKey: 'project_dauth_problem',
    solutionKey: 'project_dauth_solution',
    resultKey: 'project_dauth_result',
  },
  {
    slug: 'dinventory',
    nameKey: 'project_dinventory_name',
    taglineKey: 'project_dinventory_tagline',
    descKey: 'project_dinventory_desc',
    featuredKey: 'project_dinventory_featured',
    featured: true,
    status: 'production',
    urlKey: 'project_dinventory_url',
    liveUrl: 'https://dinventory.dtpf.es',
    stack: fullStack(dinventory.versions, dinventory.ci, ['dauth', 'dstash', 'Whisper', 'WebXR']),
    metrics: [
      { labelKey: 'tests', value: dinventory.tests.total },
      { labelKey: 'ai', valueKey: 'metric_ai_self_hosted' },
      { labelKey: 'auth', value: 'dauth' },
      { labelKey: 'media', value: 'dstash' },
      { labelKey: 'target', valueKey: 'metric_mobile_first' },
      { labelKey: 'deploy', value: dinventory.ci },
    ],
    problemKey: 'project_dinventory_problem',
    solutionKey: 'project_dinventory_solution',
    resultKey: 'project_dinventory_result',
  },
  {
    slug: 'dalist',
    nameKey: 'project_dalist_name',
    taglineKey: 'project_dalist_tagline',
    descKey: 'project_dalist_desc',
    featuredKey: 'project_dalist_featured',
    featured: true,
    status: 'production',
    urlKey: 'project_dalist_url',
    liveUrl: 'https://dalist.dtpf.es',
    storeUrl: 'https://play.google.com/store/apps/details?id=es.dtpf.dalist',
    stack: fullStack(dalist.versions, dalist.ci, [
      'Socket.io',
      'PWA',
      'Capacitor',
      'Whisper',
      'Framer Motion',
      'dnd-kit',
    ]),
    metrics: [
      { labelKey: 'tests', value: dalist.tests.total },
      { labelKey: 'realtime', value: 'Socket.io' },
      { labelKey: 'encryption', valueKey: 'metric_encryption_at_rest' },
      { labelKey: 'store', value: 'Google Play' },
      { labelKey: 'deploy', value: dalist.ci },
    ],
    problemKey: 'project_dalist_problem',
    solutionKey: 'project_dalist_solution',
    resultKey: 'project_dalist_result',
  },
  {
    slug: 'airam',
    nameKey: 'project_airam_name',
    taglineKey: 'project_airam_tagline',
    descKey: 'project_airam_desc',
    status: 'client',
    urlKey: 'project_airam_url',
    liveUrl: 'https://petitairam.com',
    stack: fullStack(airam.versions, airam.ci, ['dauth', 'dstash']),
    metrics: [
      { labelKey: 'tests', value: airam.tests.total },
      { labelKey: 'brand', value: 'AIRAM' },
      { labelKey: 'payments', valueKey: 'metric_payments_bizum' },
      { labelKey: 'cms', valueKey: 'metric_cms_sections' },
      { labelKey: 'deploy', value: airam.ci },
    ],
    problemKey: 'project_airam_problem',
    solutionKey: 'project_airam_solution',
    resultKey: 'project_airam_result',
  },
  {
    slug: 'dstash',
    nameKey: 'project_dstash_name',
    taglineKey: 'project_dstash_tagline',
    descKey: 'project_dstash_desc',
    status: 'production',
    urlKey: 'project_dstash_url',
    liveUrl: 'https://dstash.dtpf.es',
    stack: fullStack(dstash.versions, dstash.ci, ['Radix UI']),
    metrics: [
      { labelKey: 'tests', value: dstash.tests.total },
      { labelKey: 'security', value: 'Signed URLs + API Keys' },
      { labelKey: 'admin', valueKey: 'metric_admin_full' },
      { labelKey: 'deploy', value: dstash.ci },
    ],
    problemKey: 'project_dstash_problem',
    solutionKey: 'project_dstash_solution',
    resultKey: 'project_dstash_result',
  },
  {
    slug: 'dwealth',
    nameKey: 'project_dwealth_name',
    taglineKey: 'project_dwealth_tagline',
    descKey: 'project_dwealth_desc',
    status: 'private',
    statusNoteKey: 'project_dwealth_status',
    urlKey: 'project_dwealth_url',
    stack: fullStack(dwealth.versions, dwealth.ci, ['Decimal128', 'dauth']),
    metrics: [
      { labelKey: 'tests', value: dwealth.tests.total },
      { labelKey: 'precision', value: 'Decimal128' },
      { labelKey: 'fx', value: 'Original + FX' },
      { labelKey: 'tax', value: 'FIFO' },
      { labelKey: 'deploy', value: dwealth.ci },
    ],
    problemKey: 'project_dwealth_problem',
    solutionKey: 'project_dwealth_solution',
    resultKey: 'project_dwealth_result',
  },
  {
    slug: 'audity',
    nameKey: 'project_audity_name',
    taglineKey: 'project_audity_tagline',
    descKey: 'project_audity_desc',
    status: 'production',
    urlKey: 'project_audity_url',
    liveUrl: 'https://audity.dtpf.es',
    stack: ['React', 'TypeScript', 'Node.js', 'Auth0', 'PWA', audity.ci],
    metrics: [
      { labelKey: 'tests', value: audity.tests.total },
      { labelKey: 'auth', value: 'Auth0' },
      { labelKey: 'origin', valueKey: 'metric_masters_project' },
      { labelKey: 'deploy', value: audity.ci },
    ],
  },
];
