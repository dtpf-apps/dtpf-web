import { describe, it, expect } from 'vitest';
import { injectHead, markTag, stripMarked } from '../../scripts/postbuild/template.mjs';

const TEMPLATE = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="theme-color" content="#0B0F19" />
  </head>
  <body><div id="root"></div></body>
</html>
`;

const TAGS = [
  '<title>About — Someone</title>',
  '<meta name="description" content="A page">',
  '<link rel="canonical" href="https://dtpf.es/en/about">',
  '<script type="application/ld+json">{"@type":"Person"}</script>',
];

describe('injectHead', () => {
  it('marks every injected tag and puts them inside <head>', () => {
    const html = injectHead(TEMPLATE, { lang: 'en', tags: TAGS });
    const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'));
    expect(head).toContain('<title data-prerender="">About — Someone</title>');
    expect(head).toContain('<meta data-prerender="" name="description" content="A page">');
    expect(head).toContain('<link data-prerender="" rel="canonical" href="https://dtpf.es/en/about">');
    expect(head).toContain(
      '<script data-prerender="" type="application/ld+json">{"@type":"Person"}</script>'
    );
    expect(html.match(/data-prerender/g)).toHaveLength(TAGS.length);
  });

  it('sets the document language and keeps the original head', () => {
    const html = injectHead(TEMPLATE, { lang: 'en', tags: TAGS });
    expect(html).toContain('<html lang="en">');
    expect(html).not.toContain('lang="es"');
    expect(html).toContain('<meta name="theme-color" content="#0B0F19" />');
    expect(html).toContain('<div id="root"></div>');
  });

  it('is idempotent: a second pass over its own output changes nothing', () => {
    const once = injectHead(TEMPLATE, { lang: 'en', tags: TAGS });
    expect(injectHead(once, { lang: 'en', tags: TAGS })).toBe(once);
  });

  it('replaces earlier tags instead of adding a second set', () => {
    const once = injectHead(TEMPLATE, { lang: 'es', tags: ['<title>Old</title>'] });
    const twice = injectHead(once, { lang: 'en', tags: ['<title>New</title>'] });
    expect(twice).toContain('<title data-prerender="">New</title>');
    expect(twice).not.toContain('Old');
    expect(twice).toContain('<html lang="en">');
  });

  it('leaves the template string it was given untouched', () => {
    const copy = `${TEMPLATE}`;
    injectHead(TEMPLATE, { lang: 'en', tags: TAGS });
    expect(TEMPLATE).toBe(copy);
  });

  it('fails on a template without a head', () => {
    expect(() => injectHead('<html></html>', { lang: 'es', tags: [] })).toThrow(/no <\/head>/);
  });

  it('does not double-mark a tag and strips only marked ones', () => {
    expect(markTag('<title data-prerender="">x</title>')).toBe('<title data-prerender="">x</title>');
    expect(stripMarked(TEMPLATE)).toBe(TEMPLATE);
  });
});
