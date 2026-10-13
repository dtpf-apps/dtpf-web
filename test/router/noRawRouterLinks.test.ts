import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? sourceFiles(full) : full.endsWith('.tsx') ? [full] : [];
  });
}

// A raw react-router <Link> ignores the language prefix and silently sends an English visitor
// back to the Spanish tree, so views must go through the localized wrappers.
describe('views use the localized router components', () => {
  it('imports no Link, NavLink or Navigate from react-router under src/views', () => {
    const offenders = sourceFiles(join(__dirname, '../../src/views')).filter((file) => {
      const imports = readFileSync(file, 'utf8').matchAll(/import\s*\{([^}]*)\}\s*from\s*'react-router'/g);
      return [...imports].some((m) => /\b(Link|NavLink|Navigate)\b/.test(m[1]));
    });
    expect(offenders).toEqual([]);
  });
});
