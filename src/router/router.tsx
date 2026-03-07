import { createBrowserRouter } from 'react-router';
import { paths } from './paths';
import PortfolioLayout from 'views/layouts/PortfolioLayout';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('views/pages/Home'));
const Projects = lazy(() => import('views/pages/Projects'));
const ProjectDetail = lazy(() => import('views/pages/ProjectDetail'));
const About = lazy(() => import('views/pages/About'));
const Contact = lazy(() => import('views/pages/Contact'));
const PrivacyPolicy = lazy(() => import('views/pages/PrivacyPolicy'));
const NotFound = lazy(() => import('views/pages/NotFound'));

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PortfolioLayout />,
    children: [
      { path: paths.home, element: <Lazy><Home /></Lazy> },
      { path: paths.projects, element: <Lazy><Projects /></Lazy> },
      { path: paths.projectDetail, element: <Lazy><ProjectDetail /></Lazy> },
      { path: paths.about, element: <Lazy><About /></Lazy> },
      { path: paths.contact, element: <Lazy><Contact /></Lazy> },
      { path: paths.privacyPolicy, element: <Lazy><PrivacyPolicy /></Lazy> },
      { path: '*', element: <Lazy><NotFound /></Lazy> },
    ],
  },
]);
