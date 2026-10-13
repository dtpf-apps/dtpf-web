import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Projects from '../../src/views/pages/Projects';
import { projects } from '../../src/config/projects';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

// External links on the page are the projects' visit links: the footer is not rendered here.
function visitLinks() {
  return screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('https://'));
}

describe('Projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders every project as a card', () => {
    renderWithProviders(<Projects />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings.length).toBe(projects.length);
  });

  it('each project has a case study link', () => {
    renderWithProviders(<Projects />);
    const caseStudyLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.startsWith('/projects/'));
    expect(caseStudyLinks.length).toBe(projects.length);
  });

  it('shows a visit link only for projects with a live URL', () => {
    renderWithProviders(<Projects />);
    const expected = projects.filter((p) => p.liveUrl).map((p) => p.liveUrl);
    expect(visitLinks().map((l) => l.getAttribute('href'))).toEqual(expected);
  });

  it('shows one badge per project, matching its status', () => {
    renderWithProviders(<Projects />);
    const count = (status: string) => projects.filter((p) => p.status === status).length;
    expect(screen.getAllByText('Production')).toHaveLength(count('production'));
    expect(screen.getAllByText('Private beta')).toHaveLength(count('beta'));
    expect(screen.getAllByText('Client work')).toHaveLength(count('client'));
    expect(screen.getAllByText('Private')).toHaveLength(count('private'));
  });

  it('no longer lists the portfolio itself as a project', () => {
    renderWithProviders(<Projects />);
    expect(screen.queryByText('This site')).not.toBeInTheDocument();
    expect(screen.queryByText('dtpf.es')).not.toBeInTheDocument();
  });

  it('renders stack tags for each project', () => {
    renderWithProviders(<Projects />);
    expect(screen.getAllByText('React 19').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Auth0')).toBeInTheDocument();
    expect(screen.getAllByText('PWA').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('MCP')).toBeInTheDocument();
    expect(screen.getByText('WebXR')).toBeInTheDocument();
    expect(screen.getByText('Decimal128')).toBeInTheDocument();
  });

  it('renders project descriptions with every figure interpolated', () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText(/providing passwordless login/)).toBeInTheDocument();
    expect(screen.getByText(/Media storage with folder/)).toBeInTheDocument();
    expect(screen.getByText(/Multi-tenant AI agent platform/)).toBeInTheDocument();
    expect(screen.getByText(/Home inventory with exact locations/)).toBeInTheDocument();
    expect(screen.getByText(/handmade pieces for the AIRAM brand/)).toBeInTheDocument();
    expect(screen.getByText(/Private personal-wealth app/)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\{\{/);
  });

  it('clicking case study link tracks projects:case-study event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);
    const caseStudyLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.startsWith('/projects/'));
    await user.click(caseStudyLinks[0]);
    expect(trackEvent).toHaveBeenCalledWith(
      'projects:case-study',
      expect.objectContaining({ slug: expect.any(String) })
    );
  });

  it('clicking visit link tracks projects:visit-live event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Projects />);
    await user.click(visitLinks()[0]);
    expect(trackEvent).toHaveBeenCalledWith(
      'projects:visit-live',
      expect.objectContaining({ slug: expect.any(String) })
    );
  });
});
