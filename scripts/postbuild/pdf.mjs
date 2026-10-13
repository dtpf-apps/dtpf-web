import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

export const PDF_MIN_BYTES = 10 * 1024;
export const PDF_MARGIN = '12mm';

/** `dist`-relative file of the CV in one language; `src/config/site.ts` `cvPdfPath` links to the same name. */
export function cvPdfFile(lang) {
  return `cv/david-pizarro-frick-${lang}.pdf`;
}

/** The routes that are printed: the CV page in each language. */
export function cvRoutes(routes) {
  return routes.filter((route) => route.key === 'cv');
}

/** Why a PDF cannot be trusted, or `null` when it can. A file this small is an empty or error page. */
export function pdfProblem(file, bytes) {
  if (bytes === null) return `missing ${file}`;
  if (bytes < PDF_MIN_BYTES) return `${file} is ${bytes} bytes, under ${PDF_MIN_BYTES}`;
  return null;
}

/**
 * Prints one CV route to `dist/cv/…`. Light theme is pinned before any script runs because the
 * print palette is the site's light one and the theme provider reads storage on first render.
 * Resolves to the PDF size in bytes.
 */
export async function renderCvPdf(browser, origin, distDir, route) {
  const context = await browser.newContext();
  try {
    await context.addInitScript(() => localStorage.setItem('dtpf-theme', 'light'));
    const page = await context.newPage();
    // Same as the crawl: no third-party request may delay or alter the document.
    await page.route('**/*', (r) => (r.request().url().startsWith(origin) ? r.continue() : r.abort()));
    await page.emulateMedia({ media: 'print' });
    await page.goto(`${origin}${route.path}`, { waitUntil: 'load' });
    await page.waitForSelector('h1', { timeout: 15_000 });
    // The route transition fades the page in; printing mid-fade would put translucent text in the file.
    await page.waitForFunction(
      () => {
        for (let el = document.querySelector('h1'); el; el = el.parentElement) {
          if (getComputedStyle(el).opacity !== '1') return false;
        }
        return true;
      },
      undefined,
      { timeout: 5_000 }
    );
    // The faces are same-origin files, so the filter above lets them through; the print still has to
    // wait for them, or the file is set in the fallback font.
    await page.evaluate(() => document.fonts.ready);
    const file = join(distDir, cvPdfFile(route.lang));
    mkdirSync(dirname(file), { recursive: true });
    const pdf = await page.pdf({
      path: file,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: PDF_MARGIN, right: PDF_MARGIN, bottom: PDF_MARGIN, left: PDF_MARGIN },
    });
    return pdf.length;
  } finally {
    await context.close();
  }
}
