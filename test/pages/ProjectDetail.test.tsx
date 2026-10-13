import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from '../../src/contexts/theme/ThemeContext';
import i18n from '../../src/utils/i18n';
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

function externalLinks() {
  return screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('https://'));
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

  it('redirects the retired portfolio slug to the list (the site now lives in the footer)', () => {
    renderProjectDetail('dtpf');
    expect(screen.getByTestId('projects-page')).toBeInTheDocument();
  });

  it('shows metrics for dauth with the measured, language-formatted test count', () => {
    renderProjectDetail('dauth');
    expect(screen.getByText('Active tenants')).toBeInTheDocument();
    expect(screen.getByText(formatInt(facts.projects.dauth.tests.total, 'en'))).toBeInTheDocument();
    expect(screen.queryByText('1.702')).not.toBeInTheDocument();
  });

  it('uses the long tagline when the project has one', () => {
    renderProjectDetail('dauth');
    expect(
      screen.getByText('A passwordless auth system that serves as infrastructure for all my applications.')
    ).toBeInTheDocument();
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
    const visitLink = externalLinks().find((l) => l.getAttribute('href') === 'https://dauth.ovh');
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
    expect(screen.getByText(/Full player, playlists, search, CMS/)).toBeInTheDocument();
    expect(screen.queryByText(/The problem\./)).not.toBeInTheDocument();
    expect(screen.getByText("Master's project (2023)")).toBeInTheDocument();
  });

  it('has back navigation link to projects page', () => {
    renderProjectDetail('dauth');
    const backLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === '/projects');
    expect(backLink).toBeDefined();
  });

  it('renders metrics for dalist, including the translated encryption value', () => {
    renderProjectDetail('dalist');
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText(formatInt(facts.projects.dalist.tests.total, 'en'))).toBeInTheDocument();
    expect(screen.getByText('Notes encrypted at rest')).toBeInTheDocument();
    expect(screen.getByText('Google Play')).toBeInTheDocument();
  });

  it('links dalist to Google Play and tracks the click', async () => {
    const user = userEvent.setup();
    renderProjectDetail('dalist');
    const storeLink = externalLinks().find((l) => l.getAttribute('href')?.includes('play.google.com'));
    expect(storeLink).toBeDefined();
    await user.click(storeLink!);
    expect(trackEvent).toHaveBeenCalledWith('project:store', { slug: 'dalist' });
  });

  it('shows the official Google Play badge for dalist, linking to the store and tracked', async () => {
    const user = userEvent.setup();
    renderProjectDetail('dalist');
    const badge = screen.getByRole('img', { name: 'Get it on Google Play' });
    expect(badge).toHaveAttribute('src', '/badges/google-play-en.png');
    const link = badge.closest('a')!;
    expect(link).toHaveAttribute('href', expect.stringContaining('play.google.com'));
    await user.click(link);
    expect(trackEvent).toHaveBeenCalledWith('project:store', { slug: 'dalist' });
  });

  it('serves the Spanish badge artwork when the language is Spanish', async () => {
    await i18n.changeLanguage('es');
    try {
      renderProjectDetail('dalist');
      const badge = screen.getByRole('img', { name: 'Ver en Google Play' });
      expect(badge).toHaveAttribute('src', '/badges/google-play-es.png');
      expect(badge.closest('a')).toHaveAccessibleName('Ver en Google Play');
    } finally {
      await i18n.changeLanguage('en');
    }
  });

  it('renders the Screenshots section with thumbnails for dcompany', () => {
    renderProjectDetail('dcompany');
    expect(screen.getByRole('heading', { level: 2, name: 'Screenshots' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^Enlarge screenshot:/ })).toHaveLength(2);
  });

  it('renders no Screenshots section for a project without media', () => {
    renderProjectDetail('dwealth');
    expect(screen.queryByRole('heading', { name: 'Screenshots' })).not.toBeInTheDocument();
  });

  it('renders all dstash metrics', () => {
    renderProjectDetail('dstash');
    expect(screen.getByText(formatInt(facts.projects.dstash.tests.total, 'en'))).toBeInTheDocument();
    expect(screen.getByText('Signed URLs + API Keys')).toBeInTheDocument();
    expect(screen.getByText('Full dashboard')).toBeInTheDocument();
  });

  it('shows dcompany as a private beta with the measured MCP tool count', () => {
    renderProjectDetail('dcompany');
    expect(screen.getByText('Private beta')).toBeInTheDocument();
    expect(screen.getByText('Private beta · access on request')).toBeInTheDocument();
    expect(screen.getByText('MCP tools')).toBeInTheDocument();
    const floored = Math.floor(facts.projects.dcompany.mcpTools! / 10) * 10;
    expect(screen.getByText(`${floored}+`)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${floored}\\+ MCP tools let you run the company`))
    ).toBeInTheDocument();
    expect(screen.getByText(formatInt(facts.projects.dcompany.tests.total, 'en'))).toBeInTheDocument();
  });

  it('shows dinventory with its measured test count and self-hosted AI', () => {
    renderProjectDetail('dinventory');
    expect(screen.getByText(formatInt(facts.projects.dinventory.tests.total, 'en'))).toBeInTheDocument();
    expect(screen.getByText('Self-hosted vision and voice')).toBeInTheDocument();
    expect(externalLinks().some((l) => l.getAttribute('href') === 'https://dinventory.dtpf.es')).toBe(true);
  });

  it('marks petitairam.com as client work for the AIRAM brand', () => {
    renderProjectDetail('airam');
    expect(screen.getByText('Client work')).toBeInTheDocument();
    expect(screen.getByText('AIRAM')).toBeInTheDocument();
    expect(screen.getByText('Bizum and bank transfer')).toBeInTheDocument();
    expect(externalLinks().some((l) => l.getAttribute('href') === 'https://petitairam.com')).toBe(true);
  });

  it('renders dwealth as private: status note, no visit button, measured figures', () => {
    renderProjectDetail('dwealth');
    expect(screen.getByText('Private')).toBeInTheDocument();
    expect(screen.getByText('Private app · no public URL')).toBeInTheDocument();
    expect(externalLinks()).toHaveLength(0);
    expect(screen.getByText(formatInt(facts.projects.dwealth.tests.total, 'en'))).toBeInTheDocument();
    // Decimal128 is both a stack tag and the precision metric; FIFO is the metric alone.
    expect(screen.getAllByText('Decimal128')).toHaveLength(2);
    expect(screen.getByText('FIFO')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/\{\{/);
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
    const visitLink = externalLinks().find((l) => l.getAttribute('href') === 'https://dauth.ovh');
    await user.click(visitLink!);
    expect(trackEvent).toHaveBeenCalledWith('project:visit-live', { slug: 'dauth' });
  });

  it('project without githubUrl does not show GitHub link', () => {
    renderProjectDetail('dauth');
    const githubLinks = externalLinks().filter((l) => l.getAttribute('href')?.includes('github.com'));
    expect(githubLinks.length).toBe(0);
  });
});
