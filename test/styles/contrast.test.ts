import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// WCAG 2.x relative luminance and contrast ratio over the hex tokens of portfolio.css.
// The tokens are the only place a colour is chosen, so measuring them here keeps every
// accent button and small accent label at AA in both themes and in the printed CV.

type Tokens = Record<string, string>;

const css = readFileSync('src/styles/portfolio.css', 'utf8');

function block(start: RegExp): Tokens {
  const from = css.search(start);
  if (from < 0) throw new Error(`block not found: ${start}`);
  const body = css.slice(from, css.indexOf('\n}', from));
  const tokens: Tokens = {};
  for (const m of body.matchAll(/--color-([a-z-]+):\s*(#[0-9a-f]{6})\b/gi)) tokens[m[1]] = m[2].toLowerCase();
  return tokens;
}

const dark = block(/^@theme \{/m);
const light = { ...dark, ...block(/^\.light \{/m) };
// The CV prints from the light theme; the print block overrides on top of it.
const print = { ...light, ...block(/^ {2}:root:root \{/m) };

function luminance(hex: string): number {
  const channel = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [1, 3, 5].map((i) => channel(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const AA_TEXT = 4.5;

describe.each([
  ['dark', dark],
  ['light', light],
  ['print', print],
])('%s theme tokens', (_name, t) => {
  it('defines every token the pairs below depend on', () => {
    for (const key of [
      'bg-primary',
      'bg-surface',
      'text-primary',
      'text-secondary',
      'accent',
      'accent-hover',
      'on-accent',
    ]) {
      expect(t[key], key).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it.each([
    ['accent', 'bg-primary'],
    ['accent', 'bg-surface'],
    ['on-accent', 'accent'],
    ['on-accent', 'accent-hover'],
    ['text-secondary', 'bg-primary'],
    ['text-secondary', 'bg-surface'],
    ['text-primary', 'bg-primary'],
  ])('%s on %s reads at AA for normal text', (fg, bg) => {
    expect(contrast(t[fg], t[bg])).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

describe('the instrument', () => {
  it('flags the light accent the site shipped until 0.6.23 (teal 600 on the light background)', () => {
    expect(contrast('#0d9488', light['bg-primary'])).toBeLessThan(AA_TEXT);
  });

  it('reproduces the reference pairs of the WCAG formula', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrast('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
  });
});
