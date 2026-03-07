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
  metrics?: { labelKey: string; label: string; value: string }[];
  problemKey?: string;
  solutionKey?: string;
  resultKey?: string;
}

export const projects: Project[] = [
  {
    slug: 'dauth',
    nameKey: 'project_dauth_name',
    taglineKey: 'project_dauth_tagline',
    descKey: 'project_dauth_desc',
    featuredKey: 'project_dauth_featured',
    urlKey: 'project_dauth_url',
    liveUrl: 'https://dauth.ovh',
    stack: ['React 19', 'TypeScript 5.9', 'Node.js 22', 'Express 5', 'MongoDB 8', 'Tailwind CSS v4', 'WebAuthn', 'Vite 7', 'GitHub Actions'],
    metrics: [
      { labelKey: 'tenants', label: 'Tenants activos', value: '4' },
      { labelKey: 'tests', label: 'Tests', value: '854' },
      { labelKey: 'auth', label: 'Autenticacion', value: 'Passwordless' },
      { labelKey: 'monitoring', label: 'Monitoring', value: 'Grafana + Loki' },
      { labelKey: 'deploy', label: 'Deploy', value: 'GitHub Actions' },
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
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Drag & Drop'],
  },
  {
    slug: 'dalist',
    nameKey: 'project_dalist_name',
    taglineKey: 'project_dalist_tagline',
    descKey: 'project_dalist_desc',
    urlKey: 'project_dalist_url',
    liveUrl: 'https://dalist.dtpf.es',
    stack: ['React', 'TypeScript', 'PWA', 'Offline', 'IndexedDB'],
  },
  {
    slug: 'dtpf',
    nameKey: 'project_portfolio_name',
    taglineKey: 'project_portfolio_tagline',
    descKey: 'project_portfolio_desc',
    urlKey: 'project_portfolio_url',
    liveUrl: 'https://dtpf.es',
    stack: ['React 19', 'Tailwind CSS v4', 'Framer Motion', 'i18n'],
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
