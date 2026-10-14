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

| Script                 | Description                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `pnpm dev`             | Start Vite dev server on port 3000                                                         |
| `pnpm build`           | Production build (`tsc` + `vite build` + the post-build pipeline in `scripts/postbuild/`)  |
| `pnpm postbuild:check` | Verify `dist/` after a build: per-route head tags, OG images, sitemap (fails when missing) |
| `pnpm preview`         | Preview production build locally                                                           |
| `pnpm format`          | Format source and `scripts/**/*.mjs` with Prettier                                         |
| `pnpm test`            | Run tests with Vitest                                                                      |
| `pnpm test:watch`      | Run tests in watch mode                                                                    |
| `pnpm test:coverage`   | Run tests with v8 coverage report                                                          |

## Environment Variables

| Variable          | Description                                                                                   | Default |
| ----------------- | --------------------------------------------------------------------------------------------- | ------- |
| `VITE_APP_SUFFIX` | Build-time suffix appended to the PWA manifest `name`/`short_name` (CI sets `DEV` on staging) | empty   |

No env vars are needed for local development. No `VITE_*` variables are read by application code at runtime.

## Project Structure

```
scripts/postbuild/                   # Post-build pipeline (plain Node ESM, run by `pnpm build`): crawls each
│                                    #   route in headless Chromium, writes dist/<route>/index.html with the head
│                                    #   tags pre-rendered, dist/og/<lang>/<key>.png cards, dist/sitemap.xml and
│                                    #   the two CV PDFs; check.mjs verifies dist/ afterwards
src/
├── api/utils/config.ts              # basePath + apiVersion + apiUrl() (auto-detects localhost)
├── assets/fonts/                    # Self-hosted Inter, Space Grotesk, JetBrains Mono (static latin woff2 + OFL)
├── assets/locale/{es,en}.ts         # i18n translations (~315 keys each)
├── config/facts.json                # Measured figures (tests, versions, tenants) — generated, never hand-edited
├── config/facts.ts                  # Typed access + number formatting for facts.json
├── config/site.ts                   # Canonical origin, author links, OG image path convention, JSON-LD builders
├── config/profile.ts                # Experience and tool groups shared by About and the CV
├── config/platform.ts               # Platform page data: diagram nodes, figures strip, cards (copy lives in the locales)
├── config/projects.ts               # Typed project data (8 projects; versions and counts from facts.json;
│                                    #   screenshots under public/projects/<slug>/, WebP, never precached)
├── contexts/theme/                  # ThemeContext + ThemeProvider + useTheme
├── hooks/
│   ├── useAnalyticsPageView.ts      # SPA page-view + page-load perf tracking
│   └── useSWUpdate.ts               # Silent PWA update (version.json polling)
├── router/
│   ├── router.tsx                   # Route definitions with lazyWithRetry(), one page tree per language
│   ├── paths.ts                     # Path constants + language helpers (langFromPath, stripLang, localizePath)
│   ├── LocalizedLink.tsx            # Link / NavLink / Navigate that keep the /en prefix
│   └── useRouteLang.ts              # Language of the current URL (the source of truth)
├── styles/portfolio.css             # Tailwind @theme design tokens + base styles
├── utils/
│   ├── analytics.ts                 # Umami init + trackPageView/trackEvent
│   ├── animations.ts                # Shared Framer Motion variants
│   ├── chunkError.ts                # Chunk-load error detection
│   ├── errorTracking.ts             # Client error reporting (batched)
│   ├── i18n.ts                      # i18next configuration
│   ├── isLocalhost.ts               # Localhost detection helper
│   ├── isStaging.ts                 # Staging hostname detection
│   ├── lazyWithRetry.ts             # React.lazy with reload retry on chunk errors
│   └── removePrerendered.ts         # Drops build-time head tags before React renders them itself
├── views/
│   ├── layouts/PortfolioLayout.tsx   # Sticky header + AnimatePresence + footer
│   ├── components/
│   │   ├── ArchitectureDiagram.tsx  # Platform page: request path as ordered lists (HTML + CSS grid, no SVG)
│   │   ├── navigation/              # Header, Footer
│   │   ├── ProjectGallery.tsx       # Screenshot thumbnails + accessible lightbox
│   │   ├── ProjectStatusBadge.tsx   # Production / beta / client / private pill
│   │   ├── Seo.tsx                  # Per-page title, description, canonical, hreflang, OG/Twitter, JSON-LD
│   │   └── StagingBadge.tsx         # "Staging" pill on dev.* hostnames
│   └── pages/                       # Home, Projects, ProjectDetail, Platform, About,
│                                    # Contact, Cv, NotFound, PrivacyPolicy
├── ErrorBoundary.tsx                # Top-level error boundary + fallback UI
├── service-worker.ts                # Workbox service worker (injectManifest)
├── serviceWorkerRegistration.ts     # SW registration
├── main.tsx                         # Entry point (registers SW)
└── App.tsx                          # ErrorBoundary > ThemeProvider > RouterProvider + Toaster
```

## Routes

| Path              | Page          | Description                                              |
| ----------------- | ------------- | -------------------------------------------------------- |
| `/`               | Home          | Hero, bento grid projects, "How I work", stack, CTA      |
| `/projects`       | Projects      | Project list with stacked card layout                    |
| `/projects/:slug` | ProjectDetail | Case study: Problem, Solution, Result + gallery          |
| `/platform`       | Platform      | Figures strip, architecture diagram, six building blocks |
| `/about`          | About         | Profile card, bio, experience, tools grid                |
| `/contact`        | Contact       | Contact form with anti-spam + direct links               |
| `/cv`             | Cv            | Printable A4 résumé + PDF download (built per language)  |
| `/privacy-policy` | PrivacyPolicy | Static GDPR/LOPD page                                    |
| `*`               | NotFound      | 404 page                                                 |

## Styling

Dark-mode-first design built with Tailwind CSS v4 and custom `@theme` design tokens defined in `src/styles/portfolio.css`. Ocean Teal palette: accent `#2DD4BF`, warm `#FBBF24`, dark background `#0B0F19`; in light mode the accent is teal 700 (`#0F766E`) so small accent text stays at AA, and the `on-accent` token picks the text colour for accent-filled controls per theme (`test/styles/contrast.test.ts` measures every pair against the tokens). Light mode toggles via `.light` class on `<html>`, persisted in localStorage (`dtpf-theme`). Typography uses Space Grotesk (headings), Inter (body), and JetBrains Mono (code/labels), self-hosted from `src/assets/fonts/` as static latin instances under the SIL Open Font License — no request leaves the origin, and the build's PDF and social-card renders use the same files. Grain texture overlay via CSS SVG filter. Respects `prefers-reduced-motion`. Framer Motion powers page transitions (`AnimatePresence`), staggered hero entrance, scroll reveals, and mobile menu animations.

## i18n

i18next, with the language taken from the URL: `/` is Spanish and the `/en` prefix is English (no redirect from the browser language, so crawlers can reach both). An explicit choice from the toggle is persisted in localStorage (`dtpf-lang`) and redirects to the matching URL on arrival. Translation files in `src/assets/locale/{es,en}.ts` with ~315 keys each. `<html lang>` follows the active language. Spanish copy keeps its accents, and a test rejects the common unaccented stand-ins and checks `{{placeholder}}` parity between the two languages.

## PWA

Progressive Web App via `vite-plugin-pwa` with `injectManifest` strategy. Workbox 7 handles precaching of all build assets. Service worker in `src/service-worker.ts`, registration in `src/serviceWorkerRegistration.ts`. The downloadable CV PDFs (`/cv/david-pizarro-frick-{es,en}.pdf`) are generated in the build, by printing the `/cv` and `/en/cv` pages in the light theme through the post-build Chromium (`scripts/postbuild/pdf.mjs`); the build fails if either is missing or tiny. Updates are silent: the build emits a `version.json`, the `useSWUpdate` hook polls it in production and, when a new build is detected, clears caches and applies the update on the next in-app navigation or tab re-focus — no update banner.

## Analytics & Error Reporting

Self-hosted Umami analytics (analytics.dtpf.es), loaded on every visit without a consent banner: Umami sets no cookies, keeps no identifier in the browser and never stores the IP address (it is hashed with the user agent and a rotating salt), so the site declares it in a footer line and in the privacy policy instead of asking. Page views and custom events are tracked client-side (`src/utils/analytics.ts`). Unhandled errors, promise rejections, and React render errors are deduplicated, batched, and reported to the backend at `POST /api/v1/client-errors` (`src/utils/errorTracking.ts` + `ErrorBoundary`).

## Testing

451 tests across 45 files using Vitest 5 with jsdom, @testing-library/react, and jest-dom (one test, the `facts.json` staleness check, runs only when `CI` is set). The coverage thresholds in the Vitest config are 95%; `pnpm test:coverage` is below them today (the figure is tracked in `CLAUDE.md`) and CI does not gate on coverage, only on `pnpm test`, the build and `pnpm postbuild:check`.

Every figure the site shows (test counts, framework versions, dauth tenants, the app census) lives in `src/config/facts.json`, which is generated by a script in the d-context workspace (`scripts/utils/portfolio-facts.py`) from the ops dashboard, each repo's `package.json` and the public dauth domain endpoint. One test only runs when `CI` is set and fails the build if that file is older than 120 days, so a stale figure is a red deploy, not a forgotten edit.

```bash
pnpm test
pnpm test:coverage
```

## Deploy

Gitea Actions CI/CD on the self-hosted Gitea (`.gitea/workflows/deploy.yml`). A push runs tests, installs the Playwright Chromium headless shell (cached per version, never `--with-deps`), builds (staging builds get `VITE_APP_SUFFIX=DEV`; the build includes the pre-render and OG-card pipeline), runs `pnpm postbuild:check` on the result, and rsyncs `dist/` to the app server. The deploy target (`user@host`) and the failure-notification room are repository Actions variables (`APP_SERVER`, `CI_MATRIX_ROOM`), never source. GitHub receives a read-only push mirror of this repository.

```bash
git push gitea main    # production (dtpf.es)
git push gitea dev     # staging (dev.dtpf.es)
```

## Code Style

Prettier: 110 char width, single quotes, semicolons, trailing commas (es5), 2-space indent.

## License

[MIT](LICENSE)
