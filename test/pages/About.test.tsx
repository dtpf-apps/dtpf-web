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

  it('renders all 3 experience entries with company names', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('Hub4Retail')).toBeInTheDocument();
    expect(screen.getByText('Palmira')).toBeInTheDocument();
    expect(screen.getByText('Assembler Institute of Technology')).toBeInTheDocument();
  });

  it('renders experience periods', () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/Jul 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Jun 2021.*Jun 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Oct 2022.*May 2023/)).toBeInTheDocument();
  });

  it('renders experience role descriptions', () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/SaaS platform for fashion retail/)).toBeInTheDocument();
    expect(screen.getByText(/Mobile and web apps/)).toBeInTheDocument();
  });

  it('renders frontend tools in grid', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('Framer Motion')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('renders backend tools in grid', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('REST APIs')).toBeInTheDocument();
    expect(screen.getByText('WebSockets')).toBeInTheDocument();
  });

  it('renders bio paragraphs', () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/software developer at Hub4Retail/)).toBeInTheDocument();
    expect(screen.getByText(/5 production apps/)).toBeInTheDocument();
    expect(screen.getByText(/taking an idea from zero/)).toBeInTheDocument();
  });

  it('shows role and location', () => {
    renderWithProviders(<About />);
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('Mallorca, Spain')).toBeInTheDocument();
  });
});
