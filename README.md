# dtpf-frontend-react

Frontend SPA for the [dtpf.es](https://dtpf.es) personal portfolio website. Dark-mode-first design with animated page transitions, i18n support, and PWA offline capabilities.

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 with custom `@theme` design tokens
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v7 (lazy-loaded routes)
- **i18n:** i18next + react-i18next (Spanish default, English fallback)
- **Notifications:** Sonner (toast)
- **PWA:** vite-plugin-pwa with Workbox 7 (injectManifest strategy)
- **Package Manager:** pnpm

## Prerequisites

- Node.js >= 22
- pnpm
- Backend API running on port 3998 (see dtpf-backend-node)

## Installation

```bash
git clone https://github.com/dtpf-apps/dtpf-frontend-react.git
cd dtpf-frontend-react
pnpm install
```

No environment variables are needed for local development.

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `pnpm dev` | Start Vite dev server on port 3000 |
| `build` | `pnpm build` | Production build (`tsc` + `vite build`) |
| `preview` | `pnpm preview` | Preview production build locally |
| `format` | `pnpm format` | Format source files with Prettier |

## Development

```bash
# Ensure the backend is running on port 3998 first
pnpm dev
```

The dev server starts at `http://localhost:3000`. API calls auto-detect localhost and proxy to `http://localhost:3998`.

## Pages

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero section, bento grid projects, manifesto, stack, CTA |
| `/projects` | Projects | Project list with stacked card layout |
| `/projects/:slug` | ProjectDetail | Case study: Problem, Solution, Result |
| `/about` | About | Profile card, bio, experience, tools grid |
| `/contact` | Contact | Contact form with anti-spam + direct links |
| `/privacy-policy` | PrivacyPolicy | Static GDPR/LOPD page |
| `*` | NotFound | 404 page |

## Project Structure

```
src/
├── api/utils/config.ts          # API URL builder (auto-detects localhost vs production)
├── assets/locale/{es,en}.ts     # i18n translation files (~120 keys each)
├── config/projects.ts           # Typed project data (5 projects with i18n keys)
├── contexts/theme/              # ThemeContext + useTheme hook
├── router/
│   ├── router.tsx               # Route definitions with React.lazy()
│   └── paths.ts                 # Centralized path constants
├── styles/portfolio.css         # Tailwind @theme design tokens
├── utils/i18n.ts                # i18next configuration
├── views/
│   ├── layouts/PortfolioLayout.tsx    # Sticky header + AnimatePresence + footer
│   ├── components/navigation/        # Header, Footer
│   └── pages/                        # Home, Projects, ProjectDetail, About,
│                                     # Contact, NotFound, PrivacyPolicy
├── service-worker.ts            # Workbox PWA service worker
├── main.tsx                     # Entry point
└── App.tsx                      # ThemeProvider > RouterProvider + Toaster
```

## Design System

- **Theme:** Dark mode by default, light mode via `.light` class on `<html>` (persisted in localStorage as `dtpf-theme`)
- **Color palette:** Ocean Teal -- accent `#2DD4BF`, warm `#FBBF24`, dark background `#0B0F19`
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels) -- loaded via Google Fonts
- **Grain texture:** CSS SVG filter overlay on `body::after`
- **Reduced motion:** Respects `prefers-reduced-motion`

## Animations

Framer Motion is used throughout:

- Page transitions via `AnimatePresence mode="wait"`
- Staggered hero entrance (name, tagline, proof bar, CTAs)
- `whileInView` scroll reveals with stagger for projects and stack sections
- Mobile menu overlay with staggered nav links

## Contact Form Anti-Spam

Client-side layers:

- **Honeypot** field (`website`) hidden off-screen -- bots fill it, humans do not
- **Time trap** (`_t` timestamp) -- submissions faster than 3 seconds are rejected

Server-side layers (handled by the backend):

- IP rate limit: 3 requests per hour
- Email cooldown: 1 message per email per 24 hours
- URL detection: max 5 URLs in message body

## i18n

Configured in `src/utils/i18n.ts` with browser language detection. Language persisted in localStorage (`dtpf-lang`). Translation files in `src/assets/locale/{es,en}.ts`.

## Environment Variables

No env vars are needed for local development. In production, set as GitHub Secrets:

| Variable | Description |
|----------|-------------|
| `VITE_PUBLIC_URL` | Public URL (e.g., `https://dtpf.es`) |

## Deployment

Deployment is automatic via GitHub Actions. Push to a branch triggers build + deploy.

```bash
git push origin main    # deploys to production (dtpf.es)
git push origin dev     # deploys to staging (dev.dtpf.es)
```

In production, the backend serves the built frontend from its `client/` directory as static files. Ports: 3998 (production), 5998 (staging).

## Code Style

- Prettier: 110 char width, single quotes, semicolons, trailing commas (es5), 2-space indent
- No linter or test framework configured

## License

MIT
