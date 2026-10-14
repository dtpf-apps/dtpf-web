import fs from 'node:fs';
import path from 'node:path';
import { projects } from '../../src/config/projects';
import { es } from '../../src/assets/locale/es';
import { en } from '../../src/assets/locale/en';
import { facts } from '../../src/config/facts';

describe('projects config', () => {
  it('lists the eight projects in the agreed order', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'dcompany',
      'dauth',
      'dinventory',
      'dalist',
      'airam',
      'dstash',
      'dwealth',
      'audity',
    ]);
  });

  it('each project has required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.nameKey).toBeTruthy();
      expect(p.taglineKey).toBeTruthy();
      expect(p.descKey).toBeTruthy();
      expect(p.urlKey).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('features exactly the first four projects on the home grid', () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured).toHaveLength(4);
    expect(featured).toEqual(projects.slice(0, 4));
  });

  it('every featured project has a live URL and a featured blurb', () => {
    for (const p of projects.filter((p) => p.featured)) {
      expect(p.liveUrl, p.slug).toMatch(/^https:\/\//);
      expect(p.featuredKey, p.slug).toBeDefined();
    }
  });

  it('only private projects lack a live URL', () => {
    const withoutUrl = projects.filter((p) => !p.liveUrl).map((p) => p.slug);
    const privateOnes = projects.filter((p) => p.status === 'private').map((p) => p.slug);
    expect(withoutUrl).toEqual(privateOnes);
    for (const p of projects.filter((p) => p.liveUrl)) {
      expect(p.liveUrl, p.slug).toMatch(/^https:\/\//);
    }
  });

  it('all live URLs are unique', () => {
    const urls = projects.map((p) => p.liveUrl).filter(Boolean);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('is not its own project card — the portfolio lives in the footer', () => {
    expect(projects.find((p) => p.slug === 'dtpf')).toBeUndefined();
  });

  it('dauth has metrics and case study', () => {
    const dauth = projects.find((p) => p.slug === 'dauth');
    expect(dauth?.metrics?.length).toBeGreaterThan(0);
    expect(dauth?.caseStudy).toBeDefined();
  });

  it('has every case-study key in both locales', () => {
    for (const p of projects) {
      for (const key of Object.values(p.caseStudy ?? {})) {
        expect((es as Record<string, string>)[key], key).toBeTruthy();
        expect((en as Record<string, string>)[key], key).toBeTruthy();
      }
    }
  });

  it('all slugs are lowercase alphanumeric', () => {
    for (const p of projects) {
      expect(p.slug).toMatch(/^[a-z0-9]+$/);
    }
  });

  it('never renders an unmeasured version in a stack tag', () => {
    for (const p of projects) {
      for (const s of p.stack) {
        expect(typeof s).toBe('string');
        expect(s, `${p.slug} stack`).not.toMatch(/undefined|NaN/);
      }
    }
  });

  it('shows the dcompany MCP tool count floored to the ten with a plus', () => {
    const dcompany = projects.find((p) => p.slug === 'dcompany')!;
    const tools = dcompany.metrics!.find((m) => m.labelKey === 'tools');
    const measured = facts.projects.dcompany.mcpTools!;
    expect(tools?.value).toBe(`${Math.floor(measured / 10) * 10}+`);
  });

  it('links dalist to its Google Play listing', () => {
    const dalist = projects.find((p) => p.slug === 'dalist')!;
    expect(dalist.storeUrl).toBe('https://play.google.com/store/apps/details?id=es.dtpf.dalist');
  });

  describe('media', () => {
    const withMedia = ['dcompany', 'dauth', 'dalist', 'airam', 'dstash'];

    it('exists exactly for the projects that have screenshots', () => {
      const slugsWithMedia = projects.filter((p) => p.media).map((p) => p.slug);
      expect(slugsWithMedia.sort()).toEqual([...withMedia].sort());
      for (const p of projects.filter((p) => p.media)) {
        expect(p.media?.length, p.slug).toBeGreaterThan(0);
      }
    });

    it('points at webp files that exist under public, inside the project folder', () => {
      for (const p of projects) {
        for (const m of p.media ?? []) {
          expect(m.src, p.slug).toMatch(new RegExp(`^/projects/${p.slug}/[a-z0-9-]+\\.webp$`));
          expect(fs.existsSync(path.join(__dirname, '../../public', m.src)), m.src).toBe(true);
          expect(m.width, m.src).toBeGreaterThan(0);
          expect(m.height, m.src).toBeGreaterThan(0);
        }
      }
    });

    it('has an alt text in both locales for every image', () => {
      for (const p of projects) {
        for (const m of p.media ?? []) {
          expect((es as Record<string, string>)[m.altKey], m.altKey).toBeTruthy();
          expect((en as Record<string, string>)[m.altKey], m.altKey).toBeTruthy();
        }
      }
    });
  });

  it('every status with a note has its own key', () => {
    for (const p of projects.filter((p) => p.status === 'beta' || p.status === 'private')) {
      expect(p.statusNoteKey, p.slug).toBeDefined();
    }
  });
});
