import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

/**
 * Serves `dist/` the way production does: a real file when there is one, otherwise the SPA shell.
 * `shell` is read once by the caller, so the crawl keeps seeing the pristine template even after
 * route files start being written over `dist/index.html`.
 */
export function startServer(distDir, shell) {
  const root = normalize(distDir) + sep;
  const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = normalize(join(distDir, pathname));
    if (file.startsWith(root) && extname(file) && extname(file) !== '.html') {
      try {
        const body = await readFile(file);
        res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
        res.end(body);
        return;
      } catch {
        // fall through: an unknown asset gets the shell like any other unknown path
      }
    }
    res.writeHead(200, { 'content-type': TYPES['.html'] });
    res.end(shell);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      resolve({ origin: `http://127.0.0.1:${server.address().port}`, close: () => server.close() });
    });
  });
}
