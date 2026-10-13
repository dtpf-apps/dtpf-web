import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router';
import { ThemeProvider } from '../../src/contexts/theme/ThemeContext';
import i18n from '../../src/utils/i18n';
import PortfolioLayout from '../../src/views/layouts/PortfolioLayout';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

function Where() {
  return <span data-testid="where">{useLocation().pathname}</span>;
}

function renderLayout(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ThemeProvider>
        <Routes>
          <Route element={<PortfolioLayout />}>
            <Route path="*" element={<Where />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('PortfolioLayout language handling', () => {
  beforeEach(async () => {
    localStorage.removeItem('dtpf-lang');
    await i18n.changeLanguage('en');
  });
  afterEach(async () => {
    localStorage.removeItem('dtpf-lang');
    await i18n.changeLanguage('en');
  });

  it('aligns the UI language with a Spanish URL', async () => {
    renderLayout('/about');
    await waitFor(() => expect(i18n.language).toBe('es'));
    expect(document.documentElement.lang).toBe('es');
  });

  it('keeps the English UI on an /en URL', async () => {
    await i18n.changeLanguage('es');
    renderLayout('/en/about');
    await waitFor(() => expect(i18n.language).toBe('en'));
  });

  it('does not redirect on the browser language alone: no saved choice, no move', async () => {
    renderLayout('/about');
    expect(screen.getByTestId('where')).toHaveTextContent('/about');
  });

  it('sends a saved English choice from a Spanish URL to its /en twin', async () => {
    localStorage.setItem('dtpf-lang', 'en');
    renderLayout('/about');
    await waitFor(() => expect(screen.getByTestId('where')).toHaveTextContent('/en/about'));
  });

  it('sends a saved Spanish choice from an English URL to the unprefixed twin', async () => {
    localStorage.setItem('dtpf-lang', 'es');
    renderLayout('/en');
    await waitFor(() => expect(screen.getByTestId('where')).toHaveTextContent(/^\/$/));
  });

  it('leaves a URL alone when it already matches the saved choice', async () => {
    localStorage.setItem('dtpf-lang', 'en');
    renderLayout('/en/contact');
    expect(screen.getByTestId('where')).toHaveTextContent('/en/contact');
  });
});
