# -*- coding: utf-8 -*-
"""
Generador de CV ATS-friendly (ES + EN) para Ademir Fernández.

Diseño pensado para que los ATS (Applicant Tracking Systems) lo parseen bien:
- Texto seleccionable real (no imagen), una sola columna, sin tablas ni cajas.
- Encabezados de sección estándar, fuente estándar (Helvetica), orden cronológico inverso.
- Contacto en el cuerpo (no en header/footer), con URL del portfolio.
- Keywords técnicas en texto plano.

Uso:  python scripts/build_cv.py
Salida: public/cv/CV_Ademir_Fernandez_ES.pdf  y  _EN.pdf
Requiere: pip install reportlab
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, inch
from reportlab.lib.colors import black
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem,
    Table, TableStyle,
)
from reportlab.lib.enums import TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Formato Harvard OCS: sin color, todo negro sobre blanco (ver guía oficial de careerservices.fas.harvard.edu)
ACCENT = black
MUTED = black
HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.normpath(os.path.join(HERE, "..", "public", "cv"))

# Fuente embebida (TrueType) -> genera ToUnicode -> los ATS extraen acentos correctos.
# Arial es la fuente más estándar para ATS; si no está, cae a Helvetica (sin ToUnicode).
FONT, FONT_B, FONT_I = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"
_win = os.path.join(os.environ.get("WINDIR", r"C:\\Windows"), "Fonts")
# WSL: las fuentes de Windows viven en /mnt/c/Windows/Fonts -> embeber Arial (ToUnicode) para ATS
if not os.path.isdir(_win) and os.path.isdir("/mnt/c/Windows/Fonts"):
    _win = "/mnt/c/Windows/Fonts"
_cands = [
    ("CVSans", "arial.ttf", "arialbd.ttf", "ariali.ttf"),
    ("CVSans", "calibri.ttf", "calibrib.ttf", "calibrii.ttf"),
]
for fam, reg, bold, ital in _cands:
    try:
        pr, pb, pi = (os.path.join(_win, f) for f in (reg, bold, ital))
        if all(os.path.exists(p) for p in (pr, pb, pi)):
            pdfmetrics.registerFont(TTFont(fam, pr))
            pdfmetrics.registerFont(TTFont(fam + "-Bold", pb))
            pdfmetrics.registerFont(TTFont(fam + "-Italic", pi))
            registerFontFamily(fam, normal=fam, bold=fam + "-Bold",
                               italic=fam + "-Italic", boldItalic=fam + "-Bold")
            FONT, FONT_B, FONT_I = fam, fam + "-Bold", fam + "-Italic"
            break
    except Exception:
        pass

# ---------------------------------------------------------------- estilos
# Tamaños dentro del rango 10-12pt que exige la guía Harvard OCS para el cuerpo del CV.
def styles():
    name = ParagraphStyle("name", fontName=FONT_B, fontSize=17,
                          leading=20, textColor=black, spaceAfter=2)
    role = ParagraphStyle("role", fontName=FONT, fontSize=11,
                          leading=14, textColor=black, spaceAfter=4)
    contact = ParagraphStyle("contact", fontName=FONT, fontSize=10,
                             leading=13, textColor=black, spaceAfter=1)
    h2 = ParagraphStyle("h2", fontName=FONT_B, fontSize=11.5,
                        leading=14, textColor=black, spaceBefore=9, spaceAfter=3)
    body = ParagraphStyle("body", fontName=FONT, fontSize=10.3,
                          leading=13.5, textColor=black)
    jobtitle = ParagraphStyle("jobtitle", fontName=FONT_B, fontSize=10.5,
                              leading=13, textColor=black)
    meta = ParagraphStyle("meta", fontName=FONT_I, fontSize=10,
                          leading=12.5, textColor=black, spaceAfter=1)
    bullet = ParagraphStyle("bullet", fontName=FONT, fontSize=10.3,
                            leading=13.5, textColor=black)
    skill = ParagraphStyle("skill", fontName=FONT, fontSize=10.3,
                           leading=13.5, textColor=black)
    company = ParagraphStyle("company", fontName=FONT_I, fontSize=10,
                             leading=12.5, textColor=black, spaceBefore=0, spaceAfter=2)
    dateR = ParagraphStyle("dateR", fontName=FONT, fontSize=10,
                           leading=12.5, textColor=black, alignment=TA_RIGHT)
    skillLabel = ParagraphStyle("skillLabel", fontName=FONT_B, fontSize=10.3,
                                leading=14.5, textColor=black)
    return dict(name=name, role=role, contact=contact, h2=h2, body=body,
                jobtitle=jobtitle, meta=meta, bullet=bullet, skill=skill,
                company=company, dateR=dateR, skillLabel=skillLabel)


def skill_row(label, items, S):
    """Etiqueta en columna fija + valores -> alineación tipo grid, ordenada."""
    t = Table([[Paragraph(label, S["skillLabel"]), Paragraph(items, S["skill"])]],
              colWidths=[38 * mm, 121 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return t


def header_row(left_para, right_text, S, lw=114 * mm, rw=45 * mm):
    """Fila cargo/fecha: izquierda libre, fecha a la derecha. Sin bordes (ATS la lee)."""
    t = Table([[left_para, Paragraph(right_text, S["dateR"])]], colWidths=[lw, rw])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def rule():
    return HRFlowable(width="100%", thickness=0.6, color=ACCENT,
                      spaceBefore=1, spaceAfter=3)


def section(title, S):
    return [Paragraph(title.upper(), S["h2"]), rule()]


def bullets(items, S):
    return ListFlowable(
        [ListItem(Paragraph(t, S["bullet"]), leftIndent=14, value="•",
                  spaceBefore=2) for t in items],
        bulletType="bullet", start="•", leftIndent=14, bulletFontName=FONT,
        bulletFontSize=8.5, spaceBefore=1, spaceAfter=1,
    )


def job(j, S, out):
    out.append(header_row(Paragraph(j["title"], S["jobtitle"]), j["date"], S))
    out.append(Paragraph(j["company"], S["company"]))
    out.append(bullets(j["bullets"], S))
    out.append(Spacer(1, 4))


def project(p, S, out):
    line = f'<b>{p["name"]}</b> — {p["desc"]}'
    if p.get("link"):
        line += f' <a href="{p["link"]}"><u>{p["link"]}</u></a>'
    out.append(Paragraph(line, S["body"]))
    out.append(Paragraph(p["tech"], S["meta"]))
    out.append(Spacer(1, 2))


# ---------------------------------------------------------------- contenido
PORTFOLIO = "zzloquillozz.github.io/porfolio_AdemirF"
LINKEDIN = "linkedin.com/in/ademir-alfredo-fernandez-hernandez-1ab502271"
GITHUB = "github.com/zZloquilloZz"
EMAIL = "ademir_fernandez_hernandez03@outlook.com"
PHONE = "900 569 010"

DATA = {
    "es": {
        "name": "Ademir Alfredo Fernández Hernández",
        "role": "Backend Developer · Automation Engineer · Data Analyst",
        "loc": "Lima, Perú",
        "sec": dict(profile="Perfil profesional", skills="Habilidades técnicas",
                    exp="Experiencia laboral", proj="Proyectos destacados",
                    edu="Educación"),
        "profile": (
            "Backend Developer y Automation Engineer con 3+ años en el sector Telecom (BSS/OSS). "
            "Diseño y construyo servicios y herramientas en Python que llegan a producción y eliminan "
            "trabajo manual crítico: mi proyecto principal es un hub operativo (TUI + web con Flask/HTMX/SSE) "
            "que unificó ~12 herramientas, recortó el análisis de incidencias de 1-2 h a ~20 min y elevó "
            "~50% la producción del equipo, sostenido con ~527 pruebas automatizadas (pytest). Sólido en "
            "diseño de APIs (REST/GraphQL), integración de sistemas distribuidos (Kubernetes, Azure/AKS, "
            "Kafka, Camunda BPM), SQL avanzado y CI/CD. Experiencia full-stack (React, Next.js, Node, "
            "Supabase) e integración de IA (Anthropic/Claude). Orientado a impacto medible."
        ),
        "skills": [
            ("Lenguajes", "Python, JavaScript, TypeScript, SQL, Bash, AWK"),
            ("Backend, APIs e IA", "Flask, Node.js, REST APIs, GraphQL, Supabase, Prisma, Anthropic (Claude)"),
            ("Infraestructura y DevOps", "Kubernetes, Azure (AKS), Camunda BPM, Kafka, Datadog, Git, GitHub Actions, CI/CD"),
            ("Datos y BI", "PostgreSQL, SQL Server, Oracle, Power BI, Metabase, Grafana, Excel avanzado, ETL"),
            ("Frontend", "React, Next.js, HTML5, CSS3, Tailwind CSS, Vite"),
            ("Testing", "pytest, Vitest, Playwright"),
            ("Herramientas", "Azure DevOps, JIRA, Trello, Postman, DBeaver"),
        ],
        "exp": [
            {
                "title": "Data Analyst / Analista de Automatización & Soporte N1",
                "company": "Indra Minsait — Proyecto Pangea / NTTData",
                "date": "Dic 2025 – Jun 2026",
                "bullets": [
                    "Arquitecté y desarrollé el backend del Hub Operativo N1 en Python (Flask + HTMX + SSE): orquesta ~12 herramientas que el equipo ejecutaba una por una vía SSH, con ejecución en streaming en vivo y un flujo seguro dry-run -> confirmar para operaciones destructivas. Recortó el análisis de incidencias de ~1-2 h a ~20 min y los trabajos operativos (liberaciones/sanity) de 30+ min a 2-3 min, elevando ~50% la producción del equipo (4 analistas) y eliminando la dependencia de licencias de OpenLens.",
                    "Integré el stack BSS/OSS bajo un contrato declarativo único: consumo de APIs GraphQL/Apollo y TM Forum, Camunda BPM (análisis de árboles de procesos y causa raíz), Kafka/Strimzi (reinicio guiado de consumers caídos) y Kubernetes/Azure (AKS), sobre bases multi-motor (PostgreSQL/MySQL/SQL Server).",
                    "Diseñé consultas SQL avanzadas con CTEs y JSONB en PostgreSQL para procesar millones de registros (Notifications, WorkItems, OrderEvents), identificando datos obsoletos con 99.8% de precisión para sustentar purgados en producción.",
                    "Aseguré la fiabilidad con ~527 pruebas automatizadas (pytest) y módulos de diagnóstico que traducen errores técnicos (exit codes, OOM, HikariPool, variables TMF622) a lenguaje operativo, con exportación a Excel/HTML.",
                    "Instrumenté la observabilidad con dashboards en Power BI y Grafana y análisis de logs en Datadog, con detección proactiva de incidencias por severidad y frecuencia.",
                ],
            },
            {
                "title": "Analista de Soporte Técnico BO — Claro Empresas",
                "company": "Indra Minsait",
                "date": "Nov 2024 – Dic 2025",
                "bullets": [
                    "Integré Grafana con fuentes de datos personalizadas (bases internas y APIs de monitoreo), mejorando la detección de anomalías en 30% y centralizando la visibilidad operativa del equipo.",
                    "Construí pipelines de extracción y consolidación de incidencias IPTV/OTT desde múltiples fuentes, generando reportes unificados para priorizar casos críticos y optimizar la asignación de recursos.",
                    "Analicé datos de monitoreo FTTH y HFC en tiempo real, identificando patrones de degradación que habilitaron alertas tempranas y redujeron los tiempos de caída de servicio en 20%.",
                ],
            },
            {
                "title": "Supervisor de Soporte Técnico — Entel Empresas",
                "company": "Servicios de Call Center (SCC)",
                "date": "Nov 2022 – Nov 2024",
                "bullets": [
                    "Automaticé la generación de reportes gerenciales con macros VBA y Excel avanzado (tablas dinámicas, fórmulas anidadas) procesando 15,000+ tickets mensuales, reduciendo en 60% el tiempo de los reportes semanales.",
                    "Desarrollé herramientas internas que automatizaron búsquedas y cálculos frecuentes del equipo, reduciendo en 20% el tiempo promedio de atención (TMA) y dando a la gerencia visibilidad completa del rendimiento operativo.",
                ],
            },
        ],
        "proj": [
            {"name": "Hub Operativo N1 (Telecom — PangeaCO)",
             "desc": "Hub central (TUI + web) que unifica ~12 herramientas con ejecución en vivo (SSE) y flujo seguro dry-run -> confirmar; integra Camunda BPM, GraphQL, Kafka y Kubernetes/Azure.",
             "tech": "Python · Flask · HTMX · SSE · Camunda BPM · GraphQL · Kafka · Kubernetes · Azure · pytest", "link": ""},
            {"name": "KidSpark",
             "desc": "Plataforma EdTech con IA: el padre sube fotos del cuaderno y Claude (visión) genera ejercicios adaptativos (SM-2), con control de costos de IA y seguridad de producción.",
             "tech": "Next.js 16 · TypeScript · Prisma · PostgreSQL · Anthropic (Claude) · NextAuth · Vitest", "link": "https://kidspark-steel.vercel.app"},
            {"name": "GradeFlow",
             "desc": "Seguimiento académico con parser de PDF propio, promedios ponderados y cálculo de nota mínima para aprobar; datos privados por usuario (RLS).",
             "tech": "React · TypeScript · Supabase · PostgreSQL · Google OAuth · Vitest", "link": "https://seguimiento-notas.vercel.app"},
            {"name": "Presupuesto Personal",
             "desc": "Finanzas personales (Perú): estado optimista con reconciliación/rollback, neto de boleta (AFP/horas extra) y ciclo de tarjeta con cuotas.",
             "tech": "React · Supabase · PostgreSQL · Auth PKCE · RLS · GitHub Actions", "link": "https://zzloquillozz.github.io/presupuesto-personal/"},
        ],
        "edu": [
            ("Ingeniería de Sistemas", "Universidad Tecnológica del Perú (UTP)", "En curso — egreso 2027"),
            ("Desarrollador de Sistemas de Información", "IDAT", "2022 – 2024"),
        ],
    },
    "en": {
        "name": "Ademir Alfredo Fernández Hernández",
        "role": "Backend Developer · Automation Engineer · Data Analyst",
        "loc": "Lima, Peru",
        "sec": dict(profile="Professional summary", skills="Technical skills",
                    exp="Work experience", proj="Featured projects",
                    edu="Education"),
        "profile": (
            "Backend Developer and Automation Engineer with 3+ years in Telecom (BSS/OSS). I design and "
            "build Python services and tools that ship to production and remove critical manual work: my "
            "flagship project is an operations hub (TUI + web with Flask/HTMX/SSE) that unified ~12 tools, "
            "cut incident analysis from 1-2 h to ~20 min, and raised team output by ~50%, backed by ~527 "
            "automated tests (pytest). Strong in API design (REST/GraphQL), distributed-systems integration "
            "(Kubernetes, Azure/AKS, Kafka, Camunda BPM), advanced SQL, and CI/CD. Full-stack experience "
            "(React, Next.js, Node, Supabase) and AI integration (Anthropic/Claude). Focused on measurable impact."
        ),
        "skills": [
            ("Languages", "Python, JavaScript, TypeScript, SQL, Bash, AWK"),
            ("Backend, APIs & AI", "Flask, Node.js, REST APIs, GraphQL, Supabase, Prisma, Anthropic (Claude)"),
            ("Infrastructure & DevOps", "Kubernetes, Azure (AKS), Camunda BPM, Kafka, Datadog, Git, GitHub Actions, CI/CD"),
            ("Data & BI", "PostgreSQL, SQL Server, Oracle, Power BI, Metabase, Grafana, Advanced Excel, ETL"),
            ("Frontend", "React, Next.js, HTML5, CSS3, Tailwind CSS, Vite"),
            ("Testing", "pytest, Vitest, Playwright"),
            ("Tools", "Azure DevOps, JIRA, Trello, Postman, DBeaver"),
        ],
        "exp": [
            {
                "title": "Data Analyst / Automation & L1 Support Analyst",
                "company": "Indra Minsait — Pangea Project / NTTData",
                "date": "Dec 2025 – Jun 2026",
                "bullets": [
                    "Architected and built the N1 Operations Hub backend in Python (Flask + HTMX + SSE): orchestrates ~12 tools the team used to run one by one over SSH, with live streaming execution and a safe dry-run -> confirm flow for destructive operations. It cut incident analysis from ~1-2 h to ~20 min and operational tasks (releases/sanity checks) from 30+ min to 2-3 min, raised team output ~50% (4 analysts), and removed the OpenLens license dependency.",
                    "Integrated the BSS/OSS stack under a single declarative contract: GraphQL/Apollo and TM Forum API consumption, Camunda BPM (process-tree and root-cause analysis), Kafka/Strimzi (guided restart of dead consumers), and Kubernetes/Azure (AKS), over multi-engine databases (PostgreSQL/MySQL/SQL Server).",
                    "Designed advanced SQL queries with CTEs and JSONB in PostgreSQL to process millions of records (Notifications, WorkItems, OrderEvents), identifying obsolete data with 99.8% accuracy to support production data-purge decisions.",
                    "Ensured reliability with ~527 automated tests (pytest) and diagnostic modules that translate technical errors (exit codes, OOM, HikariPool, TMF622 variables) into operational language, with Excel/HTML export.",
                    "Instrumented observability with Power BI and Grafana dashboards and Datadog log analysis, with proactive incident detection by severity and frequency.",
                ],
            },
            {
                "title": "Back Office Technical Support Analyst — Claro Enterprise",
                "company": "Indra Minsait",
                "date": "Nov 2024 – Dec 2025",
                "bullets": [
                    "Integrated Grafana with custom data sources (internal databases and monitoring APIs), improving anomaly detection by 30% and centralizing the team's operational visibility.",
                    "Built extraction and consolidation pipelines for IPTV/OTT incident data from multiple sources, producing unified reports to prioritize critical cases and optimize resource allocation.",
                    "Analyzed FTTH and HFC monitoring data in real time, identifying degradation patterns that enabled early alerts and reduced service downtime by 20%.",
                ],
            },
            {
                "title": "Technical Support Supervisor — Entel Enterprise",
                "company": "Servicios de Call Center (SCC)",
                "date": "Nov 2022 – Nov 2024",
                "bullets": [
                    "Automated executive reporting with VBA macros and advanced Excel (pivot tables, nested formulas) processing 15,000+ monthly tickets, cutting weekly report generation time by 60%.",
                    "Built internal tools that automated the team's frequent lookups and calculations, reducing average handling time (AHT) by 20% and giving management full operational visibility.",
                ],
            },
        ],
        "proj": [
            {"name": "N1 Operations Hub (Telecom — PangeaCO)",
             "desc": "Central hub (TUI + web) unifying ~12 operational tools with live execution (SSE) and a safe dry-run -> confirm flow; integrates Camunda BPM, GraphQL, Kafka, and Kubernetes/Azure.",
             "tech": "Python · Flask · HTMX · SSE · Camunda BPM · GraphQL · Kafka · Kubernetes · Azure · pytest", "link": ""},
            {"name": "KidSpark",
             "desc": "AI-powered EdTech platform: parents upload notebook photos and Claude (vision) generates adaptive exercises (SM-2), with AI cost control and production-grade security.",
             "tech": "Next.js 16 · TypeScript · Prisma · PostgreSQL · Anthropic (Claude) · NextAuth · Vitest", "link": "https://kidspark-steel.vercel.app"},
            {"name": "GradeFlow",
             "desc": "Academic-tracking app with a custom PDF parser, weighted GPAs, and a 'minimum grade to pass' calculator; per-user private data (RLS).",
             "tech": "React · TypeScript · Supabase · PostgreSQL · Google OAuth · Vitest", "link": "https://seguimiento-notas.vercel.app"},
            {"name": "Personal Budget App",
             "desc": "Personal finance (Peru): optimistic state with reconciliation/rollback, payslip net pay (pension/overtime), and credit-card billing cycle with installments.",
             "tech": "React · Supabase · PostgreSQL · PKCE Auth · RLS · GitHub Actions", "link": "https://zzloquillozz.github.io/presupuesto-personal/"},
        ],
        "edu": [
            ("Systems Engineering", "Universidad Tecnológica del Perú (UTP)", "In progress — expected 2027"),
            ("Information Systems Developer", "IDAT", "2022 – 2024"),
        ],
    },
}


def build(lang):
    d = DATA[lang]
    S = styles()
    path = os.path.join(OUT_DIR, f"CV_Ademir_Fernandez_{lang.upper()}.pdf")
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=1 * inch, rightMargin=1 * inch,
        topMargin=1 * inch, bottomMargin=1 * inch,
        title=f"CV — {d['name']}", author=d["name"],
    )
    el = []
    # Encabezado: nombre, rol, contacto (en el cuerpo, parseable por ATS)
    el.append(Paragraph(d["name"], S["name"]))
    el.append(Paragraph(d["role"], S["role"]))
    contact_line = f'{d["loc"]} &nbsp;·&nbsp; {PHONE} &nbsp;·&nbsp; {EMAIL}'
    links_line = (
        f'Portfolio: <a href="https://{PORTFOLIO}"><u>{PORTFOLIO}</u></a> '
        f'&nbsp;·&nbsp; LinkedIn: <a href="https://{LINKEDIN}"><u>{LINKEDIN}</u></a> '
        f'&nbsp;·&nbsp; GitHub: <a href="https://{GITHUB}"><u>{GITHUB}</u></a>'
    )
    el.append(Paragraph(contact_line, S["contact"]))
    el.append(Paragraph(links_line, S["contact"]))

    el += section(d["sec"]["profile"], S)
    el.append(Paragraph(d["profile"], S["body"]))

    el += section(d["sec"]["skills"], S)
    for cat, items in d["skills"]:
        el.append(skill_row(cat, items, S))

    el += section(d["sec"]["exp"], S)
    for j in d["exp"]:
        job(j, S, el)

    el += section(d["sec"]["proj"], S)
    for p in d["proj"]:
        project(p, S, el)

    el += section(d["sec"]["edu"], S)
    for deg, school, date in d["edu"]:
        el.append(header_row(Paragraph(f'<b>{deg}</b> — {school}', S["skill"]), date, S))
        el.append(Spacer(1, 2))

    doc.build(el)
    print("OK:", path)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    build("es")
    build("en")
