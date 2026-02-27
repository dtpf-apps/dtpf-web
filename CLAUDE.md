# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (dtpf.es) with a public-facing site and an admin panel. Built with React 19, TypeScript 5.9, Ant Design 6, and SCSS. Uses Vite 7 with `@vitejs/plugin-react-swc`. Package manager: **pnpm**. Requires **Node.js 22.12+**.

## Commands

```bash
pnpm dev              # Start Vite dev server on localhost:3000
pnpm build            # Production build (tsc + vite build)
pnpm preview          # Preview production build locally
pnpm format           # Prettier formatting across src/
```

Note: Test files exist in `src/__tests__/api/` (Jest) but no test script is currently configured in `package.json`.

## Architecture

### Routing

React Router v7 (`Routes`, `Route`, `Outlet`, `Navigate`, `useNavigate` — all from `react-router`). Routes defined directly in `src/App.tsx` with two nested layout branches:
- **Public** (`/*`) via `LayoutBasic` (uses `Outlet`) -- Home, Education (with `/education/:url` detail), Curriculum, Contact, Privacy Policy
- **Admin** (`/ad1988/*`) via `LayoutAdmin` (uses `Outlet`) -- Home, Users, Menu, Contact Messages, Education, About Me
- **Admin Sign In** (`/ad1988/login`) -- rendered outside `LayoutAdmin` (standalone route)

Note: `src/config/routes.ts` exists with a legacy static route config but is **not imported or used** anywhere -- dead code from the v5 migration.

### State Management

Context-based (no Redux). Three providers in `src/providers/` (all JavaScript, not TypeScript):
- **AuthProvider** -- JWT auth with access/refresh tokens in localStorage, auto-refresh on expiry via `jwt-decode`
- **ConnectionProvider** -- Monitors `navigator.onLine` and backend connectivity with polling (2s when offline, 30s when online)
- **MainMenuProvider** -- Fetches and caches the navigation menu, re-fetches on connection status change

### API Layer

Fetch-based HTTP calls. Base path configured in `src/api/utils/config.ts` (localhost:3998 in dev, same-origin in prod). Localhost detection in `src/utils/isLocalhost.ts` also matches `192.168.1.x` addresses.

**New pattern** (TypeScript, in `src/api/endpoints/`): Typed request/response interfaces per domain. Three endpoint directories:
- `auth/` -- auth.api.ts + auth.response.interface.ts
- `user/` -- user.ts + user.response.interface.ts + brandUsers.response.interface.ts
- `aboutMe/` -- aboutMe.api.ts

**Legacy pattern** (JavaScript, in `src/api/`): Plain JS files (contact.js, education.js, menu.js, user.js, utils.js). Being migrated to the new TS endpoint structure.

Shared request utility: `src/api/utils/makeRequest.js`

### Path Aliases

`tsconfig.json` sets `baseUrl: "src"` and Vite resolves them via `vite-tsconfig-paths`, so imports use absolute paths from src:
```typescript
import { useAuth } from 'hooks/useAuth';
```

### Styling

- Component-scoped SCSS files co-located with each component (compiled via Dart Sass with `api: 'modern'`)
- Global SCSS in `src/scss/` (_variables, _mixins, _tags, _animations, index)
- CSS custom properties for dark/light theme (`data-theme` attribute on root), toggle in `views/components/UI/Theme/`
- Ant Design v6 imported in `src/main.tsx`

### Component Conventions

- Structure: `ComponentName/ComponentName.tsx` + `.scss` + `index.ts` (barrel export)
- Components wrapped with `memo()` for performance
- Forms use Ant Design `Form` component with validation
- User roles: `'admin' | 'editor' | 'reviewer'`

### Custom Hooks (`src/hooks/`)

- `useAuth` -- Access AuthContext
- `useConnection` -- Access ConnectionContext
- `useGetCourses` -- Fetch and cache courses
- `useGetMainMenu` -- Access MainMenuContext
- `useMessagesStatus` -- Check message reload status
- `useNearScreen` -- Intersection Observer for lazy loading
- `useScrollToTop` -- Scroll restoration
- `useRandomNumber` -- Random number generator
- `useEventListener` -- Generic event listener hook

### Offline Support

PWA via `vite-plugin-pwa` (v1.x) with injectManifest strategy. Service worker source in `src/service-worker.ts`, registration in `src/serviceWorkerRegistration.ts` with auto-update notifications. IndexedDB (`src/dbIndexed/`) caches courses and menu data for offline use (Workbox 7).

### WebSockets

Socket.io client v4 (`socket.io-client`) in `src/webSockets/hooks/` -- `useMessagesUnreadLength` hook provides real-time unread contact message count in the admin layout.

### Animations

- **Motion** (framer-motion) for page animations: character-by-character text (`MainTitle`), fade-in on scroll (`ProjectLayout`, `Courses`), auto-play carousel (`InfoBanner`)
- **@dnd-kit** (`@dnd-kit/core` + `@dnd-kit/sortable`) for drag-and-drop menu reordering (`MenuWebList`)

### Tests

Jest + React Testing Library test files exist in `src/__tests__/api/` (auth, contact, education, menu, user, utils) but **no test runner is configured** in `package.json` after the Vite migration. Tests are not runnable without adding a test framework (e.g., Vitest).

### UI Components (`src/views/components/UI/`)

Reusable shared components: ButtonGoBack, CommingSoon, CookiesConsent, Modal, Pagination, Spin, Theme.

## TypeScript Migration

The codebase is actively migrating from JS to TS. When modifying files:
- New code should be TypeScript
- Response types extend `TResponseAPI` from `src/interfaces/general.interface.ts`
- Follow the typed endpoint pattern in `src/api/endpoints/` for new API code
- Providers (`src/providers/`) are still JavaScript (.jsx) -- they are candidates for migration

## Code Style

- Prettier config in package.json: single quotes, trailing commas (es5), 110 char width, 2-space indent, semicolons
- No ESLint configured

## Environment Variables

Single environment variable in `.env`:
- `VITE_PUBLIC_URL` -- Public URL for the site (e.g., `https://dtpf.es`). Used via `import.meta.env.VITE_PUBLIC_URL`.

API endpoint configuration is handled in code (`src/api/utils/config.ts` and `src/config/url.ts`) based on localhost detection, not environment variables.
