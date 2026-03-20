import { createBrowserRouter } from 'react-router';
import { paths } from './paths';
import PortfolioLayout from 'views/layouts/PortfolioLayout';
import { Suspense } from 'react';
import lazyWithRetry from 'utils/lazyWithRetry';

const Home = lazyWithRetry(() => import('views/pages/Home'));
const Projects = lazyWithRetry(() => import('views/pages/Projects'));
const ProjectDetail = lazyWithRetry(() => import('views/pages/ProjectDetail'));
const About = lazyWithRetry(() => import('views/pages/About'));
const Contact = lazyWithRetry(() => import('views/pages/Contact'));
const PrivacyPolicy = lazyWithRetry(() => import('views/pages/PrivacyPolicy'));
const NotFound = lazyWithRetry(() => import('views/pages/NotFound'));

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PortfolioLayout />,
    children: [
      {
        path: paths.home,
        element: (
          <Lazy>
            <Home />
          </Lazy>
        ),
      },
      {
        path: paths.projects,
        element: (
          <Lazy>
            <Projects />
          </Lazy>
        ),
      },
      {
        path: paths.projectDetail,
        element: (
          <Lazy>
            <ProjectDetail />
          </Lazy>
        ),
      },
      {
        path: paths.about,
        element: (
          <Lazy>
            <About />
          </Lazy>
        ),
      },
      {
        path: paths.contact,
        element: (
          <Lazy>
            <Contact />
          </Lazy>
        ),
      },
      {
        path: paths.privacyPolicy,
        element: (
          <Lazy>
            <PrivacyPolicy />
          </Lazy>
        ),
      },
      {
        path: '*',
        element: (
          <Lazy>
            <NotFound />
          </Lazy>
        ),
      },
    ],
  },
]);
