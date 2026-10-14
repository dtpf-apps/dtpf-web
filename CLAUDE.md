# CLAUDE.md

> Ecosystem context: root `d-context/CLAUDE.md` (common stack + conventions, shared rules) and `docs/services/dtpf.es.md` (cross-sub-project service guide: portfolio + API coordination, deploy map). This file covers `dtpf-web` internals only.

## Project Overview

Personal portfolio website (dtpf.es). Built with React 19, TypeScript 7, Tailwind CSS v4, Framer Motion 14, Lucide icons, and Vite 8. Package manager: **pnpm**. Requires **Node.js 24+** (`.nvmrc`).

Dark mode by default, light via `.light` class on `<html>`. i18n from the URL: `/` is Spanish (canonical), `/en/...` is English (i18next + react-i18next).

## Commands

```bash
pnpm dev              # Vite dev server on localhost:3000
pnpm build            # Production build: tsc + vite build + scripts/postbuild (pre-render, OG cards, sitemap, CV PDFs)
pnpm postbuild:check  # Verify dist/ after a build: per-route head tags, OG files, PDFs, sitemap, shell references
pnpm preview          # Preview production build locally
pnpm format           # Prettier: src, test, scripts, vite.config.ts
pnpm format:check     # Same files, check only (CI)
pnpm lint             # oxlint, warnings fail (CI)
pnpm typecheck        # tsc over src + test + vite.config.ts (tsconfig.test.json); the build's tsc covers src only
pnpm test             # Run tests (vitest)
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Tests + v8 coverage with 95% thresholds (HTML in coverage/) — the CI test step
```

CI (`.gitea/workflows/deploy.yml`) runs, in order: `format:check`, `lint`, `typecheck`, `test:coverage`, `build`, `postbuild:check`, then rsyncs `dist/`. Run the same before a push.

### Testing

Vitest 5 with jsdom environment, @testing-library/react, and jest-dom matchers. No test counts here: they go stale on the next commit. One test, the `facts.json` staleness check, runs only when `CI` is set. `test/postbuild/*` imports the build scripts and `test/styles/fonts.test.ts` reads `index.html` and the CSS from disk, so the suite runs from the package root (as `pnpm test` does). Coverage thresholds are 95% for statements, branches, functions and lines, and `pnpm test:coverage` (the CI step) fails below any of them. `tsconfig.test.json` relaxes `noUncheckedIndexedAccess` for tests only: `array[0]` after asserting the length is the normal shape of an assertion.

```
test/
├── setup.ts                          # IntersectionObserver + matchMedia mocks; switches i18n to `en` for the jsdom renders
├── helpers/renderWithProviders.tsx    # MemoryRouter + ThemeProvider + i18n wrapper
├── App.test.tsx                      # Umami starts on every visit, no consent gate
├── api/config.test.ts                # apiUrl(): same-origin /api/v1 prefix
├── config/
│   ├── facts.test.ts                 # facts.json consistency, 120-day staleness (CI only), platform figures, formatting helpers, MCP count
│   ├── platform.test.ts              # every locale key referenced exists in es/en, "used by" slugs are projects, figure variables exist, no inventory (IP, CT/VM number, internal host) in the copy — with a positive control
│   ├── projects.test.ts              # order, featured four, status vs. liveUrl, no undefined version in a tag
│   └── site.test.ts                  # canonical/OG path helpers, JSON-LD builders and `<` escaping
├── contexts/theme.test.tsx           # ThemeProvider + useTheme
├── layouts/PortfolioLayout.test.tsx  # i18n follows the URL, saved-language redirect on arrival
├── router/
│   ├── paths.test.ts                 # path constants + langFromPath/stripLang/localizePath
│   ├── router.test.tsx               # one page tree per language, 404 per language, errorElement on the layout route
│   ├── LocalizedLink.test.tsx        # Link/NavLink/Navigate keep the /en prefix
│   ├── noRawRouterLinks.test.ts      # no page/component imports Link/NavLink/Navigate from react-router directly
│   └── navigation.test.tsx
├── styles/
│   ├── contrast.test.ts              # accent/on-accent/text-secondary pairs at AA in both themes and in print
│   └── fonts.test.ts                 # a self-hosted @font-face per theme family, no font host, valid preloads, OFL present
├── postbuild/
│   ├── routes.test.ts                # route list per language, dist file per route
│   ├── template.test.ts              # head injection with data-prerender, <html lang>, strip
│   ├── sitemap.test.ts               # one URL per route, privacy ES-only
│   ├── og.test.ts                    # card text from the page title, embedded fonts, no network URL
│   └── pdf.test.ts                   # CV routes, file names, size floor
├── utils/
│   ├── analytics.test.ts             # Umami analytics init/tracking
│   ├── errorTracking.test.ts         # listeners, dedup, 2 s batching, flush on pagehide, exact request
│   ├── focusTrap.test.tsx            # Tab/Shift+Tab wrap, inner moves left to the browser, focus on the container itself
│   ├── i18n.test.ts                  # key parity, accents, placeholders, <html lang> sync
│   ├── isStaging.test.ts
│   ├── lazyWithRetry.test.tsx        # one reload per stale chunk (three browser wordings), then the error boundary
│   ├── removePrerendered.test.ts     # build-time head tags removed before React renders
│   └── storage.test.ts               # a localStorage that throws never breaks the page
├── hooks/
│   ├── useAnalyticsPageView.test.tsx
│   └── useSWUpdate.test.tsx          # version.json polling, update applied on a same-origin link or on return to the tab, never with a dialog open
├── components/
│   ├── ErrorBoundary.test.tsx        # fallback + Reload, report to the API, a page crash caught by the router's errorElement
│   ├── Header.test.tsx               # five nav links, mobile menu (scrolls, Escape, focus trap and return), language toggle navigates to the other URL, trackEvent
│   ├── Footer.test.tsx               # links, "This site" line from facts, cookieless-analytics line, trackEvent
│   ├── ProjectGallery.test.tsx       # thumbnails, lightbox, keyboard, focus
│   ├── Seo.test.tsx                  # title, description, canonical, hreflang, OG/Twitter, JSON-LD, noindex, esOnly
│   ├── StagingBadge.test.tsx         # staging hostname badge
│   └── printHidden.test.tsx          # header, footer and staging badge carry print:hidden
└── pages/
    ├── Home.test.tsx                  # proof bar from facts, bento, "How I work" cards and links, CTAs, trackEvent
    ├── homeViewport.test.tsx          # the "How I work" scroll event; own file because Framer Motion caches its IntersectionObserver on first render
    ├── Platform.test.tsx              # six measured figures, dated line, six cards, tools without links, project links, diagram (nodes, accessible name, no headings/focusables), no inventory, CTAs, trackEvent
    ├── About.test.tsx                 # profile, experience, tools, CV button, trackEvent
    ├── Projects.test.tsx              # one card per project, badge per status, visit link only with liveUrl, trackEvent
    ├── ProjectDetail.test.tsx         # case study, metrics, status note, store link, private project without buttons, unknown slug = 404 page, SEO, trackEvent
    ├── Contact.test.tsx               # limits, request body, success toast and reset, each API error code → its own copy, network/timeout, direct links
    ├── Cv.test.tsx                    # sections from site data, download link per language, trackEvent
    ├── pageSeo.test.tsx               # every page renders <Seo> with its own title and description
    ├── headingOutline.test.tsx        # every page opens with its only h1 and never skips a heading level
    ├── NotFound.test.tsx
    └── PrivacyPolicy.test.tsx         # heading, RGPD, cookieless analytics declared
```

Key patterns: `renderWithProviders()` wraps components in router/theme/i18n, relative imports from test/ (path aliases only work inside src/), `document.querySelector` for inputs without label association.

## Architecture

### Routing

React Router v8 with `createBrowserRouter` and lazy-loaded routes via `lazyWithRetry()` + `Suspense`. Everything imports from `react-router` (v8 consolidated the `react-router-dom` surface into it); library mode only, no loaders or framework mode. `lazyWithRetry` (src/utils/lazyWithRetry.ts) wraps `React.lazy` and reloads the page once on chunk-load errors (stale deploy assets), reporting the error and tracking the retry. Routes defined in `src/router/router.tsx`, paths centralized in `src/router/paths.ts`.

The language lives in the URL: `/` is Spanish (canonical) and `/en/...` is English. `router.tsx` builds the same page tree twice (`pageTree('')` and `pageTree('/en')`) under one `PortfolioLayout`, each with its own `*` 404. `useRouteLang()` reads the language from the location; `langFromPath`/`stripLang`/`localizePath` in `paths.ts` convert paths; links go through `LocalizedLink`/`LocalizedNavLink`/`LocalizedNavigate` (`src/router/LocalizedLink.tsx`), which keep the prefix — `test/router/noRawRouterLinks.test.ts` fails any page or component importing `Link`/`NavLink`/`Navigate` from `react-router` directly.

**Pages (each also under `/en`):**

- `/` — Home (hero, bento grid projects, "How I work" — four habit cards whose figures come from `facts.json` and whose links point at the page that proves each one —, stack, CTA)
- `/projects` — Projects list with stacked cards
- `/projects/:slug` — Project detail with case study (Problem → Solution → Result)
- `/platform` — Platform: six measured figures (`platformVars()`), a request-path architecture diagram (`ArchitectureDiagram`, HTML + CSS grid, no SVG) and six building-block cards; data in `config/platform.ts`, copy in the `platform_*` locale keys. Architecture, not inventory: no IPs, hostnames or machine ids anywhere
- `/about` — Profile card, bio, experience, tools grid, CV button
- `/contact` — Contact form + direct links (incl. CV)
- `/cv` — Printable A4 résumé built from the site data (`config/profile.ts`, `config/projects.ts`, locale strings) + PDF download (`cvPdfPath(lang)`)
- `/privacy-policy` — Static GDPR/LOPD page (Spanish only in the sitemap: `esOnly` on its `<Seo>`)
- `*` — 404 Not Found

### Layout

Single `PortfolioLayout` wrapping all routes: sticky Header + `AnimatePresence` page transitions + Footer.

### Styling

- **Tailwind CSS v4** with `@theme` design tokens in `src/styles/portfolio.css`
- **Ocean Teal palette**: accent `#2DD4BF`, warm `#FBBF24`, dark bg `#0B0F19`; light accent is teal 700 `#0F766E` (teal 600 read at 3.6:1 on the light background). Text on an accent-filled control is `text-on-accent` (dark in dark mode, white in light), never a hardcoded hex. `test/styles/contrast.test.ts` measures accent/on-accent/text-secondary pairs against the tokens at AA in both themes and in print, and fails on the first regression.
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels) — self-hosted from `src/assets/fonts/` (`@font-face` in `portfolio.css`, static latin woff2 instances with their OFL text; `index.html` preloads the body and heading faces). Static instances on purpose: Chromium prints a variable font as a Type 3 font, which résumé parsers read worse than the CID TrueType a static one yields. `test/styles/fonts.test.ts` fails on any font host or missing file.
- Light mode overrides via `.light` class on `<html>` (ThemeContext manages this)
- Grain texture overlay via CSS SVG filter on `body::after`
- `prefers-reduced-motion` support

### Theme

`src/contexts/theme/ThemeContext.tsx` — ThemeProvider + useTheme hook. Dark-first, persisted in localStorage (`dtpf-theme`). Detects system preference on first visit. Updates `<meta name="theme-color">`.

### i18n

`src/utils/i18n.ts` — i18next initialised with the language of the URL (`langFromPath(window.location.pathname)`). **No browser-language detection and no automatic redirect**: Googlebot crawls as en-US and must reach the Spanish pages. `PortfolioLayout` keeps i18next in sync with the route (`useLayoutEffect`) and, once on arrival, redirects (replace, keeping search and hash) to the language the visitor chose earlier with the header toggle, persisted in localStorage (`dtpf-lang`); the toggle itself navigates to the same path under the other prefix. Translation files in `src/assets/locale/{es,en}.ts` (~315 keys each). `<html lang>` follows the active language, so `index.html`'s `lang="es"` is only the pre-hydration default (the pre-rendered route files carry the right one). Spanish strings carry their accents; `test/utils/i18n.test.ts` rejects the common unaccented stand-ins and checks `{{placeholder}}` parity between languages. In jsdom tests `test/setup.ts` switches to `en` after importing i18n, so assertions use the English copy. Rendering that depends on the language (number formatting, the Google Play badge image) reads `i18n.language`, always `es` or `en` once `PortfolioLayout` has synced it; URLs and SEO read `useRouteLang()`.

### Discovery: pre-rendered head, OG cards, sitemap, CV PDF

`views/components/Seo.tsx` renders per page: `<title>` (a page passes `pageName`, rendered `<pageName> — <SITE_NAME>`, or a complete `title` — the home; the type accepts exactly one), description, canonical, `hreflang` alternates (es/en/x-default), Open Graph + Twitter tags and optional JSON-LD. Helpers in `config/site.ts`: `SITE_URL = 'https://dtpf.es'` (also on staging — canonical and OG URLs always point at production), `canonicalUrl`, `ogImagePath(lang, key)` → `/og/<lang>/<key>.png`, `personJsonLd`/`softwareJsonLd`, `serializeJsonLd` (escapes `<`), `cvPdfPath(lang)`. `noindex` drops canonical, alternates and sharing tags; `esOnly` (privacy policy) pins canonical and `og:locale` to Spanish and declares no alternates. React 19 hoists title/meta/link into `<head>`; the JSON-LD `<script>` stays where it renders.

A crawler or link-preview bot that does not run JavaScript sees none of that, so `pnpm build` runs `scripts/postbuild/index.mjs` after `vite build` (plain Node ESM; `playwright` pinned to an exact version in `package.json` — the CI runner caches that Chromium headless shell under `PLAYWRIGHT_BROWSERS_PATH`, and `deploy.yml` installs it with `--only-shell`, never `--with-deps`):

1. `serve.mjs` serves `dist/` on 127.0.0.1; `prerender.mjs` opens each of the 30 routes (`routes.mjs`: every page × both languages, project slugs read from `config/projects.ts`) in headless Chromium with third-party requests refused and copies only the SEO tags (plus the JSON-LD script) out of the live DOM.
2. `template.mjs` injects them, marked `data-prerender`, into the untouched `dist/index.html` template with the right `<html lang>`, and `index.mjs` writes `dist/<route>/index.html` (the home is `dist/index.html` itself). `#root` stays empty — head-only pre-rendering, not SSR; `utils/removePrerendered.ts` strips the marked tags before `createRoot`, so React never duplicates them.
3. `og.mjs` renders a 1200×630 card per route (brand, page title, description, the first desktop screenshot for a project page; fonts embedded from `src/assets/fonts/`) to `dist/og/<lang>/<key>.png`.
4. `pdf.mjs` prints `/cv` and `/en/cv` in the light theme to `dist/cv/david-pizarro-frick-{es,en}.pdf` (A4, 12 mm margins). The CV page uses plain elements (no Framer Motion) and `print:` utilities plus the `@media print` block in `portfolio.css`, so the print is the page.
5. `sitemap.mjs` writes `dist/sitemap.xml` (every route with its alternates; `/privacy-policy` Spanish only); `public/robots.txt` points at it.

`pnpm postbuild:check` (`check.mjs`, run by CI after the build) reads only `dist/` and fails on a route without its pre-rendered title, description, canonical, `og:url` equal to it, hreflang alternates or `og:image` file; a missing or tiny PDF; a sitemap gap; or a shell that still references `/src/` or a font host. dtpf-api's catch-all serves `client/<route>/index.html` when it exists and the shell with a 404 status otherwise. The service worker precaches the Vite output only (`js,css,html,svg`); the route files are written afterwards, so an installed SW keeps navigating through the precached shell while crawlers and first visits get the per-route file from the server.

### Projects Data

`src/config/projects.ts` — Typed `Project` interface with 8 projects in display order: dcompany, dauth, dinventory, dalist (the four with `featured: true`, which the Home bento grid renders in array order), then petitairam.com (`airam`), dstash, dwealth, audity. Each has i18n keys for name, tagline (optionally a longer `taglineLongKey` for the detail header), description, an optional `caseStudy` (`problemKey`, `solutionKey`, `resultKey`: all three or none; without it — audity — the detail page shows the description), stack array, metrics, and a `status` — `production` | `beta` | `client` | `private` — that drives the badge (`views/components/ProjectStatusBadge.tsx`) and whether a visit link is rendered at all: `liveUrl` is optional and absent for `private` apps (dwealth), `statusNoteKey` adds a one-line access note under the detail title (dcompany, dwealth), `storeUrl` renders the official Google Play badge (`public/badges/google-play-{es,en}.png`, served as supplied, never restyled) on dalist. An optional `media` array (`ProjectMedia`: `src` under `public/projects/<slug>/`, `altKey` in both locales, intrinsic `width`/`height`) feeds the "Screenshots" section of the detail page (`views/components/ProjectGallery.tsx`: thumbnail buttons + lightbox dialog with Esc/arrows/focus trap/focus return); no `media` means no section. Captures come from public pages or demo data only, never real user data, and are WebP outside the PWA precache glob. The portfolio itself is not a project card: the footer's "This site" line shows its stack and test count from `facts.projects.dtpf` and links to the public repo. Content rules: the AIRAM client is named only as the brand, never the person; dwealth has no public URL by design.

**No figure is typed in source.** Stack versions, test counts, the dauth tenant count and the app census ("11 in production · 8 public") come from `src/config/facts.json`, generated by `scripts/utils/portfolio-facts.py` in the d-context workspace (ops-dashboard results + each repo's `package.json` + the public dauth `get-domain` endpoint with a negative control). `src/config/facts.ts` types it and formats numbers per language (`formatInt`: `87.021` in Spanish, `87,021` in English — deliberately not `Intl`, whose es-ES rule leaves four-digit numbers ungrouped). Locale strings carry `{{tests}}`, `{{backend}}`, `{{tenants}}`… and the pages pass `projectVars(slug, lang)`; the hero's "years in SaaS" is `yearsSince(facts.saasSince)`. The platform page reads `facts.platform` (Proxmox nodes and guests, replication jobs, PBS datastores and bytes, Prometheus targets/probes/alert rules, CI workflow files — measured by the same script against Prometheus and the local checkouts) through `platformVars(lang)`, which also formats the backup usage in TB (`formatDecimal`) and the generation day as a long date (`formatDate`). `test/config/facts.test.ts` fails the CI build (the workflow sets `CI=true`) when `generatedAt` is older than 120 days — regenerate the file, commit, done.

### API

`src/api/utils/config.ts` — `apiUrl(path)` returns the same-origin `/api/v1/...` path. In production dtpf-api serves this app, so there is no CORS; in `pnpm dev` and `pnpm preview` Vite proxies `/api` to the API on `localhost:3998` (`server.proxy`/`preview.proxy` in `vite.config.ts`). Endpoints used: `POST /api/v1/contact-me` (contact form) and `POST /api/v1/client-errors` (batched client error reports).

Contact errors: the API answers `{ status, code, message }` (a 429 adds `retryAfter` in seconds). `Contact.tsx` maps each `code` to its own `contact_error_<code>` copy — with the field limits or the wait — and never shows the API's `message`, which is server-side Spanish. A new code on the API needs its two locale keys here, or it falls back to the generic `contact_error`.

### Contact Form Anti-Spam

The contact form includes:

- Honeypot field (`website`) hidden off-screen — bots fill it, humans don't
- Time trap (`_t` timestamp) — rejects submissions faster than 3 seconds
- Backend rate limits: 3/hour per IP, 1/24h per email, max 5 URLs in message

### Analytics & Error Tracking

- `src/utils/analytics.ts` — Umami (analytics.dtpf.es) with separate website IDs for dtpf.es and dev.dtpf.es, injected on every visit from `App` (`data-auto-track` off). **No consent banner**: Umami sets no cookies and keeps no identifier in the browser, the IP is never stored (hashed with the user agent and a rotating salt), so the site declares it instead of asking — a footer line ("cookieless analytics with Umami · privacy policy") and the "Analítica web" section of `/privacy-policy`. Any change that makes the analytics identify people brings the consent question back. `useAnalyticsPageView` tracks SPA page views on route change plus one `perf:page-load` event.
- `src/utils/errorTracking.ts` — `window` error/unhandledrejection listeners, dedup per page load, 2 s batching, `POST /api/v1/client-errors` with `keepalive`, flush on `pagehide` (not `beforeunload`, which keeps a page out of the back/forward cache). `src/ErrorBoundary.tsx` reports render errors and shows a fallback with a Reload button. It has two halves: the router catches what a page throws while rendering, so a page crash never reaches the class boundary in `App` — `RouteErrorFallback` is the layout route's `errorElement` in `router.tsx`, and the class boundary covers everything outside the router.
- `views/components/StagingBadge.tsx` — fixed "Staging" pill when the hostname starts with `dev.`/`dev-` (`utils/isStaging.ts`).

### Animations

Framer Motion throughout (`MotionConfig reducedMotion="user"` in App; shared variants in `src/utils/animations.ts`):

- Page transitions (`AnimatePresence mode="popLayout"` in PortfolioLayout)
- Hero staggered entrance (name, tagline, proof bar, CTAs)
- `whileInView` scroll reveals with stagger for projects and stack sections
- Mobile menu overlay with staggered nav links

### Offline Support / PWA

PWA via `vite-plugin-pwa` with `injectManifest` strategy. Service worker in `src/service-worker.ts` (precache, navigation fallback to the shell for paths without a file extension, a small image cache), registered on `load` in production builds only by `src/serviceWorkerRegistration.ts`, which never reloads the page itself. Workbox 7 for precaching. Updates are **silent** (no banner/toast): the build emits `version.json` (`versionFilePlugin` in `vite.config.ts`); the `useSWUpdate` hook polls it (every 30s + on window focus, prod only) and, when `buildTime` differs from the running build, unregisters the SW + clears caches and applies the update on the next same-origin navigation click or tab re-focus — never mid-interaction — tracking `pwa:silent-update`.

### Path Aliases

`tsconfig.json` maps `paths: { "*": ["./src/*"] }` (TypeScript 7 removed `baseUrl`), and Vite resolves it natively through `resolve.tsconfigPaths` — no plugin. Imports use absolute paths from src.

## Component Structure

```
scripts/postbuild/               # Post-build pipeline run by `pnpm build` (see Discovery): index, routes, serve,
                                 #   prerender, template, og, sitemap, pdf, check (.mjs, plain Node ESM)
src/
├── api/utils/config.ts          # apiUrl(): same-origin /api/v1 (Vite proxies /api in dev and preview)
├── assets/fonts/                # Self-hosted woff2 (static latin instances) + OFL licenses
├── assets/locale/{es,en}.ts     # i18n translations (~315 keys each)
├── config/facts.json            # Measured figures — generated by scripts/utils/portfolio-facts.py (d-context)
├── config/facts.ts              # Typed access + per-language number formatting for facts.json
├── config/platform.ts           # Platform page data: diagram nodes and tiers, figures strip, six cards
├── config/profile.ts            # Experience + tool groups (About and Cv)
├── config/projects.ts           # Project data (8 projects, status + featured flags; versions and counts from facts.json)
├── config/site.ts               # SITE_URL, SITE_NAME, AUTHOR, canonical/OG helpers, JSON-LD builders, cvPdfPath
├── contexts/theme/              # ThemeContext + ThemeProvider + useTheme
├── hooks/
│   ├── useAnalyticsPageView.ts  # SPA page-view + page-load perf tracking
│   └── useSWUpdate.ts           # Silent PWA update (version.json polling)
├── router/
│   ├── router.tsx               # createBrowserRouter + lazyWithRetry; one page tree per language
│   ├── paths.ts                 # Path constants + langFromPath/stripLang/localizePath
│   ├── LocalizedLink.tsx        # Link/NavLink/Navigate that keep the /en prefix
│   └── useRouteLang.ts          # Language of the current URL
├── styles/portfolio.css         # @font-face + Tailwind @theme tokens + base styles + @media print
├── utils/
│   ├── analytics.ts             # Umami init + trackPageView/trackEvent
│   ├── animations.ts            # Shared Framer Motion variants (stagger, fadeUp, fadeIn)
│   ├── chunkError.ts            # Chunk-load error detection
│   ├── errorTracking.ts         # Client error reporting (batched POST /client-errors)
│   ├── focusTrap.ts             # trapFocus(): Tab/Shift+Tab stay inside a modal (mobile menu, gallery lightbox)
│   ├── i18n.ts                  # i18next config (language from the URL)
│   ├── isStaging.ts             # dev.* hostname detection
│   ├── lazyWithRetry.ts         # React.lazy with one reload retry on chunk errors
│   ├── removePrerendered.ts     # Strips the build-time head tags before createRoot
│   └── storage.ts               # STORAGE_KEYS + localStorage access that never throws
├── views/
│   ├── layouts/PortfolioLayout.tsx  # Header + page transitions + footer; syncs i18n to the URL, saved-language redirect
│   ├── components/
│   │   ├── ArchitectureDiagram.tsx # Platform page: request path as ordered lists, aria-hidden connectors, sr-only summary
│   │   ├── navigation/{Header,Footer}.tsx
│   │   ├── ProjectGallery.tsx   # Screenshot thumbnails + lightbox dialog (Esc/arrows/focus trap/focus return)
│   │   ├── ProjectStatusBadge.tsx # Production / Private beta / Client work / Private pill per project status
│   │   ├── SectionHeader.tsx    # Label + h2 + intro that open a content section (Home, Platform)
│   │   ├── Seo.tsx              # Per-page head: title, description, canonical, hreflang, OG/Twitter, JSON-LD
│   │   └── StagingBadge.tsx     # "Staging" pill on dev.* hostnames
│   └── pages/{Home,Projects,ProjectDetail,Platform,About,Contact,Cv,NotFound,PrivacyPolicy}.tsx
├── ErrorBoundary.tsx            # Top-level error boundary, RouteErrorFallback (router errorElement), shared fallback UI
├── service-worker.ts            # Workbox service worker (injectManifest)
├── serviceWorkerRegistration.ts # SW registration
├── main.tsx                     # Entry point (removePrerendered, then createRoot; registers SW)
└── App.tsx                      # ErrorBoundary > MotionConfig > ThemeProvider > RouterProvider + Toaster + StagingBadge; starts Umami
```

## Code Style

- Prettier (config in `package.json`) and oxlint (`.oxlintrc.json`: correctness category plus React hooks, jsx-a11y and Vitest rules), both gated in CI. No ESLint.
- `tsconfig.json` enables `noUncheckedIndexedAccess`: an index read is `T | undefined` until checked.
- localStorage only through `utils/storage.ts` (`STORAGE_KEYS`, `readStored`/`writeStored`/`removeStored`): it throws in some private modes and under a full quota.

## Environment Variables

Single build-time variable: `VITE_APP_SUFFIX` — read by `manifestEnvPlugin` in `vite.config.ts` to suffix the PWA manifest `name`/`short_name` (CI sets `DEV` on staging so the installed app is distinguishable from production). No `VITE_*` variables are read by application code at runtime.
