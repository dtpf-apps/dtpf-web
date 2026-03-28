import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'contexts/theme/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { paths } from 'router/paths';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from 'utils/analytics';

function Header() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleLang = useCallback(() => {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('dtpf-lang', next);
    trackEvent('nav:toggle-language', { lang: next });
  }, [i18n]);

  useEffect(() => {
    if (mobileOpen) {
      closeButtonRef.current?.focus();
    } else {
      menuButtonRef.current?.focus();
    }
  }, [mobileOpen]);

  const navLinks = [
    { to: paths.home, label: t('nav_home') },
    { to: paths.projects, label: t('nav_projects') },
    { to: paths.about, label: t('nav_about') },
    { to: paths.contact, label: t('nav_contact') },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`;

  function handleMobileKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      setMobileOpen(false);
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-12">
          {/* Logo */}
          <Link
            to={paths.home}
            onClick={() => trackEvent('nav:logo-click')}
            className="font-heading text-lg font-bold tracking-tight text-text-primary no-underline"
          >
            dtpf
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={linkClass}
                onClick={() => trackEvent('nav:navigate', { page: l.to })}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden items-center gap-2.5 md:flex">
            <button
              onClick={toggleLang}
              aria-label={t('lang_toggle')}
              className="rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => {
                toggleTheme();
                trackEvent('nav:toggle-theme', { theme: isDark ? 'light' : 'dark' });
              }}
              aria-label={t('theme_toggle')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
            >
              {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            onClick={() => {
              setMobileOpen(true);
              trackEvent('nav:mobile-menu-open');
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-primary md:hidden"
            aria-label="Menu"
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] bg-bg-primary"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav_mobile_menu')}
            onKeyDown={handleMobileKeyDown}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="font-heading text-lg font-bold text-text-primary">dtpf</span>
              <button
                ref={closeButtonRef}
                onClick={() => {
                  setMobileOpen(false);
                  trackEvent('nav:mobile-menu-close');
                }}
                aria-label={t('close_menu')}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-primary"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-col items-start justify-center gap-2 px-8 py-16">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.2 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => {
                      setMobileOpen(false);
                      trackEvent('nav:mobile-navigate', { page: l.to });
                    }}
                    className={({ isActive }) =>
                      `font-heading text-3xl font-bold tracking-tight ${isActive ? 'text-accent' : 'text-text-primary'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-10 flex gap-3 border-t border-border pt-6">
                <button
                  onClick={toggleLang}
                  aria-label={t('lang_toggle')}
                  className="rounded-lg border border-border px-3 py-2 font-mono text-xs font-semibold text-text-muted"
                >
                  {i18n.language === 'es' ? 'EN' : 'ES'}
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    trackEvent('nav:toggle-theme', { theme: isDark ? 'light' : 'dark' });
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted"
                >
                  {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                </button>
              </div>
              <div className="mt-4 flex gap-5">
                <a
                  href="https://www.linkedin.com/in/david-tomas-pizarro-frick"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-muted hover:text-accent"
                  onClick={() => trackEvent('nav:mobile-linkedin')}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/DTPF"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-muted hover:text-accent"
                  onClick={() => trackEvent('nav:mobile-github')}
                >
                  GitHub
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Header);
