import { screen } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Projects from '../../src/views/pages/Projects';
import { projects } from '../../src/config/projects';

describe('Projects', () => {
  it('renders all 5 projects', () => {
    renderWithProviders(<Projects />);
    // Each project renders an h3 heading with its translated name
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBe(projects.length);
  });

  it('each project has a case study link', () => {
    renderWithProviders(<Projects />);
    const caseStudyLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('/projects/'));
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
});
