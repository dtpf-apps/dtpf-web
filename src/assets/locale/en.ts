export const en = {
  // Navigation
  nav_home: 'Home',
  nav_projects: 'Projects',
  nav_about: 'About',
  nav_contact: 'Contact',

  // Hero
  hero_name: 'David T.\nPizarro Frick',
  hero_tagline_1: 'I build and run web products: from idea to production,',
  hero_tagline_2: 'and from production to the people who use them',
  hero_proof_apps: 'apps in production',
  hero_proof_public: 'public',
  hero_proof_tests: 'automated tests',
  hero_proof_saas: 'years in B2B SaaS',
  hero_cta_projects: "See what I've built",
  hero_cta_contact: "Let's talk",
  availability: 'Open to offers · remote or hybrid from Mallorca',

  // Home: Projects section
  home_projects_label: 'Projects',
  home_projects_heading: 'Deployed, monitored, maintained',
  home_projects_desc: 'Each of these is deployed, with real users, CI/CD and monitoring.',
  home_projects_case_study: 'Case study',
  home_projects_visit: 'Visit',
  // Home: Manifesto
  manifesto_line1: "I don't collect side projects.",
  manifesto_line2: 'I ship them to production.',
  manifesto_body:
    'Every app I build has its own CI/CD, a staging environment before production, Grafana monitoring and automated deploys. I use AI as part of the engineering process — governed by tests, review and gates — not as a shortcut.',

  // Home: Stack
  home_stack_label: 'Stack',
  home_stack_heading: 'Daily tools',
  home_stack_desc: 'What I use to build, deploy and maintain.',

  // Home: CTA
  home_cta_title: 'Open to new opportunities',
  home_cta_desc:
    "If you need someone who takes products from idea to production and keeps them running, let's talk.",
  home_cta_button: 'Get in touch',

  // Projects page
  projects_title: 'Projects',
  projects_desc: 'A selection of the applications I build and keep in production.',
  projects_case_study: 'Case study',
  projects_visit: 'Visit',
  projects_badge_production: 'Production',
  projects_badge_this: 'This site',
  projects_back: 'projects',

  // Project detail
  detail_problem: 'The problem.',
  detail_solution: 'The solution.',
  detail_result: 'The result.',
  detail_stack: 'Stack',
  detail_metrics: 'Data',
  detail_visit: 'Visit',
  detail_github: 'View on GitHub',

  // About
  about_title: 'About',
  about_bio_p1:
    "I'm a full-stack engineer at Storaia, a fashion-tech SaaS for the European fashion trade. I work across the whole product, from the backend to the UI, with Next.js, NestJS and TypeScript.",
  about_bio_p2:
    "Outside work I build and run {{apps}} apps of my own in production ({{publicApps}} public) — from a multi-tenant auth system to an AI agent platform — on infrastructure I also run myself. These aren't exercises: they have real users, CI/CD, staging, monitoring and automated deploys.",
  about_bio_p3:
    'What drives me is taking an idea from zero to a working product, and keeping it working. I use AI — Claude Code day to day, and self-hosted models on my own GPUs — as part of the engineering process, under the same tests and gates as the rest of the code.',
  about_role: 'Senior Full-Stack Engineer',
  about_location: 'Mallorca, Spain',
  about_experience: 'Experience',
  about_tools: 'Tools',
  about_tools_frontend: 'Frontend',
  about_tools_backend: 'Backend',
  about_tools_platform: 'Platform & DevOps',
  about_tools_ai: 'AI & inference',
  about_tools_quality: 'Quality',

  // Experience
  exp_storaia_role: 'Full-Stack Engineer',
  exp_storaia_company: 'Storaia',
  exp_storaia_period: 'Jul 2023 — Present',
  exp_storaia_desc:
    'Storaia is a fashion-tech SaaS for the European fashion trade: one platform for catalogue, orders, pricing and sell-out data, used by brands, multi-brand retailers and sales agents, and connected to 40+ systems (e-commerce, ERP, POS). Next.js + NestJS + TypeScript, tested with Jest.',
  exp_palmira_role: 'Full-Stack Developer',
  exp_palmira_company: 'Palmira',
  exp_palmira_period: 'Jun 2021 — Jun 2023',
  exp_palmira_desc: 'Mobile and web apps with React Native, Node.js and MongoDB.',
  exp_assembler_role: 'Master in Full-Stack Development',
  exp_assembler_company: 'Assembler Institute of Technology',
  exp_assembler_period: 'Oct 2022 — May 2023',
  exp_assembler_desc: '1200+ hours, 30+ projects. MERN stack, agile methodologies.',

  // Contact
  contact_title: 'Contact',
  contact_subtitle: "Write me and I'll get back to you within 24 hours.",
  contact_email_label: 'Email',
  contact_email_placeholder: 'you@email.com',
  contact_name_label: 'Name',
  contact_name_placeholder: 'Your name',
  contact_message_label: 'Message',
  contact_message_placeholder: 'Tell me about your project or opportunity...',
  contact_privacy: 'I have read and accept the',
  contact_privacy_link: 'privacy policy',
  contact_submit: 'Send message',
  contact_success: "Message sent. I'll reply soon.",
  contact_error: 'Error sending. Please try again.',
  contact_or: 'or directly',

  // 404
  not_found_title: 'Page not found',
  not_found_desc: "The URL you're looking for doesn't exist or has been removed.",
  not_found_cta: 'Go home',

  // Footer
  footer_copy: '© 2020 – 2026',

  // Theme & lang
  theme_toggle: 'Toggle theme',
  lang_toggle: 'Toggle language',

  // Projects data — figures arrive as interpolation values from config/facts.ts
  project_dauth_name: 'dauth',
  project_dauth_tagline: 'Multi-tenant passwordless auth. Magic link, passkeys, authorization code flow.',
  project_dauth_tagline_long:
    'A passwordless auth system that serves as infrastructure for all my applications.',
  project_dauth_desc:
    'Complete auth system providing passwordless login to {{tenants}} apps. Authorization code flow, license management and subscriptions. {{tests}} tests, full CI/CD.',
  project_dauth_featured:
    'Multi-tenant passwordless auth. Magic link, passkeys, authorization code flow. It is the login infrastructure for my other apps — {{tenants}} tenants connected.',
  project_dauth_problem:
    'Every app I built needed its own login system. I kept repeating the same auth logic, token management and email flows. I wanted a centralized solution I could reuse.',
  project_dauth_solution:
    'dauth is authentication-as-a-service (AuthaaS): passwordless login for any app, with magic link and passkeys (WebAuthn). Each connected app gets its own tenant with independent config and authorization code flow.',
  project_dauth_result:
    'Today it handles auth for {{tenants}} production apps. {{tests}} automated tests ({{backend}} backend, {{frontend}} frontend, {{packages}} npm packages, {{e2e}} E2E). Magic link with browser-binding and WebAuthn passkeys. Full CI/CD with GitHub Actions. Centralized monitoring with Grafana + Loki.',
  project_dauth_url: 'dauth.ovh',

  project_dstash_name: 'dstash',
  project_dstash_tagline: 'Media storage platform with secure REST API, admin dashboard and signed URLs.',
  project_dstash_desc:
    'Media storage with folder organization, drag-and-drop, REST API with signed URLs and opaque API keys. Protected mode, thumbnails, subscriptions. Full admin dashboard. {{tests}} tests.',
  project_dstash_problem:
    'I needed to store and serve files (images, documents, media) for several apps, with access control and without depending on external services like S3.',
  project_dstash_solution:
    'dstash is a self-hosted media storage platform. Supports drag-and-drop upload, folder organization, preview and a REST API for external integration. Security with signed URLs (HMAC-SHA256), opaque API keys, Zod validation, rate limiting and audit logging.',
  project_dstash_result:
    'In production serving media for several applications. {{tests}} automated tests ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Protected mode with PIN, auto-generated WebP thumbnails, subscription system. Full admin dashboard. CI/CD with GitHub Actions.',
  project_dstash_url: 'dstash.dtpf.es',

  project_dalist_name: 'dalist',
  project_dalist_tagline: 'Collaborative notes app with checklists, real-time shared notes and PWA.',
  project_dalist_desc:
    'Notes and checklists app with real-time shared notes, version history, 19 colors, labels, notes encrypted at rest and notifications. Installable PWA and Google Play app. {{tests}} tests.',
  project_dalist_problem:
    'I needed a central place to organize notes and checklists and share them — without the complexity of Notion or the limitations of Google Keep.',
  project_dalist_solution:
    'dalist is a notes and checklists app with real-time collaboration. Shared notes with active presence via Socket.io, version history with restore, checklists with a dev variant (commit types), 19 colors, labels, AES-256-GCM encryption of notes at rest, email and in-app notifications, and a trash with auto-deletion after 7 days.',
  project_dalist_result:
    'In production as an installable PWA and on Google Play. {{tests}} automated tests ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Real-time collaboration with Socket.io, version history, email notifications. Frontend with Tailwind CSS v4. Auth delegated to dauth. CI/CD with GitHub Actions.',
  project_dalist_url: 'dalist.dtpf.es',

  project_portfolio_name: 'dtpf.es',
  project_portfolio_tagline: 'Personal portfolio, open source.',
  project_portfolio_desc:
    'This portfolio. React 19 + Tailwind CSS v4 + Framer Motion, ES/EN i18n, PWA with silent updates, {{tests}} tests. Open source on GitHub, deployed with Gitea Actions.',
  project_portfolio_url: 'dtpf.es',

  project_audity_name: 'Audity',
  project_audity_tagline: 'Spotify-like music streaming with full player, playlists and search.',
  project_audity_desc:
    "Spotify-like music streaming. Full player, playlists, search, CMS. Collaborative master's final project (2023), deployed and maintained since. {{tests}} tests.",
  project_audity_url: 'audity.dtpf.es',

  cookie_text: 'We use analytics cookies to improve your experience. You can accept or decline their use.',
  cookie_accept: 'Accept',
  cookie_necessary_only: 'Necessary only',

  // Accessibility
  skip_to_content: 'Skip to main content',
  close_menu: 'Close menu',
  nav_mobile_menu: 'Navigation menu',
  cookie_banner_title: 'Cookie settings',
  required: 'required',
  contact_sending: 'Sending...',
  contact_timeout: 'Request timed out. Please try again.',
  open_new_window: 'opens in new window',

  // Error boundary
  error_boundary_title: 'Something went wrong',
  error_boundary_description: 'An unexpected error occurred. Please try again.',
  error_boundary_reload: 'Reload',
  updating_app: 'Updating app...',

  // Metric labels
  tenants: 'Active tenants',
  tests: 'Tests',
  auth: 'Authentication',
  monitoring: 'Monitoring',
  deploy: 'Deploy',
  security: 'Security',
  admin: 'Admin',
  realtime: 'Real-time',
  encryption: 'Encryption',
  store: 'Distribution',

  // Metric values
  metric_admin_full: 'Full dashboard',
  metric_encryption_at_rest: 'Notes encrypted at rest',
};
