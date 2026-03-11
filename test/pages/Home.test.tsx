import { screen } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Home from '../../src/views/pages/Home';

describe('Home', () => {
  it('renders hero with name heading', () => {
    renderWithProviders(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('shows proof bar with stats', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2.450+')).toBeInTheDocument();
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

  it('renders all 10 stack items', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Tailwind')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
    expect(screen.getByText('Claude')).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
  });

  it('renders stack abbreviations', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(screen.getByText('TS')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('renders proof bar with SaaS years', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('3+')).toBeInTheDocument();
  });

  it('renders external visit links for featured projects', () => {
    renderWithProviders(<Home />);
    const externalLinks = screen.getAllByRole('link').filter((l) => {
      const href = l.getAttribute('href');
      return href?.startsWith('https://') && !href.includes('linkedin') && !href.includes('github');
    });
    expect(externalLinks.length).toBe(4);
  });
});
