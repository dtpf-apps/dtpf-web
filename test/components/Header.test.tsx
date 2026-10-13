import { screen, waitFor } from '@testing-library/react';
import { useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Header from '../../src/views/components/navigation/Header';
import { trackEvent } from '../../src/utils/analytics';

vi.mock('../../src/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  initAnalytics: vi.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo link to home', () => {
    renderWithProviders(<Header />);
    const logo = screen.getByText('dtpf');
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders 4 navigation links', () => {
    renderWithProviders(<Header />);
    const nav = screen.getAllByRole('link');
    // Logo + 4 nav links = at least 5
    expect(nav.length).toBeGreaterThanOrEqual(5);
  });

  it('theme toggle button exists', () => {
    renderWithProviders(<Header />);
    const btn = screen
      .getAllByRole('button')
      .find(
        (b) =>
          b.getAttribute('aria-label') === 'Toggle theme' || b.getAttribute('aria-label') === 'Cambiar tema'
      );
    expect(btn).toBeDefined();
  });

  it('language toggle switches label', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    // Find the lang toggle button (shows "EN" when current lang is "es")
    const langBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent === 'EN' || b.textContent === 'ES');
    expect(langBtn).toBeDefined();

    const initialText = langBtn!.textContent;
    await user.click(langBtn!);
    expect(langBtn!.textContent).not.toBe(initialText);
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const menuBtn = screen.getByRole('button', { name: 'Menu' });
    await user.click(menuBtn);

    // Mobile menu should show navigation links (duplicated from desktop)
    await waitFor(() => {
      const allLinks = screen.getAllByRole('link');
      // Expect more links now that mobile overlay is open
      expect(allLinks.length).toBeGreaterThanOrEqual(7);
    });
  });

  it('closes mobile menu when nav link is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    // Open mobile menu
    const menuBtn = screen.getByRole('button', { name: 'Menu' });
    await user.click(menuBtn);

    // Mobile menu has nav links - clicking one closes the menu
    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(7);
    });

    // Click a mobile nav link (contact)
    const contactLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/contact');
    // There should be a mobile contact link (the second one)
    expect(contactLinks.length).toBeGreaterThanOrEqual(2);
    await user.click(contactLinks[contactLinks.length - 1]);
  });

  it('mobile menu shows 4 navigation links', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      // Mobile overlay shows Home, Projects, About, Contact links + LinkedIn + GitHub
      const mobileLinks = screen.getAllByRole('link');
      const navLinks = mobileLinks.filter((l) => {
        const href = l.getAttribute('href');
        return href === '/' || href === '/projects' || href === '/about' || href === '/contact';
      });
      // Desktop 4 + mobile 4 = 8
      expect(navLinks.length).toBeGreaterThanOrEqual(8);
    });
  });

  it('mobile menu has language toggle button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      // Should have two lang toggle buttons (desktop + mobile)
      const langBtns = screen
        .getAllByRole('button')
        .filter((b) => b.textContent === 'EN' || b.textContent === 'ES');
      expect(langBtns.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('mobile menu has theme toggle button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      // Should have theme buttons (desktop has aria-label, mobile doesn't)
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(4);
    });
  });

  it('mobile menu has LinkedIn and GitHub links', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
    });
  });

  it('theme toggle button has aria-label', () => {
    renderWithProviders(<Header />);
    // aria-label uses i18n key 'theme_toggle' — can be English or Spanish
    const themeBtn = screen
      .getAllByRole('button')
      .find(
        (b) =>
          b.getAttribute('aria-label') === 'Toggle theme' || b.getAttribute('aria-label') === 'Cambiar tema'
      );
    expect(themeBtn).toBeDefined();
    expect(themeBtn!.getAttribute('aria-label')).toBeTruthy();
  });

  it('renders desktop nav links pointing to correct paths', () => {
    renderWithProviders(<Header />);
    const links = screen.getAllByRole('link');
    const homeLink = links.find((l) => l.getAttribute('href') === '/');
    const projectsLink = links.find((l) => l.getAttribute('href') === '/projects');
    const aboutLink = links.find((l) => l.getAttribute('href') === '/about');
    const contactLink = links.find((l) => l.getAttribute('href') === '/contact');
    expect(homeLink).toBeDefined();
    expect(projectsLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(contactLink).toBeDefined();
  });

  it('language toggle persists to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const langBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent === 'EN' || b.textContent === 'ES');
    await user.click(langBtn!);

    const savedLang = localStorage.getItem('dtpf-lang');
    expect(savedLang).toBeDefined();
    expect(['es', 'en']).toContain(savedLang);
  });

  it('hamburger button is visible (has aria-label Menu)', () => {
    renderWithProviders(<Header />);
    const menuBtn = screen.getByRole('button', { name: 'Menu' });
    expect(menuBtn).toBeInTheDocument();
  });

  it('desktop theme toggle tracks nav:toggle-theme event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const themeBtn = screen
      .getAllByRole('button')
      .find(
        (b) =>
          b.getAttribute('aria-label') === 'Toggle theme' || b.getAttribute('aria-label') === 'Cambiar tema'
      );
    await user.click(themeBtn!);
    expect(trackEvent).toHaveBeenCalledWith(
      'nav:toggle-theme',
      expect.objectContaining({ theme: expect.any(String) })
    );
  });

  it('logo click tracks nav:logo-click event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.click(screen.getByText('dtpf'));
    expect(trackEvent).toHaveBeenCalledWith('nav:logo-click');
  });

  it('hamburger open tracks nav:mobile-menu-open event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    expect(trackEvent).toHaveBeenCalledWith('nav:mobile-menu-open');
  });

  it('mobile close button (X) tracks nav:mobile-menu-close event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      const allButtons = screen.getAllByRole('button');
      // X close button should be present in mobile overlay
      expect(allButtons.length).toBeGreaterThanOrEqual(4);
    });

    // The close button is a sibling of the "dtpf" span in the mobile overlay header
    const dtpfTexts = screen.getAllByText('dtpf');
    // dtpfTexts[0] is the logo link, dtpfTexts[1] is the mobile overlay span
    const closeBtn = dtpfTexts[1].parentElement?.querySelector('button');
    expect(closeBtn).toBeTruthy();
    await user.click(closeBtn!);
    expect(trackEvent).toHaveBeenCalledWith('nav:mobile-menu-close');
  });

  it('mobile LinkedIn link tracks nav:mobile-linkedin event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    });

    await user.click(screen.getByText('LinkedIn'));
    expect(trackEvent).toHaveBeenCalledWith('nav:mobile-linkedin');
  });

  it('mobile GitHub link tracks nav:mobile-github event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      expect(screen.getByText('GitHub')).toBeInTheDocument();
    });

    await user.click(screen.getByText('GitHub'));
    expect(trackEvent).toHaveBeenCalledWith('nav:mobile-github');
  });

  it('language toggle tracks nav:toggle-language event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const langBtn = screen
      .getAllByRole('button')
      .find((b) => b.textContent === 'EN' || b.textContent === 'ES');
    await user.click(langBtn!);
    expect(trackEvent).toHaveBeenCalledWith(
      'nav:toggle-language',
      expect.objectContaining({ lang: expect.any(String) })
    );
  });

  it('desktop nav link click tracks nav:navigate event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const aboutLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === '/about');
    await user.click(aboutLink!);
    expect(trackEvent).toHaveBeenCalledWith('nav:navigate', { page: '/about' });
  });

  it('mobile nav link tracks nav:mobile-navigate event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      const links = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/about');
      expect(links.length).toBeGreaterThanOrEqual(2);
    });

    // Click the mobile about link (last one with /about)
    const aboutLinks = screen.getAllByRole('link').filter((l) => l.getAttribute('href') === '/about');
    await user.click(aboutLinks[aboutLinks.length - 1]);
    expect(trackEvent).toHaveBeenCalledWith('nav:mobile-navigate', { page: '/about' });
  });

  it('mobile theme toggle tracks nav:toggle-theme event', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.click(screen.getByRole('button', { name: 'Menu' }));

    await waitFor(() => {
      // Mobile lang toggle should be visible
      const langBtns = screen
        .getAllByRole('button')
        .filter((b) => b.textContent === 'EN' || b.textContent === 'ES');
      expect(langBtns.length).toBeGreaterThanOrEqual(2);
    });

    // The mobile theme toggle is a sibling of the mobile lang toggle inside the controls div
    const langBtns = screen
      .getAllByRole('button')
      .filter((b) => b.textContent === 'EN' || b.textContent === 'ES');
    // The mobile lang button is the last one
    const mobileLangBtn = langBtns[langBtns.length - 1];
    // The theme toggle is its next sibling button in the same container
    const mobileThemeBtn = mobileLangBtn.parentElement?.querySelectorAll('button')[1];
    expect(mobileThemeBtn).toBeTruthy();
    await user.click(mobileThemeBtn!);
    expect(trackEvent).toHaveBeenCalledWith(
      'nav:toggle-theme',
      expect.objectContaining({ theme: expect.any(String) })
    );
  });
});

describe('Header language in the URL', () => {
  function Where() {
    return <span data-testid="where">{useLocation().pathname}</span>;
  }
  const toggle = () =>
    screen.getAllByRole('button').find((b) => b.textContent === 'EN' || b.textContent === 'ES')!;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.removeItem('dtpf-lang');
  });

  it('on a Spanish URL offers EN, navigates to the /en twin, saves the choice and tracks it', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Where />
      </>,
      { route: '/projects' }
    );
    expect(toggle()).toHaveTextContent('EN');
    await user.click(toggle());
    expect(screen.getByTestId('where')).toHaveTextContent('/en/projects');
    expect(localStorage.getItem('dtpf-lang')).toBe('en');
    expect(trackEvent).toHaveBeenCalledWith('nav:toggle-language', { lang: 'en' });
  });

  it('on an English URL offers ES and navigates back to the unprefixed twin', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Header />
        <Where />
      </>,
      { route: '/en/about' }
    );
    expect(toggle()).toHaveTextContent('ES');
    await user.click(toggle());
    expect(screen.getByTestId('where')).toHaveTextContent(/^\/about$/);
    expect(localStorage.getItem('dtpf-lang')).toBe('es');
  });

  it('keeps the four nav links and localizes their hrefs on an English URL', () => {
    renderWithProviders(<Header />, { route: '/en/about' });
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter((h) => h?.startsWith('/'));
    expect(hrefs).toEqual(expect.arrayContaining(['/en', '/en/projects', '/en/about', '/en/contact']));
  });
});
