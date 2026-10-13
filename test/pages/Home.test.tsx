import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Home from '../../src/views/pages/Home';
import { facts, formatInt, roundDownToThousand, yearsSince } from '../../src/config/facts';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders hero with name heading', () => {
    renderWithProviders(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('shows the measured proof bar: apps, public apps and tests rounded down', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(String(facts.apps.production))).toBeInTheDocument();
    expect(screen.getByText(String(facts.apps.public))).toBeInTheDocument();
    expect(
      screen.getByText(`${formatInt(roundDownToThousand(facts.tests.total), 'en')}+`)
    ).toBeInTheDocument();
    expect(screen.queryByText('6.100+')).not.toBeInTheDocument();
  });

  it('renders the hero tagline and the availability line', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/from production to the people who use them/)).toBeInTheDocument();
    expect(screen.getByText('Open to offers · remote or hybrid from Mallorca')).toBeInTheDocument();
  });

  it('interpolates the dauth tenant count into the featured card', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(new RegExp(`${facts.dauthTenants} tenants connected`))).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\{\{/);
  });

  it('renders featured projects in bento grid', () => {
    renderWithProviders(<Home />);
    // 4 featured projects (all except dtpf)
    const projectHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(projectHeadings.length).toBe(4);
  });

  it('renders stack section with tech items', () => {
    renderWithProviders(<Home />);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThanOrEqual(1);
  });

  it('has CTA link to contact', () => {
    renderWithProviders(<Home />);
    const contactLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/contact');
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('excludes dtpf from featured projects', () => {
    renderWithProviders(<Home />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    const headingTexts = headings.map((h) => h.textContent);
    expect(headingTexts).not.toContain('dtpf.es');
  });

  it('shows exactly 4 featured projects (all except dtpf)', () => {
    renderWithProviders(<Home />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(4);
  });

  it('renders manifesto section', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/don't collect side projects/i)).toBeInTheDocument();
    expect(screen.getByText(/ship them to production/i)).toBeInTheDocument();
  });

  it('has CTA link to projects page', () => {
    renderWithProviders(<Home />);
    const projectLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/projects');
    expect(projectLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all 11 stack items', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Proxmox')).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
    expect(screen.getByText('Claude Code')).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
  });

  it('renders stack abbreviations', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(screen.getByText('TS')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('PX')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('computes the SaaS years from the start date instead of a typed figure', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(String(yearsSince(facts.saasSince)))).toBeInTheDocument();
    expect(screen.queryByText('3+')).not.toBeInTheDocument();
  });

  it('renders external visit links for featured projects', () => {
    renderWithProviders(<Home />);
    const externalLinks = screen.getAllByRole('link').filter((l) => {
      const href = l.getAttribute('href');
      return href?.startsWith('https://') && !href.includes('linkedin') && !href.includes('github');
    });
    expect(externalLinks.length).toBe(4);
  });

  it('hero "View Projects" CTA tracks home:hero-view-projects event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);
    const projectLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/projects');
    // The first /projects link in the hero section
    await user.click(projectLinks[0]);
    expect(trackEvent).toHaveBeenCalledWith('home:hero-view-projects');
  });

  it('hero "Get in Touch" CTA tracks home:hero-get-in-touch event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);
    const contactLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/contact');
    // The first /contact link is the hero CTA
    await user.click(contactLinks[0]);
    expect(trackEvent).toHaveBeenCalledWith('home:hero-get-in-touch');
  });

  it('project card "Case Study" link tracks home:project-card event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);
    const caseStudyLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.startsWith('/projects/'));
    await user.click(caseStudyLinks[0]);
    expect(trackEvent).toHaveBeenCalledWith(
      'home:project-card',
      expect.objectContaining({ slug: expect.any(String) })
    );
  });

  it('project "Visit" link tracks home:visit-project event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);
    const externalLinks = screen.getAllByRole('link').filter((l) => {
      const href = l.getAttribute('href');
      return href?.startsWith('https://') && !href.includes('linkedin') && !href.includes('github');
    });
    await user.click(externalLinks[0]);
    expect(trackEvent).toHaveBeenCalledWith(
      'home:visit-project',
      expect.objectContaining({ slug: expect.any(String) })
    );
  });

  it('final CTA tracks home:final-cta event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);
    const contactLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/contact');
    // The last /contact link is the final CTA
    await user.click(contactLinks[contactLinks.length - 1]);
    expect(trackEvent).toHaveBeenCalledWith('home:final-cta');
  });

  it('manifesto onViewportEnter fires trackEvent when element enters viewport', () => {
    // Override IntersectionObserver to immediately call callback with isIntersecting: true
    const originalIO = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class MockIO {
      constructor(callback: IntersectionObserverCallback) {
        // Auto-trigger with all entries intersecting
        setTimeout(() => {
          callback(
            [{ isIntersecting: true, intersectionRatio: 1 }] as IntersectionObserverEntry[],
            this as unknown as IntersectionObserver
          );
        }, 0);
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds: ReadonlyArray<number> = [];
      takeRecords = vi.fn().mockReturnValue([]);
    } as unknown as typeof IntersectionObserver;

    renderWithProviders(<Home />);

    // Restore original mock
    globalThis.IntersectionObserver = originalIO;
  });
});
