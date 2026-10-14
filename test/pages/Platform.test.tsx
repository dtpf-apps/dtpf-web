import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Platform from '../../src/views/pages/Platform';
import { allDiagramNodes, platformCards, platformFigures } from '../../src/config/platform';
import { facts, formatDate, platformVars } from '../../src/config/facts';
import { en } from '../../src/assets/locale/en';
import i18n from '../../src/utils/i18n';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

const INVENTORY = /\b\d{1,3}(?:\.\d{1,3}){3}\b|\b(?:CT|VM) ?\d{3}\b|\.(?:lan|local|internal)\b|\bssh /i;

const figure = () => screen.getByRole('figure', { name: 'From the internet to the data' });
const card = (id: string) => document.querySelector<HTMLElement>(`[data-card="${id}"]`)!;

describe('Platform', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('opens with its h1 and the introduction', () => {
    renderWithProviders(<Platform />, { route: '/platform' });
    expect(screen.getByRole('heading', { level: 1, name: 'Platform' })).toBeInTheDocument();
    expect(screen.getByText(en.platform_desc)).toBeInTheDocument();
  });

  it('shows six figures, each equal to the measured value', () => {
    renderWithProviders(<Platform />, { route: '/platform' });
    const vars = platformVars('en');
    const items = within(screen.getByRole('region', { name: 'The platform in figures' })).getAllByRole(
      'listitem'
    );
    expect(items).toHaveLength(platformFigures.length);
    platformFigures.forEach((f, i) => {
      expect(items[i].firstElementChild).toHaveTextContent(new RegExp(`^${vars[f.varKey]}$`));
    });
    const unbacked = items.find((li) => li.textContent?.includes('without a backup'))!;
    expect(unbacked.firstElementChild).toHaveTextContent(String(facts.platform.guestsWithoutBackup));
    expect(items.some((li) => /running/i.test(li.textContent ?? ''))).toBe(false);
  });

  it('dates the measurements from facts.generatedAt', () => {
    renderWithProviders(<Platform />, { route: '/platform' });
    expect(
      screen.getByText(new RegExp(`Figures measured on ${formatDate(facts.generatedAt, 'en')}\\.`))
    ).toBeInTheDocument();
  });

  it('renders the date and the copy in Spanish under the Spanish language', async () => {
    await i18n.changeLanguage('es');
    try {
      renderWithProviders(<Platform />, { route: '/platform' });
      expect(
        screen.getByText(new RegExp(`Datos medidos el ${formatDate(facts.generatedAt, 'es')}\\.`))
      ).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: 'Plataforma' })).toBeInTheDocument();
    } finally {
      await i18n.changeLanguage('en');
    }
  });

  it('renders the six cards as h3s in the order of platformCards', () => {
    renderWithProviders(<Platform />, { route: '/platform' });
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(platformCards.map((c) => (en as Record<string, string>)[c.titleKey]));
  });

  it('describes the internal tools without a single link', () => {
    renderWithProviders(<Platform />, { route: '/platform' });
    const tools = card('tools');
    const names = [...tools.querySelectorAll('dt')].map((dt) => dt.textContent);
    expect(names).toEqual([
      'voxdrop',
      'meetscribe',
      'ops-dashboard',
      'error-watcher',
      'dcompany-provisioner',
    ]);
    expect(within(tools).queryAllByRole('link')).toHaveLength(0);
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href') ?? '');
    for (const name of names) {
      for (const href of hrefs) expect(href).not.toContain(name);
    }
  });

  it('links the inference card to the case studies, keeping the language prefix, and tracks the click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Platform />, { route: '/en/platform' });
    const links = within(card('inference')).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/en/projects/dalist',
      '/en/projects/dinventory',
    ]);
    await user.click(links[0]);
    expect(trackEvent).toHaveBeenCalledWith('platform:project-link', { slug: 'dalist' });
  });

  it('links the inference card without a prefix in Spanish URLs', () => {
    renderWithProviders(<Platform />, { route: '/platform' });
    expect(
      within(card('inference'))
        .getAllByRole('link')
        .map((a) => a.getAttribute('href'))
    ).toEqual(['/projects/dalist', '/projects/dinventory']);
  });

  describe('architecture diagram', () => {
    it('has an accessible name and description', () => {
      renderWithProviders(<Platform />, { route: '/platform' });
      const vars = platformVars('en');
      expect(figure()).toHaveAccessibleDescription(
        en.platform_diagram_summary.replace('{{nodes}}', vars.nodes)
      );
    });

    it('draws every configured node, as text', () => {
      renderWithProviders(<Platform />, { route: '/platform' });
      for (const node of allDiagramNodes) {
        const el = figure().querySelector(`[data-node="${node.id}"]`);
        expect(el, node.id).not.toBeNull();
        const expected = node.name ?? (en as Record<string, string>)[node.nameKey!];
        expect(el, node.id).toHaveTextContent(expected);
      }
    });

    it('holds no heading and nothing focusable, and hides every connector', () => {
      renderWithProviders(<Platform />, { route: '/platform' });
      const f = figure();
      expect(f.querySelectorAll('h1, h2, h3, h4, h5, h6')).toHaveLength(0);
      expect(f.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')).toHaveLength(0);
      const connectors = [...f.querySelectorAll('[data-connector]')];
      expect(connectors.length).toBeGreaterThan(5);
      for (const c of connectors) expect(c).toHaveAttribute('aria-hidden', 'true');
    });

    it('lists the request path in order', () => {
      renderWithProviders(<Platform />, { route: '/platform' });
      const order = [...figure().querySelectorAll('[data-node]')].map((n) => n.getAttribute('data-node'));
      expect(order.slice(0, 6)).toEqual([
        'internet',
        'cloudflare',
        'fw-primary',
        'fw-standby',
        'proxy',
        'app-server',
      ]);
    });
  });

  it('publishes architecture, not inventory', () => {
    // Positive control: this very pattern flags a leak, so a clean page means something.
    expect('node 10.5.0.102 / CT 356').toMatch(INVENTORY);
    renderWithProviders(<Platform />, { route: '/platform' });
    expect(document.body.textContent).not.toMatch(INVENTORY);
    expect(document.body.textContent).not.toMatch(/\{\{|undefined|NaN/);
  });

  it('closes with two calls to action that track their clicks', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Platform />, { route: '/platform' });
    const projects = screen.getByRole('link', { name: 'See the projects' });
    const contact = screen.getByRole('link', { name: "Let's talk" });
    expect(projects).toHaveAttribute('href', '/projects');
    expect(contact).toHaveAttribute('href', '/contact');
    await user.click(projects);
    expect(trackEvent).toHaveBeenCalledWith('platform:cta-projects');
    await user.click(contact);
    expect(trackEvent).toHaveBeenCalledWith('platform:cta-contact');
  });
});
