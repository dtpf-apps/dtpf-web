// Same origin everywhere: deployed, dtpf-api serves this client itself, and in development
// (and `vite preview`) the Vite server proxies /api to the API on :3998 (vite.config.ts).
// The API sends no CORS headers, so a cross-origin call would fail by design.
const API_BASE = '/api/v1';

export function apiUrl(path: string): string {
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
