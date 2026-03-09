export const en = {
  // Navigation
  nav_home: 'Home',
  nav_projects: 'Projects',
  nav_about: 'About',
  nav_contact: 'Contact',

  // Hero
  hero_name: 'David T.\nPizarro Frick',
  hero_tagline_1: 'I build web products that work,',
  hero_tagline_2: 'from idea to production',
  hero_proof_apps: 'apps in production',
  hero_proof_saas: 'years in enterprise SaaS',
  hero_proof_tests: 'tests',
  hero_cta_projects: "See what I've built",
  hero_cta_contact: "Let's talk",

  // Home: Projects section
  home_projects_label: 'Projects',
  home_projects_heading: 'Real products, not side projects',
  home_projects_desc: 'Each of these is deployed, with real users, CI/CD, and monitoring.',
  home_projects_case_study: 'Case study',
  home_projects_visit: 'Visit',
  home_projects_detail: 'View detail',

  // Home: Manifesto
  manifesto_line1: "I don't collect side projects.",
  manifesto_line2: 'I ship them to production.',
  manifesto_body:
    'Every app I build has its own CI/CD, Grafana monitoring, and automated deploys. I use AI as a force multiplier throughout development — not as a shortcut, but as part of a rigorous engineering process.',

  // Home: Stack
  home_stack_label: 'Stack',
  home_stack_heading: 'Daily tools',
  home_stack_desc: 'What I use to build, deploy, and maintain.',

  // Home: CTA
  home_cta_title: 'Looking for new opportunities',
  home_cta_desc: "If you need a developer who ships products from idea to production, let's talk.",
  home_cta_button: 'Get in touch',

  // Projects page
  projects_title: 'Projects',
  projects_desc: '5 applications deployed and maintained in production.',
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
    "I'm a software developer at Hub4Retail, a SaaS platform for the fashion retail industry with clients like Lacoste, Camper, and Ecoalf. I lead the frontend with React and TypeScript.",
  about_bio_p2:
    "Outside of work, I build and maintain 5 production apps — from a multi-tenant auth system to a music streaming platform. These aren't tutorials or exercises: they have real users, CI/CD, monitoring, and automated deploys.",
  about_bio_p3:
    'What motivates me most is taking an idea from zero to a working product. I use AI tools like Claude and Cursor as a natural part of my workflow — at the same level as Git or Docker.',
  about_role: 'Software Developer',
  about_location: 'Mallorca, Spain',
  about_experience: 'Experience',
  about_tools: 'Tools',
  about_tools_frontend: 'Frontend',
  about_tools_backend: 'Backend',
  about_tools_devops: 'DevOps',
  about_tools_ai: 'AI & Tools',

  // Experience
  exp_hub4retail_role: 'Frontend Developer',
  exp_hub4retail_company: 'Hub4Retail',
  exp_hub4retail_period: 'Jul 2023 — Present',
  exp_hub4retail_desc:
    'SaaS platform for fashion retail. 20+ enterprise clients including Lacoste, Camper, Ecoalf. React + TypeScript + testing.',
  exp_palmira_role: 'Full Stack Developer',
  exp_palmira_company: 'Palmira',
  exp_palmira_period: 'Jun 2021 — Jun 2023',
  exp_palmira_desc: 'Mobile and web apps with React Native, Node.js, and MongoDB.',
  exp_assembler_role: 'Master Full Stack Development',
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

  // Projects data
  project_dauth_name: 'dauth',
  project_dauth_tagline: 'Multi-tenant passwordless auth. Magic link, passkey, OAuth.',
  project_dauth_tagline_long:
    'A passwordless auth system that serves as infrastructure for all my applications.',
  project_dauth_desc:
    'Complete auth system providing passwordless login to 4 apps. Authorization code flow, license management, and subscriptions. 929 tests, full CI/CD.',
  project_dauth_featured:
    'Multi-tenant passwordless auth. Magic link, passkey, OAuth. I use it as infrastructure for my other apps — 4 tenants connected.',
  project_dauth_problem:
    'Every app I built needed its own login system. I kept repeating the same auth logic, token management, and email flows. I wanted a centralized solution I could reuse.',
  project_dauth_solution:
    'dauth is an authentication-as-a-service (AuthaaS) providing passwordless login to any app. Supports magic link and passkey (WebAuthn). Each connected app gets its own tenant with independent config and authorization code flow.',
  project_dauth_result:
    'Currently managing auth for 4 production apps. 854 automated tests. Full CI/CD with GitHub Actions. Centralized monitoring with Grafana + Loki. Frontend completely redesigned with Tailwind CSS v4, removing Ant Design.',
  project_dauth_url: 'dauth.ovh',

  project_dstash_name: 'dstash',
  project_dstash_tagline: 'Media storage and management platform with drag-and-drop and REST API.',
  project_dstash_desc:
    'Media storage with folder organization, preview, drag-and-drop upload, and REST API for external integration. Auth delegated to dauth.',
  project_dstash_url: 'dstash.dtpf.es',

  project_dalist_name: 'Dalist',
  project_dalist_tagline: 'Wishlists with sharing, categories, and full offline support.',
  project_dalist_desc:
    'Wishlists with categories, completion status, and user sharing. PWA with full offline support via IndexedDB and Workbox.',
  project_dalist_url: 'dalist.dtpf.es',

  project_portfolio_name: 'dtpf.es',
  project_portfolio_tagline: 'Personal portfolio.',
  project_portfolio_desc:
    'This portfolio. Space Grotesk + Tailwind CSS v4 + Framer Motion. Dark mode, i18n ES/EN, grain texture.',
  project_portfolio_url: 'dtpf.es',

  project_audity_name: 'Audity',
  project_audity_tagline: 'Spotify-like music streaming with full player, playlists, and search.',
  project_audity_desc:
    "Spotify-like music streaming. Full player, playlists, search, CMS. Collaborative master's final project, deployed and maintained.",
  project_audity_url: 'audity.dtpf.es',

  // Service Worker Update
  'sw_update-available': 'New version available',
  'sw_update-now': 'Update',
  sw_updating: 'Updating...',
  'sw_update-on-navigate': 'Will load automatically on next navigation',
};
