// ============================================
// CONFIGURACIÓN DE IMÁGENES
// ============================================

export const camImages = [
  { src: "images/cam_terminal.png", alt: "Terminal" },
  { src: "images/cam_report.png", alt: "Report" },
  { src: "images/cam_tree.png", alt: "Tree" },
];

export const ppImages = [
  { src: "images/pp_dashboard.png", alt: "Dashboard" },
  { src: "images/pp_registro.png", alt: "Registro" },
  { src: "images/pp_presupuesto.png", alt: "Presupuesto" },
];

export const utpImages = [
  { src: "images/utp_dashboard.png", alt: "Dashboard" },
  { src: "images/utp_cursos.png", alt: "Mis Cursos" },
  { src: "images/utp_historial.png", alt: "Historial" },
  { src: "images/utp_calculadora.png", alt: "Calculadora" },
];

export const ksImages = [
  { src: "images/ks_perfil.jpeg", alt: "Selección de perfil" },
  { src: "images/ks_cuaderno.jpeg", alt: "Cuaderno de hoy" },
  { src: "images/ks_dashboard.jpeg", alt: "Dashboard del niño" },
];

// ============================================
// TRADUCCIONES (ES / EN)
// ============================================

export const translations = {
  es: {
    nav: {
      about: "Sobre Mí",
      skills: "Habilidades",
      experience: "Experiencia",
      projects: "Proyectos",
      education: "Educación",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola 👋, soy",
      name: "Ademir Fernández",
      role: "Data Analyst · Backend Developer · Automation Engineer",
      pitch: "Convierto procesos manuales y tediosos en herramientas que el equipo usa todos los días. Me importa que lo que construyo termine en producción resolviendo un problema real, no en una carpeta olvidada.",
      availability: "● Disponible para nuevas oportunidades",
      cta1: "Hablemos",
      cta2: "Descargar CV",
      location: "Lima, Perú",
    },
    about: {
      title: "Sobre Mí",
      text: "Soy Ademir, analista de datos e ingeniero de automatización. Llevo más de 3 años en el sector Telecom (BSS/OSS) creando herramientas en Python que le quitan al equipo el trabajo manual repetitivo — varias recortaron entre 90% y 99% el tiempo de tareas críticas, y todas están hoy en uso real. También me muevo en backend y web con JavaScript, React y PostgreSQL, y en el día a día vivo entre SQL avanzado, Power BI e infraestructura distribuida (Kubernetes, APIs REST/GraphQL). Lo que me mueve es simple: que lo que hago sirva de verdad y a alguien le haga el día más fácil.",
    },
    skills: {
      title: "Habilidades Técnicas",
      categories: [
        {
          name: "Lenguajes",
          items: ["Python", "SQL", "JavaScript", "React", "Bash", "AWK"],
        },
        {
          name: "Backend & APIs",
          items: [
            "REST APIs",
            "GraphQL",
            "Supabase",
            "Node.js",
            "SSH Tunneling",
          ],
        },
        {
          name: "Datos & BI",
          items: [
            "Power BI",
            "PostgreSQL",
            "SQL Server",
            "Oracle",
            "Excel Avanzado",
            "Metabase",
            "Grafana",
            "ETL",
          ],
        },
        {
          name: "Infraestructura",
          items: ["Kubernetes", "Datadog", "Git", "GitHub Actions", "CI/CD"],
        },
        {
          name: "Herramientas",
          items: [
            "Azure DevOps",
            "JIRA",
            "Trello",
            "Postman",
            "DBeaver",
            "Vite",
          ],
        },
      ],
    },
    experience: {
      title: "Experiencia Laboral",
      jobs: [
        {
          title: "Data Analyst / Analista de Automatización & Soporte N1",
          company: "Indra Minsait — Proyecto Pangea / NTTData",
          date: "Dic 2025 – Actualidad",
          bullets: [
            "Diseñé y puse en producción 4 herramientas de automatización en Python que transformaron procesos manuales críticos del área operativa: diagnóstico masivo de procesos Camunda, validación cruzada de inventario en 3 sistemas simultáneos, health check de clústers Kubernetes y análisis de purgado de datos. En conjunto redujeron entre 90% y 99% los tiempos operativos.",
            "Implementé consultas SQL avanzadas con CTEs en PostgreSQL para analizar millones de registros en tablas de notificaciones, work items y eventos de órdenes, identificando registros obsoletos con 99.8% de precisión para sustentar decisiones de purgado en producción.",
            "Diseñé y mantuve dashboards en Power BI y Grafana para monitoreo de KPIs operativos (tiempos de resolución, tasas de error, volumetría de órdenes), reduciendo el tiempo de análisis de incidencias en 40% mediante identificación proactiva de patrones.",
            "Gestioné el consumo de APIs REST mediante scripts Python que procesaban 2,000+ transacciones diarias, generando reportes automáticos con métricas de éxito/fallo para seguimiento del equipo de soporte.",
            "Realicé análisis de logs en Datadog para detección proactiva de 150+ incidencias mensuales antes de que impactaran a usuarios finales, priorizando por severidad y frecuencia.",
          ],
        },
        {
          title: "Analista de Soporte Técnico BO — Claro Empresas",
          company: "Indra Minsait",
          date: "Nov 2024 – Dic 2025",
          bullets: [
            "Analicé datos de monitoreo de redes FTTH y HFC en Grafana, identificando patrones de degradación en tiempo real que permitieron configurar alertas tempranas y reducir los tiempos de caída de servicio en 20%.",
            "Integré Grafana con fuentes de datos personalizadas (bases de datos internas, APIs de monitoreo), mejorando la capacidad de detección de anomalías en 30% y centralizando la visibilidad operativa del equipo.",
            "Extraje y consolidé datos de incidencias IPTV/OTT desde múltiples fuentes, generando reportes unificados en Excel que permitieron optimizar la asignación de recursos y priorizar casos críticos.",
            "Coordiné con equipos de desarrollo la resolución de fallas recurrentes, utilizando análisis de datos históricos para priorizar casos según impacto en el servicio y frecuencia de reincidencia.",
          ],
        },
        {
          title: "Supervisor de Soporte Técnico — Entel Empresas",
          company: "Servicios de Call Center (SCC)",
          date: "Dic 2022 – Nov 2024",
          bullets: [
            "Elaboré informes gerenciales procesando 15,000+ tickets mensuales con Excel avanzado (tablas dinámicas, macros VBA, fórmulas anidadas), proporcionando a la gerencia visibilidad completa del rendimiento operativo.",
            "Implementé un sistema de seguimiento de KPIs en Excel con actualización semi-automática que redujo el tiempo de generación de reportes semanales en 60%, eliminando procesos manuales de consolidación.",
            "Analicé patrones de averías masivas con datos históricos de tickets, implementando protocolos preventivos que redujeron la recurrencia de incidencias en 30%.",
            "Desarrollé una herramienta en Excel para asesores que automatizó búsquedas y cálculos frecuentes, logrando una reducción del 20% en el tiempo promedio de atención (TMA).",
          ],
        },
      ],
    },
    projects: {
      title: "Proyectos Técnicos",
      subtitle:
        "Del tooling operativo en producción a mis propias apps — todo en uso real",
      items: [
        {
          name: "Hub Operativo N1",
          desc: "Hub central (terminal + web) que unifica las herramientas que el equipo de soporte N1 de un operador de telecomunicaciones ejecutaba una por una vía SSH. Ejecución en vivo con streaming de salida, flujo seguro de dos pasos (dry-run → confirmar) para operaciones destructivas, e integración con Camunda BPM, GraphQL/APIs TM Forum, Kafka y Kubernetes/Azure. Reúne, entre otros módulos: analizador de procesos Camunda v2.5 (detección de causa raíz en árboles BPMN, ~95-97% menos tiempo), consulta unificada de inventario ISP/OSP/BSS en 3 sistemas a la vez, health check de clústers Kubernetes y análisis de purgado de datos en PostgreSQL.",
          impact:
            "Análisis de incidencias: ~1-2 h → ≤20 min. Operativos (liberaciones/sanity): 30+ min → 2-3 min. 4 analistas N1, ~50% más producción y sin licencias de OpenLens.",
          tech: [
            "Python",
            "Textual (TUI)",
            "Flask",
            "HTMX",
            "SSE",
            "Camunda BPM",
            "GraphQL",
            "Kafka",
            "Kubernetes",
            "Azure",
            "PostgreSQL",
            "pytest",
          ],
          images: "camImages",
        },
        {
          name: "GradeFlow",
          desc: "Aplicación web de seguimiento académico universitario. Permite importar el reporte PDF oficial, visualizar el avance por ciclos y créditos, gestionar el estado de cada curso (Pendiente → En curso → Aprobado/Desaprobado) y simular notas con calculadora de mínimo recomendado en tiempo real.",
          impact: "Aplicación en producción con login Google, multi-usuario y datos en tiempo real",
          tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Zustand", "Google OAuth", "PDF Parser"],
          link: "https://seguimiento-notas.vercel.app",
          repo: "https://github.com/zZloquilloZz/Seguimiento_Notas",
          images: "utpImages",
        },
        {
          name: "Presupuesto Personal",
          desc: "Aplicación web SPA de finanzas personales desarrollada desde cero. Permite registrar gastos por débito, efectivo o tarjeta de crédito, con cálculo automático de cuotas y cronograma de pagos. Incluye gestión de tarjetas de crédito con fechas de cierre y pago, seguimiento de deudas con historial de abonos, presupuestos mensuales por categoría con comparativa vs gasto real, y dashboard con resumen mensual, gráfico de categorías y tendencia de 7 meses. Implementa autenticación segura con flujo PKCE, base de datos PostgreSQL con Row Level Security (RLS) por usuario, y deploy automático via GitHub Actions a GitHub Pages.",
          impact: "Aplicación en producción con usuarios activos",
          tech: [
            "React 18",
            "Vite",
            "Supabase",
            "PostgreSQL",
            "Auth PKCE",
            "RLS",
            "GitHub Actions",
            "CSS Variables",
          ],
          link: "https://zzloquillozz.github.io/presupuesto-personal/",
          repo: "https://github.com/zZloquilloZz/presupuesto-personal",
          images: "ppImages",
        },
        {
          name: "KidSpark",
          desc: "Plataforma educativa con IA para niños de primaria (currículo MINEDU). Los padres suben fotos del cuaderno y Claude (visión) genera ejercicios adaptativos por materia. Incluye motor de aprendizaje con niveles por curso, sistema de estrellas y repetición espaciada (SM-2), tres roles (admin, padre, niño con acceso por PIN), control de costos de IA con límites configurables, y endurecimiento de seguridad de producción (rate-limit con Redis, CSP, retención de datos del menor según Ley 29733). Desarrollada con Next.js 16, Prisma + PostgreSQL y desplegada en Vercel.",
          impact: "Aplicación en producción con IA adaptativa, control de costos y seguridad de nivel producción",
          tech: [
            "Next.js 16",
            "TypeScript",
            "Prisma",
            "PostgreSQL",
            "Anthropic (Claude)",
            "NextAuth v5",
            "Upstash Redis",
            "Vitest",
            "Playwright",
            "Vercel",
          ],
          link: "https://kidspark-steel.vercel.app",
          images: "ksImages",
        },
      ],
    },
    education: {
      title: "Educación",
      items: [
        {
          degree: "Ingeniería de Sistemas",
          school: "Universidad Tecnológica del Perú (UTP)",
          date: "En curso — Egreso 2027",
        },
        {
          degree: "Desarrollador de Sistemas de Información",
          school: "IDAT",
          date: "2022 – 2024",
        },
      ],
    },
    contact: {
      title: "Contacto",
      subtitle:
        "¿Tienes una idea, un proyecto o solo quieres saludar? Escríbeme y te respondo. Me gusta conversar sobre datos, automatización y construir cosas útiles.",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "Enviar Mensaje",
      sending: "Enviando...",
      sent: "¡Mensaje enviado!",
      error: "Error al enviar.",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
    viewProject: "Ver proyecto",
    viewCode: "Ver código",
  },

  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi 👋, I'm",
      name: "Ademir Fernández",
      role: "Data Analyst · Backend Developer · Automation Engineer",
      pitch: "I turn tedious manual processes into tools the team actually uses every day. What matters to me is that what I build ships to production and solves a real problem — not that it ends up in a forgotten folder.",
      availability: "● Open to new opportunities",
      cta1: "Let's talk",
      cta2: "Download CV",
      location: "Lima, Peru",
    },
    about: {
      title: "About Me",
      text: "I'm Ademir, a data analyst and automation engineer. For 3+ years I've worked in Telecom (BSS/OSS) building Python tools that take repetitive manual work off the team's plate — several cut critical-task times by 90% to 99%, and all of them are in real use today. I also work across backend and web with JavaScript, React, and PostgreSQL, and my day-to-day lives between advanced SQL, Power BI, and distributed infrastructure (Kubernetes, REST/GraphQL APIs). What drives me is simple: that what I do is genuinely useful and makes someone's day easier.",
    },
    skills: {
      title: "Technical Skills",
      categories: [
        {
          name: "Languages",
          items: ["Python", "SQL", "JavaScript", "React", "Bash", "AWK"],
        },
        {
          name: "Backend & APIs",
          items: [
            "REST APIs",
            "GraphQL",
            "Supabase",
            "Node.js",
            "SSH Tunneling",
          ],
        },
        {
          name: "Data & BI",
          items: [
            "Power BI",
            "PostgreSQL",
            "SQL Server",
            "Oracle",
            "Advanced Excel",
            "Metabase",
            "Grafana",
            "ETL",
          ],
        },
        {
          name: "Infrastructure",
          items: ["Kubernetes", "Datadog", "Git", "GitHub Actions", "CI/CD"],
        },
        {
          name: "Tools",
          items: [
            "Azure DevOps",
            "JIRA",
            "Trello",
            "Postman",
            "DBeaver",
            "Vite",
          ],
        },
      ],
    },
    experience: {
      title: "Work Experience",
      jobs: [
        {
          title: "Data Analyst / Automation & L1 Support Analyst",
          company: "Indra Minsait — Pangea Project / NTTData",
          date: "Dec 2025 – Present",
          bullets: [
            "Designed and deployed 4 Python automation tools currently in production that transformed critical manual processes: bulk Camunda process diagnostics (BSS/OSS), cross-system inventory validation across 3 platforms simultaneously, full Kubernetes cluster health checks, and data purge analysis. Combined, these tools reduced operational times by 90% to 99%.",
            "Built advanced SQL queries using CTEs in PostgreSQL to analyze millions of records across notification, work item, and order event tables. The analysis identified obsolete records with 99.8% accuracy, supporting data purge decisions in production environments.",
            "Designed and maintained Power BI and Grafana dashboards for operational KPI monitoring (resolution times, error rates, order volumes), reducing incident analysis time by 40% through proactive pattern identification.",
            "Managed REST API consumption through Python scripts processing 2,000+ daily transactions, generating automated reports with success/failure metrics for the support team.",
            "Performed log analysis in Datadog for proactive detection of 150+ monthly incidents before end-user impact, prioritizing by severity and frequency.",
          ],
        },
        {
          title: "Back Office Technical Support Analyst — Claro Enterprise",
          company: "Indra Minsait",
          date: "Oct 2024 – Dec 2025",
          bullets: [
            "Analyzed FTTH and HFC network monitoring data in Grafana, identifying real-time degradation patterns that enabled early warning alerts and reduced service downtime by 20%.",
            "Integrated Grafana with custom data sources (internal databases, monitoring APIs), improving anomaly detection capability by 30% and centralizing the team's operational visibility.",
            "Extracted and consolidated IPTV/OTT incident data from multiple sources, generating unified Excel reports that enabled resource allocation optimization and critical case prioritization.",
            "Coordinated with development teams on recurring failure resolution, using historical data analysis to prioritize cases by service impact and recurrence frequency.",
          ],
        },
        {
          title: "Technical Support Supervisor — Entel Enterprise",
          company: "Servicios de Call Center (SCC)",
          date: "Aug 2022 – Oct 2024",
          bullets: [
            "Produced executive reports processing 15,000+ monthly tickets using advanced Excel (pivot tables, VBA macros, nested formulas), providing management with full operational performance visibility.",
            "Implemented a KPI tracking system in Excel with semi-automated updates that reduced weekly report generation time by 60%, eliminating manual data consolidation processes.",
            "Analyzed mass outage patterns using historical ticket data, implementing preventive protocols that reduced incident recurrence by 30%.",
            "Built an Excel tool for support agents that automated frequent lookups and calculations, achieving a 20% reduction in average handling time (AHT).",
          ],
        },
      ],
    },
    projects: {
      title: "Technical Projects",
      subtitle:
        "From production operations tooling to my own apps — all in real use",
      items: [
        {
          name: "Hub Operativo N1",
          desc: "Central hub (terminal + web) that unifies the tools an L1 support team at a telecom operator used to run one by one over SSH. Live streaming output, a safe two-step flow (dry-run → confirm) for destructive operations, and integration with Camunda BPM, GraphQL/TM Forum APIs, Kafka, and Kubernetes/Azure. Bundles, among other modules: a Camunda process analyzer v2.5 (root-cause detection across BPMN trees, ~95-97% less time), a unified ISP/OSP/BSS inventory query across 3 systems at once, a Kubernetes cluster health check, and PostgreSQL data-purge analysis.",
          impact:
            "Incident analysis: ~1-2 h → ≤20 min. Operational tasks (releases/sanity): 30+ min → 2-3 min. 4 L1 analysts, ~50% more output, and no more OpenLens licenses.",
          tech: [
            "Python",
            "Textual (TUI)",
            "Flask",
            "HTMX",
            "SSE",
            "Camunda BPM",
            "GraphQL",
            "Kafka",
            "Kubernetes",
            "Azure",
            "PostgreSQL",
            "pytest",
          ],
          images: "camImages",
        },
        {
          name: "GradeFlow",
          desc: "University academic tracking web app. Allows importing the official PDF report, visualizing progress by cycles and credits, managing course status (Pending → In Progress → Approved/Failed) and simulating grades with a real-time minimum score calculator.",
          impact: "Live app with Google login, multi-user support and real-time data",
          tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Zustand", "Google OAuth", "PDF Parser"],
          link: "https://seguimiento-notas.vercel.app",
          repo: "https://github.com/zZloquilloZz/Seguimiento_Notas",
          images: "utpImages",
        },
        {
          name: "Personal Budget App",
          desc: "Personal finance SPA built from scratch. Features expense tracking by debit, cash, or credit card with automatic installment calculation and payment schedules. Includes credit card management with closing and payment dates, debt tracking with payment history, monthly category-based budgets with actual vs planned comparison, and a dashboard with monthly summary, category chart, and 7-month trend. Implements secure PKCE authentication flow, PostgreSQL database with Row Level Security (RLS) per user, and automated deployment via GitHub Actions to GitHub Pages.",
          impact: "Production application with active users",
          tech: [
            "React 18",
            "Vite",
            "Supabase",
            "PostgreSQL",
            "Auth PKCE",
            "RLS",
            "GitHub Actions",
            "CSS Variables",
          ],
          link: "https://zzloquillozz.github.io/presupuesto-personal/",
          repo: "https://github.com/zZloquilloZz/presupuesto-personal",
          images: "ppImages",
        },
        {
          name: "KidSpark",
          desc: "AI-powered educational platform for primary-school kids (Peru's MINEDU curriculum). Parents upload notebook photos and Claude (vision) generates adaptive exercises per subject. Features a learning engine with per-subject levels, a star system and spaced repetition (SM-2), three roles (admin, parent, child via PIN), AI cost control with configurable limits, and production-grade security hardening (Redis rate-limiting, CSP, minor-data retention per Peru's Law 29733). Built with Next.js 16, Prisma + PostgreSQL and deployed on Vercel.",
          impact: "Production app with adaptive AI, cost control and production-grade security",
          tech: [
            "Next.js 16",
            "TypeScript",
            "Prisma",
            "PostgreSQL",
            "Anthropic (Claude)",
            "NextAuth v5",
            "Upstash Redis",
            "Vitest",
            "Playwright",
            "Vercel",
          ],
          link: "https://kidspark-steel.vercel.app",
          images: "ksImages",
        },
      ],
    },
    education: {
      title: "Education",
      items: [
        {
          degree: "Systems Engineering",
          school: "Universidad Tecnológica del Perú (UTP)",
          date: "In progress — Expected 2027",
        },
        {
          degree: "Information Systems Developer",
          school: "IDAT",
          date: "2022 – 2024",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Got an idea, a project, or just want to say hi? Drop me a message and I'll get back to you. I enjoy talking about data, automation, and building useful things.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      sent: "Message sent!",
      error: "Error sending.",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
    },
    footer: {
      rights: "All rights reserved.",
    },
    viewProject: "View project",
    viewCode: "View code",
  },
};
