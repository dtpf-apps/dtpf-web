import { describe, it, expect } from 'vitest';
import { projects } from '../../src/config/projects';
import { paths } from '../../src/router/paths';
import {
  FIXED_PAGES,
  buildRoutes,
  extractSlugs,
  readProjectSlugs,
  routeFile,
} from '../../scripts/postbuild/routes.mjs';

describe('postbuild routes', () => {
  it('extracts exactly the slugs of src/config/projects.ts, in order', () => {
    expect(readProjectSlugs()).toEqual(projects.map((p) => p.slug));
  });

  it('refuses a source it cannot read slugs from', () => {
    expect(() => extractSlugs('export const projects = [];')).toThrow(/No project slugs/);
  });

  it('keeps the fixed pages equal to the router paths', () => {
    const fixed = FIXED_PAGES.map((p: { path: string }) => p.path).sort();
    const router = [
      paths.home,
      paths.projects,
      paths.about,
      paths.contact,
      paths.cv,
      paths.privacyPolicy,
    ].sort();
    expect(fixed).toEqual(router);
  });

  it('lists one Spanish and one English entry per page', () => {
    const routes = buildRoutes();
    const keys = new Set(routes.map((r: { key: string }) => r.key));
    expect(keys.size).toBe(FIXED_PAGES.length + projects.length);
    expect(routes).toHaveLength(keys.size * 2);
    for (const key of keys) {
      const langs = routes.filter((r: { key: string }) => r.key === key).map((r: { lang: string }) => r.lang);
      expect(langs.sort()).toEqual(['en', 'es']);
    }
  });

  it('maps home and privacy in both languages', () => {
    const paths = buildRoutes().map((r: { path: string }) => r.path);
    expect(paths).toEqual(expect.arrayContaining(['/', '/en', '/privacy-policy', '/en/privacy-policy']));
    expect(paths).toContain(`/en/projects/${projects[0].slug}`);
  });

  it('lists the CV in both languages', () => {
    const routes = buildRoutes();
    expect(
      routes.filter((r: { key: string }) => r.key === 'cv').map((r: { path: string }) => r.path)
    ).toEqual(['/cv', '/en/cv']);
  });

  it('counts six fixed pages and one per project, twice', () => {
    expect(FIXED_PAGES).toHaveLength(6);
    expect(buildRoutes()).toHaveLength((6 + projects.length) * 2);
  });

  it('writes each route to its own index.html', () => {
    expect(routeFile('/')).toBe('index.html');
    expect(routeFile('/en')).toBe('en/index.html');
    expect(routeFile('/en/projects/dauth')).toBe('en/projects/dauth/index.html');
  });
});
