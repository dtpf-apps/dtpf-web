import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import Header from 'views/components/navigation/Header';
import Footer from 'views/components/navigation/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import useAnalyticsPageView from 'hooks/useAnalyticsPageView';

export default function PortfolioLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  useAnalyticsPageView();

  useEffect(() => {
    const timer = setTimeout(() => setAnnouncement(document.title), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-[#0B0F19]"
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
