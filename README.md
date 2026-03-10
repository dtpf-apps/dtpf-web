# dtpf-frontend-react

Frontend SPA for the [dtpf.es](https://dtpf.es) personal portfolio website. Built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion, featuring dark-mode-first design, animated page transitions, ES/EN internationalization, and PWA offline support. Live at [dtpf.es](https://dtpf.es).

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7 | Build tool |
| Tailwind CSS | 4 | Utility-first styling |
| Framer Motion | 12 | Animations and page transitions |
| Lucide React | 0.577 | Icons |
| React Router | 7 | Client-side routing (lazy-loaded) |
| i18next | 25 | Internationalization (ES/EN) |
| Sonner | 2 | Toast notifications |
| Workbox | 7 | PWA service worker (injectManifest) |
| Vitest | 4 | Testing |

## Prerequisites

- Node.js >= 22
- pnpm
- Backend API running on port 3998 (see dtpf-backend-node)

## Setup

```bash
git clone https://github.com/dtpf-apps/dtpf-frontend-react.git
cd dtpf-frontend-react
pnpm install
```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start Vite dev server on port 3000 |
| `pnpm build` | Production build (`tsc` + `vite build`) |
| `pnpm preview` | Preview production build locally |
| `pnpm format` | Format source files with Prettier |
| `pnpm test` | Run tests with Vitest |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with v8 coverage report |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_PUBLIC_URL` | Public URL | `https://dtpf.es` |
| `VITE_DAUTH_DOMAIN_NAME` | dauth domain name | `dtpf` |

No env vars are needed for local development. In production, both are set as GitHub Secrets.

## Project Structure

```
src/
├── api/utils/
│   ├── config.ts                    # basePath + apiVersion (auto-detects localhost)
│   └── fetchHelper.ts               # apiUrl, buildUrl, fetchAPI<T>
├── assets/locale/{es,en}.ts         # i18n translations (~120 keys each)
├── config/projects.ts               # Typed project data (5 projects with i18n keys)
├── contexts/theme/                  # ThemeContext + ThemeProvider + useTheme
├── hooks/useSWUpdate.ts             # Service worker update detection hook
├── router/
│   ├── router.tsx                   # Route definitions with React.lazy()
│   └── paths.ts                     # Centralized path constants
├── styles/portfolio.css             # Tailwind @theme design tokens + base styles
├── utils/
│   ├── i18n.ts                      # i18next configuration
│   └── isLocalhost.ts               # Localhost detection helper
├── views/
│   ├── layouts/PortfolioLayout.tsx   # Sticky header + AnimatePresence + footer
│   ├── components/
│   │   ├── navigation/              # Header, Footer
│   │   └── SWUpdateBanner.tsx       # Service worker update toast
│   └── pages/                       # Home, Projects, ProjectDetail, About,
│                                    # Contact, NotFound, PrivacyPolicy
├── service-worker.ts                # Workbox service worker (injectManifest)
├── serviceWorkerRegistration.ts     # SW registration + update event dispatch
├── main.tsx                         # Entry point (registers SW)
└── App.tsx                          # ThemeProvider > RouterProvider + Toaster
```

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero section, bento grid projects, manifesto, stack, CTA |
| `/projects` | Projects | Project list with stacked card layout |
| `/projects/:slug` | ProjectDetail | Case study: Problem, Solution, Result |
| `/about` | About | Profile card, bio, experience, tools grid |
| `/contact` | Contact | Contact form with anti-spam + direct links |
| `/privacy-policy` | PrivacyPolicy | Static GDPR/LOPD page |
| `*` | NotFound | 404 page |

## Styling

Dark-mode-first design built with Tailwind CSS v4 and custom `@theme` design tokens defined in `src/styles/portfolio.css`. Ocean Teal palette: accent `#2DD4BF`, warm `#FBBF24`, dark background `#0B0F19`. Light mode toggles via `.light` class on `<html>`, persisted in localStorage (`dtpf-theme`). Typography uses Space Grotesk (headings), Inter (body), and JetBrains Mono (code/labels) loaded via Google Fonts. Grain texture overlay via CSS SVG filter. Respects `prefers-reduced-motion`. Framer Motion powers page transitions (`AnimatePresence`), staggered hero entrance, scroll reveals, and mobile menu animations.

## i18n

i18next with browser language detection. Spanish default, English fallback. Language persisted in localStorage (`dtpf-lang`). Translation files in `src/assets/locale/{es,en}.ts` with ~120 keys each.

## PWA

Progressive Web App via `vite-plugin-pwa` with `injectManifest` strategy. Workbox 7 handles precaching of all build assets. Service worker in `src/service-worker.ts`, registration in `src/serviceWorkerRegistration.ts`. `useSWUpdate` hook detects new versions and shows a `SWUpdateBanner` toast with "Update now" / dismiss options.

## Testing

61 tests across 14 files using Vitest 4 with jsdom, @testing-library/react, and jest-dom. Coverage thresholds: 70% (statements, branches, functions, lines).

```bash
pnpm test
pnpm test:coverage
```

## Deploy

GitHub Actions CI/CD. Push triggers build on self-hosted runner + rsync to app server.

```bash
git push origin main    # production (dtpf.es)
git push origin dev     # staging (dev.dtpf.es)
```

## Code Style

Prettier: 110 char width, single quotes, semicolons, trailing commas (es5), 2-space indent.

## License

MIT
