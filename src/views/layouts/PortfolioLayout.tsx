import { Outlet, useLocation } from 'react-router';
import Header from 'views/components/navigation/Header';
import Footer from 'views/components/navigation/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import useAnalyticsPageView from 'hooks/useAnalyticsPageView';

export default function PortfolioLayout() {
  const { pathname } = useLocation();
  useAnalyticsPageView();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
