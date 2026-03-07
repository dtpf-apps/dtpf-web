# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (dtpf.es). Built with React 19, TypeScript 5.9, Tailwind CSS v4, Framer Motion, and Vite 7. Package manager: **pnpm**. Requires **Node.js 22+**.

Dark mode by default, light via `.light` class on `<html>`. i18n with Spanish default, English fallback (i18next + react-i18next).

## Commands

```bash
pnpm dev              # Vite dev server on localhost:3000
pnpm build            # Production build (tsc + vite build)
pnpm preview          # Preview production build locally
pnpm format           # Prettier formatting
```

No test framework configured.

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

`src/config/projects.ts` — Typed `Project` interface with 5 projects (dauth, dstash, dalist, audity, dtpf). Each has i18n keys for name, tagline, description, case study sections, stack array, metrics, and live URL.

### API

`src/api/utils/config.ts` — `apiUrl()` builds full endpoint URL. Base path auto-detects localhost (port 3998) vs production (same-origin). Single endpoint used: `POST /api/v1/contact-me`.

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

### Offline Support

PWA via `vite-plugin-pwa` with `injectManifest` strategy. Service worker in `src/service-worker.ts`. Workbox 7 for precaching.

### Path Aliases

`tsconfig.json` sets `baseUrl: "src"`, resolved by `vite-tsconfig-paths`. Imports use absolute paths from src.

## Component Structure

```
src/
├── api/utils/config.ts          # API URL builder
├── assets/locale/{es,en}.ts     # i18n translations
├── config/projects.ts           # Project data
├── contexts/theme/              # ThemeContext + useTheme
├── router/{router,paths}.tsx    # Routes
├── styles/portfolio.css         # Tailwind @theme tokens
├── utils/i18n.ts                # i18next config
├── views/
│   ├── layouts/PortfolioLayout.tsx
│   ├── components/navigation/{Header,Footer}.tsx
│   └── pages/{Home,Projects,ProjectDetail,About,Contact,NotFound,PrivacyPolicy}.tsx
├── main.tsx                     # Entry point
└── App.tsx                      # ThemeProvider > RouterProvider + Toaster
```

## Code Style

- Prettier: 110 char width, single quotes, trailing commas (es5), 2-space indent, semicolons
- No ESLint configured

## Environment Variables

No env vars needed for the frontend in development. In production, set as GitHub Secrets:
- `VITE_PUBLIC_URL` — Public URL (e.g., `https://dtpf.es`)
