import { matchRoutes } from 'react-router';
import { routes } from '../../src/router/router';

function leafPath(url: string) {
  const matches = matchRoutes(routes, url);
  return matches?.[matches.length - 1].route.path;
}

describe('route table', () => {
  it.each([
    ['/', '/'],
    ['/projects', '/projects'],
    ['/projects/dauth', '/projects/:slug'],
    ['/about', '/about'],
    ['/contact', '/contact'],
    ['/privacy-policy', '/privacy-policy'],
  ])('serves %s in Spanish', (url, expected) => {
    expect(leafPath(url)).toBe(expected);
  });

  it.each([
    ['/en', '/en'],
    ['/en/projects', '/en/projects'],
    ['/en/projects/dauth', '/en/projects/:slug'],
    ['/en/about', '/en/about'],
    ['/en/contact', '/en/contact'],
    ['/en/privacy-policy', '/en/privacy-policy'],
  ])('serves %s in English', (url, expected) => {
    expect(leafPath(url)).toBe(expected);
  });

  it('falls through to a not-found route inside each language tree', () => {
    expect(leafPath('/nope')).toBe('*');
    expect(leafPath('/en/nope')).toBe('/en/*');
  });

  it('shares one layout route, so switching language does not remount the page shell', () => {
    const es = matchRoutes(routes, '/about')!;
    const en = matchRoutes(routes, '/en/about')!;
    expect(es[0].route).toBe(en[0].route);
  });
});
