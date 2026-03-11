import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from '../../src/contexts/theme/ThemeContext';
import '../../src/utils/i18n';

// Lightweight page stubs that simulate each route
const Home = () => <div data-testid="home-page">Home</div>;
const Projects = () => <div data-testid="projects-page">Projects</div>;
const About = () => <div data-testid="about-page">About</div>;
const Contact = () => <div data-testid="contact-page">Contact</div>;
const NotFound = () => <div data-testid="not-found-page">404</div>;
const Nav = () => (
  <nav>
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
);

function renderWithRoutes(initialRoute: string) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('Navigation routing', () => {
  it('renders home page at /', () => {
    renderWithRoutes('/');
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders projects page at /projects', () => {
    renderWithRoutes('/projects');
    expect(screen.getByTestId('projects-page')).toBeInTheDocument();
  });

  it('renders about page at /about', () => {
    renderWithRoutes('/about');
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('renders contact page at /contact', () => {
    renderWithRoutes('/contact');
    expect(screen.getByTestId('contact-page')).toBeInTheDocument();
  });

  it('renders 404 for unknown routes', () => {
    renderWithRoutes('/non-existent-page');
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('renders 404 for deeply nested unknown routes', () => {
    renderWithRoutes('/some/deep/path/that/does/not/exist');
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
