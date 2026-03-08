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
    expect(screen.getByText('929')).toBeInTheDocument();
  });

  it('shows stack tags', () => {
    renderProjectDetail('dstash');
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });

  it('has visit link to live URL', () => {
    renderProjectDetail('dauth');
    const links = screen.getAllByRole('link');
    const visitLink = links.find((l) => l.getAttribute('href') === 'https://dauth.ovh');
    expect(visitLink).toBeDefined();
  });
});
