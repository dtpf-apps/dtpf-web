import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import i18n from '../../src/utils/i18n';
import Cv from '../../src/views/pages/Cv';
import { experience, tools } from '../../src/config/profile';
import { projects } from '../../src/config/projects';
import { AUTHOR } from '../../src/config/site';
import { facts } from '../../src/config/facts';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

const section = (name: string) =>
  screen.getByRole('heading', { level: 2, name }).closest('section') as HTMLElement;

async function inLanguage(lang: 'es' | 'en', fn: () => void | Promise<void>) {
  await i18n.changeLanguage(lang);
  try {
    await fn();
  } finally {
    await i18n.changeLanguage('en');
  }
}

describe('Cv', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('has one h1 (the name) and only h2/h3 beneath it', () => {
    renderWithProviders(<Cv />, { route: '/cv' });
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(AUTHOR.name);
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0);
  });

  it('renders the header with role, availability, location and every contact point', () => {
    renderWithProviders(<Cv />, { route: '/cv' });
    expect(screen.getByText('Senior Full-Stack Engineer')).toBeInTheDocument();
    expect(screen.getByText('Open to offers · remote or hybrid from Mallorca')).toBeInTheDocument();
    expect(screen.getByText('Mallorca, Spain')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: AUTHOR.email })).toHaveAttribute(
      'href',
      `mailto:${AUTHOR.email}`
    );
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', AUTHOR.linkedin);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', AUTHOR.github);
    expect(screen.getByRole('link', { name: 'dtpf.es' })).toHaveAttribute('href', 'https://dtpf.es');
  });

  it('renders the profile with the same census figures About interpolates', () => {
    renderWithProviders(<Cv />, { route: '/cv' });
    const profile = section('Profile');
    expect(profile).toHaveTextContent(String(facts.apps.production));
    expect(profile).toHaveTextContent(String(facts.apps.public));
    expect(within(profile).getAllByRole('paragraph')).toHaveLength(3);
  });

  it('renders one entry per job in profile.ts', () => {
    renderWithProviders(<Cv />, { route: '/cv' });
    const jobs = section('Experience');
    expect(within(jobs).getAllByRole('heading', { level: 3 })).toHaveLength(experience.length);
    expect(jobs).toHaveTextContent('Storaia');
  });

  it('lists every project with its status, and a public URL only when it has one', () => {
    renderWithProviders(<Cv />, { route: '/cv' });
    const list = section('Selected projects');
    expect(within(list).getAllByRole('heading', { level: 3 })).toHaveLength(projects.length);
    const links = within(list).queryAllByRole('link');
    expect(links).toHaveLength(projects.filter((p) => p.liveUrl).length);
    for (const project of projects.filter((p) => p.liveUrl)) {
      expect(links.some((l) => l.getAttribute('href') === project.liveUrl)).toBe(true);
    }
    expect(within(list).getAllByText('Production').length).toBeGreaterThan(0);
    expect(within(list).getByText('Private')).toBeInTheDocument();
  });

  it('renders the five tool groups with their items', () => {
    renderWithProviders(<Cv />, { route: '/cv' });
    const toolbox = section('Tools');
    expect(within(toolbox).getAllByRole('heading', { level: 3 })).toHaveLength(tools.length);
    for (const item of tools.flatMap((g) => g.items)) {
      expect(within(toolbox).getByText(item)).toBeInTheDocument();
    }
  });

  it('renders every section in Spanish too', async () => {
    await inLanguage('es', () => {
      renderWithProviders(<Cv />, { route: '/cv' });
      for (const name of ['Perfil', 'Experiencia', 'Proyectos seleccionados', 'Herramientas']) {
        expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
      }
      expect(screen.getByRole('link', { name: /Descargar PDF/ })).toBeInTheDocument();
      expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
        'content',
        expect.stringMatching(/^Currículum de David/)
      );
    });
  });

  describe('PDF download', () => {
    it('points at the Spanish file from /cv', () => {
      renderWithProviders(<Cv />, { route: '/cv' });
      const link = screen.getByRole('link', { name: /Download PDF/ });
      expect(link).toHaveAttribute('href', '/cv/david-pizarro-frick-es.pdf');
      expect(link).toHaveAttribute('download');
    });

    it('points at the English file from /en/cv', () => {
      renderWithProviders(<Cv />, { route: '/en/cv' });
      expect(screen.getByRole('link', { name: /Download PDF/ })).toHaveAttribute(
        'href',
        '/cv/david-pizarro-frick-en.pdf'
      );
    });

    it('tracks cv:download with the language on click', async () => {
      renderWithProviders(<Cv />, { route: '/en/cv' });
      await userEvent.click(screen.getByRole('link', { name: /Download PDF/ }));
      expect(trackEvent).toHaveBeenCalledWith('cv:download', { lang: 'en' });
    });

    it('is hidden when printing', () => {
      renderWithProviders(<Cv />, { route: '/cv' });
      expect(screen.getByRole('link', { name: /Download PDF/ }).className).toContain('print:hidden');
    });
  });

  it('describes itself for search and sharing', () => {
    renderWithProviders(<Cv />, { route: '/en/cv' });
    expect(document.title).toBe('Résumé — David T. Pizarro Frick');
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://dtpf.es/en/cv'
    );
    expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://dtpf.es/og/en/cv.png'
    );
  });
});
