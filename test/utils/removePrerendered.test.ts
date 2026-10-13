import { removePrerendered } from '../../src/utils/removePrerendered';

describe('removePrerendered', () => {
  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('removes only the tags the build marked, so React can own the head', () => {
    document.head.innerHTML = `
      <title data-prerender>Pre</title>
      <meta data-prerender name="description" content="x">
      <script data-prerender type="application/ld+json">{}</script>
      <meta name="theme-color" content="#000">
    `;
    removePrerendered();
    expect(document.head.querySelectorAll('[data-prerender]')).toHaveLength(0);
    expect(document.head.querySelector('meta[name="theme-color"]')).not.toBeNull();
  });

  it('is a no-op on a page that was not pre-rendered', () => {
    document.head.innerHTML = '<meta name="theme-color" content="#000">';
    expect(() => removePrerendered()).not.toThrow();
    expect(document.head.children).toHaveLength(1);
  });
});
