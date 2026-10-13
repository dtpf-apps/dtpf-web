import {
  SITE_URL,
  AUTHOR,
  ogImagePath,
  canonicalUrl,
  serializeJsonLd,
  personJsonLd,
  softwareJsonLd,
} from '../../src/config/site';

describe('site constants', () => {
  it('uses the apex host as the canonical origin, without a trailing slash', () => {
    expect(SITE_URL).toBe('https://dtpf.es');
  });

  it('carries only the public author links', () => {
    expect(AUTHOR.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
    expect(AUTHOR.github).toBe('https://github.com/DTPF');
  });
});

describe('ogImagePath', () => {
  it('is a pure path convention per language and key', () => {
    expect(ogImagePath('es', 'home')).toBe('/og/es/home.png');
    expect(ogImagePath('en', 'project-dauth')).toBe('/og/en/project-dauth.png');
  });
});

describe('canonicalUrl', () => {
  it('maps the Spanish home to the origin root and the English home to /en', () => {
    expect(canonicalUrl('/', 'es')).toBe('https://dtpf.es/');
    expect(canonicalUrl('/en', 'en')).toBe('https://dtpf.es/en');
  });

  it('re-localizes whatever prefix the current path carries', () => {
    expect(canonicalUrl('/en/about', 'es')).toBe('https://dtpf.es/about');
    expect(canonicalUrl('/about', 'en')).toBe('https://dtpf.es/en/about');
  });

  it('ignores a trailing slash', () => {
    expect(canonicalUrl('/en/about/', 'en')).toBe('https://dtpf.es/en/about');
  });
});

describe('serializeJsonLd', () => {
  it('escapes "<" so a value cannot close the script element', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>');
  });
});

describe('structured data builders', () => {
  it('describes the person with the public profiles', () => {
    const p = personJsonLd('en') as Record<string, unknown>;
    expect(p['@type']).toBe('Person');
    expect(p.name).toBe(AUTHOR.name);
    expect(p.sameAs).toEqual([AUTHOR.linkedin, AUTHOR.github]);
    expect(p.url).toBe('https://dtpf.es/en');
  });

  it('describes a project as a web application authored by the person', () => {
    const s = softwareJsonLd({ name: 'dauth', description: 'Auth', url: 'https://dauth.es' }) as Record<
      string,
      unknown
    >;
    expect(s['@type']).toBe('SoftwareApplication');
    expect(s.applicationCategory).toBe('WebApplication');
    expect(s.operatingSystem).toBe('Web');
    expect(s.url).toBe('https://dauth.es');
    expect((s.author as Record<string, unknown>)['@type']).toBe('Person');
  });

  it('omits url for a private project and reports Android for a Play listing', () => {
    const priv = softwareJsonLd({ name: 'dwealth', description: 'x' }) as Record<string, unknown>;
    expect('url' in priv).toBe(false);
    const play = softwareJsonLd({ name: 'dalist', description: 'x', android: true }) as Record<
      string,
      unknown
    >;
    expect(play.operatingSystem).toBe('Android');
  });
});
