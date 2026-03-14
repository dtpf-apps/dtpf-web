export const es = {
  // Navigation
  nav_home: 'Inicio',
  nav_projects: 'Proyectos',
  nav_about: 'Sobre mi',
  nav_contact: 'Contacto',

  // Hero
  hero_name: 'David T.\nPizarro Frick',
  hero_tagline_1: 'Construyo productos web que funcionan,',
  hero_tagline_2: 'desde la idea hasta produccion',
  hero_proof_apps: 'apps en produccion',
  hero_proof_saas: 'anos en SaaS enterprise',
  hero_proof_tests: 'tests',
  hero_cta_projects: 'Ver lo que he construido',
  hero_cta_contact: 'Hablemos',

  // Home: Projects section
  home_projects_label: 'Proyectos',
  home_projects_heading: 'Productos reales, no side projects',
  home_projects_desc: 'Cada uno de estos proyectos esta desplegado, con usuarios reales, CI/CD y monitoring.',
  home_projects_case_study: 'Ver caso de estudio',
  home_projects_visit: 'Visitar',
  home_projects_detail: 'Ver detalle',

  // Home: Manifesto
  manifesto_line1: 'No colecciono side projects.',
  manifesto_line2: 'Los pongo en produccion.',
  manifesto_body:
    'Cada app que construyo tiene CI/CD propio, monitoring con Grafana, y deploy automatico. Uso IA como multiplicador en cada fase del desarrollo — no como atajo, sino como parte del proceso de ingenieria.',

  // Home: Stack
  home_stack_label: 'Stack',
  home_stack_heading: 'Herramientas del dia a dia',
  home_stack_desc: 'Lo que uso para construir, desplegar y mantener.',

  // Home: CTA
  home_cta_title: 'Buscando nuevas oportunidades',
  home_cta_desc: 'Si necesitas un developer que lleve productos de idea a produccion, hablemos.',
  home_cta_button: 'Contactar',

  // Projects page
  projects_title: 'Proyectos',
  projects_desc: '5 aplicaciones desplegadas y mantenidas en produccion.',
  projects_case_study: 'Caso de estudio',
  projects_visit: 'Visitar',
  projects_badge_production: 'Produccion',
  projects_badge_this: 'Este sitio',
  projects_back: 'proyectos',

  // Project detail
  detail_problem: 'El problema.',
  detail_solution: 'La solucion.',
  detail_result: 'El resultado.',
  detail_stack: 'Stack',
  detail_metrics: 'Datos',
  detail_visit: 'Visitar',
  detail_github: 'Ver en GitHub',

  // About
  about_title: 'Sobre mi',
  about_bio_p1:
    'Soy desarrollador de software en Hub4Retail, una plataforma SaaS para el sector moda con clientes como Lacoste, Camper y Ecoalf. Me encargo del frontend con React y TypeScript.',
  about_bio_p2:
    'Fuera del trabajo, construyo y mantengo 5 aplicaciones propias en produccion — desde un sistema de autenticacion multi-tenant hasta una plataforma de streaming musical. No son ejercicios ni tutoriales: tienen usuarios reales, CI/CD, monitoring, y deploy automatico.',
  about_bio_p3:
    'Lo que mas me motiva es llevar una idea de cero a un producto que funciona. Uso herramientas de IA como Claude y Cursor como parte natural de mi flujo de trabajo — al mismo nivel que Git o Docker.',
  about_role: 'Software Developer',
  about_location: 'Mallorca, Spain',
  about_experience: 'Experiencia',
  about_tools: 'Herramientas',
  about_tools_frontend: 'Frontend',
  about_tools_backend: 'Backend',
  about_tools_devops: 'DevOps',
  about_tools_ai: 'AI & Tools',

  // Experience
  exp_hub4retail_role: 'Frontend Developer',
  exp_hub4retail_company: 'Hub4Retail',
  exp_hub4retail_period: 'Jul 2023 — Presente',
  exp_hub4retail_desc:
    'Plataforma SaaS para retail moda. +20 clientes enterprise incluyendo Lacoste, Camper, Ecoalf. React + TypeScript + testing.',
  exp_palmira_role: 'Full Stack Developer',
  exp_palmira_company: 'Palmira',
  exp_palmira_period: 'Jun 2021 — Jun 2023',
  exp_palmira_desc: 'Apps moviles y web con React Native, Node.js y MongoDB.',
  exp_assembler_role: 'Master Full Stack Development',
  exp_assembler_company: 'Assembler Institute of Technology',
  exp_assembler_period: 'Oct 2022 — May 2023',
  exp_assembler_desc: '+1200 horas, 30+ proyectos. MERN stack, metodologias agiles.',

  // Contact
  contact_title: 'Contacto',
  contact_subtitle: 'Escribeme y te respondo en menos de 24 horas.',
  contact_email_label: 'Email',
  contact_email_placeholder: 'tu@email.com',
  contact_name_label: 'Nombre',
  contact_name_placeholder: 'Tu nombre',
  contact_message_label: 'Mensaje',
  contact_message_placeholder: 'Cuentame sobre tu proyecto o la oportunidad...',
  contact_privacy: 'He leido y acepto la',
  contact_privacy_link: 'politica de privacidad',
  contact_submit: 'Enviar mensaje',
  contact_success: 'Mensaje enviado. Te respondo pronto.',
  contact_error: 'Error al enviar. Intentalo de nuevo.',
  contact_or: 'o directamente',

  // 404
  not_found_title: 'Pagina no encontrada',
  not_found_desc: 'La URL que buscas no existe o ha sido eliminada.',
  not_found_cta: 'Volver al inicio',

  // Footer
  footer_copy: '© 2020 – 2026',

  // Theme & lang
  theme_toggle: 'Cambiar tema',
  lang_toggle: 'Cambiar idioma',

  // Projects data
  project_dauth_name: 'dauth',
  project_dauth_tagline: 'Autenticacion passwordless multi-tenant. Magic link, passkey, OAuth.',
  project_dauth_tagline_long:
    'Un sistema de autenticacion passwordless que sirve como infraestructura para todas mis aplicaciones.',
  project_dauth_desc:
    'Sistema completo de autenticacion que proporciona login sin contrasena a 4 aplicaciones. Authorization code flow, gestion de licencias y suscripciones. 1.702 tests, CI/CD completo.',
  project_dauth_featured:
    'Autenticacion passwordless multi-tenant. Magic link, passkey, OAuth. Lo uso como infraestructura para mis otras apps — 4 tenants conectados.',
  project_dauth_problem:
    'Cada aplicacion que construia necesitaba su propio sistema de login. Repetia la misma logica de autenticacion, gestion de tokens, y flujos de email. Queria una solucion centralizada que pudiera reutilizar.',
  project_dauth_solution:
    'dauth es un sistema de autenticacion como servicio (AuthaaS) que proporciona login sin contrasena a cualquier aplicacion. Soporta magic link y passkey (WebAuthn). Cada app conectada obtiene su propio tenant con configuracion independiente y authorization code flow.',
  project_dauth_result:
    'Actualmente gestiona la autenticacion de 4 aplicaciones en produccion. 1.702 tests automatizados (636 backend, 740 frontend, 253 npm packages, 73 E2E). Magic link con browser-binding y passkeys WebAuthn. CI/CD completo con GitHub Actions. Monitoring centralizado con Grafana + Loki.',
  project_dauth_url: 'dauth.ovh',

  project_dstash_name: 'dstash',
  project_dstash_tagline: 'Plataforma de almacenamiento de medios con API REST segura, admin dashboard y signed URLs.',
  project_dstash_desc:
    'Almacenamiento de medios con organizacion por carpetas, drag-and-drop, API REST con signed URLs y API keys opacas. Modo protegido, thumbnails, suscripciones. Admin dashboard completo. 2.114 tests.',
  project_dstash_problem:
    'Necesitaba almacenar y servir archivos (imagenes, documentos, media) para varias aplicaciones, con control de acceso y sin depender de servicios externos como S3.',
  project_dstash_solution:
    'dstash es una plataforma de almacenamiento de medios propia. Soporta subida drag-and-drop, organizacion por carpetas, vista previa, y API REST para integracion externa. Seguridad con signed URLs (HMAC-SHA256), API keys opacas, validacion Zod, rate limiting y audit logging.',
  project_dstash_result:
    'En produccion sirviendo medios para multiples aplicaciones. 2.114 tests automatizados (841 backend, 1.166 frontend, 107 E2E). Modo protegido con PIN, thumbnails WebP automaticos, sistema de suscripciones. Admin dashboard completo. CI/CD con GitHub Actions.',
  project_dstash_url: 'dstash.dtpf.es',

  project_dalist_name: 'dalist',
  project_dalist_tagline: 'App de notas colaborativa con checklists, notas compartidas en tiempo real y PWA.',
  project_dalist_desc:
    'App de notas y checklists con notas compartidas en tiempo real, historial de versiones, 19 colores, etiquetas, cifrado de notas en reposo y notificaciones. PWA instalable. 1.621 tests.',
  project_dalist_problem:
    'Necesitaba un sitio central para organizar notas y checklists con la posibilidad de compartirlas — sin la complejidad de Notion ni las limitaciones de Google Keep.',
  project_dalist_solution:
    'dalist es una app de notas y checklists con colaboracion en tiempo real. Notas compartidas con presencia activa via Socket.io, historial de versiones con restauracion, checklists con variante dev (commit types), 19 colores, etiquetas, cifrado AES-256-GCM de notas en reposo, notificaciones por email y en-app, y papelera con auto-eliminacion a los 7 dias.',
  project_dalist_result:
    'En produccion como PWA instalable. 1.621 tests automatizados (349 backend, 1.227 frontend, 45 E2E). Colaboracion en tiempo real con Socket.io, historial de versiones, notificaciones por email. Frontend con Tailwind CSS v4. Auth delegada en dauth. CI/CD con GitHub Actions.',
  project_dalist_url: 'dalist.dtpf.es',

  project_portfolio_name: 'dtpf.es',
  project_portfolio_tagline: 'Portfolio personal.',
  project_portfolio_desc:
    'Este portfolio. Space Grotesk + Tailwind CSS v4 + Framer Motion. Dark mode, i18n ES/EN, grain texture.',
  project_portfolio_url: 'dtpf.es',

  project_audity_name: 'Audity',
  project_audity_tagline: 'Streaming musical tipo Spotify con reproductor completo, playlists y busqueda.',
  project_audity_desc:
    'Streaming musical tipo Spotify. Reproductor completo, playlists, busqueda, CMS. Proyecto colaborativo de fin de master desplegado y mantenido.',
  project_audity_url: 'audity.dtpf.es',

};
