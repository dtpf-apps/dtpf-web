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

describe('Projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all 5 projects', () => {
    renderWithProviders(<Projects />);
    // Each project renders an h3 heading with its translated name
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBe(projects.length);
  });

  it('each project has a case study link', () => {
    renderWithProviders(<Projects />);
    const caseStudyLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.startsWith('/projects/'));
    expect(caseStudyLinks.length).toBe(projects.length);
  });

  it('projects except dtpf have visit link', () => {
    renderWithProviders(<Projects />);
    const externalLinks = screen.getAllByRole('link').filter((l) => {
      const href = l.getAttribute('href');
      return href?.startsWith('https://') && !href?.includes('linkedin') && !href?.includes('github');
    });
    // 4 projects (excluding dtpf) should have visit links
    expect(externalLinks.length).toBe(4);
  });

  it('dtpf shows "This site" badge', () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText('This site')).toBeInTheDocument();
  });

  it('non-dtpf projects show "Production" badge', () => {
    renderWithProviders(<Projects />);
    const badges = screen.getAllByText('Production');
    // 4 non-dtpf projects have production badge
    expect(badges.length).toBe(4);
  });

  it('renders stack tags for each project', () => {
    renderWithProviders(<Projects />);
    // dauth has React 19
    expect(screen.getAllByText('React 19').length).toBeGreaterThanOrEqual(1);
    // audity has Auth0
    expect(screen.getByText('Auth0')).toBeInTheDocument();
    // dalist has PWA
    expect(screen.getAllByText('PWA').length).toBeGreaterThanOrEqual(1);
  });

  it('renders project descriptions', () => {
    renderWithProviders(<Projects />);
    expect(screen.getByText(/providing passwordless login/)).toBeInTheDocument();
    expect(screen.getByText(/Media storage with folder/)).toBeInTheDocument();
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
    const externalLinks = screen.getAllByRole('link').filter((l) => {
      const href = l.getAttribute('href');
      return href?.startsWith('https://') && !href?.includes('linkedin') && !href?.includes('github');
    });
    await user.click(externalLinks[0]);
    expect(trackEvent).toHaveBeenCalledWith(
      'projects:visit-live',
      expect.objectContaining({ slug: expect.any(String) })
    );
  });
});
