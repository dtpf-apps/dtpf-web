import type { ReactElement } from 'react';
import { Routes, Route } from 'react-router';
import { renderWithProviders } from '../helpers/renderWithProviders';
import Home from '../../src/views/pages/Home';
import About from '../../src/views/pages/About';
import Projects from '../../src/views/pages/Projects';
import ProjectDetail from '../../src/views/pages/ProjectDetail';
import Contact from '../../src/views/pages/Contact';
import Platform from '../../src/views/pages/Platform';
import Cv from '../../src/views/pages/Cv';
import PrivacyPolicy from '../../src/views/pages/PrivacyPolicy';
import NotFound from '../../src/views/pages/NotFound';

// Screen readers and crawlers walk a page by its headings, so a level that jumps (h2 → h4) reads as
// a missing section. Each page renders alone here: the outline measured is the page's own, and the
// layout's chrome adds no heading of its own.
const pages: [string, () => ReactElement, string][] = [
  ['Home', () => <Home />, '/'],
  ['About', () => <About />, '/about'],
  ['Projects', () => <Projects />, '/projects'],
  [
    'ProjectDetail',
    () => (
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    ),
    '/projects/dauth',
  ],
  ['Platform', () => <Platform />, '/platform'],
  ['Contact', () => <Contact />, '/contact'],
  ['Cv', () => <Cv />, '/cv'],
  ['PrivacyPolicy', () => <PrivacyPolicy />, '/privacy-policy'],
  ['NotFound', () => <NotFound />, '/nope'],
];

const headingLevels = () =>
  [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => Number(h.tagName[1]));

describe('heading outline', () => {
  it('Platform reads h1, three h2 sections, six card h3s and a closing h2', () => {
    renderWithProviders(<Platform />, { route: '/platform' });
    expect(headingLevels()).toEqual([1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2]);
  });

  it.each(pages)('%s opens with its only h1 and never skips a level', (_name, page, route) => {
    renderWithProviders(page(), { route });
    const levels = headingLevels();
    expect(levels[0]).toBe(1);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    levels.reduce((previous, level) => {
      expect(level).toBeLessThanOrEqual(previous + 1);
      return level;
    }, 0);
  });
});
