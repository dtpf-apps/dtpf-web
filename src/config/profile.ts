/**
 * Career data shown on both the About page and the printable CV. Kept in one place so the two
 * pages can never disagree about a role or a tool; every text is an i18n key except tool names,
 * which are product names and stay as written.
 */
export interface ExperienceEntry {
  roleKey: string;
  companyKey: string;
  periodKey: string;
  descKey: string;
}

export interface ToolGroup {
  titleKey: string;
  items: string[];
}

export const experience: ExperienceEntry[] = [
  {
    roleKey: 'exp_storaia_role',
    companyKey: 'exp_storaia_company',
    periodKey: 'exp_storaia_period',
    descKey: 'exp_storaia_desc',
  },
  {
    roleKey: 'exp_palmira_role',
    companyKey: 'exp_palmira_company',
    periodKey: 'exp_palmira_period',
    descKey: 'exp_palmira_desc',
  },
  {
    roleKey: 'exp_assembler_role',
    companyKey: 'exp_assembler_company',
    periodKey: 'exp_assembler_period',
    descKey: 'exp_assembler_desc',
  },
];

export const tools: ToolGroup[] = [
  {
    titleKey: 'about_tools_frontend',
    items: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    titleKey: 'about_tools_backend',
    items: ['Node.js', 'Express', 'NestJS', 'MongoDB', 'REST APIs', 'WebSockets'],
  },
  {
    titleKey: 'about_tools_platform',
    items: ['Proxmox', 'Docker', 'PM2', 'GitHub Actions', 'Gitea Actions', 'Cloudflare', 'Grafana + Loki'],
  },
  {
    titleKey: 'about_tools_ai',
    items: ['Claude Code', 'Claude API + MCP', 'Whisper', 'pyannote', 'llama.cpp'],
  },
  {
    titleKey: 'about_tools_quality',
    items: ['Vitest', 'Jest', 'Playwright', 'Testing Library', 'Prettier', 'ESLint'],
  },
];
