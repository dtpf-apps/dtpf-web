# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (dtpf.es) with a public-facing site and an admin panel. Built with React 19, TypeScript 5.9, Ant Design 6, and SCSS. Uses Vite 7 with `@vitejs/plugin-react-swc`. Package manager: **pnpm**. Requires **Node.js 22.12+**.

**Authentication** is handled externally by **dauth** via `dauth-context-react` (`DauthProvider` + `useDauth()` hook). There is no local auth logic — all user identity comes from dauth (passwordless: magic link + passkey).

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
- **Admin** (`/ad1988/*`) via `LayoutAdmin` (uses `Outlet`) -- Home, Menu, Contact Messages, Education, About Me
- **Admin Sign In** (`/ad1988/login`) -- rendered outside `LayoutAdmin` (standalone route). Redirects to dauth login via `loginWithRedirect()`.

### State Management

Context-based (no Redux). Uses `useReducer` + Context pattern with 7 files per domain: Context, Provider, initialState, reducer types/reducer/actions, and a context hook.

**Provider nesting** (in `src/App.tsx`):
```
DauthProvider > ConnectionProvider > MenuProvider > AboutMeProvider > ContactProvider > EducationProvider > Router
```

**Domain contexts** (`src/contexts/`):
- **ConnectionProvider** -- Monitors `navigator.onLine` and backend connectivity with polling (2s offline, 30s online)
- **MenuProvider** -- CRUD admin menus + public menu. Replaces old MainMenuProvider
- **AboutMeProvider** -- Cube info + main info (public + admin)
- **ContactProvider** -- Contact messages CRUD + polling for message status
- **EducationProvider** -- Courses CRUD + pagination + image upload + tags

**External provider**:
- **DauthProvider** (from `dauth-context-react`) -- Configured with `domainName` and `dauthUrl` props. Handles auth code exchange, token storage, and user session

**Context hooks** (`src/hooks/contexts/`): `useContextAboutMe`, `useContextContact`, `useContextEducation`, `useContextMenu`. Connection uses `src/hooks/useConnection.ts`.

### Auth Flow

1. User visits `/ad1988/login` → `SignIn` component calls `loginWithRedirect()` → redirects to dauth
2. User authenticates in dauth (magic link or passkey) → dauth redirects back with `?code=` authorization code
3. `DauthProvider` detects the code, exchanges it for tokens via `POST /exchange-code`
4. Tokens stored in localStorage. `useDauth()` provides `user`, `isAuthenticated`, `isLoading`, `logout`, `loginWithRedirect`

### API Layer

Fetch-based HTTP calls using `fetchAPI<T>()` wrapper from `src/api/utils/fetchHelper.ts`. Uses `credentials: 'include'` for httpOnly cookies (dauth BFF pattern — no manual token handling). Utilities: `apiUrl()` builds full endpoint URL, `buildUrl()` adds query params.

Base path configured in `src/api/utils/config.ts` (localhost:3998 in dev, same-origin in prod). Localhost detection in `src/utils/isLocalhost.ts` also matches `192.168.1.x` addresses.

**Typed endpoints** (TypeScript, in `src/api/endpoints/`):
- `aboutMe/` -- aboutMe.api.ts + aboutMe.response.interface.ts
- `app/` -- app.api.ts + app.response.interface.ts (IndexedDB version)
- `auth/` -- auth.api.ts (getAccessTokenApi only)
- `connection/` -- connection.api.ts
- `contact/` -- contact.api.ts + contact.response.interface.ts
- `education/` -- education.api.ts + education.response.interface.ts
- `menu/` -- menu.api.ts + menu.response.interface.ts
- `user/` -- user.ts (exists but unused by components)

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

### Custom Hooks (`src/hooks/`)

- `useAuth` -- Wrapper around `useDauth()` from dauth-context-react. Returns `{ user, isLoading, isAuthenticated }`
- `useConnection` -- Access ConnectionContext (from `src/contexts/connection/`)
- `useGetCourses` -- Fetch and cache courses for public pages (uses typed API)
- `useNearScreen` -- Intersection Observer for lazy loading
- `useScrollToTop` -- Scroll restoration
- `useRandomNumber` -- Random number generator
- `useEventListener` -- Generic event listener hook

**Context hooks** (`src/hooks/contexts/`): `useContextAboutMe`, `useContextContact`, `useContextEducation`, `useContextMenu` -- typed wrappers with throw guard for missing provider.

### Offline Support

PWA via `vite-plugin-pwa` (v1.x) with injectManifest strategy. Service worker source in `src/service-worker.ts`, registration in `src/serviceWorkerRegistration.ts` with auto-update notifications. IndexedDB (`src/dbIndexed/`) caches courses and menu data for offline use (Workbox 7).

### WebSockets

Socket.io client v4 (`socket.io-client`) in `src/webSockets/hooks/` -- `useMessagesUnreadLength` hook provides real-time unread contact message count in the admin layout.

### Animations

- **Motion** (framer-motion) for page animations: character-by-character text (`MainTitle`), fade-in on scroll (`ProjectLayout`, `Courses`), auto-play carousel (`InfoBanner`)
- **@dnd-kit** (`@dnd-kit/core` + `@dnd-kit/sortable`) for drag-and-drop menu reordering (`MenuWebList`)

### Tests

Jest + React Testing Library test files exist in `src/__tests__/api/` but **no test runner is configured** in `package.json` after the Vite migration. Tests are not runnable without adding a test framework (e.g., Vitest).

### UI Components (`src/views/components/UI/`)

Reusable shared components: ButtonGoBack, CommingSoon, CookiesConsent, Modal, Pagination, Spin, Theme.

## TypeScript Migration

The codebase has been largely migrated to TypeScript. All API modules, contexts, providers, and hooks are TypeScript. Some view components still have `any` types. When modifying files:
- New code should be TypeScript
- Response types defined in `*.response.interface.ts` files alongside API modules
- State interfaces in `src/interfaces/` (e.g., `education.interface.ts`, `menu.interface.ts`)
- Follow the context pattern in `src/contexts/` (7 files per domain) for new state domains
- Follow the API pattern in `src/api/endpoints/` using `fetchAPI<T>()` from `fetchHelper.ts`

## Code Style

- Prettier config in package.json: single quotes, trailing commas (es5), 110 char width, 2-space indent, semicolons
- No ESLint configured

## Environment Variables

Variables in `.env`:
- `VITE_PUBLIC_URL` -- Public URL for the site (e.g., `https://dtpf.es`)
- `VITE_DAUTH_DOMAIN_NAME` -- Dauth domain name (e.g., `dtpf`)
- `VITE_DAUTH_URL` -- Dauth frontend URL (e.g., `http://localhost:4012`)

API endpoint configuration is handled in code (`src/api/utils/config.ts` and `src/config/url.ts`) based on localhost detection, not environment variables.
