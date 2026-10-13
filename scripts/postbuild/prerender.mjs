// Only what a crawler that does not run JavaScript needs. React hoists the first group into <head>;
// the JSON-LD script stays where `<Seo>` rendered it, in the body, so it is collected separately.
const HEAD_SELECTOR = [
  'head > title',
  'head > meta[name="description"]',
  'head > meta[name="robots"]',
  'head > meta[property^="og:"]',
  'head > meta[name^="twitter:"]',
  'head > link[rel="canonical"]',
  'head > link[rel="alternate"]',
].join(', ');

const READY_TIMEOUT_MS = 15_000;

/**
 * Opens one route in a real browser and returns the tags its page rendered. Third-party requests
 * are refused so the crawl never waits on (or depends on) the network, and nothing but the listed
 * tags is read back: the live DOM itself is never serialized.
 */
export async function crawlRoute(page, origin, route) {
  await page.goto(`${origin}${route.path}`, { waitUntil: 'load' });
  await page
    .waitForFunction(
      () =>
        (document.querySelector('head > title')?.textContent ?? '').trim() !== '' &&
        document.querySelector('head > link[rel="canonical"]') !== null,
      undefined,
      { timeout: READY_TIMEOUT_MS }
    )
    .catch(() => {
      // Fall through: the checks below name exactly what is missing.
    });

  const found = await page.evaluate(
    ({ headSelector }) => {
      const tags = [...document.querySelectorAll(headSelector)].map((el) => el.outerHTML);
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map(
        (el) => el.outerHTML
      );
      return {
        tags: [...tags, ...jsonLd],
        title: (document.querySelector('head > title')?.textContent ?? '').trim(),
        description: document.querySelector('head > meta[name="description"]')?.getAttribute('content') ?? '',
        canonical: document.querySelector('head > link[rel="canonical"]')?.getAttribute('href') ?? '',
      };
    },
    { headSelector: HEAD_SELECTOR }
  );

  const problems = [];
  if (!found.title) problems.push('no <title>');
  if (!found.canonical) problems.push('no <link rel="canonical">');
  return { ...found, problems };
}

/** Blocks everything that is not the local static server. */
export async function isolate(page, origin) {
  await page.route('**/*', (r) => (r.request().url().startsWith(origin) ? r.continue() : r.abort()));
}
