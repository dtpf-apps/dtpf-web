import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from '../../src/contexts/theme/ThemeContext';
import '../../src/utils/i18n';
import ProjectDetail from '../../src/views/pages/ProjectDetail';

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
  it('renders project detail for valid slug', () => {
    renderProjectDetail('dauth');
    expect(screen.getByText('React 19')).toBeInTheDocument();
  });

  it('redirects to /projects for invalid slug', () => {
    renderProjectDetail('nonexistent');
    expect(screen.getByTestId('projects-page')).toBeInTheDocument();
  });

  it('shows metrics for dauth', () => {
    renderProjectDetail('dauth');
    expect(screen.getByText('Tenants activos')).toBeInTheDocument();
    expect(screen.getByText('1.702')).toBeInTheDocument();
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

  it('renders metrics for dalist', () => {
    renderProjectDetail('dalist');
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('1.621')).toBeInTheDocument();
  });

  it('renders all dstash metrics', () => {
    renderProjectDetail('dstash');
    expect(screen.getByText('2.114')).toBeInTheDocument();
    expect(screen.getByText('Signed URLs + API Keys')).toBeInTheDocument();
  });
});
