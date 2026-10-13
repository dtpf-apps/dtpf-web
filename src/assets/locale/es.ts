export const es = {
  // Navigation
  nav_home: 'Inicio',
  nav_projects: 'Proyectos',
  nav_about: 'Sobre mí',
  nav_contact: 'Contacto',

  // Hero
  hero_name: 'David T.\nPizarro Frick',
  hero_tagline_1: 'Construyo y opero productos web: de la idea a producción,',
  hero_tagline_2: 'y de producción a los usuarios',
  hero_proof_apps: 'apps en producción',
  hero_proof_public: 'públicas',
  hero_proof_tests: 'tests automatizados',
  hero_proof_saas: 'años en SaaS B2B',
  hero_cta_projects: 'Ver lo que he construido',
  hero_cta_contact: 'Hablemos',
  availability: 'Abierto a ofertas · remoto o híbrido desde Mallorca',

  // Home: Projects section
  home_projects_label: 'Proyectos',
  home_projects_heading: 'Desplegado, monitorizado, mantenido',
  home_projects_desc:
    'Cada uno de estos proyectos está desplegado, con usuarios reales, CI/CD y monitorización.',
  home_projects_case_study: 'Ver caso de estudio',
  home_projects_visit: 'Visitar',
  // Home: Manifesto
  manifesto_line1: 'No colecciono side projects.',
  manifesto_line2: 'Los pongo en producción.',
  manifesto_body:
    'Cada app que construyo tiene CI/CD propio, staging antes de producción, monitorización con Grafana y despliegue automático. Uso IA como parte del proceso de ingeniería — gobernada por tests, revisión y gates — no como atajo.',

  // Home: Stack
  home_stack_label: 'Stack',
  home_stack_heading: 'Herramientas del día a día',
  home_stack_desc: 'Lo que uso para construir, desplegar y mantener.',

  // Home: CTA
  home_cta_title: 'Abierto a nuevas oportunidades',
  home_cta_desc:
    'Si necesitas a alguien que lleve productos de la idea a producción y los mantenga funcionando, hablemos.',
  home_cta_button: 'Contactar',

  // Projects page
  projects_title: 'Proyectos',
  projects_desc: 'Una selección de las aplicaciones que construyo y mantengo en producción.',
  projects_case_study: 'Caso de estudio',
  projects_visit: 'Visitar',
  projects_badge_production: 'Producción',
  projects_badge_this: 'Este sitio',
  projects_back: 'proyectos',

  // Project detail
  detail_problem: 'El problema.',
  detail_solution: 'La solución.',
  detail_result: 'El resultado.',
  detail_stack: 'Stack',
  detail_metrics: 'Datos',
  detail_visit: 'Visitar',
  detail_github: 'Ver en GitHub',

  // About
  about_title: 'Sobre mí',
  about_bio_p1:
    'Soy ingeniero full-stack en Storaia, un SaaS de fashion-tech para el canal de la moda europea. Trabajo en todo el producto, del backend a la interfaz, con Next.js, NestJS y TypeScript.',
  about_bio_p2:
    'Fuera del trabajo construyo y opero {{apps}} aplicaciones propias en producción ({{publicApps}} públicas) — desde un sistema de autenticación multi-tenant hasta una plataforma de agentes de IA — sobre una infraestructura que también administro yo. No son ejercicios: tienen usuarios reales, CI/CD, staging, monitorización y despliegue automático.',
  about_bio_p3:
    'Lo que más me motiva es llevar una idea de cero a un producto que funciona, y mantenerlo funcionando. Uso IA — Claude Code en el día a día y modelos self-hosted en GPU propia — como parte del proceso de ingeniería, con los mismos tests y gates que el resto del código.',
  about_role: 'Senior Full-Stack Engineer',
  about_location: 'Mallorca, España',
  about_experience: 'Experiencia',
  about_tools: 'Herramientas',
  about_tools_frontend: 'Frontend',
  about_tools_backend: 'Backend',
  about_tools_platform: 'Plataforma y DevOps',
  about_tools_ai: 'IA e inferencia',
  about_tools_quality: 'Calidad',

  // Experience
  exp_storaia_role: 'Full-Stack Engineer',
  exp_storaia_company: 'Storaia',
  exp_storaia_period: 'Jul 2023 — Presente',
  exp_storaia_desc:
    'Storaia es un SaaS de fashion-tech para el canal de la moda europea: una plataforma central de catálogo, pedidos, precios y datos de sell-out para marcas, tiendas multimarca y agentes comerciales, conectada con más de 40 sistemas (e-commerce, ERP, TPV). Next.js + NestJS + TypeScript, tests con Jest.',
  exp_palmira_role: 'Full-Stack Developer',
  exp_palmira_company: 'Palmira',
  exp_palmira_period: 'Jun 2021 — Jun 2023',
  exp_palmira_desc: 'Apps móviles y web con React Native, Node.js y MongoDB.',
  exp_assembler_role: 'Máster en Full-Stack Development',
  exp_assembler_company: 'Assembler Institute of Technology',
  exp_assembler_period: 'Oct 2022 — May 2023',
  exp_assembler_desc: '+1200 horas, 30+ proyectos. MERN stack, metodologías ágiles.',

  // Contact
  contact_title: 'Contacto',
  contact_subtitle: 'Escríbeme y te respondo en menos de 24 horas.',
  contact_email_label: 'Email',
  contact_email_placeholder: 'tu@email.com',
  contact_name_label: 'Nombre',
  contact_name_placeholder: 'Tu nombre',
  contact_message_label: 'Mensaje',
  contact_message_placeholder: 'Cuéntame sobre tu proyecto o la oportunidad...',
  contact_privacy: 'He leído y acepto la',
  contact_privacy_link: 'política de privacidad',
  contact_submit: 'Enviar mensaje',
  contact_success: 'Mensaje enviado. Te respondo pronto.',
  contact_error: 'Error al enviar. Inténtalo de nuevo.',
  contact_or: 'o directamente',

  // 404
  not_found_title: 'Página no encontrada',
  not_found_desc: 'La URL que buscas no existe o ha sido eliminada.',
  not_found_cta: 'Volver al inicio',

  // Footer
  footer_copy: '© 2020 – 2026',

  // Theme & lang
  theme_toggle: 'Cambiar tema',
  lang_toggle: 'Cambiar idioma',

  // Projects data — figures arrive as interpolation values from config/facts.ts
  project_dauth_name: 'dauth',
  project_dauth_tagline:
    'Autenticación passwordless multi-tenant. Magic link, passkeys, authorization code flow.',
  project_dauth_tagline_long:
    'Un sistema de autenticación passwordless que sirve de infraestructura a todas mis aplicaciones.',
  project_dauth_desc:
    'Sistema completo de autenticación que da login sin contraseña a {{tenants}} aplicaciones. Authorization code flow, gestión de licencias y suscripciones. {{tests}} tests, CI/CD completo.',
  project_dauth_featured:
    'Autenticación passwordless multi-tenant. Magic link, passkeys, authorization code flow. Es la infraestructura de login de mis otras apps — {{tenants}} tenants conectados.',
  project_dauth_problem:
    'Cada aplicación que construía necesitaba su propio sistema de login. Repetía la misma lógica de autenticación, gestión de tokens y flujos de email. Quería una solución centralizada que pudiera reutilizar.',
  project_dauth_solution:
    'dauth es autenticación como servicio (AuthaaS): login sin contraseña para cualquier aplicación, con magic link y passkeys (WebAuthn). Cada app conectada obtiene su propio tenant con configuración independiente y authorization code flow.',
  project_dauth_result:
    'Hoy gestiona la autenticación de {{tenants}} aplicaciones en producción. {{tests}} tests automatizados ({{backend}} backend, {{frontend}} frontend, {{packages}} paquetes npm, {{e2e}} E2E). Magic link con browser-binding y passkeys WebAuthn. CI/CD completo con GitHub Actions. Monitorización centralizada con Grafana + Loki.',
  project_dauth_url: 'dauth.ovh',

  project_dstash_name: 'dstash',
  project_dstash_tagline:
    'Plataforma de almacenamiento de medios con API REST segura, panel de administración y signed URLs.',
  project_dstash_desc:
    'Almacenamiento de medios con organización por carpetas, drag-and-drop, API REST con signed URLs y API keys opacas. Modo protegido, miniaturas, suscripciones. Panel de administración completo. {{tests}} tests.',
  project_dstash_problem:
    'Necesitaba almacenar y servir archivos (imágenes, documentos, media) para varias aplicaciones, con control de acceso y sin depender de servicios externos como S3.',
  project_dstash_solution:
    'dstash es una plataforma de almacenamiento de medios propia. Soporta subida drag-and-drop, organización por carpetas, vista previa y API REST para integración externa. Seguridad con signed URLs (HMAC-SHA256), API keys opacas, validación con Zod, rate limiting y registro de auditoría.',
  project_dstash_result:
    'En producción sirviendo medios a varias aplicaciones. {{tests}} tests automatizados ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Modo protegido con PIN, miniaturas WebP automáticas, sistema de suscripciones. Panel de administración completo. CI/CD con GitHub Actions.',
  project_dstash_url: 'dstash.dtpf.es',

  project_dalist_name: 'dalist',
  project_dalist_tagline: 'App de notas colaborativa con checklists, notas compartidas en tiempo real y PWA.',
  project_dalist_desc:
    'App de notas y checklists con notas compartidas en tiempo real, historial de versiones, 19 colores, etiquetas, cifrado de notas en reposo y notificaciones. PWA instalable y app en Google Play. {{tests}} tests.',
  project_dalist_problem:
    'Necesitaba un sitio central para organizar notas y checklists y poder compartirlas — sin la complejidad de Notion ni las limitaciones de Google Keep.',
  project_dalist_solution:
    'dalist es una app de notas y checklists con colaboración en tiempo real. Notas compartidas con presencia activa vía Socket.io, historial de versiones con restauración, checklists con variante dev (commit types), 19 colores, etiquetas, cifrado AES-256-GCM de notas en reposo, notificaciones por email y en la app, y papelera con borrado automático a los 7 días.',
  project_dalist_result:
    'En producción como PWA instalable y en Google Play. {{tests}} tests automatizados ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Colaboración en tiempo real con Socket.io, historial de versiones, notificaciones por email. Frontend con Tailwind CSS v4. Auth delegada en dauth. CI/CD con GitHub Actions.',
  project_dalist_url: 'dalist.dtpf.es',

  project_portfolio_name: 'dtpf.es',
  project_portfolio_tagline: 'Portfolio personal, código abierto.',
  project_portfolio_desc:
    'Este portfolio. React 19 + Tailwind CSS v4 + Framer Motion, i18n ES/EN, PWA con actualización silenciosa, {{tests}} tests. Código abierto en GitHub, desplegado con Gitea Actions.',
  project_portfolio_url: 'dtpf.es',

  project_audity_name: 'Audity',
  project_audity_tagline: 'Streaming musical tipo Spotify con reproductor completo, playlists y búsqueda.',
  project_audity_desc:
    'Streaming musical tipo Spotify. Reproductor completo, playlists, búsqueda, CMS. Proyecto colaborativo de fin de máster (2023), desplegado y mantenido desde entonces. {{tests}} tests.',
  project_audity_url: 'audity.dtpf.es',

  cookie_text: 'Utilizamos cookies analíticas para mejorar tu experiencia. Puedes aceptar o rechazar su uso.',
  cookie_accept: 'Aceptar',
  cookie_necessary_only: 'Solo necesarias',

  // Accessibility
  skip_to_content: 'Ir al contenido principal',
  close_menu: 'Cerrar menú',
  nav_mobile_menu: 'Menú de navegación',
  cookie_banner_title: 'Configuración de cookies',
  required: 'obligatorio',
  contact_sending: 'Enviando...',
  contact_timeout: 'La solicitud ha tardado demasiado. Inténtalo de nuevo.',
  open_new_window: 'abre en nueva ventana',

  // Error boundary
  error_boundary_title: 'Algo salió mal',
  error_boundary_description: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.',
  error_boundary_reload: 'Recargar',
  updating_app: 'Actualizando la aplicación...',

  // Metric labels
  tenants: 'Tenants activos',
  tests: 'Tests',
  auth: 'Autenticación',
  monitoring: 'Monitorización',
  deploy: 'Deploy',
  security: 'Seguridad',
  admin: 'Admin',
  realtime: 'Tiempo real',
  encryption: 'Cifrado',
  store: 'Distribución',

  // Metric values
  metric_admin_full: 'Panel completo',
  metric_encryption_at_rest: 'Notas cifradas en reposo',
};
