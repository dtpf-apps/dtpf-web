import i18n from '../../src/utils/i18n';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Seo from '../../src/views/components/Seo';

const meta = (sel: string) => document.head.querySelector(sel)?.getAttribute('content');
const link = (sel: string) => document.head.querySelector(sel)?.getAttribute('href');

describe('Seo on a Spanish route', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('es');
  });
  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('writes title, description, canonical and the hreflang trio into <head>', async () => {
    renderWithProviders(<Seo titleKey="about_title" description="Perfil" ogKey="about" />, {
      route: '/about',
    });
    expect(document.title).toBe('Sobre mí — David T. Pizarro Frick');
    expect(meta('meta[name="description"]')).toBe('Perfil');
    expect(link('link[rel="canonical"]')).toBe('https://dtpf.es/about');
    expect(link('link[rel="alternate"][hreflang="es"]')).toBe('https://dtpf.es/about');
    expect(link('link[rel="alternate"][hreflang="en"]')).toBe('https://dtpf.es/en/about');
    expect(link('link[rel="alternate"][hreflang="x-default"]')).toBe('https://dtpf.es/about');
  });

  it('writes the Open Graph and Twitter Card tags', () => {
    renderWithProviders(<Seo titleKey="about_title" description="Perfil" ogKey="about" />, {
      route: '/about',
    });
    expect(meta('meta[property="og:type"]')).toBe('website');
    expect(meta('meta[property="og:url"]')).toBe('https://dtpf.es/about');
    expect(meta('meta[property="og:title"]')).toBe('Sobre mí — David T. Pizarro Frick');
    expect(meta('meta[property="og:description"]')).toBe('Perfil');
    expect(meta('meta[property="og:image"]')).toBe('https://dtpf.es/og/es/about.png');
    expect(meta('meta[property="og:image:width"]')).toBe('1200');
    expect(meta('meta[property="og:image:height"]')).toBe('630');
    expect(meta('meta[property="og:locale"]')).toBe('es_ES');
    expect(meta('meta[property="og:locale:alternate"]')).toBe('en_US');
    expect(meta('meta[property="og:site_name"]')).toBe('David T. Pizarro Frick');
    expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(meta('meta[name="twitter:title"]')).toBe('Sobre mí — David T. Pizarro Frick');
    expect(meta('meta[name="twitter:description"]')).toBe('Perfil');
    expect(meta('meta[name="twitter:image"]')).toBe('https://dtpf.es/og/es/about.png');
  });

  it('does not ask for indexing exclusion by default', () => {
    renderWithProviders(<Seo titleKey="about_title" description="d" ogKey="about" />, { route: '/about' });
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });
});

describe('Seo on an English route', () => {
  it('points the canonical and og:url at the English URL and swaps the locales', () => {
    renderWithProviders(<Seo titleKey="about_title" description="Profile" ogKey="about" />, {
      route: '/en/about',
    });
    expect(link('link[rel="canonical"]')).toBe('https://dtpf.es/en/about');
    expect(meta('meta[property="og:url"]')).toBe('https://dtpf.es/en/about');
    expect(meta('meta[property="og:locale"]')).toBe('en_US');
    expect(meta('meta[property="og:locale:alternate"]')).toBe('es_ES');
    expect(meta('meta[property="og:image"]')).toBe('https://dtpf.es/og/en/about.png');
    expect(link('link[rel="alternate"][hreflang="x-default"]')).toBe('https://dtpf.es/about');
  });

  it('uses a literal title verbatim', () => {
    renderWithProviders(<Seo title="Whole title" description="d" ogKey="home" />, { route: '/en' });
    expect(document.title).toBe('Whole title');
    expect(link('link[rel="canonical"]')).toBe('https://dtpf.es/en');
  });
});

describe('Seo options', () => {
  it('esOnly keeps the Spanish canonical on the English URL and drops the alternates', () => {
    renderWithProviders(<Seo titleKey="about_title" description="d" ogKey="privacy-policy" esOnly />, {
      route: '/en/privacy-policy',
    });
    expect(link('link[rel="canonical"]')).toBe('https://dtpf.es/privacy-policy');
    expect(document.head.querySelector('link[rel="alternate"]')).toBeNull();
  });

  it('noindex emits robots noindex and no canonical or alternates', () => {
    renderWithProviders(<Seo title="404" description="d" ogKey="home" noindex />, { route: '/nope' });
    expect(meta('meta[name="robots"]')).toBe('noindex');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.head.querySelector('link[rel="alternate"]')).toBeNull();
  });

  it('renders JSON-LD with "<" escaped', () => {
    renderWithProviders(
      <Seo title="t" description="d" ogKey="home" jsonLd={{ '@type': 'Person', name: '</script>x' }} />,
      { route: '/' }
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    expect(script!.textContent).not.toContain('<');
    expect(JSON.parse(script!.textContent!).name).toBe('</script>x');
  });

  it('renders no JSON-LD script when none is given', () => {
    renderWithProviders(<Seo title="t" description="d" ogKey="home" />, { route: '/' });
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('honours the og:type', () => {
    renderWithProviders(<Seo title="t" description="d" ogKey="about" type="profile" />, { route: '/' });
    expect(meta('meta[property="og:type"]')).toBe('profile');
  });
});
