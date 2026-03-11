import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../src/contexts/theme/ThemeContext';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light');
    // Mock matchMedia to prefer dark (default)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query === '(prefers-color-scheme: light)' ? false : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  });

  function renderThemeHook() {
    return renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
  }

  it('defaults to dark theme', () => {
    const { result } = renderThemeHook();
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('toggleTheme switches from dark to light', () => {
    const { result } = renderThemeHook();

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('toggleTheme switches back from light to dark', () => {
    const { result } = renderThemeHook();

    act(() => result.current.toggleTheme());
    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('dark');
  });

  it('persists theme to localStorage', () => {
    const { result } = renderThemeHook();

    act(() => result.current.toggleTheme());

    expect(localStorage.getItem('dtpf-theme')).toBe('light');
  });

  it('reads theme from localStorage on mount', () => {
    localStorage.setItem('dtpf-theme', 'light');
    const { result } = renderThemeHook();
    expect(result.current.theme).toBe('light');
  });

  it('adds "light" class to html when theme is light', () => {
    const { result } = renderThemeHook();

    act(() => result.current.toggleTheme());

    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('removes "light" class when theme is dark', () => {
    localStorage.setItem('dtpf-theme', 'light');
    const { result } = renderThemeHook();

    act(() => result.current.toggleTheme());

    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('throws if useTheme is used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow('useTheme must be used within ThemeProvider');
  });

  it('updates meta theme-color for dark theme', () => {
    // Create meta tag
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', '#F8FAFC');
    document.head.appendChild(meta);

    renderThemeHook();

    // Default is dark
    expect(meta.getAttribute('content')).toBe('#0B0F19');

    document.head.removeChild(meta);
  });

  it('updates meta theme-color for light theme', () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', '#0B0F19');
    document.head.appendChild(meta);

    localStorage.setItem('dtpf-theme', 'light');
    renderThemeHook();

    expect(meta.getAttribute('content')).toBe('#F8FAFC');

    document.head.removeChild(meta);
  });

  it('detects system light preference when no saved theme', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query === '(prefers-color-scheme: light)' ? true : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });

    const { result } = renderThemeHook();
    expect(result.current.theme).toBe('light');
  });
});
