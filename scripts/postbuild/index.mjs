import { mkdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { buildRoutes, routeFile } from './routes.mjs';
import { injectHead, stripMarked } from './template.mjs';
import { startServer } from './serve.mjs';
import { crawlRoute, isolate } from './prerender.mjs';
import { cardContent, renderCard, OG_HEIGHT, OG_MIN_BYTES, OG_WIDTH } from './og.mjs';
import { cvPdfFile, cvRoutes, pdfProblem, renderCvPdf } from './pdf.mjs';
import { buildSitemap, expectedSitemapPaths, sitemapLocs, SITE_ORIGIN } from './sitemap.mjs';

const distDir = resolve('dist');
const started = Date.now();
const failures = [];
const fail = (message) => failures.push(message);

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('postbuild: dist/index.html not found — run `vite build` first');
  process.exit(1);
}

// Read once, before any route file is written: dist/index.html is itself the home route's output.
const template = stripMarked(readFileSync(join(distDir, 'index.html'), 'utf8'));
const routes = buildRoutes();
const outputs = [];

const server = await startServer(distDir, template);
const browser = await chromium.launch();
try {
  const context = await browser.newContext({
    viewport: { width: OG_WIDTH, height: OG_HEIGHT },
    deviceScaleFactor: 1,
  });
  const crawlPage = await context.newPage();
  await isolate(crawlPage, server.origin);
  const cardPage = await context.newPage();

  for (const route of routes) {
    const t0 = Date.now();
    const crawled = await crawlRoute(crawlPage, server.origin, route);
    if (crawled.problems.length > 0) {
      fail(`${route.path}: ${crawled.problems.join(', ')}`);
      console.log(`FAIL ${route.path} (${crawled.problems.join(', ')})`);
      continue;
    }
    outputs.push({ route, html: injectHead(template, { lang: route.lang, tags: crawled.tags }) });

    const bytes = await renderCard(cardPage, distDir, route, cardContent({ ...route, ...crawled }));
    if (bytes < OG_MIN_BYTES) fail(`${route.path}: og/${route.lang}/${route.key}.png is ${bytes} bytes`);
    console.log(
      `ok   ${route.path.padEnd(28)} ${String(Date.now() - t0).padStart(5)} ms  og ${(bytes / 1024).toFixed(0)} KB`
    );
  }

  // After the crawl, same server and browser: the CV is printed from the live page, not from a copy.
  for (const route of cvRoutes(routes)) {
    const t0 = Date.now();
    try {
      const bytes = await renderCvPdf(browser, server.origin, distDir, route);
      const problem = pdfProblem(cvPdfFile(route.lang), bytes);
      if (problem) fail(problem);
      console.log(
        `ok   ${cvPdfFile(route.lang).padEnd(28)} ${String(Date.now() - t0).padStart(5)} ms  pdf ${(bytes / 1024).toFixed(0)} KB`
      );
    } catch (error) {
      fail(`${route.path}: pdf failed (${error.message.split('\n')[0]})`);
    }
  }
} finally {
  await browser.close();
  server.close();
}

// Written only now that the whole crawl is done, so no request ever saw a half-prerendered shell.
for (const { route, html } of outputs) {
  const file = join(distDir, routeFile(route.path));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const sitemap = buildSitemap(routes, SITE_ORIGIN);
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
const listed = new Set(sitemapLocs(sitemap));
for (const path of expectedSitemapPaths(routes)) {
  if (!listed.has(`${SITE_ORIGIN}${path}`)) fail(`sitemap.xml does not list ${path}`);
}
for (const route of routes) {
  const png = join(distDir, 'og', route.lang, `${route.key}.png`);
  if (!existsSync(png)) fail(`missing ${png}`);
  else if (statSync(png).size < OG_MIN_BYTES) fail(`${png} is under ${OG_MIN_BYTES} bytes`);
}

for (const route of cvRoutes(routes)) {
  const file = cvPdfFile(route.lang);
  const bytes = existsSync(join(distDir, file)) ? statSync(join(distDir, file)).size : null;
  const problem = pdfProblem(file, bytes);
  if (problem) fail(problem);
}

const seconds = ((Date.now() - started) / 1000).toFixed(1);
if (failures.length > 0) {
  console.error(`postbuild: ${failures.length} problem(s) in ${seconds}s`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`postbuild: ${outputs.length} routes, ${routes.length} cards, sitemap in ${seconds}s`);
