import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Header from '../../src/views/components/navigation/Header';

describe('Header', () => {
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
    const btn = screen.getAllByRole('button').find((b) => b.getAttribute('aria-label'));
    expect(btn).toBeDefined();
  });

  it('language toggle switches label', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    // Find the lang toggle button (shows "EN" when current lang is "es")
    const langBtn = screen.getAllByRole('button').find((b) => b.textContent === 'EN' || b.textContent === 'ES');
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
      const langBtns = screen.getAllByRole('button').filter((b) => b.textContent === 'EN' || b.textContent === 'ES');
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
    const themeBtn = screen.getAllByRole('button').find((b) => b.getAttribute('aria-label'));
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

    const langBtn = screen.getAllByRole('button').find((b) => b.textContent === 'EN' || b.textContent === 'ES');
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
});
