# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (dtpf.es) with a public-facing site and an admin panel. Built with React 17, TypeScript (gradual migration from JS in progress), Ant Design 4, and SCSS. Uses Create React App (react-scripts 5). Package manager: **pnpm**.

## Commands

```bash
pnpm dev              # Start dev server on localhost:3000 (proxies API to backend on :3998)
pnpm build            # Production build via react-scripts
pnpm test             # Run API tests (Jest, located in src/__tests__/api/)
pnpm test:coverage    # Run tests with coverage
pnpm format           # Prettier formatting across src/
```

To run a single test file: `pnpm test -- --testPathPattern=auth`

## Architecture

### Routing

React Router DOM v5 (`Switch`, `Route`, `Redirect`). Two layout branches defined in `src/config/routes.ts`:
- **Public** (`/`) via `LayoutBasic` -- Home, Education (with `/education/:url` detail), Curriculum, Contact, Privacy Policy
- **Admin** (`/ad1988`) via `LayoutAdmin` -- Sign In, Users, Menu, Contact Messages, Education, About Me

Note: `react-router` v7 is also in dependencies but the codebase uses v5 patterns exclusively.

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

`tsconfig.json` sets `baseUrl: "src"`, so imports use absolute paths from src:
```typescript
import { useAuth } from 'hooks/useAuth';
import routes from 'config/routes';
```

### Styling

- Component-scoped SCSS files co-located with each component
- Global SCSS in `src/scss/` (_variables, _mixins, _tags, _animations)
- CSS custom properties for dark/light theme (`data-theme` attribute on root), toggle in `views/components/UI/Theme/`
- Ant Design v4 imported globally in `src/index.tsx`

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

PWA with Service Worker (Workbox 7) and IndexedDB (`src/dbIndexed/`) for caching courses and menu data. Service worker registration in `src/serviceWorkerRegistration.ts` with auto-update notifications.

### WebSockets

Socket.io client v2 in `src/webSockets/hooks/` -- `useMessagesUnreadLength` hook provides real-time unread contact message count in the admin layout.

### Tests

Jest + React Testing Library. Test files in `src/__tests__/api/`:
- `auth.test.js` -- Auth API tests
- `contact.test.js` -- Contact API tests
- `education.test.js` -- Education API tests
- `menu.test.js` -- Menu API tests
- `user.test.js` -- User API tests
- `utils.test.js` -- Utils API tests

### UI Components (`src/views/components/UI/`)

Reusable shared components: ButtonGoBack, CommingSoon, CookiesConsent, Modal, Pagination, Spin, Theme.

## TypeScript Migration

The codebase is actively migrating from JS to TS. When modifying files:
- New code should be TypeScript
- Response types extend `TResponseAPI` from `src/interfaces/general.interface.ts`
- Follow the typed endpoint pattern in `src/api/endpoints/` for new API code
- Providers (`src/providers/`) are still JavaScript -- they are candidates for migration

## Code Style

- Prettier config in package.json: single quotes, trailing commas (es5), 120 char width, 2-space indent, semicolons
- ESLint extends `react-app` and `react-app/jest`

## Environment Variables

Single environment variable in `.env`:
- `REACT_APP_PUBLIC_URL` -- Public URL for the site (e.g., `https://dtpf.es`). Used via `process.env.REACT_APP_PUBLIC_URL`.

API endpoint configuration is handled in code (`src/api/utils/config.ts` and `src/config/url.ts`) based on localhost detection, not environment variables.
