import { describe, it, expect } from 'vitest';
import { cvPdfPath } from '../../src/config/site';
import { buildRoutes } from '../../scripts/postbuild/routes.mjs';
import { PDF_MIN_BYTES, cvPdfFile, cvRoutes, pdfProblem } from '../../scripts/postbuild/pdf.mjs';

describe('postbuild pdf', () => {
  it('writes the file the CV page links to, in both languages', () => {
    for (const lang of ['es', 'en'] as const) {
      expect(`/${cvPdfFile(lang)}`).toBe(cvPdfPath(lang));
    }
  });

  it('prints exactly the CV route of each language', () => {
    const printed = cvRoutes(buildRoutes());
    expect(printed.map((r: { path: string }) => r.path)).toEqual(['/cv', '/en/cv']);
    expect(printed.map((r: { lang: string }) => r.lang)).toEqual(['es', 'en']);
  });

  it('rejects a missing or tiny PDF and accepts a real one', () => {
    expect(pdfProblem('cv/a.pdf', null)).toMatch(/missing/);
    expect(pdfProblem('cv/a.pdf', PDF_MIN_BYTES - 1)).toMatch(/under/);
    expect(pdfProblem('cv/a.pdf', PDF_MIN_BYTES)).toBeNull();
  });
});
