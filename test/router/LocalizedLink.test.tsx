import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router';
import { LocalizedLink, LocalizedNavLink, LocalizedNavigate } from '../../src/router/LocalizedLink';

function Where() {
  return <span data-testid="where">{useLocation().pathname}</span>;
}

function at(route: string, ui: React.ReactElement) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe('LocalizedLink', () => {
  it('leaves the target unprefixed on a Spanish URL', () => {
    at('/about', <LocalizedLink to="/projects">p</LocalizedLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects');
  });

  it('prefixes the target on an English URL', () => {
    at('/en/about', <LocalizedLink to="/projects">p</LocalizedLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/projects');
  });

  it('maps the home to /en on an English URL', () => {
    at('/en', <LocalizedLink to="/">h</LocalizedLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en');
  });

  it('does not double-prefix a target that is already English', () => {
    at('/en', <LocalizedLink to="/en/contact">c</LocalizedLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/contact');
  });

  it('passes external-style props through', () => {
    at('/en', <LocalizedLink to="/about" className="x" aria-label="about-link" />);
    expect(screen.getByLabelText('about-link')).toHaveClass('x');
  });
});

describe('LocalizedNavLink', () => {
  it('prefixes the href and marks the English home active only on /en (end)', () => {
    at(
      '/en/projects',
      <>
        <LocalizedNavLink to="/" end>
          home
        </LocalizedNavLink>
        <LocalizedNavLink to="/projects">projects</LocalizedNavLink>
      </>
    );
    expect(screen.getByText('home')).toHaveAttribute('href', '/en');
    expect(screen.getByText('home')).not.toHaveAttribute('aria-current');
    expect(screen.getByText('projects')).toHaveAttribute('href', '/en/projects');
    expect(screen.getByText('projects')).toHaveAttribute('aria-current', 'page');
  });
});

describe('LocalizedNavigate', () => {
  it('redirects within the language of the current URL', () => {
    at(
      '/en/projects/nope',
      <Routes>
        <Route path="/en/projects/nope" element={<LocalizedNavigate to="/projects" replace />} />
        <Route path="*" element={<Where />} />
      </Routes>
    );
    expect(screen.getByTestId('where')).toHaveTextContent('/en/projects');
  });
});
