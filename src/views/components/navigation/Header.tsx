import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'contexts/theme/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { paths, langFromPath, localizePath, stripLang } from 'router/paths';
import { LocalizedLink as Link, LocalizedNavLink as NavLink } from 'router/LocalizedLink';
import { motion, AnimatePresence } from 'framer-motion';
import { AUTHOR } from 'config/site';
import { trackEvent } from 'utils/analytics';
import { trapFocus } from 'utils/focusTrap';
import { STORAGE_KEYS, writeStored } from 'utils/storage';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`;

export default function Header() {
  const { t, i18n } = useTranslation();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  // The button names the language the URL is NOT in; i18next only follows the URL.
  const urlLang = langFromPath(pathname);
  function toggleLang() {
    const next = urlLang === 'es' ? 'en' : 'es';
    void i18n.changeLanguage(next);
    writeStored(STORAGE_KEYS.lang, next);
    navigate(localizePath(stripLang(pathname), next) + search);
    trackEvent('nav:toggle-language', { lang: next });
  }

  function onToggleTheme() {
    toggleTheme();
    trackEvent('nav:toggle-theme', { theme: isDark ? 'light' : 'dark' });
  }

  // Opening moves focus into the dialog; closing returns it to the button that opened it.
  // On a plain page load nothing was open, so focus stays where the browser put it.
  useEffect(() => {
    if (mobileOpen) closeButtonRef.current?.focus();
    else if (wasOpenRef.current) menuButtonRef.current?.focus();
    wasOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  const navLinks = [
    { to: paths.home, label: t('nav_home') },
    { to: paths.projects, label: t('nav_projects') },
    { to: paths.platform, label: t('nav_platform') },
    { to: paths.about, label: t('nav_about') },
    { to: paths.contact, label: t('nav_contact') },
  ];

  function handleMobileKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      setMobileOpen(false);
      return;
    }
    trapFocus(e);
  }

  return (
    <>
      <header className="sticky top-0 z-50 print:hidden border-b border-border bg-bg-primary/85 backdrop-blur-xl">
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
              {urlLang === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={onToggleTheme}
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
            aria-label={t('open_menu')}
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
            className="fixed inset-0 z-[999] overflow-y-auto bg-bg-primary"
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
                  {urlLang === 'es' ? 'EN' : 'ES'}
                </button>
                <button
                  onClick={onToggleTheme}
                  aria-label={t('theme_toggle')}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted"
                >
                  {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                </button>
              </div>
              <div className="mt-4 flex gap-5">
                <a
                  href={AUTHOR.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-muted hover:text-accent"
                  onClick={() => trackEvent('nav:mobile-linkedin')}
                >
                  LinkedIn
                  <span className="sr-only"> ({t('open_new_window')})</span>
                </a>
                <a
                  href={AUTHOR.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-muted hover:text-accent"
                  onClick={() => trackEvent('nav:mobile-github')}
                >
                  GitHub
                  <span className="sr-only"> ({t('open_new_window')})</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
