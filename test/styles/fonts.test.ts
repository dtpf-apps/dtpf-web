import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// The fonts are files of this repository: no request leaves the origin, and the build's PDF and
// social-card renders (which refuse third-party requests) get the same faces as the page.
const css = readFileSync('src/styles/portfolio.css', 'utf8');
const html = readFileSync('index.html', 'utf8');

const themeFamilies = [...css.matchAll(/--font-\w+:\s*'([^']+)'/g)].map((m) => m[1]);
const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
const faceFile = (body: string) => resolve('src/styles', /url\('([^']+)'\)/.exec(body)![1]);

describe('self-hosted fonts', () => {
  it('declares a face, backed by a woff2 file in the repo, for every family the theme names', () => {
    expect(themeFamilies).toEqual(['Inter', 'Space Grotesk', 'JetBrains Mono']);
    for (const family of themeFamilies) {
      const face = faces.find((body) => body.includes(`font-family: '${family}'`));
      expect(face, `no @font-face for ${family}`).toBeDefined();
      const file = faceFile(face!);
      expect(existsSync(file), `${file} is missing`).toBe(true);
      expect(readFileSync(file).subarray(0, 4).toString('latin1')).toBe('wOF2');
      expect(face).toMatch(/font-display:\s*swap/);
    }
  });

  it('loads nothing from a font host', () => {
    expect(html).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
    expect(html).not.toMatch(/rel="preconnect"/);
    for (const face of faces) expect(face).not.toMatch(/https?:\/\//);
  });

  it('preloads only files a face declares, as fonts and with crossorigin', () => {
    const preloads = [...html.matchAll(/<link\b[^>]*\brel="preload"[^>]*>/g)].map((m) => m[0]);
    expect(preloads.length).toBeGreaterThan(0);
    const declared = faces.map(faceFile);
    for (const tag of preloads) {
      const href = /\bhref="([^"]+)"/.exec(tag)![1];
      expect(tag).toMatch(/\bas="font"/);
      expect(tag).toMatch(/\btype="font\/woff2"/);
      expect(tag).toMatch(/\bcrossorigin\b/);
      expect(declared).toContain(resolve(href.replace(/^\//, '')));
    }
  });

  it('ships the Open Font License beside each family', () => {
    for (const name of ['inter', 'space-grotesk', 'jetbrains-mono']) {
      const text = readFileSync(`src/assets/fonts/OFL-${name}.txt`, 'utf8');
      expect(text).toContain('SIL OPEN FONT LICENSE');
    }
  });
});
