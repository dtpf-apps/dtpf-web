import { useState, useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { langFromPath, localizePath, stripLang } from 'router/paths';
import Header from 'views/components/navigation/Header';
import Footer from 'views/components/navigation/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import useAnalyticsPageView from 'hooks/useAnalyticsPageView';

export default function PortfolioLayout() {
  const { t, i18n } = useTranslation();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState('');
  useAnalyticsPageView();

  const urlLang = langFromPath(pathname);

  // The URL is the source of truth; before paint, so the first frame is not in the wrong language.
  useLayoutEffect(() => {
    if (i18n.language !== urlLang) void i18n.changeLanguage(urlLang);
  }, [i18n, urlLang]);

  // Only an explicit choice (the toggle) is saved, so only that redirects: a crawler has no
  // storage and keeps the URL it asked for. Runs once, on arrival.
  useEffect(() => {
    const saved = localStorage.getItem('dtpf-lang');
    if ((saved === 'es' || saved === 'en') && saved !== urlLang) {
      navigate(localizePath(stripLang(pathname), saved) + search + hash, { replace: true });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnnouncement(document.title), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
      >
        {t('skip_to_content')}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      <Footer />
    </div>
  );
}
