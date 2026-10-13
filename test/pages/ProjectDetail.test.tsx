import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from '../../src/contexts/theme/ThemeContext';
import '../../src/utils/i18n';
import ProjectDetail from '../../src/views/pages/ProjectDetail';
import { facts, formatInt } from '../../src/config/facts';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

function renderProjectDetail(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/projects/${slug}`]}>
      <ThemeProvider>
        <Routes>
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/projects" element={<div data-testid="projects-page">Projects Page</div>} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('ProjectDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project detail for valid slug', () => {
    renderProjectDetail('dauth');
    expect(screen.getByText('React 19')).toBeInTheDocument();
  });

  it('redirects to /projects for invalid slug', () => {
    renderProjectDetail('nonexistent');
    expect(screen.getByTestId('projects-page')).toBeInTheDocument();
  });

  it('shows metrics for dauth with the measured, language-formatted test count', () => {
    renderProjectDetail('dauth');
    expect(screen.getByText('Active tenants')).toBeInTheDocument();
    expect(screen.getByText(formatInt(facts.projects.dauth.tests.total, 'en'))).toBeInTheDocument();
    expect(screen.queryByText('1.702')).not.toBeInTheDocument();
  });

  it('interpolates every figure of the case study (no raw placeholders)', () => {
    renderProjectDetail('dauth');
    expect(
      screen.getByText(new RegExp(`auth for ${facts.dauthTenants} production apps`))
    ).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\{\{/);
  });

  it('shows stack tags', () => {
    renderProjectDetail('dstash');
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('MongoDB 8')).toBeInTheDocument();
  });

  it('has visit link to live URL', () => {
    renderProjectDetail('dauth');
    const links = screen.getAllByRole('link');
    const visitLink = links.find((l) => l.getAttribute('href') === 'https://dauth.ovh');
    expect(visitLink).toBeDefined();
  });

  it('renders case study sections for dauth (problem/solution/result)', () => {
    renderProjectDetail('dauth');
    expect(screen.getByText(/The problem\./)).toBeInTheDocument();
    expect(screen.getByText(/The solution\./)).toBeInTheDocument();
    expect(screen.getByText(/The result\./)).toBeInTheDocument();
  });

  it('renders case study sections for dalist', () => {
    renderProjectDetail('dalist');
    expect(screen.getByText(/The problem\./)).toBeInTheDocument();
    expect(screen.getByText(/The solution\./)).toBeInTheDocument();
    expect(screen.getByText(/The result\./)).toBeInTheDocument();
  });

  it('renders description instead of case study for projects without problemKey', () => {
    renderProjectDetail('audity');
    // audity has no problemKey, so it renders the full description text
    expect(screen.getByText(/Full player, playlists, search, CMS/)).toBeInTheDocument();
    // Should NOT show problem/solution/result sections
    expect(screen.queryByText(/The problem\./)).not.toBeInTheDocument();
  });

  it('has back navigation link to projects page', () => {
    renderProjectDetail('dauth');
    const links = screen.getAllByRole('link');
    const backLink = links.find((l) => l.getAttribute('href') === '/projects');
    expect(backLink).toBeDefined();
  });

  it('renders metrics for dalist, including the translated encryption value', () => {
    renderProjectDetail('dalist');
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText(formatInt(facts.projects.dalist.tests.total, 'en'))).toBeInTheDocument();
    expect(screen.getByText('Notes encrypted at rest')).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();
  });

  it('renders all dstash metrics', () => {
    renderProjectDetail('dstash');
    expect(screen.getByText(formatInt(facts.projects.dstash.tests.total, 'en'))).toBeInTheDocument();
    expect(screen.getByText('Signed URLs + API Keys')).toBeInTheDocument();
    expect(screen.getByText('Full dashboard')).toBeInTheDocument();
  });

  it('clicking back link tracks project:back event', async () => {
    const user = userEvent.setup();
    renderProjectDetail('dauth');
    const backLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === '/projects');
    await user.click(backLink!);
    expect(trackEvent).toHaveBeenCalledWith('project:back');
  });

  it('clicking visit link tracks project:visit-live event', async () => {
    const user = userEvent.setup();
    renderProjectDetail('dauth');
    const visitLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === 'https://dauth.ovh');
    await user.click(visitLink!);
    expect(trackEvent).toHaveBeenCalledWith('project:visit-live', { slug: 'dauth' });
  });

  it('clicking GitHub link tracks project:github event', async () => {
    const user = userEvent.setup();
    renderProjectDetail('dtpf');
    const githubLink = screen
      .getAllByRole('link')
      .find((l) => l.getAttribute('href')?.includes('github.com'));
    expect(githubLink).toBeDefined();
    expect(githubLink!.getAttribute('href')).toBe('https://github.com/dtpf-apps/dtpf-web');
    await user.click(githubLink!);
    expect(trackEvent).toHaveBeenCalledWith('project:github', { slug: 'dtpf' });
  });

  it('project without githubUrl does not show GitHub link', () => {
    renderProjectDetail('dauth');
    const githubLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.includes('github.com'));
    expect(githubLinks.length).toBe(0);
  });
});
