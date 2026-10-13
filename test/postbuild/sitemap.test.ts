import { describe, it, expect } from 'vitest';
import { SITE_URL } from '../../src/config/site';
import { buildRoutes } from '../../scripts/postbuild/routes.mjs';
import {
  buildSitemap,
  expectedSitemapPaths,
  sitemapLocs,
  SITE_ORIGIN,
} from '../../scripts/postbuild/sitemap.mjs';

const routes = buildRoutes(['dauth']);
const xml = buildSitemap(routes);

describe('sitemap', () => {
  it('uses the canonical origin of the site config', () => {
    expect(SITE_ORIGIN).toBe(SITE_URL);
  });

  it('is well-formed: declared namespaces, balanced url elements, no lastmod', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(xml.match(/<url>/g)?.length).toBe(xml.match(/<\/url>/g)?.length);
    expect(xml).not.toContain('lastmod');
    expect(xml.endsWith('</urlset>\n')).toBe(true);
  });

  it('lists every expected route, and the privacy page only in Spanish', () => {
    const locs = sitemapLocs(xml);
    expect(locs).toEqual(expectedSitemapPaths(routes).map((p: string) => `${SITE_URL}${p}`));
    expect(locs).toContain(`${SITE_URL}/privacy-policy`);
    expect(locs).not.toContain(`${SITE_URL}/en/privacy-policy`);
    expect(locs).toContain(`${SITE_URL}/en`);
  });

  it('declares es, en and x-default (-> es) alternates for a translated page', () => {
    const block = xml.slice(xml.indexOf(`<loc>${SITE_URL}/en/about</loc>`));
    const entry = block.slice(0, block.indexOf('</url>'));
    expect(entry).toContain(`hreflang="es" href="${SITE_URL}/about"`);
    expect(entry).toContain(`hreflang="en" href="${SITE_URL}/en/about"`);
    expect(entry).toContain(`hreflang="x-default" href="${SITE_URL}/about"`);
  });

  it('gives the Spanish-only page no alternates', () => {
    const start = xml.indexOf(`<loc>${SITE_URL}/privacy-policy</loc>`);
    const entry = xml.slice(start, xml.indexOf('</url>', start));
    expect(entry).not.toContain('xhtml:link');
  });
});
