import {
  allDiagramNodes,
  clusterFrameKey,
  clusterTiers,
  opsCaptionKey,
  platformCards,
  platformFigures,
} from '../../src/config/platform';
import { platformVars } from '../../src/config/facts';
import { projects } from '../../src/config/projects';
import { es } from '../../src/assets/locale/es';
import { en } from '../../src/assets/locale/en';

// What the page must never publish: an IPv4 address, a CT/VM number, an internal hostname suffix
// or a shell invocation. Shared in spirit with test/pages/Platform.test.tsx.
const INVENTORY = /\b\d{1,3}(?:\.\d{1,3}){3}\b|\b(?:CT|VM) ?\d{3}\b|\.(?:lan|local|internal)\b|\bssh /i;

/** Every string stored under a property named `*Key`, anywhere in plain objects and arrays. */
function collectKeys(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) {
    value.forEach((v) => collectKeys(v, out));
  } else if (value && typeof value === 'object' && !('$$typeof' in value)) {
    for (const [prop, v] of Object.entries(value)) {
      // `varKey` names a platformVars() variable, not a locale key.
      if (typeof v === 'string' && prop.endsWith('Key') && prop !== 'varKey') out.push(v);
      else collectKeys(v, out);
    }
  }
  return out;
}

describe('platform config', () => {
  const referenced = [
    ...collectKeys([allDiagramNodes, clusterTiers, platformCards, platformFigures]),
    clusterFrameKey,
    opsCaptionKey,
  ];

  it('references locale keys, and every one exists in Spanish and English', () => {
    expect(referenced.length).toBeGreaterThan(30);
    for (const key of referenced) {
      expect(es, `es.${key}`).toHaveProperty(key);
      expect(en, `en.${key}`).toHaveProperty(key);
    }
  });

  it('points every "used by" link at a real project', () => {
    const slugs = projects.map((p) => p.slug);
    const used = platformCards.flatMap((c) => c.usedBy ?? []);
    expect(used.length).toBeGreaterThan(0);
    for (const slug of used) expect(slugs).toContain(slug);
  });

  it('reads every figure from a variable platformVars() provides', () => {
    const vars = platformVars('en');
    for (const f of platformFigures) expect(vars, f.varKey).toHaveProperty(f.varKey);
  });

  it('keeps node ids unique', () => {
    const ids = allDiagramNodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('publishes architecture, not inventory: no platform string matches the inventory pattern', () => {
    // Positive control: the same pattern does catch what it is meant to catch.
    for (const leak of ['10.5.0.102', 'CT 356', 'VM101', 'host.internal', 'ssh root']) {
      expect(leak, leak).toMatch(INVENTORY);
    }
    const strings = [
      ...Object.entries(es).filter(([k]) => k.startsWith('platform_') || k === 'seo_desc_platform'),
      ...Object.entries(en).filter(([k]) => k.startsWith('platform_') || k === 'seo_desc_platform'),
    ];
    expect(strings.length).toBeGreaterThan(100);
    for (const [key, value] of strings) expect(value, key).not.toMatch(INVENTORY);
  });

  it('types no figure into the copy: platform strings carry placeholders, not digits', () => {
    for (const [key, value] of [...Object.entries(es), ...Object.entries(en)]) {
      if (!key.startsWith('platform_')) continue;
      // PM2 is a product name, the only digit a proper noun brings in.
      expect(value.replace(/\{\{\w+\}\}|PM2/g, ''), key).not.toMatch(/\d/);
    }
  });
});
