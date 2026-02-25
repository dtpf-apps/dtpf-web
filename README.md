# dtpf-frontend-react

Frontend for the [dtpf.es](https://dtpf.es) personal portfolio website. Features a public-facing portfolio site and a protected admin panel for content management. Built as a Progressive Web App with offline support.

## Tech Stack

- **Framework:** React 17
- **Language:** TypeScript (gradual migration from JavaScript in progress)
- **Build Tool:** Create React App (react-scripts 5)
- **UI Library:** Ant Design 4 with @ant-design/icons
- **Styling:** SCSS (node-sass) with CSS custom properties for theming
- **Routing:** React Router DOM 5
- **State Management:** React Context + useState/useEffect (no Redux)
- **Auth:** JWT tokens in localStorage with auto-refresh (jwt-decode)
- **WebSockets:** Socket.io Client 2 (real-time unread message count)
- **PWA:** Workbox 7 (Service Worker, offline caching)
- **Offline Storage:** IndexedDB for courses and menu data
- **Testing:** Jest + React Testing Library
- **Animations:** rc-banner-anim, rc-queue-anim, rc-texty, rc-tween-one
- **Other:** react-helmet (SEO), react-dropzone (file uploads), react-cookie-consent, emailjs-com (contact form)

## Prerequisites

- Node.js >= 16
- pnpm
- Backend API running on port 3998 (see [dtpf-backend-node](https://github.com/DTPF/portfolio.backend))

## Installation

```bash
git clone https://github.com/DTPF/portfolio.frontend.git dtpf-frontend-react
cd dtpf-frontend-react
pnpm install
```

Create the environment file:

```bash
echo "REACT_APP_PUBLIC_URL=https://dtpf.es" > .env
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `pnpm dev` | Start development server on port 3000 |
| `build` | `pnpm build` | Create optimized production build |
| `test` | `pnpm test` | Run API tests with Jest |
| `test:coverage` | `pnpm test:coverage` | Run tests with coverage report |
| `format` | `pnpm format` | Format source files with Prettier |

Run a specific test file:

```bash
pnpm test -- --testPathPattern=auth
```

## Development

```bash
# Ensure the backend is running on port 3998 first
pnpm dev
```

The dev server starts at `http://localhost:3000`. API calls are automatically proxied to `http://localhost:3998` based on localhost detection (also recognizes `192.168.1.x` addresses).

## Project Structure

```
public/
  index.html            # HTML template
  manifest.json         # PWA manifest
src/
  index.tsx             # Entry point: React DOM render, service worker registration
  App.tsx               # Root component: providers, router, route rendering
  api/
    endpoints/          # New TypeScript API layer (typed request/response)
      auth/             # auth.api.ts, auth.response.interface.ts
      user/             # user.ts, user.response.interface.ts
      aboutMe/          # aboutMe.api.ts
    utils/
      config.ts         # API base path configuration
      makeRequest.js    # Shared fetch utility
    contact.js          # Legacy JS API (contact endpoints)
    education.js        # Legacy JS API (education endpoints)
    menu.js             # Legacy JS API (menu endpoints)
    user.js             # Legacy JS API (user endpoints)
    utils.js            # Legacy JS API (utils endpoints)
  assets/               # Static assets (images, etc.)
  config/
    routes.ts           # Route definitions (public + admin)
    url.ts              # URL and endpoint base path config
  dbIndexed/            # IndexedDB offline storage
    config.ts           # DB configuration
    courses/            # Course data caching
    mainMenu/           # Menu data caching
    utils/              # Offline content utilities
  hooks/                # Custom React hooks
    useAuth.ts          # AuthContext consumer
    useConnection.ts    # ConnectionContext consumer
    useGetCourses.ts    # Course fetching and caching
    useGetMainMenu.ts   # MainMenuContext consumer
    useMessagesStatus.ts # Message reload status
    useNearScreen.ts    # Intersection Observer (lazy loading)
    useScrollToTop.ts   # Scroll restoration
    useRandomNumber.ts  # Random number utility
    useEventListener.ts # Generic event listener
  interfaces/
    general.interface.ts # Shared types (TResponseAPI, ChildrenProps)
  providers/            # React Context providers (JavaScript)
    AuthProvider.js     # JWT auth state (access/refresh tokens)
    ConnectionProvider.js # Online/offline and backend connectivity
    MainMenuProvider.js # Navigation menu state
    LoadRoutes.tsx      # Dynamic route loader
  scss/                 # Global styles
    _variables.scss     # SCSS variables
    _mixins.scss        # SCSS mixins
    _tags.scss          # Base element styles
    _animations.scss    # Animation keyframes
  utils/
    analytics.ts        # Google Analytics events
    constants.ts        # Token keys, storage keys
    formValidation.ts   # Form validation helpers
    gtag.js             # Google Tag Manager
    isLocalhost.ts      # Localhost detection utility
    notifications.ts    # Push notification utilities
    validations.ts      # Input validation helpers
  views/
    layouts/
      LayoutBasic.tsx   # Public site layout (menu, footer, offline alerts)
      LayoutAdmin.tsx   # Admin panel layout (sidebar, header, auth gate)
    pages/
      Web/              # Public pages
        Home/           # Landing page
        Education/      # Courses listing and detail
        Curriculum/     # CV/Resume page
        Contact/        # Contact form
      Admin/            # Admin pages (behind auth)
        SignIn/         # Login form
        Users/          # User management
        MenuWeb/        # Menu item editor
        ContactMessages/ # Message inbox
        Education/      # Course editor
        AboutMeAdmin/   # About Me content editor
      Errors/           # Error/404 page
      PrivacyPolicy/    # Privacy policy page
    components/
      Web/              # Public-facing components
        Layout/         # MenuTop, MenuSider, Footer
        AboutMeWeb/     # About Me display (AboutMeInfo, Cube)
        Contact/        # ContactForm, ContactInfo
        Curriculum/     # Education, ComplementaryEducation, ComputerSkills, Languages, WorkExperience
        Education/      # Courses, CourseInfo, InfoBanner
        MainTitle/      # Page title component
        ProjectsWeb/    # Project showcase cards
        SocialLinks/    # Social media links
        WellcomeParagraph/ # Welcome section
      Admin/            # Admin panel components
        Home/           # Admin dashboard
        MenuTop/        # Admin top navigation
        MenuSider/      # Admin sidebar navigation
        AboutMeAdmin/   # About Me editor
        ContactMessagesList/ # Message list
        Education/      # Course management
        LoginForm/      # Login form component
        RegisterForm/   # Registration form component
        MenuWeb/        # Menu editor
        SignIn/         # Sign in page component
        Users/          # User management components
      UI/               # Shared reusable components
        ButtonGoBack/   # Back navigation button
        CommingSoon/    # Coming soon placeholder
        CookiesConsent/ # Cookie consent banner
        Modal/          # Modal dialog
        Pagination/     # Page navigation
        Spin/           # Loading spinner
        Theme/          # Dark/light theme toggle
      Helmet/           # SEO meta tags (react-helmet)
  webSockets/
    hooks/              # Socket.io hooks (useMessagesUnreadLength)
  __tests__/
    api/                # API integration tests
      auth.test.js
      contact.test.js
      education.test.js
      menu.test.js
      user.test.js
      utils.test.js
```

## Routing

### Public Routes (`/`)

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page with about me, projects, social links |
| `/education` | Education | Paginated course listing |
| `/education/:url` | Education | Course detail view |
| `/curriculum` | Curriculum | CV with work experience, education, skills, languages |
| `/contact` | Contact | Contact form and info |
| `/privacy-policy` | PrivacyPolicy | Privacy policy page |

### Admin Routes (`/ad1988`)

| Path | Page | Description |
|------|------|-------------|
| `/ad1988` | AdminHome | Admin dashboard |
| `/ad1988/login` | AdminSignIn | Login page |
| `/ad1988/users` | AdminUsers | User management |
| `/ad1988/menu` | AdminMenuWeb | Navigation menu editor |
| `/ad1988/contact-messages` | AdminContactMessages | Contact message inbox |
| `/ad1988/education` | AdminEducation | Course content editor |
| `/ad1988/about-me` | AdminAboutMe | About Me content editor |

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_PUBLIC_URL` | Public URL of the deployed site | `https://dtpf.es` |

API endpoint configuration is handled in code (`src/api/utils/config.ts` and `src/config/url.ts`) based on automatic localhost detection.

## Code Style

- **Prettier:** Single quotes, trailing commas (es5), 120 char width, 2 spaces, semicolons
- **ESLint:** Extends `react-app` and `react-app/jest`
- **TypeScript:** Strict mode enabled, `baseUrl: "src"` for absolute imports

## License

MIT
