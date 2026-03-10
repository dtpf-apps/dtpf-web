# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (dtpf.es). Built with React 19, TypeScript 5.9, Tailwind CSS v4, Framer Motion 12, Lucide icons, and Vite 7. Package manager: **pnpm**. Requires **Node.js 22+**.

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

Vitest 4 with jsdom environment, @testing-library/react, and jest-dom matchers. **61 tests** across 14 test files. Coverage thresholds: 70% (statements, branches, functions, lines). Tests run in CI before deploy.

```
test/
├── setup.ts                          # IntersectionObserver + matchMedia mocks
├── helpers/renderWithProviders.tsx    # MemoryRouter + ThemeProvider + i18n wrapper
├── api/fetchHelper.test.ts           # 7 tests — apiUrl, buildUrl, fetchAPI
├── config/projects.test.ts           # 4 tests — project data validation
├── contexts/theme.test.tsx           # 8 tests — ThemeProvider + useTheme
├── utils/
│   ├── i18n.test.ts                  # 3 tests
│   └── isLocalhost.test.ts           # 5 tests
├── components/
│   ├── Header.test.tsx               # 4 tests
│   └── Footer.test.tsx               # 3 tests
└── pages/
    ├── Home.test.tsx                  # 5 tests
    ├── About.test.tsx                 # 4 tests
    ├── Projects.test.tsx              # 3 tests
    ├── ProjectDetail.test.tsx         # 5 tests
    ├── Contact.test.tsx               # 6 tests
    ├── NotFound.test.tsx              # 2 tests
    └── PrivacyPolicy.test.tsx         # 2 tests
```

Key patterns: `renderWithProviders()` wraps components in router/theme/i18n, relative imports from test/ (path aliases only work inside src/), `document.querySelector` for inputs without label association.

## Architecture

### Routing

React Router v7 with `createBrowserRouter` and lazy-loaded routes via `React.lazy()` + `Suspense`. Routes defined in `src/router/router.tsx`, paths centralized in `src/router/paths.ts`.

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

`src/utils/i18n.ts` — i18next with browser language detection. Persisted in localStorage (`dtpf-lang`). Translation files in `src/assets/locale/{es,en}.ts` (~120 keys each).

### Projects Data

`src/config/projects.ts` — Typed `Project` interface with 5 projects (dauth, dstash, dalist, dtpf, audity). Each has i18n keys for name, tagline, description, case study sections (problemKey, solutionKey, resultKey), stack array, metrics, and live URL. dauth and dstash include metrics (test counts, deploy info). dalist includes case study sections. The Home page filters out `dtpf` from the featured bento grid (shows 4 projects).

### API

`src/api/utils/config.ts` — `basePath` and `apiVersion` constants. Base path auto-detects localhost (port 3998) vs production (same-origin). `src/api/utils/fetchHelper.ts` — `apiUrl()` builds full endpoint URL, `buildUrl()` appends query params, `fetchAPI<T>()` generic typed fetch wrapper with `credentials: 'include'`. Single endpoint used: `POST /api/v1/contact-me`.

### Contact Form Anti-Spam

The contact form includes:
- Honeypot field (`website`) hidden off-screen — bots fill it, humans don't
- Time trap (`_t` timestamp) — rejects submissions faster than 3 seconds
- Backend rate limits: 3/hour per IP, 1/24h per email, max 5 URLs in message

### Animations

Framer Motion throughout:
- Page transitions (`AnimatePresence mode="wait"`)
- Hero staggered entrance (name, tagline, proof bar, CTAs)
- `whileInView` scroll reveals with stagger for projects and stack sections
- Mobile menu overlay with staggered nav links

### Offline Support / PWA

PWA via `vite-plugin-pwa` with `injectManifest` strategy. Service worker in `src/service-worker.ts`, registration logic in `src/serviceWorkerRegistration.ts`. Workbox 7 for precaching. `useSWUpdate` hook monitors for new service worker versions and surfaces update availability via `SWUpdateBanner` component (slide-up toast with "Update now" / dismiss).

### Path Aliases

`tsconfig.json` sets `baseUrl: "src"`, resolved by `vite-tsconfig-paths`. Imports use absolute paths from src.

## Component Structure

```
src/
├── api/utils/
│   ├── config.ts                # basePath + apiVersion constants
│   └── fetchHelper.ts           # apiUrl, buildUrl, fetchAPI<T>
├── assets/locale/{es,en}.ts     # i18n translations (~120 keys each)
├── config/projects.ts           # Project data (5 projects)
├── contexts/theme/              # ThemeContext + ThemeProvider + useTheme
├── hooks/useSWUpdate.ts         # Service worker update detection hook
├── router/{router,paths}.tsx    # Routes (createBrowserRouter + lazy-loaded)
├── styles/portfolio.css         # Tailwind @theme tokens + base styles
├── utils/
│   ├── i18n.ts                  # i18next config
│   └── isLocalhost.ts           # Localhost detection helper
├── views/
│   ├── layouts/PortfolioLayout.tsx
│   ├── components/
│   │   ├── navigation/{Header,Footer}.tsx
│   │   └── SWUpdateBanner.tsx   # Service worker update toast
│   └── pages/{Home,Projects,ProjectDetail,About,Contact,NotFound,PrivacyPolicy}.tsx
├── service-worker.ts            # Workbox service worker (injectManifest)
├── serviceWorkerRegistration.ts # SW registration + update event dispatch
├── main.tsx                     # Entry point (registers SW)
└── App.tsx                      # ThemeProvider > RouterProvider + SWUpdateBanner + Toaster
```

## Code Style

- Prettier: 110 char width, single quotes, trailing commas (es5), 2-space indent, semicolons
- No ESLint configured

## Environment Variables

`.env` file with:
- `VITE_PUBLIC_URL` — Public URL (e.g., `https://dtpf.es`)
- `VITE_DAUTH_DOMAIN_NAME` — Dauth domain name (e.g., `dtpf`)

In production, both are set as GitHub Secrets.
