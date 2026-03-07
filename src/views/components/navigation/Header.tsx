import { memo, useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'contexts/theme/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { paths } from 'router/paths';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLang = useCallback(() => {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('dtpf-lang', next);
  }, [i18n]);

  const navLinks = [
    { to: paths.home, label: t('nav_home') },
    { to: paths.projects, label: t('nav_projects') },
    { to: paths.about, label: t('nav_about') },
    { to: paths.contact, label: t('nav_contact') },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-12">
          {/* Logo */}
          <Link to={paths.home} className="font-heading text-lg font-bold tracking-tight text-text-primary no-underline">
            dtpf
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden items-center gap-2.5 md:flex">
            <button
              onClick={toggleLang}
              className="rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={toggleTheme}
              aria-label={t('theme_toggle')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-primary md:hidden"
            aria-label="Menu"
          >
            <Menu size={18} />
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
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="font-heading text-lg font-bold text-text-primary">
                dtpf
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-primary"
              >
                <X size={18} />
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
                    onClick={() => setMobileOpen(false)}
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
                  className="rounded-lg border border-border px-3 py-2 font-mono text-xs font-semibold text-text-muted"
                >
                  {i18n.language === 'es' ? 'EN' : 'ES'}
                </button>
                <button
                  onClick={toggleTheme}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
              <div className="mt-4 flex gap-5">
                <a href="https://www.linkedin.com/in/david-tomas-pizarro-frick" target="_blank" rel="noreferrer" className="text-sm text-text-muted hover:text-accent">LinkedIn</a>
                <a href="https://github.com/DTPF" target="_blank" rel="noreferrer" className="text-sm text-text-muted hover:text-accent">GitHub</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Header);
