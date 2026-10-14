import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Plain Node cannot resolve the `src/` path aliases, so the fixed paths are repeated here (a test
// ties them to `src/router/paths.ts`) and the project slugs are read out of the config source.
export const FIXED_PAGES = [
  { key: 'home', path: '/' },
  { key: 'projects', path: '/projects' },
  { key: 'platform', path: '/platform' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
  { key: 'cv', path: '/cv' },
  // The privacy page exists in both languages, but its content and canonical are Spanish only.
  { key: 'privacy-policy', path: '/privacy-policy', esOnly: true },
];

export const LANGS = ['es', 'en'];

// Relative to the package root, like `dist/`: every entry point runs from there (pnpm scripts, CI).
const PROJECTS_SOURCE = resolve('src/config/projects.ts');

/** Strict on purpose: a slug the pattern does not recognise must fail loudly, not vanish from the site. */
export function extractSlugs(source) {
  const slugs = [...source.matchAll(/^\s*slug:\s*'([a-z0-9-]+)',\s*$/gm)].map((m) => m[1]);
  if (slugs.length === 0) throw new Error('No project slugs found in src/config/projects.ts');
  return slugs;
}

export function readProjectSlugs() {
  return extractSlugs(readFileSync(PROJECTS_SOURCE, 'utf8'));
}

export function localize(path, lang) {
  if (lang === 'es') return path;
  return path === '/' ? '/en' : `/en${path}`;
}

/**
 * One entry per page and language: `{ path, lang, key, esOnly }`. A new page (the CV) is one more
 * entry in `pages`.
 */
export function buildRoutes(slugs = readProjectSlugs(), pages = FIXED_PAGES) {
  const all = [
    ...pages,
    ...slugs.map((slug) => ({ key: `project-${slug}`, path: `/projects/${slug}`, slug })),
  ];
  return all.flatMap((page) =>
    LANGS.map((lang) => ({
      path: localize(page.path, lang),
      lang,
      key: page.key,
      esOnly: Boolean(page.esOnly),
    }))
  );
}

/** `dist`-relative file a route's HTML is written to. */
export function routeFile(path) {
  return path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
}
