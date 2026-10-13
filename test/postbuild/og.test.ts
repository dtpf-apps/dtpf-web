import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { SITE_NAME, SITE_URL } from '../../src/config/site';
import { cardContent, cardHtml, BRAND_NAME, BRAND_HOST } from '../../scripts/postbuild/og.mjs';

describe('og card', () => {
  it('declares the brand literals of the site config', () => {
    const source = readFileSync('scripts/postbuild/og.mjs', 'utf8');
    expect(source).toContain(`export const BRAND_NAME = '${SITE_NAME}';`);
    expect(source).toContain(`export const BRAND_HOST = '${new URL(SITE_URL).host}';`);
    expect(BRAND_NAME).toBe(SITE_NAME);
    expect(BRAND_HOST).toBe(new URL(SITE_URL).host);
  });

  it('takes the name as the big line and the role as headline on the home page', () => {
    const content = cardContent({
      key: 'home',
      title: `${SITE_NAME} — Senior Full-Stack Engineer`,
      description: 'd',
    });
    expect(content).toEqual({ big: SITE_NAME, headline: 'Senior Full-Stack Engineer', description: 'd' });
  });

  it('drops the site suffix from any other title', () => {
    expect(cardContent({ key: 'about', title: `About — ${SITE_NAME}`, description: 'd' }).big).toBe('About');
    expect(cardContent({ key: 'x', title: 'No suffix', description: 'd' }).big).toBe('No suffix');
  });

  it('escapes page text and embeds fonts and the screenshot without any network URL', () => {
    const html = cardHtml({
      big: '<b>&</b>',
      headline: '',
      description: 'a "quote"',
      image: 'data:image/webp;base64,AAAA',
    });
    expect(html).toContain('&lt;b&gt;&amp;&lt;/b&gt;');
    expect(html).toContain('a &quot;quote&quot;');
    expect(html).toContain('data:font/woff2;base64,');
    expect(html).toContain('data:image/webp;base64,AAAA');
    expect(html).not.toMatch(/https?:\/\//);
    expect(html).toContain('#2DD4BF');
    expect(html).toContain('#0B0F19');
  });
});
