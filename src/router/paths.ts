export const paths = {
  home: '/',
  projects: '/projects',
  projectDetail: '/projects/:slug',
  about: '/about',
  contact: '/contact',
  privacyPolicy: '/privacy-policy',
} as const;

export function projectDetailPath(slug: string) {
  return `/projects/${slug}`;
}
