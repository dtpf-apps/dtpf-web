import { Routes, Route } from 'react-router';
import { renderWithProviders } from '../helpers/renderWithProviders';
import NotFound from '../../src/views/pages/NotFound';
import PrivacyPolicy from '../../src/views/pages/PrivacyPolicy';
import ProjectDetail from '../../src/views/pages/ProjectDetail';
import Home from '../../src/views/pages/Home';
import About from '../../src/views/pages/About';
import Cv from '../../src/views/pages/Cv';
import Platform from '../../src/views/pages/Platform';

const meta = (sel: string) => document.head.querySelector(sel)?.getAttribute('content');
const canonical = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute('href');
const jsonLd = () =>
  [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent!));

describe('page-level SEO', () => {
  it('NotFound asks not to be indexed and declares no canonical', () => {
    renderWithProviders(<NotFound />, { route: '/nope' });
    expect(meta('meta[name="robots"]')).toBe('noindex');
    expect(canonical()).toBeUndefined();
  });

  it('PrivacyPolicy stays Spanish-only: Spanish description and canonical even under /en', () => {
    renderWithProviders(<PrivacyPolicy />, { route: '/en/privacy-policy' });
    expect(canonical()).toBe('https://dtpf.es/privacy-policy');
    expect(meta('meta[name="description"]')).toMatch(/^Política de privacidad/);
  });

  it('home and about carry a Person; the home description is its own copy, not the tagline', () => {
    renderWithProviders(<Home />, { route: '/en' });
    expect(jsonLd().map((j) => j['@type'])).toEqual(['Person']);
    expect(meta('meta[name="description"]')).toMatch(/^Portfolio of David/);
    expect(canonical()).toBe('https://dtpf.es/en');
  });

  it('about carries a Person too', () => {
    renderWithProviders(<About />, { route: '/about' });
    expect(jsonLd().map((j) => j['@type'])).toEqual(['Person']);
    expect(canonical()).toBe('https://dtpf.es/about');
  });

  it('the CV has its own description, canonical, alternates and OG card in both languages', () => {
    const { unmount } = renderWithProviders(<Cv />, { route: '/cv' });
    expect(canonical()).toBe('https://dtpf.es/cv');
    expect(meta('meta[property="og:image"]')).toBe('https://dtpf.es/og/es/cv.png');
    expect(document.head.querySelector('link[hreflang="en"]')).toHaveAttribute(
      'href',
      'https://dtpf.es/en/cv'
    );
    unmount();

    renderWithProviders(<Cv />, { route: '/en/cv' });
    expect(canonical()).toBe('https://dtpf.es/en/cv');
    expect(meta('meta[name="description"]')).toMatch(/^Résumé of David/);
    expect(meta('meta[property="og:image"]')).toBe('https://dtpf.es/og/en/cv.png');
  });

  it('the platform page has its own title, description, canonical and OG card, and no JSON-LD', () => {
    renderWithProviders(<Platform />, { route: '/en/platform' });
    expect(document.title).toBe('The platform I run — David T. Pizarro Frick');
    expect(meta('meta[name="description"]')).toMatch(/^The infrastructure I run on my own/);
    expect(canonical()).toBe('https://dtpf.es/en/platform');
    expect(meta('meta[property="og:image"]')).toBe('https://dtpf.es/og/en/platform.png');
    expect(document.head.querySelector('link[hreflang="es"]')).toHaveAttribute(
      'href',
      'https://dtpf.es/platform'
    );
    expect(jsonLd()).toEqual([]);
  });

  it('a project page carries a SoftwareApplication and its own OG card key', () => {
    renderWithProviders(
      <Routes>
        <Route path="/en/projects/:slug" element={<ProjectDetail />} />
      </Routes>,
      { route: '/en/projects/dauth' }
    );
    const [app] = jsonLd();
    expect(app['@type']).toBe('SoftwareApplication');
    expect(app.name).toBe('dauth');
    expect(meta('meta[property="og:image"]')).toBe('https://dtpf.es/og/en/project-dauth.png');
    expect(canonical()).toBe('https://dtpf.es/en/projects/dauth');
  });

  it('an unknown project slug redirects inside the English tree', () => {
    renderWithProviders(
      <Routes>
        <Route path="/en/projects/:slug" element={<ProjectDetail />} />
        <Route path="/en/projects" element={<span>list</span>} />
      </Routes>,
      { route: '/en/projects/nope' }
    );
    expect(document.body).toHaveTextContent('list');
  });
});
