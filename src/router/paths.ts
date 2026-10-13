export const paths = {
  home: '/',
  projects: '/projects',
  projectDetail: '/projects/:slug',
  about: '/about',
  contact: '/contact',
  cv: '/cv',
  privacyPolicy: '/privacy-policy',
} as const;

export function projectDetailPath(slug: string) {
  return `/projects/${slug}`;
}

export type Lang = 'es' | 'en';

const EN_PREFIX = '/en';

/** Spanish is the unprefixed default; only `/en` and `/en/...` are English ("/english" is not). */
export function langFromPath(pathname: string): Lang {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : 'es';
}

export function stripLang(pathname: string): string {
  if (langFromPath(pathname) === 'es') return pathname;
  const rest = pathname.slice(EN_PREFIX.length);
  return rest === '' || rest === '/' ? '/' : rest;
}

export function localizePath(path: string, lang: Lang): string {
  const bare = stripLang(path);
  if (lang === 'es') return bare;
  return bare === '/' ? EN_PREFIX : `${EN_PREFIX}${bare}`;
}
