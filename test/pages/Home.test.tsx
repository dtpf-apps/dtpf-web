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
    expect(screen.getByText('2.400+')).toBeInTheDocument();
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
});
