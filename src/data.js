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
      greeting: "Hola, soy",
      name: "Ademir Fernández",
      role: "Data Analyst | Backend Developer | Automation Engineer",
      cta1: "Contáctame",
      cta2: "Descargar CV",
      location: "Lima, Perú",
    },
    about: {
      title: "Sobre Mí",
      text: "Data Analyst y Automation Engineer con 3+ años de experiencia en el sector Telecom (BSS/OSS), especializado en el desarrollo de herramientas de automatización en Python que han reducido entre 90% y 99% los tiempos de trabajo manual en operaciones críticas. Experiencia complementaria en desarrollo backend y web con JavaScript, React y bases de datos PostgreSQL. Dominio de SQL avanzado, Power BI y análisis de infraestructura distribuida (Kubernetes, APIs REST/GraphQL). Orientado a generar impacto real: cada solución desarrollada se encuentra actualmente en uso productivo.",
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
        "Herramientas actualmente en uso productivo por el equipo operativo",
      items: [
        {
          name: "Analizador de Procesos Camunda v2.5",
          desc: "En el flujo de aprovisionamiento de órdenes FTTH, cuando una orden se bloquea, el operador debe buscar manualmente el proceso padre en Camunda, revisar cada subproceso hijo y nieto, e identificar la causa raíz del error. Esta herramienta automatiza todo ese árbol de análisis: recibe un lote de IDs de procesos, navega la jerarquía completa (padre/hijo/nieto) en paralelo con 5 hilos, y clasifica automáticamente los errores en 4 rutas diagnósticas: negocio (serial/recurso no disponible), rollback técnico, variables faltantes TMF622 y fallo de integración externa. Exporta resultados a Excel y genera reportes HTML interactivos con diagnóstico categorizado por vendor y estado.",
          impact:
            "Diagnóstico individual: de 15-45 min a 30 seg (~95%). Análisis masivo de 50 órdenes: de 4-8 horas a 5-10 min (~97%)",
          tech: [
            "Python",
            "Camunda REST API",
            "GraphQL",
            "SSH Tunneling",
            "openpyxl",
            "concurrent.futures",
            "TMF622",
          ],
          images: "camImages",
        },
        {
          name: "TrackGrade",
          desc: "Aplicación web de seguimiento académico universitario. Permite importar el reporte PDF oficial, visualizar el avance por ciclos y créditos, gestionar el estado de cada curso (Pendiente → En curso → Aprobado/Desaprobado) y simular notas con calculadora de mínimo recomendado en tiempo real.",
          impact: "Aplicación en producción con login Google, multi-usuario y datos en tiempo real",
          tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Zustand", "Google OAuth", "PDF Parser"],
          link: "https://seguimiento-notas.vercel.app",
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
          images: "ppImages",
        },
        {
          name: "Consulta Unificada ISP / OSP / BSS Inventory",
          desc: "Para resolver tickets N1 de hilos cruzados o servicios inconsistentes, los operadores debían consultar manualmente 3 sistemas distintos (Apollo/ISP vía GraphQL, OSP vía REST y BSS Inventory vía portal CXM) para cada LineID afectado. Esta herramienta recibe un listado de LineIDs y consulta los 3 sistemas de forma simultánea, con validación de sesión BSS y reintentos automáticos. Incluye dashboard en tiempo real con barra de progreso y ETA estimado.",
          impact: "100 LineIDs en 3 sistemas: de 6-8 horas a 5-15 min (~97%)",
          tech: [
            "Python",
            "REST APIs",
            "GraphQL (Apollo)",
            "requests",
            "concurrent.futures",
            "CSV",
          ],
        },
        {
          name: "Health Check Automatizado de Kubernetes",
          desc: "El equipo de monitoreo realizaba chequeos manuales pod por pod para identificar problemas en el clúster K8s. Esta herramienta ejecuta un chequeo de salud completo del clúster: descubre automáticamente todos los namespaces, analiza cada pod en paralelo (10 hilos), y clasifica los errores en infraestructura vs negocio usando 15+ patrones de detección. Traduce mensajes técnicos (exit codes, OOM, HikariPool) a lenguaje operativo comprensible. Genera reporte Excel con hoja de problemas agrupada por severidad.",
          impact:
            "Chequeo completo del clúster: de 1-2 horas a 30-90 seg (~98%)",
          tech: [
            "Python",
            "kubectl",
            "Kubernetes",
            "openpyxl",
            "concurrent.futures",
            "regex",
            "Log Analysis",
          ],
        },
        {
          name: "Optimización SQL para Análisis de Purgado de Datos",
          desc: "Consultas PostgreSQL complejas diseñadas para analizar la viabilidad de purgado en tablas críticas del sistema (Notifications, WorkItems, WorkItemEvents, OrderEvents). Utilizan CTEs, agregaciones, filtros temporales y manejo de JSONB para procesar millones de registros y generar reportes consolidados en ~1 minuto. Complementado con script AWK que procesa 200K-550K registros diarios de logs Kubernetes con conversión automática UTC a hora Lima.",
          impact:
            "99.8% de precisión procesando millones de registros en ~1 minuto",
          tech: [
            "PostgreSQL",
            "DBeaver",
            "CTEs",
            "JSONB",
            "AWK",
            "Bash",
            "Kubernetes (kubectl)",
            "Regex",
          ],
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
        "¿Interesado en trabajar juntos? Envíame un mensaje y coordinamos una reunión.",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      send: "Enviar Mensaje",
      sending: "Enviando...",
      sent: "¡Mensaje enviado!",
      error: "Error al enviar.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
    viewProject: "Ver proyecto",
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
      greeting: "Hi, I'm",
      name: "Ademir Fernández",
      role: "Data Analyst | Backend Developer | Automation Engineer",
      cta1: "Contact Me",
      cta2: "Download CV",
      location: "Lima, Peru",
    },
    about: {
      title: "About Me",
      text: "Data Analyst and Automation Engineer with 3+ years of experience in the Telecom sector (BSS/OSS), specialized in building Python automation tools that have reduced manual work times by 90% to 99% across critical operations. Complementary experience in backend and web development with JavaScript, React, and PostgreSQL databases. Proficient in advanced SQL, Power BI, and distributed infrastructure analysis (Kubernetes, REST/GraphQL APIs). Impact-driven: every solution built is currently in active production use.",
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
        "Tools currently in active production use by the operations team",
      items: [
        {
          name: "Camunda Process Analyzer v2.5",
          desc: "In the FTTH order provisioning flow, when an order gets stuck, operators must manually search the parent process in Camunda, review each child and grandchild subprocess, and identify the root cause. This tool automates the entire analysis tree: it takes a batch of process IDs, navigates the full hierarchy (parent/child/grandchild) in parallel with 5 threads, and automatically classifies errors into 4 diagnostic routes: business (serial/resource unavailable), technical rollback, missing TMF622 variables, and external integration failure. Exports results to Excel and generates interactive HTML reports with diagnostics categorized by vendor and status.",
          impact:
            "Per-order diagnosis: from 15-45 min to 30 sec (~95%). Bulk analysis of 50 orders: from 4-8 hours to 5-10 min (~97%)",
          tech: [
            "Python",
            "Camunda REST API",
            "GraphQL",
            "SSH Tunneling",
            "openpyxl",
            "concurrent.futures",
            "TMF622",
          ],
          images: "camImages",
        },
        {
          name: "TrackGrade",
          desc: "University academic tracking web app. Allows importing the official PDF report, visualizing progress by cycles and credits, managing course status (Pending → In Progress → Approved/Failed) and simulating grades with a real-time minimum score calculator.",
          impact: "Live app with Google login, multi-user support and real-time data",
          tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Zustand", "Google OAuth", "PDF Parser"],
          link: "https://seguimiento-notas.vercel.app",
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
          images: "ppImages",
        },
        {
          name: "Unified ISP / OSP / BSS Inventory Query",
          desc: "To resolve L1 tickets involving crossed fibers or inconsistent services, operators had to manually query 3 separate systems (Apollo/ISP via GraphQL, OSP via REST, and BSS Inventory via CXM portal) for each affected LineID. This tool takes a list of LineIDs and queries all 3 systems simultaneously, with BSS session validation and automatic retries. Includes a real-time dashboard with progress bar and estimated time of arrival.",
          impact:
            "100 LineIDs across 3 systems: from 6-8 hours to 5-15 min (~97%)",
          tech: [
            "Python",
            "REST APIs",
            "GraphQL (Apollo)",
            "requests",
            "concurrent.futures",
            "CSV",
          ],
        },
        {
          name: "Automated Kubernetes Health Check",
          desc: "The monitoring team performed manual pod-by-pod checks to identify cluster issues. This tool runs a complete cluster health check: auto-discovers all namespaces, analyzes each pod in parallel (10 threads), and classifies errors as infrastructure vs business using 15+ detection patterns. Translates technical messages (exit codes, OOM, HikariPool) into understandable operational language. Generates an Excel report with problems grouped by severity.",
          impact: "Full cluster check: from 1-2 hours to 30-90 sec (~98%)",
          tech: [
            "Python",
            "kubectl",
            "Kubernetes",
            "openpyxl",
            "concurrent.futures",
            "regex",
            "Log Analysis",
          ],
        },
        {
          name: "SQL Optimization for Data Purge Analysis",
          desc: "Complex PostgreSQL queries designed to analyze purge viability across critical system tables (Notifications, WorkItems, WorkItemEvents, OrderEvents). Uses CTEs, aggregations, temporal filters, and JSONB handling to process millions of records and generate consolidated reports in ~1 minute. Complemented with an AWK script that processes 200K-550K daily Kubernetes log records with automatic UTC-to-local time conversion.",
          impact: "99.8% accuracy processing millions of records in ~1 minute",
          tech: [
            "PostgreSQL",
            "DBeaver",
            "CTEs",
            "JSONB",
            "AWK",
            "Bash",
            "Kubernetes (kubectl)",
            "Regex",
          ],
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
        "Interested in working together? Send me a message and let's schedule a meeting.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      sent: "Message sent!",
      error: "Error sending.",
    },
    footer: {
      rights: "All rights reserved.",
    },
    viewProject: "View project",
  },
};
