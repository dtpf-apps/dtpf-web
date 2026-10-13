# CLAUDE.md

> Ecosystem context: root `d-context/CLAUDE.md` (common stack + conventions, shared rules) and `docs/services/dtpf.es.md` (cross-sub-project service guide: portfolio + API coordination, deploy map). This file covers `dtpf-web` internals only.

## Project Overview

Personal portfolio website (dtpf.es). Built with React 19, TypeScript 7, Tailwind CSS v4, Framer Motion 14, Lucide icons, and Vite 8. Package manager: **pnpm**. Requires **Node.js 24+** (`.nvmrc`).

Dark mode by default, light via `.light` class on `<html>`. i18n with Spanish default, English fallback (i18next + react-i18next).

## Commands

```bash
pnpm dev              # Vite dev server on localhost:3000
pnpm build            # Production build (tsc + vite build)
pnpm preview          # Preview production build locally
pnpm format           # Prettier formatting
pnpm test             # Run tests (vitest)
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with v8 coverage report (HTML in coverage/)
```

### Testing

Vitest 5 with jsdom environment, @testing-library/react, and jest-dom matchers. **283 tests** across 26 test files (one, the `facts.json` staleness check, runs only when `CI` is set). Coverage thresholds: 95% (statements, branches, functions, lines) — `pnpm test:coverage` currently FAILS them (72.9% stmts overall; `useSWUpdate.ts` and `lazyWithRetry.ts` are largely uncovered). CI runs `pnpm test` (no coverage gate) before deploy.

```
test/
├── setup.ts                          # IntersectionObserver + matchMedia mocks
├── helpers/renderWithProviders.tsx    # MemoryRouter + ThemeProvider + i18n wrapper
├── config/
│   ├── facts.test.ts                 # 19 tests — facts.json consistency, 120-day staleness (CI only), formatting helpers, MCP count
│   └── projects.test.ts              # 15 tests — order, featured four, status vs. liveUrl, no undefined version in a tag
├── contexts/theme.test.tsx           # 11 tests — ThemeProvider + useTheme
├── router/
│   ├── paths.test.ts                 # 4 tests
│   └── navigation.test.tsx           # 6 tests
├── utils/
│   ├── analytics.test.ts             # 13 tests — Umami analytics init/tracking
│   ├── cookieConsent.test.ts         # 12 tests — analytics is opt-in
│   ├── errorTracking.test.ts         # 24 tests — error tracking init/reporting/batching
│   ├── i18n.test.ts                  # 6 tests — key parity, accents, placeholders, <html lang> sync
│   ├── isLocalhost.test.ts           # 6 tests
│   ├── isStaging.test.ts             # 4 tests
│   └── lazyWithRetry.test.ts         # 3 tests — chunk-retry lazy loading
├── hooks/
│   └── useAnalyticsPageView.test.tsx # 6 tests
├── components/
│   ├── CookieConsentBanner.test.tsx  # 6 tests
│   ├── ErrorBoundary.test.tsx        # 8 tests — error boundary + fallback UI
│   ├── Header.test.tsx               # 24 tests — nav, mobile menu, trackEvent
│   ├── Footer.test.tsx               # 9 tests — links, "This site" line from facts, trackEvent
│   └── StagingBadge.test.tsx         # 3 tests — staging hostname badge
└── pages/
    ├── Home.test.tsx                  # 21 tests — proof bar from facts, sections, CTAs, trackEvent
    ├── About.test.tsx                 # 14 tests — profile, experience, tools, trackEvent
    ├── Projects.test.tsx              # 9 tests — one card per project, badge per status, visit link only with liveUrl, trackEvent
    ├── ProjectDetail.test.tsx         # 21 tests — case study, metrics, status note, store link, private project without buttons, trackEvent
    ├── Contact.test.tsx               # 17 tests — form, submit, trackEvent
    ├── NotFound.test.tsx              # 2 tests
    └── PrivacyPolicy.test.tsx         # 2 tests
```

Key patterns: `renderWithProviders()` wraps components in router/theme/i18n, relative imports from test/ (path aliases only work inside src/), `document.querySelector` for inputs without label association.

## Architecture

### Routing

React Router v8 with `createBrowserRouter` and lazy-loaded routes via `lazyWithRetry()` + `Suspense`. Everything imports from `react-router` (v8 consolidated the `react-router-dom` surface into it); library mode only, no loaders or framework mode. `lazyWithRetry` (src/utils/lazyWithRetry.ts) wraps `React.lazy` and reloads the page once on chunk-load errors (stale deploy assets), reporting the error and tracking the retry. Routes defined in `src/router/router.tsx`, paths centralized in `src/router/paths.ts`.

**Pages:**

- `/` — Home (hero, bento grid projects, manifesto, stack, CTA)
- `/projects` — Projects list with stacked cards
- `/projects/:slug` — Project detail with case study (Problem → Solution → Result)
- `/about` — Profile card, bio, experience, tools grid
- `/contact` — Contact form + direct links
- `/privacy-policy` — Static GDPR/LOPD page
- `*` — 404 Not Found

### Layout

Single `PortfolioLayout` wrapping all routes: sticky Header + `AnimatePresence` page transitions + Footer.

### Styling

- **Tailwind CSS v4** with `@theme` design tokens in `src/styles/portfolio.css`
- **Ocean Teal palette**: accent `#2DD4BF`, warm `#FBBF24`, dark bg `#0B0F19`
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels) — loaded via Google Fonts in `index.html`
- Light mode overrides via `.light` class on `<html>` (ThemeContext manages this)
- Grain texture overlay via CSS SVG filter on `body::after`
- `prefers-reduced-motion` support

### Theme

`src/contexts/theme/ThemeContext.tsx` — ThemeProvider + useTheme hook. Dark-first, persisted in localStorage (`dtpf-theme`). Detects system preference on first visit. Updates `<meta name="theme-color">`.

### i18n

`src/utils/i18n.ts` — i18next with browser language detection. Persisted in localStorage (`dtpf-lang`). Translation files in `src/assets/locale/{es,en}.ts` (~150 keys each). `<html lang>` follows the active language (`languageChanged` listener + sync after init), so `index.html`'s `lang="es"` is only the pre-hydration default. Spanish strings carry their accents; `test/utils/i18n.test.ts` rejects the common unaccented stand-ins and checks `{{placeholder}}` parity between languages.

### Projects Data

`src/config/projects.ts` — Typed `Project` interface with 8 projects in display order: dcompany, dauth, dinventory, dalist (the four with `featured: true`, which the Home bento grid renders in array order), then petitairam.com (`airam`), dstash, dwealth, audity. Each has i18n keys for name, tagline (optionally a longer `taglineLongKey` for the detail header), description, case study sections (problemKey, solutionKey, resultKey), stack array, metrics, and a `status` — `production` | `beta` | `client` | `private` — that drives the badge (`views/components/ProjectStatusBadge.tsx`) and whether a visit link is rendered at all: `liveUrl` is optional and absent for `private` apps (dwealth), `statusNoteKey` adds a one-line access note under the detail title (dcompany, dwealth), `storeUrl` renders the official Google Play badge (`public/badges/google-play-{es,en}.png`, served as supplied, never restyled) on dalist. An optional `media` array (`ProjectMedia`: `src` under `public/projects/<slug>/`, `altKey` in both locales, intrinsic `width`/`height`) feeds the "Screenshots" section of the detail page (`views/components/ProjectGallery.tsx`: thumbnail buttons + lightbox dialog with Esc/arrows/focus trap/focus return); no `media` means no section. Captures come from public pages or demo data only, never real user data, and are WebP outside the PWA precache glob. The portfolio itself is not a project card: the footer's "This site" line shows its stack and test count from `facts.projects.dtpf` and links to the public repo. Content rules: the AIRAM client is named only as the brand, never the person; dwealth has no public URL by design.

**No figure is typed in source.** Stack versions, test counts, the dauth tenant count and the app census ("11 in production · 8 public") come from `src/config/facts.json`, generated by `scripts/utils/portfolio-facts.py` in the d-context workspace (ops-dashboard results + each repo's `package.json` + the public dauth `get-domain` endpoint with a negative control). `src/config/facts.ts` types it and formats numbers per language (`formatInt`: `87.021` in Spanish, `87,021` in English — deliberately not `Intl`, whose es-ES rule leaves four-digit numbers ungrouped). Locale strings carry `{{tests}}`, `{{backend}}`, `{{tenants}}`… and the pages pass `projectVars(slug, lang)`; the hero's "years in SaaS" is `yearsSince(facts.saasSince)`. `test/config/facts.test.ts` fails the CI build (the workflow sets `CI=true`) when `generatedAt` is older than 120 days — regenerate the file, commit, done.

### API

`src/api/utils/config.ts` — `basePath`, `apiVersion` constants, and `apiUrl()` helper. Base path auto-detects localhost (port 3998) vs production (same-origin). Endpoints used: `POST /api/v1/contact-me` (contact form) and `POST /api/v1/client-errors` (batched client error reports).

### Contact Form Anti-Spam

The contact form includes:

- Honeypot field (`website`) hidden off-screen — bots fill it, humans don't
- Time trap (`_t` timestamp) — rejects submissions faster than 3 seconds
- Backend rate limits: 3/hour per IP, 1/24h per email, max 5 URLs in message

### Analytics, Consent & Error Tracking

- `src/utils/analytics.ts` — Umami (analytics.dtpf.es) with separate website IDs for dtpf.es and dev.dtpf.es. Script injected only after analytics consent (`data-auto-track` off). `useAnalyticsPageView` tracks SPA page views on route change plus one `perf:page-load` event.
- `src/utils/cookieConsent.ts` + `views/components/CookieConsentBanner.tsx` — consent persisted in localStorage (`dtpf-cookie-consent`); accepting analytics initializes Umami.
- `src/utils/errorTracking.ts` — `window` error/unhandledrejection listeners, dedup + batching, `POST /api/v1/client-errors`, flush on `beforeunload`. `src/ErrorBoundary.tsx` reports render errors and shows a fallback UI.
- `views/components/StagingBadge.tsx` — fixed "Staging" pill when the hostname starts with `dev.`/`dev-` (`utils/isStaging.ts`).

### Animations

Framer Motion throughout (`MotionConfig reducedMotion="user"` in App; shared variants in `src/utils/animations.ts`):

- Page transitions (`AnimatePresence mode="popLayout"` in PortfolioLayout)
- Hero staggered entrance (name, tagline, proof bar, CTAs)
- `whileInView` scroll reveals with stagger for projects and stack sections
- Mobile menu overlay with staggered nav links

### Offline Support / PWA

PWA via `vite-plugin-pwa` with `injectManifest` strategy. Service worker in `src/service-worker.ts`, registration logic in `src/serviceWorkerRegistration.ts`. Workbox 7 for precaching. Updates are **silent** (no banner/toast): the build emits `version.json` (`versionFilePlugin` in `vite.config.ts`); the `useSWUpdate` hook polls it (every 30s + on window focus, prod only) and, when `buildTime` differs from the running build, unregisters the SW + clears caches and applies the update on the next same-origin navigation click or tab re-focus — never mid-interaction — tracking `pwa:silent-update`.

### Path Aliases

`tsconfig.json` maps `paths: { "*": ["./src/*"] }` (TypeScript 7 removed `baseUrl`), and Vite resolves it natively through `resolve.tsconfigPaths` — no plugin. Imports use absolute paths from src.

## Component Structure

```
src/
├── api/utils/config.ts          # basePath + apiVersion + apiUrl()
├── assets/locale/{es,en}.ts     # i18n translations (~150 keys each)
├── config/facts.json            # Measured figures — generated by scripts/utils/portfolio-facts.py (d-context)
├── config/facts.ts              # Typed access + per-language number formatting for facts.json
├── config/projects.ts           # Project data (8 projects, status + featured flags; versions and counts from facts.json)
├── contexts/theme/              # ThemeContext + ThemeProvider + useTheme
├── hooks/
│   ├── useAnalyticsPageView.ts  # SPA page-view + page-load perf tracking
│   └── useSWUpdate.ts           # Silent PWA update (version.json polling)
├── router/{router,paths}.tsx    # Routes (createBrowserRouter + lazyWithRetry)
├── styles/portfolio.css         # Tailwind @theme tokens + base styles
├── utils/
│   ├── analytics.ts             # Umami init + trackPageView/trackEvent
│   ├── animations.ts            # Shared Framer Motion variants (stagger, fadeUp, fadeIn)
│   ├── chunkError.ts            # Chunk-load error detection
│   ├── cookieConsent.ts         # Consent storage helpers (dtpf-cookie-consent)
│   ├── errorTracking.ts         # Client error reporting (batched POST /client-errors)
│   ├── i18n.ts                  # i18next config
│   ├── isLocalhost.ts           # Localhost detection helper
│   ├── isStaging.ts             # dev.* hostname detection
│   └── lazyWithRetry.ts         # React.lazy with one reload retry on chunk errors
├── views/
│   ├── layouts/PortfolioLayout.tsx
│   ├── components/
│   │   ├── navigation/{Header,Footer}.tsx
│   │   ├── CookieConsentBanner.tsx
│   │   ├── ProjectGallery.tsx   # Screenshot thumbnails + lightbox dialog (Esc/arrows/focus trap/focus return)
│   │   ├── ProjectStatusBadge.tsx # Production / Private beta / Client work / Private pill per project status
│   │   └── StagingBadge.tsx     # "Staging" pill on dev.* hostnames
│   └── pages/{Home,Projects,ProjectDetail,About,Contact,NotFound,PrivacyPolicy}.tsx
├── ErrorBoundary.tsx            # Top-level error boundary + fallback UI
├── service-worker.ts            # Workbox service worker (injectManifest)
├── serviceWorkerRegistration.ts # SW registration
├── main.tsx                     # Entry point (registers SW)
└── App.tsx                      # ErrorBoundary > MotionConfig > ThemeProvider > RouterProvider + Toaster + CookieConsentBanner + StagingBadge
```

## Code Style

- No ESLint configured

## Environment Variables

Single build-time variable: `VITE_APP_SUFFIX` — read by `manifestEnvPlugin` in `vite.config.ts` to suffix the PWA manifest `name`/`short_name` (CI sets `DEV` on staging so the installed app is distinguishable from production). No `VITE_*` variables are read by application code at runtime.
