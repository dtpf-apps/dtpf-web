import React, { memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';
import { DauthProvider } from 'dauth-context-react';
import ConnectionProvider from './providers/ConnectionProvider';
import MainMenuProvider from './providers/MainMenuProvider';
import { isLocalhost } from './utils/isLocalhost';
import dbIndexed from './dbIndexed';
import './App.scss';

// Layout
import LayoutAdmin from './views/layouts/LayoutAdmin';
import LayoutBasic from './views/layouts/LayoutBasic';

// Admin Pages
import AdminHome from './views/pages/Admin';
import AdminSignIn from './views/pages/Admin/SignIn';
import AdminMenuWeb from './views/pages/Admin/MenuWeb';
import AdminContactMessages from './views/pages/Admin/ContactMessages';
import AdminEducation from './views/pages/Admin/Education';
import AdminAboutMe from './views/pages/Admin/AboutMeAdmin';

// Web Pages
import Home from './views/pages/Web/Home';
import Education from './views/pages/Web/Education';
import Curriculum from './views/pages/Web/Curriculum';
import Contact from './views/pages/Web/Contact';

// Other
import PrivacyPolicy from './views/pages/PrivacyPolicy';
import Errors from './views/pages/Errors';

function App() {
  dbIndexed();
  return (
    <CookiesProvider>
      <HelmetProvider>
        <DauthProvider
          domainName={import.meta.env.VITE_DAUTH_DOMAIN_NAME || 'dtpf'}
          dauthUrl={import.meta.env.VITE_DAUTH_URL || undefined}
          authProxyPath={
            isLocalhost
              ? `${window.location.protocol}//${window.location.hostname}:3998/api/auth`
              : undefined
          }
        >
          <ConnectionProvider>
            <MainMenuProvider>
              <Router>
              <Routes>
                <Route path="/ad1988/login" element={<AdminSignIn />} />
                <Route path="/ad1988/*" element={<LayoutAdmin />}>
                  <Route index element={<AdminHome />} />
                  <Route path="menu" element={<AdminMenuWeb />} />
                  <Route path="contact-messages" element={<AdminContactMessages />} />
                  <Route path="education" element={<AdminEducation />} />
                  <Route path="about-me" element={<AdminAboutMe />} />
                  <Route path="*" element={<Errors />} />
                </Route>
                <Route path="/*" element={<LayoutBasic />}>
                  <Route index element={<Home />} />
                  <Route path="education" element={<Education />} />
                  <Route path="education/:url" element={<Education />} />
                  <Route path="curriculum" element={<Curriculum />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="*" element={<Errors />} />
                </Route>
              </Routes>
              </Router>
            </MainMenuProvider>
          </ConnectionProvider>
        </DauthProvider>
      </HelmetProvider>
    </CookiesProvider>
  );
}

export default memo(App);
