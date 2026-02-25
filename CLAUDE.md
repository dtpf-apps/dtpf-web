# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (dtpf.es) with a public-facing site and an admin panel. Built with React 17, TypeScript (gradual migration from JS in progress), Ant Design, and SCSS.

## Commands

```bash
pnpm dev              # Start dev server on localhost:3000 (backend API on :3998)
pnpm build            # Production build via react-scripts
pnpm test             # Run API tests (Jest, located in src/__tests__/api/)
pnpm test:coverage    # Run tests with coverage
pnpm format           # Prettier formatting across src/
```

To run a single test file: `pnpm test -- --testPathPattern=auth`

## Architecture

### Routing

Two layout branches defined in `src/config/routes.ts`:
- **Public** (`/`) → `LayoutBasic` — Home, Education, Curriculum, Contact, Privacy Policy
- **Admin** (`/ad1988`) → `LayoutAdmin` — User management, Menu, Contact messages, Education, About Me

### State Management

Context-based (no Redux). Three providers in `src/providers/`:
- **AuthProvider** — JWT auth with access/refresh tokens in localStorage, auto-refresh on expiry
- **ConnectionProvider** — Monitors navigator.onLine and backend connectivity with polling
- **MainMenuProvider** — Fetches and caches the navigation menu

### API Layer

Fetch-based HTTP calls. Base path configured in `src/api/utils/config.ts` (localhost:3998 in dev, same-origin in prod).

**New pattern** (TypeScript, in `src/api/endpoints/`): typed request/response interfaces per domain (auth, user, aboutMe). Each endpoint directory contains the API functions and response interface files.

**Legacy pattern** (JavaScript, in `src/api/`): plain JS files (contact.js, education.js, menu.js). Being migrated to the new TS endpoint structure.

### Path Aliases

`tsconfig.json` sets `baseUrl: "src"`, so imports use absolute paths from src:
```typescript
import { useAuth } from 'hooks/useAuth';
import routes from 'config/routes';
```

### Styling

- Component-scoped SCSS files co-located with each component
- Global SCSS in `src/scss/` (_variables, _mixins, _tags, _animations)
- CSS custom properties for dark/light theme (`data-theme` attribute on root)
- Ant Design v4 imported globally in `src/index.tsx`

### Component Conventions

- Structure: `ComponentName/ComponentName.tsx` + `.scss` + `index.ts` (barrel export)
- Components wrapped with `memo()` for performance
- Pages use `React.lazy()` + `Suspense` for code splitting
- Forms use Ant Design `Form` component with validation
- User roles: `'admin' | 'editor' | 'reviewer'`

### Offline Support

PWA with Service Worker (Workbox) and IndexedDB (`src/dbIndexed/`) for caching courses and menu data.

## TypeScript Migration

The codebase is actively migrating from JS to TS. When modifying files:
- New code should be TypeScript
- Response types extend `TResponseAPI` from `src/interfaces/general.interface.ts`
- Follow the typed endpoint pattern in `src/api/endpoints/` for new API code

## Code Style

- Prettier config in package.json: single quotes, trailing commas (es5), 120 char width, 2-space indent
- ESLint extends `react-app` and `react-app/jest`
