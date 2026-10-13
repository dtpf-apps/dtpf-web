import { facts, type ProjectVersions } from './facts';

export interface ProjectMetric {
  labelKey: string;
  /** A literal (brand names, numbers) or, via `valueKey`, a translated phrase. */
  value?: string | number;
  valueKey?: string;
}

export interface Project {
  slug: string;
  nameKey: string;
  taglineKey: string;
  descKey: string;
  featuredKey?: string;
  urlKey: string;
  liveUrl: string;
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

const dauth = facts.projects.dauth;
const dstash = facts.projects.dstash;
const dalist = facts.projects.dalist;
const dtpf = facts.projects.dtpf;

export const projects: Project[] = [
  {
    slug: 'dauth',
    nameKey: 'project_dauth_name',
    taglineKey: 'project_dauth_tagline',
    descKey: 'project_dauth_desc',
    featuredKey: 'project_dauth_featured',
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
    slug: 'dstash',
    nameKey: 'project_dstash_name',
    taglineKey: 'project_dstash_tagline',
    descKey: 'project_dstash_desc',
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
    slug: 'dalist',
    nameKey: 'project_dalist_name',
    taglineKey: 'project_dalist_tagline',
    descKey: 'project_dalist_desc',
    urlKey: 'project_dalist_url',
    liveUrl: 'https://dalist.dtpf.es',
    stack: fullStack(dalist.versions, dalist.ci, ['Socket.io', 'PWA', 'Framer Motion', 'dnd-kit']),
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
    slug: 'dtpf',
    nameKey: 'project_portfolio_name',
    taglineKey: 'project_portfolio_tagline',
    descKey: 'project_portfolio_desc',
    urlKey: 'project_portfolio_url',
    liveUrl: 'https://dtpf.es',
    githubUrl: 'https://github.com/dtpf-apps/dtpf-web',
    stack: [
      `React ${dtpf.versions.react}`,
      `TypeScript ${dtpf.versions.typescript}`,
      `Tailwind CSS v${dtpf.versions.tailwind}`,
      'Framer Motion',
      'i18n',
      'PWA',
      `Vite ${dtpf.versions.vite}`,
      dtpf.ci,
    ],
  },
  {
    slug: 'audity',
    nameKey: 'project_audity_name',
    taglineKey: 'project_audity_tagline',
    descKey: 'project_audity_desc',
    urlKey: 'project_audity_url',
    liveUrl: 'https://audity.dtpf.es',
    stack: ['React', 'TypeScript', 'Node.js', 'Auth0', 'PWA'],
  },
];
