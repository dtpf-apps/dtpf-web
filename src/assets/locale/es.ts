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
  project_dcompany_name: 'dcompany',
  project_dcompany_tagline: 'Compañías de agentes de IA que trabajan solas y solo interrumpen para decidir.',
  project_dcompany_desc:
    'Plataforma multi-tenant de agentes de IA: organigrama con roles y delegación, event sourcing, más de {{mcpTools}} herramientas MCP para operar la empresa desde Claude, aprobación humana de los cambios y facturación con Stripe. Un contenedor aislado por empresa. {{tests}} tests.',
  project_dcompany_featured:
    'Plataforma de agentes de IA con gobernanza: organigrama con delegación, event sourcing, más de {{mcpTools}} herramientas MCP y aprobación humana en lo delicado. Beta privada en producción.',
  project_dcompany_problem:
    'Operar equipos de agentes de IA sin perder el control: saber quién hizo qué, con qué permiso y qué costó, y que lo delicado espere a la decisión de una persona.',
  project_dcompany_solution:
    'dcompany es una plataforma multi-tenant: cada empresa corre en su propio contenedor aislado, con un organigrama de agentes con roles y delegación. Todo es event sourcing: cada acción queda registrada y es reproducible. Más de {{mcpTools}} herramientas MCP permiten operar la empresa desde Claude; la salida a internet pasa por lista blanca; los cambios de código se proponen y los aprueba una persona. Facturación autoservicio con Stripe y build farm de imágenes OCI firmadas (podman + Trivy + Cosign).',
  project_dcompany_result:
    'En producción en dcompany.tech como beta privada, construida en solitario. {{tests}} tests automatizados ({{backend}} control plane y daemon, {{frontend}} web, {{packages}} paquetes compartidos). Monorepo TypeScript 6 con exactOptionalPropertyTypes; escalera dev → staging → firma → promoción deliberada a producción. CI/CD con GitHub Actions.',
  project_dcompany_status: 'Beta privada · acceso bajo petición',
  project_dcompany_url: 'dcompany.tech',

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
    'dauth es autenticación como servicio (AuthaaS): login sin contraseña para cualquier aplicación, con magic link (con código de verificación cuando el enlace se abre en otro navegador) y passkeys (WebAuthn). Cada app conectada obtiene su propio tenant con configuración independiente y authorization code flow, y se integra con los SDKs dauth-react y dauth-node, publicados en GitHub Packages.',
  project_dauth_result:
    'Hoy gestiona la autenticación de {{tenants}} aplicaciones en producción. {{tests}} tests automatizados ({{backend}} backend, {{frontend}} frontend, {{packages}} paquetes npm, {{e2e}} E2E). Magic link con browser-binding y passkeys WebAuthn. CI/CD completo con GitHub Actions. Monitorización centralizada con Grafana + Loki.',
  project_dauth_url: 'dauth.ovh',

  project_dinventory_name: 'dinventory',
  project_dinventory_tagline: '¿Dónde tengo…? Inventario de casa y trastero que responde en dos toques.',
  project_dinventory_desc:
    'Inventario doméstico con ubicación exacta (lugar › habitación › mueble › balda › caja › delante/detrás), vista en planta a escala real, medición con la cámara (WebXR), búsqueda por voz con Whisper y alta de objetos por foto con un modelo de visión self-hosted. Nada sale de mi infraestructura. {{tests}} tests.',
  project_dinventory_featured:
    'Inventario de casa con IA en infraestructura propia: ubicación exacta, medición con la cámara, búsqueda por voz y reconocimiento por foto, sin que nada salga de mi red.',
  project_dinventory_problem:
    'Saber exactamente dónde está cada cosa de casa y del trastero — en qué mueble, balda y caja, delante o detrás — sin teclear un inventario entero ni entregar las fotos de mi casa a un servicio externo.',
  project_dinventory_solution:
    'dinventory modela la casa como un árbol de ubicaciones (lugar › habitación › mueble › balda › caja › delante/detrás) con medidas reales en centímetros y vista en planta. Una foto basta para dar de alta los objetos: la lee un modelo de visión que corre en mi propia GPU, con degradación explícita si no está disponible. Medición con la cámara vía WebXR, búsqueda por voz con Whisper self-hosted, login con dauth y medios en dstash. Diseñada para el móvil primero.',
  project_dinventory_result:
    'En producción pública detrás de dauth desde octubre de 2026. {{tests}} tests automatizados ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Toda la inferencia (visión y voz) corre en infraestructura propia: ninguna foto ni audio sale de la red. CI/CD con Gitea Actions, staging antes de producción.',
  project_dinventory_url: 'dinventory.dtpf.es',

  project_dalist_name: 'dalist',
  project_dalist_tagline: 'App de notas colaborativa con checklists, notas compartidas en tiempo real y PWA.',
  project_dalist_desc:
    'App de notas y checklists con notas compartidas en tiempo real, historial de versiones, 19 colores, etiquetas, cifrado de notas en reposo, asistente de voz con Whisper self-hosted y notificaciones. PWA instalable y app Android en Google Play. {{tests}} tests.',
  project_dalist_featured:
    'Notas y checklists compartidas en tiempo real, cifradas en reposo, con asistente de voz self-hosted. PWA instalable y app Android publicada en Google Play.',
  project_dalist_problem:
    'Necesitaba un sitio central para organizar notas y checklists y poder compartirlas — sin la complejidad de Notion ni las limitaciones de Google Keep.',
  project_dalist_solution:
    'dalist es una app de notas y checklists con colaboración en tiempo real. Notas compartidas con presencia activa vía Socket.io, historial de versiones con restauración, checklists con variante dev (commit types), 19 colores, etiquetas, cifrado AES-256-GCM de notas en reposo, asistente de voz con Whisper en mi propia GPU, notificaciones por email y en la app, y papelera con borrado automático a los 7 días.',
  project_dalist_result:
    'En producción como PWA instalable y como app Android en Google Play (Capacitor). {{tests}} tests automatizados ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Colaboración en tiempo real con Socket.io, historial de versiones, notificaciones por email. Frontend con Tailwind CSS v4. Auth delegada en dauth. CI/CD con GitHub Actions.',
  project_dalist_url: 'dalist.dtpf.es',

  project_airam_name: 'petitairam.com',
  project_airam_tagline: 'Tienda online para la marca artesanal AIRAM, con el CMS que la marca usa cada día.',
  project_airam_desc:
    'Tienda de piezas artesanales únicas y por encargo para la marca AIRAM: catálogo, carrito, pedido con reserva de pieza, pago por Bizum o transferencia con referencia por pedido, y un CMS de 8 secciones con todo el contenido multilingüe. Trabajo para cliente, en producción. {{tests}} tests.',
  project_airam_problem:
    'Una marca artesanal necesita vender piezas únicas y por encargo sin pasarela de pago, y cambiar textos, precios y fotos sin depender de un desarrollador.',
  project_airam_solution:
    'petitairam.com es la tienda de la marca AIRAM: catálogo, carrito y pedido con reserva de la pieza, pago por Bizum o transferencia bancaria con referencia única por pedido, caducidad de la reserva y confirmación idempotente desde el panel. Un CMS de 8 secciones guarda todo el contenido — ningún dato de negocio vive en el código — y cada texto es un mapa por idioma, no columnas. Login con dauth, medios en dstash, envíos a todo el mundo.',
  project_airam_result:
    'En producción para un cliente real, mantenida por mí. {{tests}} tests automatizados ({{backend}} server, {{frontend}} client, {{e2e}} E2E). Diseño entregado por la marca y portado con fidelidad verificada en móvil, tablet y escritorio. CI/CD con Gitea Actions.',
  project_airam_url: 'petitairam.com',

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
    'En producción sirviendo medios a varias aplicaciones, entre ellas dinventory y petitairam.com. {{tests}} tests automatizados ({{backend}} backend, {{frontend}} frontend, {{e2e}} E2E). Modo protegido con PIN, miniaturas WebP automáticas, sistema de suscripciones. Panel de administración completo. CI/CD con GitHub Actions.',
  project_dstash_url: 'dstash.dtpf.es',

  project_dwealth_name: 'dwealth',
  project_dwealth_tagline:
    'Seguimiento de patrimonio: transacciones dentro; valor, asignación y fiscalidad FIFO fuera.',
  project_dwealth_desc:
    'Aplicación privada de patrimonio personal que sustituye a una hoja de cálculo: cantidades Decimal128 (nunca float), moneda original más tipo de cambio del día, posiciones y coste FIFO derivados de las transacciones, transferencias como dos patas enlazadas y precios con marca de tiempo y fuente. {{tests}} tests.',
  project_dwealth_problem:
    'Llevar el patrimonio personal en una hoja de cálculo acaba en redondeos silenciosos, conversiones de divisa a ojo y fórmulas que nadie puede auditar. Quería rigor contable con la comodidad de una app en el móvil.',
  project_dwealth_solution:
    'dwealth guarda cada cantidad como Decimal128 — nunca un float en el camino del dinero — en su moneda original junto al tipo de cambio del día. Las posiciones y el coste FIFO se derivan de las transacciones, no se editan; una transferencia son dos patas enlazadas; cada precio lleva marca de tiempo y fuente. Las importaciones corren dentro de una transacción MongoDB. Login con dauth, móvil primero.',
  project_dwealth_result:
    'Aplicación privada en producción para uso propio, sin URL pública por diseño. {{tests}} tests automatizados ({{backend}} server, {{frontend}} client, {{e2e}} E2E). CI/CD con Gitea Actions.',
  project_dwealth_status: 'Aplicación privada · sin URL pública',
  project_dwealth_url: 'aplicación privada',

  project_audity_name: 'Audity',
  project_audity_tagline: 'Streaming musical tipo Spotify con reproductor completo, playlists y búsqueda.',
  project_audity_desc:
    'Streaming musical tipo Spotify. Reproductor completo, playlists, búsqueda, CMS. Proyecto colaborativo de fin de máster (2023), desplegado y mantenido desde entonces. {{tests}} tests.',
  project_audity_url: 'audity.dtpf.es',

  // Project status badges and the detail page's extra links
  projects_badge_beta: 'Beta privada',
  projects_badge_client: 'Cliente',
  projects_badge_private: 'Privada',
  detail_store: 'Ver en Google Play',

  // Screenshot gallery
  detail_gallery: 'Capturas',
  gallery_open: 'Ampliar captura: {{alt}}',
  gallery_close: 'Cerrar',
  gallery_prev: 'Anterior',
  gallery_next: 'Siguiente',
  gallery_counter: '{{current}} de {{total}}',
  gallery_dialog_label: 'Capturas de {{name}}',
  media_dcompany_landing_desktop:
    'Landing de dcompany en escritorio: "Reenvía una factura. Tu inventario se actualiza solo", con la cadena email → inventario actualizado → aviso',
  media_dcompany_landing_phone: 'Landing de dcompany en móvil',
  media_dauth_landing_desktop:
    'Landing de dauth: "Quitamos la contraseña de tu producto", junto a la pantalla de acceso con magic link y passkey',
  media_dauth_landing_phone: 'Landing de dauth en móvil',
  media_dalist_landing_desktop:
    'Landing de dalist: "Tus ideas, organizadas. Tu voz, transformada", con ejemplos de listas, tareas y grabación de audio',
  media_dalist_landing_phone: 'Landing de dalist en móvil',
  media_dstash_landing_desktop: 'Landing de dstash: "Tu contenido, en todas partes", con acceso por passkey',
  media_dstash_landing_phone: 'Landing de dstash en móvil',
  media_airam_product_desktop:
    'Ficha de producto de petitairam.com en escritorio: bolso de crochet con selector de color y botón de añadir a la cesta',
  media_airam_product_phone:
    'Ficha de producto de petitairam.com en móvil, con la galería de fotos del bolso',
  media_airam_catalogue_phone:
    'Catálogo de petitairam.com en móvil, con las etiquetas "Hecho por encargo" y "Lista para enviar"',
  media_airam_how_it_works_phone:
    'Página "Cómo realizar el pedido" de petitairam.com en móvil: cuatro pasos y pago por Bizum o transferencia',

  // Footer: the portfolio's own figures
  footer_site_label: 'Este sitio',
  footer_site_tests: '{{tests}} tests',
  footer_site_source: 'código en GitHub',

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
  tools: 'Herramientas MCP',
  isolation: 'Aislamiento',
  billing: 'Facturación',
  ai: 'IA',
  media: 'Medios',
  target: 'Dispositivo',
  brand: 'Marca',
  payments: 'Pagos',
  cms: 'CMS',
  precision: 'Precisión',
  fx: 'Divisa',
  tax: 'Fiscalidad',
  origin: 'Origen',

  // Metric values
  metric_admin_full: 'Panel completo',
  metric_encryption_at_rest: 'Notas cifradas en reposo',
  metric_isolation_tenant: 'Un contenedor por empresa',
  metric_ai_self_hosted: 'Visión y voz self-hosted',
  metric_mobile_first: 'Móvil primero',
  metric_payments_bizum: 'Bizum y transferencia',
  metric_cms_sections: '8 secciones editables',
  metric_masters_project: 'Proyecto de máster (2023)',
};
