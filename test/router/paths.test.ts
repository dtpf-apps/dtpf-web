import { paths, projectDetailPath, langFromPath, stripLang, localizePath } from '../../src/router/paths';

describe('language in the URL', () => {
  it('reads the language from the path prefix, Spanish being the unprefixed default', () => {
    expect(langFromPath('/')).toBe('es');
    expect(langFromPath('/about')).toBe('es');
    expect(langFromPath('/en')).toBe('en');
    expect(langFromPath('/en/')).toBe('en');
    expect(langFromPath('/en/projects/dauth')).toBe('en');
  });

  it('does not mistake a path that merely starts with "en" for the English prefix', () => {
    expect(langFromPath('/enigma')).toBe('es');
    expect(langFromPath('/english/about')).toBe('es');
  });

  it('strips the prefix and returns the root for the bare English home', () => {
    expect(stripLang('/en')).toBe('/');
    expect(stripLang('/en/')).toBe('/');
    expect(stripLang('/en/about')).toBe('/about');
    expect(stripLang('/about')).toBe('/about');
    expect(stripLang('/')).toBe('/');
  });

  it('localizes a path: English gets /en, the home is /en without a trailing slash', () => {
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/about', 'en')).toBe('/en/about');
    expect(localizePath('/projects/:slug', 'en')).toBe('/en/projects/:slug');
    expect(localizePath('/', 'es')).toBe('/');
    expect(localizePath('/about', 'es')).toBe('/about');
  });

  it('is idempotent and round-trips through stripLang', () => {
    expect(localizePath('/en/about', 'en')).toBe('/en/about');
    expect(localizePath('/en/about', 'es')).toBe('/about');
    expect(localizePath(stripLang('/en/contact'), 'en')).toBe('/en/contact');
  });
});

describe('paths', () => {
  it('defines all required route paths', () => {
    expect(paths.home).toBe('/');
    expect(paths.projects).toBe('/projects');
    expect(paths.projectDetail).toBe('/projects/:slug');
    expect(paths.about).toBe('/about');
    expect(paths.contact).toBe('/contact');
    expect(paths.privacyPolicy).toBe('/privacy-policy');
  });

  it('paths object is frozen (readonly)', () => {
    // Ensure all values are strings
    for (const value of Object.values(paths)) {
      expect(typeof value).toBe('string');
    }
  });
});

describe('projectDetailPath', () => {
  it('builds correct path from slug', () => {
    expect(projectDetailPath('dauth')).toBe('/projects/dauth');
    expect(projectDetailPath('dstash')).toBe('/projects/dstash');
    expect(projectDetailPath('audity')).toBe('/projects/audity');
  });

  it('handles slugs with special characters', () => {
    expect(projectDetailPath('my-project')).toBe('/projects/my-project');
  });
});
