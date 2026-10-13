# dtpf-web

Frontend SPA for the [dtpf.es](https://dtpf.es) personal portfolio website. Built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion, featuring dark-mode-first design, animated page transitions, ES/EN internationalization, and PWA offline support. Live at [dtpf.es](https://dtpf.es).

## Tech Stack

| Technology    | Version | Purpose                             |
| ------------- | ------- | ----------------------------------- |
| React         | 19      | UI framework                        |
| TypeScript    | 7       | Type safety                         |
| Vite          | 8       | Build tool                          |
| Tailwind CSS  | 4       | Utility-first styling               |
| Framer Motion | 14      | Animations and page transitions     |
| Lucide React  | 1       | Icons                               |
| React Router  | 8       | Client-side routing (lazy-loaded)   |
| i18next       | 26      | Internationalization (ES/EN)        |
| Sonner        | 2       | Toast notifications                 |
| Workbox       | 7       | PWA service worker (injectManifest) |
| Vitest        | 5       | Testing                             |

## Prerequisites

- Node.js >= 24
- pnpm
- Backend API running on port 3998 (see dtpf-api)

## Setup

```bash
git clone https://github.com/dtpf-apps/dtpf-web.git
cd dtpf-web
pnpm install
```

## Scripts

| Script               | Description                             |
| -------------------- | --------------------------------------- |
| `pnpm dev`           | Start Vite dev server on port 3000      |
| `pnpm build`         | Production build (`tsc` + `vite build`) |
| `pnpm preview`       | Preview production build locally        |
| `pnpm format`        | Format source files with Prettier       |
| `pnpm test`          | Run tests with Vitest                   |
| `pnpm test:watch`    | Run tests in watch mode                 |
| `pnpm test:coverage` | Run tests with v8 coverage report       |

## Environment Variables

| Variable          | Description                                                                                   | Default |
| ----------------- | --------------------------------------------------------------------------------------------- | ------- |
| `VITE_APP_SUFFIX` | Build-time suffix appended to the PWA manifest `name`/`short_name` (CI sets `DEV` on staging) | empty   |

No env vars are needed for local development. No `VITE_*` variables are read by application code at runtime.

## Project Structure

```
src/
├── api/utils/config.ts              # basePath + apiVersion + apiUrl() (auto-detects localhost)
├── assets/locale/{es,en}.ts         # i18n translations (~150 keys each)
├── config/facts.json                # Measured figures (tests, versions, tenants) — generated, never hand-edited
├── config/facts.ts                  # Typed access + number formatting for facts.json
├── config/projects.ts               # Typed project data (8 projects; versions and counts from facts.json)
├── contexts/theme/                  # ThemeContext + ThemeProvider + useTheme
├── hooks/
│   ├── useAnalyticsPageView.ts      # SPA page-view + page-load perf tracking
│   └── useSWUpdate.ts               # Silent PWA update (version.json polling)
├── router/
│   ├── router.tsx                   # Route definitions with lazyWithRetry()
│   └── paths.ts                     # Centralized path constants
├── styles/portfolio.css             # Tailwind @theme design tokens + base styles
├── utils/
│   ├── analytics.ts                 # Umami init + trackPageView/trackEvent
│   ├── animations.ts                # Shared Framer Motion variants
│   ├── chunkError.ts                # Chunk-load error detection
│   ├── cookieConsent.ts             # Cookie consent storage helpers
│   ├── errorTracking.ts             # Client error reporting (batched)
│   ├── i18n.ts                      # i18next configuration
│   ├── isLocalhost.ts               # Localhost detection helper
│   ├── isStaging.ts                 # Staging hostname detection
│   └── lazyWithRetry.ts             # React.lazy with reload retry on chunk errors
├── views/
│   ├── layouts/PortfolioLayout.tsx   # Sticky header + AnimatePresence + footer
│   ├── components/
│   │   ├── navigation/              # Header, Footer
│   │   ├── CookieConsentBanner.tsx  # GDPR consent banner (gates analytics)
│   │   └── StagingBadge.tsx         # "Staging" pill on dev.* hostnames
│   └── pages/                       # Home, Projects, ProjectDetail, About,
│                                    # Contact, NotFound, PrivacyPolicy
├── ErrorBoundary.tsx                # Top-level error boundary + fallback UI
├── service-worker.ts                # Workbox service worker (injectManifest)
├── serviceWorkerRegistration.ts     # SW registration
├── main.tsx                         # Entry point (registers SW)
└── App.tsx                          # ErrorBoundary > ThemeProvider > RouterProvider + Toaster
```

## Routes

| Path              | Page          | Description                                              |
| ----------------- | ------------- | -------------------------------------------------------- |
| `/`               | Home          | Hero section, bento grid projects, manifesto, stack, CTA |
| `/projects`       | Projects      | Project list with stacked card layout                    |
| `/projects/:slug` | ProjectDetail | Case study: Problem, Solution, Result                    |
| `/about`          | About         | Profile card, bio, experience, tools grid                |
| `/contact`        | Contact       | Contact form with anti-spam + direct links               |
| `/privacy-policy` | PrivacyPolicy | Static GDPR/LOPD page                                    |
| `*`               | NotFound      | 404 page                                                 |

## Styling

Dark-mode-first design built with Tailwind CSS v4 and custom `@theme` design tokens defined in `src/styles/portfolio.css`. Ocean Teal palette: accent `#2DD4BF`, warm `#FBBF24`, dark background `#0B0F19`. Light mode toggles via `.light` class on `<html>`, persisted in localStorage (`dtpf-theme`). Typography uses Space Grotesk (headings), Inter (body), and JetBrains Mono (code/labels) loaded via Google Fonts. Grain texture overlay via CSS SVG filter. Respects `prefers-reduced-motion`. Framer Motion powers page transitions (`AnimatePresence`), staggered hero entrance, scroll reveals, and mobile menu animations.

## i18n

i18next with browser language detection. Spanish default, English fallback. Language persisted in localStorage (`dtpf-lang`). Translation files in `src/assets/locale/{es,en}.ts` with ~150 keys each. `<html lang>` follows the active language. Spanish copy keeps its accents, and a test rejects the common unaccented stand-ins and checks `{{placeholder}}` parity between the two languages.

## PWA

Progressive Web App via `vite-plugin-pwa` with `injectManifest` strategy. Workbox 7 handles precaching of all build assets. Service worker in `src/service-worker.ts`, registration in `src/serviceWorkerRegistration.ts`. Updates are silent: the build emits a `version.json`, the `useSWUpdate` hook polls it in production and, when a new build is detected, clears caches and applies the update on the next in-app navigation or tab re-focus — no update banner.

## Analytics & Error Reporting

Self-hosted Umami analytics (analytics.dtpf.es), loaded only after the user accepts analytics in the GDPR cookie consent banner (`CookieConsentBanner`, consent stored in localStorage). Page views and custom events are tracked client-side (`src/utils/analytics.ts`). Unhandled errors, promise rejections, and React render errors are deduplicated, batched, and reported to the backend at `POST /api/v1/client-errors` (`src/utils/errorTracking.ts` + `ErrorBoundary`).

## Testing

265 tests across 25 files using Vitest 5 with jsdom, @testing-library/react, and jest-dom. Coverage thresholds: 95% (statements, branches, functions, lines).

Every figure the site shows (test counts, framework versions, dauth tenants, the app census) lives in `src/config/facts.json`, which is generated by a script in the d-context workspace (`scripts/utils/portfolio-facts.py`) from the ops dashboard, each repo's `package.json` and the public dauth domain endpoint. One test only runs when `CI` is set and fails the build if that file is older than 120 days, so a stale figure is a red deploy, not a forgotten edit.

```bash
pnpm test
pnpm test:coverage
```

## Deploy

Gitea Actions CI/CD on the self-hosted Gitea (`.gitea/workflows/deploy.yml`). A push runs tests, builds (staging builds get `VITE_APP_SUFFIX=DEV`), and rsyncs `dist/` to the app server. The deploy target (`user@host`) and the failure-notification room are repository Actions variables (`APP_SERVER`, `CI_MATRIX_ROOM`), never source. GitHub receives a read-only push mirror of this repository.

```bash
git push gitea main    # production (dtpf.es)
git push gitea dev     # staging (dev.dtpf.es)
```

## Code Style

Prettier: 110 char width, single quotes, semicolons, trailing commas (es5), 2-space indent.

## License

[MIT](LICENSE)
