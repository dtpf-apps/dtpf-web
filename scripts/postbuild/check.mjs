import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { buildRoutes, routeFile } from './routes.mjs';
import { expectedSitemapPaths, sitemapLocs, SITE_ORIGIN } from './sitemap.mjs';
import { OG_MIN_BYTES } from './og.mjs';
import { cvPdfFile, cvRoutes, pdfProblem } from './pdf.mjs';

// Reads only files under dist/: it must stay independent of the code that produced them, so a
// pipeline that silently skipped a step cannot vouch for itself.
const distDir = resolve('dist');
const problems = [];
const routes = buildRoutes();

const sitemapFile = join(distDir, 'sitemap.xml');
const listed = existsSync(sitemapFile) ? new Set(sitemapLocs(readFileSync(sitemapFile, 'utf8'))) : null;
if (!listed) problems.push('dist/sitemap.xml is missing');

/** Tags carrying the build-time marker, e.g. `<title data-prerender="">`. */
const marked = (html, tag) =>
  [...html.matchAll(new RegExp(`<${tag}\\b[^>]*\\bdata-prerender\\b[^>]*>`, 'g'))].map((m) => m[0]);

for (const route of routes) {
  const rel = routeFile(route.path);
  const file = join(distDir, rel);
  if (!existsSync(file)) {
    problems.push(`${route.path}: dist/${rel} is missing`);
    continue;
  }
  const html = readFileSync(file, 'utf8');

  if (!/<title\b[^>]*\bdata-prerender\b[^>]*>[^<]+<\/title>/.test(html)) {
    problems.push(`${route.path}: no pre-rendered <title>`);
  }
  const links = marked(html, 'link');
  const metas = marked(html, 'meta');
  const attr = (tag, name) => new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1];
  const link = (rel) => links.filter((tag) => attr(tag, 'rel') === rel);
  const meta = (key, value) => metas.find((tag) => attr(tag, key) === value) ?? '';

  const canonical = attr(link('canonical')[0] ?? '', 'href');
  if (!canonical || !/^https?:\/\//.test(canonical)) {
    problems.push(`${route.path}: no pre-rendered canonical`);
  }
  if (!new RegExp(`<html[^>]*\\blang="${route.lang}"`).test(html)) {
    problems.push(`${route.path}: <html lang> is not "${route.lang}"`);
  }
  if (!attr(meta('name', 'description'), 'content')) {
    problems.push(`${route.path}: no pre-rendered description`);
  }
  const ogUrl = attr(meta('property', 'og:url'), 'content');
  if (canonical && ogUrl !== canonical) {
    problems.push(`${route.path}: og:url ${ogUrl} differs from canonical ${canonical}`);
  }
  // The alternates tie the two language trees together; a Spanish-only page declares none.
  const alternates = link('alternate').map((tag) => attr(tag, 'hreflang'));
  const expected = route.esOnly ? [] : ['es', 'en', 'x-default'];
  if (alternates.length !== expected.length || expected.some((l) => !alternates.includes(l))) {
    problems.push(`${route.path}: hreflang alternates [${alternates}] do not match [${expected}]`);
  }

  const image = attr(meta('property', 'og:image'), 'content');
  if (!image) {
    problems.push(`${route.path}: no pre-rendered og:image`);
  } else if (!image.startsWith(`${SITE_ORIGIN}/og/`)) {
    problems.push(`${route.path}: og:image ${image} is not under ${SITE_ORIGIN}/og/`);
  } else {
    const png = join(distDir, image.slice(SITE_ORIGIN.length));
    if (!existsSync(png) || statSync(png).size < OG_MIN_BYTES) {
      problems.push(
        `${route.path}: og:image ${image} has no file of at least ${OG_MIN_BYTES} bytes in dist/`
      );
    }
  }
}

// The shell may reference only what Vite emitted: a `/src/` URL survives only when the HTML plugin
// skipped it (a 404 in production), and a font host outside the origin is what self-hosting removed.
const shellFile = join(distDir, 'index.html');
if (existsSync(shellFile)) {
  const shell = readFileSync(shellFile, 'utf8');
  for (const [stray] of shell.matchAll(/(?:href|src)="(?:\/src\/|https?:\/\/fonts\.)[^"]*"/g)) {
    problems.push(`dist/index.html references ${stray}`);
  }
  for (const [tag] of shell.matchAll(/<link\b[^>]*>/g)) {
    if (!/\brel="preload"/.test(tag)) continue;
    const href = /\bhref="([^"]+)"/.exec(tag)?.[1];
    if (!href || !existsSync(join(distDir, href))) {
      problems.push(`dist/index.html preloads ${href ?? tag}, which is not in dist/`);
    }
  }
}

for (const route of cvRoutes(routes)) {
  const file = cvPdfFile(route.lang);
  const full = join(distDir, file);
  const problem = pdfProblem(file, existsSync(full) ? statSync(full).size : null);
  if (problem) problems.push(problem);
  else if (readFileSync(full).subarray(0, 5).toString('latin1') !== '%PDF-') {
    problems.push(`${file} is not a PDF`);
  }
}

if (listed) {
  for (const path of expectedSitemapPaths(routes)) {
    if (!listed.has(`${SITE_ORIGIN}${path}`)) problems.push(`sitemap.xml does not list ${path}`);
  }
}

if (problems.length > 0) {
  console.error(`postbuild:check failed, ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`postbuild:check ok, ${routes.length} routes verified under dist/`);
