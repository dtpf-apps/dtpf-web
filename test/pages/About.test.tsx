import { screen } from '@testing-library/react';
import { renderWithProviders } from '../helpers/renderWithProviders';
import About from '../../src/views/pages/About';

describe('About', () => {
  it('renders name and profile initials', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('David T. Pizarro Frick')).toBeInTheDocument();
    expect(screen.getByText('DP')).toBeInTheDocument();
  });

  it('renders experience section with 3 entries', () => {
    renderWithProviders(<About />);
    const experienceHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(experienceHeadings.length).toBe(3);
  });

  it('renders tools grid with 4 categories', () => {
    renderWithProviders(<About />);
    // Tools section has 4 groups of tech items
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Claude')).toBeInTheDocument();
  });

  it('has LinkedIn and GitHub links', () => {
    renderWithProviders(<About />);
    const links = screen.getAllByRole('link');
    const linkedin = links.find((l) => l.getAttribute('href')?.includes('linkedin'));
    const github = links.find((l) => l.getAttribute('href')?.includes('github'));
    expect(linkedin).toBeDefined();
    expect(github).toBeDefined();
  });
});
