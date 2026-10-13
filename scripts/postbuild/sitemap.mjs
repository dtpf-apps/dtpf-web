import { localize } from './routes.mjs';

export const SITE_ORIGIN = 'https://dtpf.es';

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Language-neutral path of a route (`/en/about` -> `/about`). */
function barePath(route) {
  if (route.lang === 'es') return route.path;
  return route.path === '/en' ? '/' : route.path.slice('/en'.length);
}

/**
 * Every page is listed once per language with its alternates; a Spanish-only page is listed once
 * with no alternates, matching the head tags its own `<Seo>` emits. No `lastmod`: the build time
 * says nothing about when a page's content changed.
 */
export function buildSitemap(routes, origin = SITE_ORIGIN) {
  const abs = (path) => `${origin}${path}`;
  const entries = [];
  for (const route of routes) {
    if (route.esOnly && route.lang === 'en') continue;
    const bare = barePath(route);
    const alternates = route.esOnly
      ? ''
      : [
          ['es', abs(localize(bare, 'es'))],
          ['en', abs(localize(bare, 'en'))],
          ['x-default', abs(localize(bare, 'es'))],
        ]
          .map(
            ([hreflang, href]) =>
              `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}"/>\n`
          )
          .join('');
    entries.push(`  <url>\n    <loc>${escapeXml(abs(route.path))}</loc>\n${alternates}  </url>\n`);
  }
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entries.join('') +
    '</urlset>\n'
  );
}

/** Absolute URLs listed as `<loc>` in a sitemap document. */
export function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

/** The route paths the sitemap is expected to list. */
export function expectedSitemapPaths(routes) {
  return routes.filter((r) => !(r.esOnly && r.lang === 'en')).map((r) => r.path);
}
