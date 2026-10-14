import { Suspense, type ComponentType, type ReactNode } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router';
import { paths, localizePath, type Lang } from './paths';
import PortfolioLayout from 'views/layouts/PortfolioLayout';
import { RouteErrorFallback } from '../ErrorBoundary';
import lazyWithRetry from 'utils/lazyWithRetry';

const Home = lazyWithRetry(() => import('views/pages/Home'));
const Projects = lazyWithRetry(() => import('views/pages/Projects'));
const ProjectDetail = lazyWithRetry(() => import('views/pages/ProjectDetail'));
const Platform = lazyWithRetry(() => import('views/pages/Platform'));
const About = lazyWithRetry(() => import('views/pages/About'));
const Contact = lazyWithRetry(() => import('views/pages/Contact'));
const Cv = lazyWithRetry(() => import('views/pages/Cv'));
const PrivacyPolicy = lazyWithRetry(() => import('views/pages/PrivacyPolicy'));
const NotFound = lazyWithRetry(() => import('views/pages/NotFound'));

// No loading indicator: a page chunk is a few kB gzipped, and <main> is flex-1 inside the layout, so
// the footer stays at the bottom while it arrives.
function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

const pages: { path: string; Page: ComponentType }[] = [
  { path: paths.home, Page: Home },
  { path: paths.projects, Page: Projects },
  { path: paths.projectDetail, Page: ProjectDetail },
  { path: paths.platform, Page: Platform },
  { path: paths.about, Page: About },
  { path: paths.contact, Page: Contact },
  { path: paths.cv, Page: Cv },
  { path: paths.privacyPolicy, Page: PrivacyPolicy },
];

// One page tree per language, all under the same layout route so toggling the language
// re-renders the shell instead of remounting it.
function pageTree(lang: Lang): RouteObject[] {
  return [
    ...pages.map(({ path, Page }) => ({
      path: localizePath(path, lang),
      element: (
        <Lazy>
          <Page />
        </Lazy>
      ),
    })),
    {
      path: lang === 'en' ? `${localizePath('/', lang)}/*` : '*',
      element: (
        <Lazy>
          <NotFound />
        </Lazy>
      ),
    },
  ];
}

export const routes: RouteObject[] = [
  {
    element: <PortfolioLayout />,
    errorElement: <RouteErrorFallback />,
    children: [...pageTree('es'), ...pageTree('en')],
  },
];

export const router = createBrowserRouter(routes);
