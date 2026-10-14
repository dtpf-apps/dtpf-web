export const en = {
  // Navigation
  nav_home: 'Home',
  nav_projects: 'Projects',
  nav_platform: 'Platform',
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
  // Home: How I work — four habits, each linked to the page that proves it
  home_how_label: 'How I work',
  home_how_heading: "I don't collect side projects: I ship them to production.",
  home_how_desc: 'Four habits behind every app, each with its evidence one click away.',
  home_how_1_title: 'Tests first, gate green',
  home_how_1_body:
    '{{tests}} tests across the repos. Each app deploys from the same pipeline that runs its tests: one failure, no deploy.',
  home_how_1_link: 'See the figures per project',
  home_how_2_title: 'Staging, sign-off, production',
  home_how_2_body:
    'Each app has its own staging, deployed from the dev branch; production deploys from main. In dcompany, promotion is deliberate and by signed SHA.',
  home_how_2_link: 'See dcompany',
  home_how_3_title: 'Real observability',
  home_how_3_body:
    'Grafana, Loki and Prometheus across the whole platform: {{probes}} availability probes, {{alertRules}} alert rules and a watcher of my own that pages Matrix.',
  home_how_3_link: 'See the platform',
  home_how_4_title: 'AI as engineering, not as a shortcut',
  home_how_4_body:
    'Self-hosted speech and vision models on my own GPUs, agents with human approval and a full audit trail, and a guard harness for the assistant itself.',
  home_how_4_link: 'See dcompany',
  home_how_4_link_alt: 'See dinventory',

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
  contact_error_invalid_email: 'Check the email: it does not look like a valid address.',
  contact_error_name_too_long: 'Shorten the name: it takes up to {{nameMax}} characters.',
  contact_error_message_required: 'Write a message before sending it.',
  contact_error_message_too_short: 'Make the message longer: it needs at least {{messageMin}} characters.',
  contact_error_message_too_long: 'Shorten the message: it takes up to {{messageMax}} characters.',
  contact_error_too_many_links: 'Remove some links: a message can carry {{links}} at most.',
  contact_error_payload_too_large: 'The message is too large to send. Shorten it or email me instead.',
  contact_error_server_error:
    'The server could not save the message. Try again in a few minutes or email me instead.',
  contact_error_service_unavailable:
    'The service is unavailable right now. Try again in a few minutes or email me instead.',
  contact_error_rate_limited:
    'You have sent several messages in a row. You can send another in {{wait}}, or email me instead.',
  contact_error_email_cooldown:
    'A message from this email already reached me in the last 24 hours. You can send another in {{wait}}, or email me instead.',
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
  project_dcompany_name: 'dcompany',
  project_dcompany_tagline: 'Companies of AI agents that work on their own and only interrupt to decide.',
  project_dcompany_desc:
    'Multi-tenant AI agent platform: an org chart with roles and delegation, event sourcing, {{mcpTools}}+ MCP tools to run the company from Claude, human approval of changes and Stripe billing. One isolated container per company. {{tests}} tests.',
  project_dcompany_featured:
    'AI agent platform with governance: org chart with delegation, event sourcing, {{mcpTools}}+ MCP tools and a human in the loop for anything sensitive. Private beta in production.',
  project_dcompany_problem:
    'Running teams of AI agents without losing control: knowing who did what, under which permission and at what cost, and making anything sensitive wait for a human decision.',
  project_dcompany_solution:
    'dcompany is a multi-tenant platform: each company runs in its own isolated container, with an org chart of agents with roles and delegation. Everything is event-sourced: every action is recorded and replayable. {{mcpTools}}+ MCP tools let you run the company from Claude; outbound traffic goes through an allowlist; code changes are proposed and approved by a person. Self-service Stripe billing and a build farm of signed OCI images (podman + Trivy + Cosign).',
  project_dcompany_result:
    'In production at dcompany.tech as a private beta, built solo. {{tests}} automated tests ({{backend}} control plane and daemon, {{frontend}} web, {{packages}} shared packages). TypeScript 6 monorepo with exactOptionalPropertyTypes; dev → staging → sign-off → deliberate promotion to production. CI/CD with GitHub Actions.',
  project_dcompany_status: 'Private beta · access on request',
  project_dcompany_url: 'dcompany.tech',

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
    'dauth is authentication-as-a-service (AuthaaS): passwordless login for any app, with magic link (plus a verification code when the link is opened in another browser) and passkeys (WebAuthn). Each connected app gets its own tenant with independent config and authorization code flow, and integrates through the dauth-react and dauth-node SDKs, published on GitHub Packages.',
  project_dauth_result:
    'Today it handles auth for {{tenants}} production apps. {{tests}} automated tests ({{backend}} backend, {{frontend}} frontend, {{packages}} npm packages, {{e2e}} E2E). Magic link with browser-binding and WebAuthn passkeys. Full CI/CD with GitHub Actions. Centralized monitoring with Grafana + Loki.',
  project_dauth_url: 'dauth.ovh',

  project_dinventory_name: 'dinventory',
  project_dinventory_tagline: 'Where did I put…? A home and storage inventory that answers in two taps.',
  project_dinventory_desc:
    'Home inventory with exact locations (place › room › furniture › shelf › box › front/back), a true-scale floor plan, camera measuring (WebXR), voice search with Whisper and photo-based item capture with a self-hosted vision model. Nothing leaves my infrastructure. {{tests}} tests.',
  project_dinventory_featured:
    'Home inventory with AI on my own infrastructure: exact locations, camera measuring, voice search and photo recognition, with nothing leaving my network.',
  project_dinventory_problem:
    'Knowing exactly where everything at home and in storage is — which piece of furniture, shelf and box, front or back — without typing up a whole inventory or handing photos of my home to an outside service.',
  project_dinventory_solution:
    'dinventory models the home as a tree of locations (place › room › furniture › shelf › box › front/back) with real measurements in centimetres and a floor plan view. One photo is enough to capture items: a vision model running on my own GPU reads them, with an explicit fallback when it is unavailable. Camera measuring via WebXR, voice search with self-hosted Whisper, login with dauth and media on dstash. Designed mobile-first.',
  project_dinventory_result:
    'Publicly in production behind dauth since October 2026. {{tests}} automated tests ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). All inference (vision and voice) runs on my own infrastructure: no photo or audio leaves the network. CI/CD with Gitea Actions, staging before production.',
  project_dinventory_url: 'dinventory.dtpf.es',

  project_dalist_name: 'dalist',
  project_dalist_tagline: 'Collaborative notes app with checklists, real-time shared notes and PWA.',
  project_dalist_desc:
    'Notes and checklists app with real-time shared notes, version history, 19 colors, labels, notes encrypted at rest, a self-hosted Whisper voice assistant and notifications. Installable PWA and Android app on Google Play. {{tests}} tests.',
  project_dalist_featured:
    'Real-time shared notes and checklists, encrypted at rest, with a self-hosted voice assistant. Installable PWA and Android app published on Google Play.',
  project_dalist_problem:
    'I needed a central place to organize notes and checklists and share them — without the complexity of Notion or the limitations of Google Keep.',
  project_dalist_solution:
    'dalist is a notes and checklists app with real-time collaboration. Shared notes with active presence via Socket.io, version history with restore, checklists with a dev variant (commit types), 19 colors, labels, AES-256-GCM encryption of notes at rest, a voice assistant running Whisper on my own GPU, email and in-app notifications, and a trash with auto-deletion after 7 days.',
  project_dalist_result:
    'In production as an installable PWA and as an Android app on Google Play (Capacitor). {{tests}} automated tests ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Real-time collaboration with Socket.io, version history, email notifications. Frontend with Tailwind CSS v4. Auth delegated to dauth. CI/CD with GitHub Actions.',
  project_dalist_url: 'dalist.dtpf.es',

  project_airam_name: 'petitairam.com',
  project_airam_tagline: 'Online shop for the handmade brand AIRAM, with the CMS the brand uses every day.',
  project_airam_desc:
    'Shop for one-of-a-kind and made-to-order handmade pieces for the AIRAM brand: catalogue, cart, orders with piece reservation, payment by Bizum or bank transfer with a per-order reference, and an 8-section CMS holding all the multilingual content. Client work, in production. {{tests}} tests.',
  project_airam_problem:
    'A handmade brand needs to sell unique and made-to-order pieces without a payment gateway, and to change copy, prices and photos without depending on a developer.',
  project_airam_solution:
    'petitairam.com is the AIRAM brand shop: catalogue, cart and orders that reserve the piece, payment by Bizum or bank transfer with a unique per-order reference, reservation expiry and idempotent confirmation from the admin panel. An 8-section CMS holds all the content — no business data lives in the code — and every text is a per-language map, not columns. Login with dauth, media on dstash, worldwide shipping.',
  project_airam_result:
    'In production for a real client, maintained by me. {{tests}} automated tests ({{backend}} server, {{frontend}} client, {{e2e}} E2E). Design delivered by the brand and ported with fidelity verified on phone, tablet and desktop. CI/CD with Gitea Actions.',
  project_airam_url: 'petitairam.com',

  project_dstash_name: 'dstash',
  project_dstash_tagline: 'Media storage platform with secure REST API, admin dashboard and signed URLs.',
  project_dstash_desc:
    'Media storage with folder organization, drag-and-drop, REST API with signed URLs and opaque API keys. Protected mode, thumbnails, subscriptions. Full admin dashboard. {{tests}} tests.',
  project_dstash_problem:
    'I needed to store and serve files (images, documents, media) for several apps, with access control and without depending on external services like S3.',
  project_dstash_solution:
    'dstash is a self-hosted media storage platform. Supports drag-and-drop upload, folder organization, preview and a REST API for external integration. Security with signed URLs (HMAC-SHA256), opaque API keys, Zod validation, rate limiting and audit logging.',
  project_dstash_result:
    'In production serving media for several applications, among them dinventory and petitairam.com. {{tests}} automated tests ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Protected mode with PIN, auto-generated WebP thumbnails, subscription system. Full admin dashboard. CI/CD with GitHub Actions.',
  project_dstash_url: 'dstash.dtpf.es',

  project_dwealth_name: 'dwealth',
  project_dwealth_tagline: 'Wealth tracking: transactions in; value, allocation and FIFO tax out.',
  project_dwealth_desc:
    'Private personal-wealth app that replaces a spreadsheet: Decimal128 amounts (never floats), original currency plus the day’s FX rate, holdings and FIFO cost derived from transactions, transfers as two linked legs and prices with timestamp and source. {{tests}} tests.',
  project_dwealth_problem:
    'Tracking personal wealth in a spreadsheet ends in silent rounding, eyeballed currency conversions and formulas nobody can audit. I wanted accounting rigour with the convenience of an app on my phone.',
  project_dwealth_solution:
    'dwealth stores every amount as Decimal128 — never a float on the money path — in its original currency alongside the day’s FX rate. Holdings and FIFO cost are derived from transactions, not edited; a transfer is two linked legs; every price carries a timestamp and a source. Imports run inside a MongoDB transaction. Login with dauth, mobile-first.',
  project_dwealth_result:
    'Private app in production for my own use, with no public URL by design. {{tests}} automated tests ({{backend}} server, {{frontend}} client, {{e2e}} E2E). CI/CD with Gitea Actions.',
  project_dwealth_status: 'Private app · no public URL',
  project_dwealth_url: 'private app',

  project_audity_name: 'Audity',
  project_audity_tagline: 'Spotify-like music streaming with full player, playlists and search.',
  project_audity_desc:
    "Spotify-like music streaming. Full player, playlists, search, CMS. Collaborative master's final project (2023), deployed and maintained since. {{tests}} tests.",
  project_audity_url: 'audity.dtpf.es',

  // Project status badges and the detail page's extra links
  projects_badge_beta: 'Private beta',
  projects_badge_client: 'Client work',
  projects_badge_private: 'Private',
  detail_store: 'Get it on Google Play',

  // Screenshot gallery
  detail_gallery: 'Screenshots',
  gallery_open: 'Enlarge screenshot: {{alt}}',
  gallery_close: 'Close',
  gallery_prev: 'Previous',
  gallery_next: 'Next',
  gallery_counter: '{{current}} of {{total}}',
  gallery_dialog_label: '{{name}} screenshots',
  media_dcompany_landing_desktop:
    'dcompany landing on desktop: an invoice is forwarded, the inventory updates itself and an alert follows',
  media_dcompany_landing_phone: 'dcompany landing on a phone',
  media_dauth_landing_desktop:
    'dauth landing: passwordless sign-in screen with magic link and passkey next to the pitch',
  media_dauth_landing_phone: 'dauth landing on a phone',
  media_dalist_landing_desktop: 'dalist landing: sample lists, tasks and an audio recording note',
  media_dalist_landing_phone: 'dalist landing on a phone',
  media_dstash_landing_desktop: 'dstash landing: "Your content, everywhere", with passkey sign-in',
  media_dstash_landing_phone: 'dstash landing on a phone',
  media_airam_product_desktop:
    'petitairam.com product page on desktop: crochet bag with colour picker and add-to-basket button',
  media_airam_product_phone: "petitairam.com product page on a phone, with the bag's photo gallery",
  media_airam_catalogue_phone:
    'petitairam.com catalogue on a phone, with "Made to order" and "Ready to ship" labels',
  media_airam_how_it_works_phone:
    'petitairam.com "How to order" page on a phone: four steps and payment by Bizum or bank transfer',

  // Footer: the portfolio's own figures
  footer_site_label: 'This site',
  footer_site_tests: '{{tests}} tests',
  footer_site_source: 'source on GitHub',
  footer_analytics: 'Cookie-free analytics with Umami',
  footer_privacy: 'privacy policy',

  // Accessibility
  skip_to_content: 'Skip to main content',
  open_menu: 'Open menu',
  close_menu: 'Close menu',
  nav_mobile_menu: 'Navigation menu',
  required: 'required',
  contact_sending: 'Sending...',
  contact_timeout: 'Request timed out. Please try again.',
  open_new_window: 'opens in new window',

  // Error boundary
  error_boundary_title: 'Something went wrong',
  error_boundary_description: 'An unexpected error occurred. Please try again.',
  error_boundary_reload: 'Reload',

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
  tools: 'MCP tools',
  isolation: 'Isolation',
  billing: 'Billing',
  ai: 'AI',
  media: 'Media',
  target: 'Device',
  brand: 'Brand',
  payments: 'Payments',
  cms: 'CMS',
  precision: 'Precision',
  fx: 'Currency',
  tax: 'Tax',
  origin: 'Origin',

  // Metric values
  metric_admin_full: 'Full dashboard',
  metric_encryption_at_rest: 'Notes encrypted at rest',
  metric_isolation_tenant: 'One container per company',
  metric_ai_self_hosted: 'Self-hosted vision and voice',
  metric_mobile_first: 'Mobile-first',
  metric_payments_bizum: 'Bizum and bank transfer',
  metric_cms_sections: '8 editable sections',
  metric_masters_project: "Master's project (2023)",

  // SEO descriptions (meta description / social cards)
  seo_desc_home:
    'Portfolio of David T. Pizarro Frick, senior full-stack engineer in Mallorca. I build and run web products from idea to production, with CI/CD, staging and monitoring.',
  seo_desc_projects:
    'The apps I built and keep running in production: authentication, file storage, shopping lists, an AI agent platform and more, each with its case study.',
  seo_desc_about:
    'Senior full-stack engineer with years in B2B SaaS: experience, tools and how I work, based in Mallorca.',
  seo_desc_contact:
    'Write to me about a project or an opportunity. I reply within 24 hours; remote or hybrid from Mallorca.',
  seo_desc_privacy:
    'Privacy policy of dtpf.es: which personal data is collected, why, and how to exercise your rights.',
  seo_desc_cv:
    'Résumé of David T. Pizarro Frick, senior full-stack engineer in Mallorca: experience, selected projects and tools, ready to print or download as a PDF.',

  // CV
  cv_title: 'Résumé',
  cv_download: 'Download PDF',
  cv_profile: 'Profile',
  cv_projects: 'Selected projects',
  about_cv: 'Résumé',
  contact_cv: 'Résumé (view or download PDF)',

  // Platform page — figures arrive from platformVars() in config/facts.ts
  platform_title: 'Platform',
  platform_seo_title: 'The platform I run',
  platform_desc:
    'The apps in this portfolio run on a platform I designed and operate on my own: from the firewall to the GPUs, with backups, alerting and automated deploys.',
  platform_figures_heading: 'The platform in figures',
  platform_fig_nodes: 'Proxmox nodes in one cluster',
  platform_fig_guests: 'containers and virtual machines',
  platform_fig_unbacked: 'containers or VMs without a backup',
  platform_fig_alerts: 'alert rules',
  platform_fig_probes: 'uptime probes',
  platform_fig_workflows: 'CI/CD workflows across {{repos}} repositories',
  platform_measured_at: 'Figures measured on {{measuredAt}}.',
  platform_policy: 'Architecture, not inventory: no IPs, hostnames or account names here.',

  platform_diagram_label: 'Architecture',
  platform_diagram_heading: 'From the internet to the data',
  platform_diagram_desc: 'The path of a request, layer by layer, and the operations around it.',
  platform_diagram_summary:
    'A request comes in through Cloudflare, crosses a high-availability pair of OPNsense firewalls and reaches Nginx Proxy Manager, which sends it to the app server, a per-app container or dcompany. The apps use MongoDB, dstash and inference on my own GPUs. From the firewall inwards everything runs on a {{nodes}}-node Proxmox cluster, with CI/CD, observability and backups operating around it.',
  platform_legend_request: 'Request path',
  platform_legend_ops: 'Operations: deploys, metrics, backups',
  platform_frame_cluster: 'Proxmox VE cluster · {{nodes}} nodes',
  platform_tier_firewall: 'High-availability firewall · CARP',
  platform_tier_apps: 'Applications',
  platform_tier_data: 'Data and inference',
  platform_tier_ops: 'Operations',
  platform_node_cloudflare_sub: 'DNS and proxy',
  platform_node_fw_primary: 'Primary',
  platform_node_fw_standby: 'Standby',
  platform_node_proxy_sub: 'TLS and access lists',
  platform_node_appserver: 'App server',
  platform_node_appserver_sub: 'PM2 · the classic Express apps',
  platform_node_lxc: 'One LXC per app',
  platform_node_lxc_sub: 'each app in its own container',
  platform_node_dcompany_sub: 'control plane, one isolated LXC per tenant',
  platform_node_mongo_sub: 'replica set for transactions',
  platform_node_dstash_sub: 'file store, one of my products',
  platform_node_gpu: 'GPU inference',
  platform_node_gpu_sub: 'speech, vision and LLM, never leaving the infrastructure',
  platform_node_ci_sub: 'GitHub Actions and Gitea Actions, self-hosted runners',
  platform_node_ci_rel: 'deploys only on green tests',
  platform_node_obs: 'Observability',
  platform_node_obs_rel: 'alerts to Matrix',
  platform_node_backup: 'Backups',
  platform_node_backup_sub: 'Proxmox Backup Server · {{datastores}} datastores',
  platform_node_backup_rel: 'scheduled backups of the cluster',

  platform_cards_label: 'Building blocks',
  platform_cards_heading: 'What keeps it running',
  platform_cards_desc: "I built every piece, and I'm the one who runs and maintains it.",
  platform_card_cluster_title: 'Proxmox cluster with HA and ZFS replication',
  platform_card_cluster_body:
    'The platform runs on {{nodes}} Proxmox nodes in a high-availability cluster, with ZFS replication between nodes and scheduled backups to Proxmox Backup Server.',
  platform_card_cluster_meta:
    '{{lxc}} LXC · {{vms}} VMs · {{replicationJobs}} ZFS replication jobs · {{backupTb}} TB of backups',
  platform_card_firewall_title: 'High-availability firewall (CARP)',
  platform_card_firewall_body:
    'A CARP pair of OPNsense firewalls: if one fails, the other takes the traffic. Suricata IDS watches both; behind them, Nginx Proxy Manager terminates TLS and enforces access lists.',
  platform_card_firewall_meta: 'Cloudflare in front · a pair of VMs · IDS on both',
  platform_card_ci_title: 'Dual CI/CD: GitHub Actions and Gitea Actions',
  platform_card_ci_body:
    'GitHub Actions and Gitea Actions, both on self-hosted runners. Each app deploys from the pipeline that runs its tests, so a red test never deploys; dcompany adds its own ladder: dev → staging → signed SHA → promotion.',
  platform_card_ci_meta: '{{workflows}} workflows · {{repos}} repositories · {{forges}} forges',
  platform_card_observability_title: 'Observability, with alerts to Matrix',
  platform_card_observability_body:
    'Prometheus, Loki and Grafana watch public and internal services, and alerts land in Matrix. error-watcher, a tool I wrote, polls Loki and posts errors there too.',
  platform_card_observability_meta:
    '{{targets}} targets in {{jobs}} jobs · {{probes}} probes · {{alertRules}} rules',
  platform_card_inference_title: 'Self-hosted inference: speech and vision',
  platform_card_inference_body:
    'Live features served from GPUs of my own: transcription, speaker diarization, vision, an LLM and embeddings. Nothing leaves the infrastructure.',
  platform_card_inference_meta: 'Whisper · pyannote · Qwen · llama-server',
  platform_card_inference_used: 'In use in:',
  platform_card_tools_title: 'Internal tools',
  platform_card_tools_body: 'LAN or VPN only, with no public URL: described here, never linked.',
  platform_tool_voxdrop: 'voice remote (PWA)',
  platform_tool_meetscribe: 'meeting transcription',
  platform_tool_ops: 'ops portal; the test counts on this site come from it',
  platform_tool_errorwatcher: 'posts Loki errors to Matrix',
  platform_tool_provisioner: 'provisions and tears down dcompany tenants',

  platform_cta_heading: 'What runs on top',
  platform_cta_desc:
    'Authentication, storage, notes, a shop for a client and an AI-agent platform, each with its own case study.',
  platform_cta_projects: 'See the projects',

  seo_desc_platform:
    'The infrastructure I run on my own: a Proxmox cluster, a high-availability firewall, CI/CD, observability with alerting and inference on my own GPUs.',
};
