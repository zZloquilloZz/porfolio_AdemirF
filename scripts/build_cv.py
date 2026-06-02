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
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, black
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

ACCENT = HexColor("#0E7C66")   # teal oscuro, legible impreso
MUTED = HexColor("#444444")
HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.normpath(os.path.join(HERE, "..", "public", "cv"))

# Fuente embebida (TrueType) -> genera ToUnicode -> los ATS extraen acentos correctos.
# Arial es la fuente más estándar para ATS; si no está, cae a Helvetica (sin ToUnicode).
FONT, FONT_B, FONT_I = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"
_win = os.path.join(os.environ.get("WINDIR", r"C:\\Windows"), "Fonts")
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
def styles():
    name = ParagraphStyle("name", fontName=FONT_B, fontSize=16.5,
                          leading=19, textColor=black, spaceAfter=1)
    role = ParagraphStyle("role", fontName=FONT, fontSize=10,
                          leading=12.5, textColor=ACCENT, spaceAfter=3)
    contact = ParagraphStyle("contact", fontName=FONT, fontSize=8.3,
                             leading=11, textColor=MUTED, spaceAfter=1)
    h2 = ParagraphStyle("h2", fontName=FONT_B, fontSize=9.8,
                        leading=11.5, textColor=ACCENT, spaceBefore=6, spaceAfter=2)
    body = ParagraphStyle("body", fontName=FONT, fontSize=8.5,
                          leading=10.9, textColor=black, alignment=TA_JUSTIFY)
    jobtitle = ParagraphStyle("jobtitle", fontName=FONT_B, fontSize=9.3,
                              leading=11, textColor=black)
    meta = ParagraphStyle("meta", fontName=FONT_I, fontSize=8.2,
                          leading=10, textColor=MUTED, spaceAfter=1)
    bullet = ParagraphStyle("bullet", fontName=FONT, fontSize=8.5,
                            leading=10.8, textColor=black, alignment=TA_JUSTIFY)
    skill = ParagraphStyle("skill", fontName=FONT, fontSize=8.6,
                           leading=11.7, textColor=black, spaceAfter=1)
    company = ParagraphStyle("company", fontName=FONT_I, fontSize=8.6,
                             leading=10.5, textColor=MUTED, spaceBefore=0, spaceAfter=2)
    dateR = ParagraphStyle("dateR", fontName=FONT, fontSize=8.4,
                           leading=10.5, textColor=ACCENT, alignment=TA_RIGHT)
    skillLabel = ParagraphStyle("skillLabel", fontName=FONT_B, fontSize=8.6,
                                leading=11.7, textColor=black)
    return dict(name=name, role=role, contact=contact, h2=h2, body=body,
                jobtitle=jobtitle, meta=meta, bullet=bullet, skill=skill,
                company=company, dateR=dateR, skillLabel=skillLabel)


def header_row(left_para, right_text, S, lw=128 * mm, rw=52 * mm):
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
                      spaceBefore=1, spaceAfter=4)


def section(title, S):
    return [Paragraph(title.upper(), S["h2"]), rule()]


def bullets(items, S):
    return ListFlowable(
        [ListItem(Paragraph(t, S["bullet"]), leftIndent=10, value="•",
                  spaceBefore=1) for t in items],
        bulletType="bullet", start="•", leftIndent=12, bulletFontName=FONT,
        bulletFontSize=8.5, spaceBefore=1, spaceAfter=1,
    )


def job(j, S, out):
    out.append(header_row(Paragraph(j["title"], S["jobtitle"]), j["date"], S))
    out.append(Paragraph(j["company"], S["company"]))
    out.append(bullets(j["bullets"], S))
    out.append(Spacer(1, 6))


def project(p, S, out):
    line = f'<b>{p["name"]}</b> — {p["desc"]}'
    if p.get("link"):
        line += f' <a href="{p["link"]}"><font color="#0E7C66">{p["link"]}</font></a>'
    out.append(Paragraph(line, S["body"]))
    out.append(Paragraph(f'<font color="#444444">{p["tech"]}</font>', S["meta"]))
    out.append(Spacer(1, 3))


# ---------------------------------------------------------------- contenido
PORTFOLIO = "zzloquillozz.github.io/porfolio_AdemirF"
LINKEDIN = "linkedin.com/in/ademir-fernandez-hernandez-1ab502271"
GITHUB = "github.com/zZloquilloZz"
EMAIL = "ademir_fernandez_hernandez03@outlook.com"
PHONE = "900 569 010"

DATA = {
    "es": {
        "name": "Ademir Alfredo Fernández Hernández",
        "role": "Data Analyst · Backend Developer · Automation Engineer",
        "loc": "Lima, Perú",
        "sec": dict(profile="Perfil profesional", skills="Habilidades técnicas",
                    exp="Experiencia laboral", proj="Proyectos destacados",
                    edu="Educación"),
        "profile": (
            "Data Analyst y Automation Engineer con 3+ años en el sector Telecom (BSS/OSS). "
            "Diseño y construyo herramientas en Python que llegan a producción y eliminan trabajo "
            "manual crítico: mi proyecto principal es un hub operativo (TUI + web) que unificó ~12 "
            "herramientas, recortó el análisis de incidencias de 1-2 h a ~20 min y elevó ~50% la "
            "producción del equipo. Experiencia full-stack (React, Next.js, Node, Supabase) e "
            "integración de IA (Anthropic/Claude). Dominio de SQL avanzado, Power BI y análisis de "
            "infraestructura distribuida (Kubernetes, Azure, APIs REST/GraphQL). Orientado a impacto medible."
        ),
        "skills": [
            ("Lenguajes", "Python, JavaScript, TypeScript, SQL, Bash, AWK"),
            ("Frontend", "React, Next.js, HTML5, CSS3, Tailwind CSS, Vite"),
            ("Backend, APIs e IA", "Flask, Node.js, REST APIs, GraphQL, Supabase, Prisma, Anthropic (Claude)"),
            ("Datos y BI", "PostgreSQL, SQL Server, Oracle, Power BI, Metabase, Grafana, Excel avanzado, ETL"),
            ("Infraestructura y DevOps", "Kubernetes, Azure, Camunda BPM, Kafka, Datadog, Git, GitHub Actions, CI/CD"),
            ("Testing", "Vitest, Playwright, pytest"),
            ("Herramientas", "Azure DevOps, JIRA, Trello, Postman, DBeaver"),
        ],
        "exp": [
            {
                "title": "Data Analyst / Analista de Automatización & Soporte N1",
                "company": "Indra Minsait — Proyecto Pangea / NTTData",
                "date": "Dic 2025 – Actualidad",
                "bullets": [
                    "Diseñé y construí el Hub Operativo N1 (TUI + web con Flask/HTMX/SSE) que unificó las ~12 herramientas que el equipo ejecutaba una por una vía SSH, con ejecución en vivo por streaming y flujo seguro dry-run -> confirmar para operaciones destructivas. Recortó el análisis de incidencias de ~1-2 h a ~20 min y los trabajos operativos (liberaciones/sanity) de 30+ min a 2-3 min, elevando ~50% la producción del equipo (4 analistas) y eliminando la dependencia de licencias de OpenLens.",
                    "Integré el stack BSS/OSS bajo un contrato declarativo único: Camunda BPM (análisis de árboles de procesos y detección de causa raíz), GraphQL/Apollo y APIs TM Forum, Kafka/Strimzi (reinicio guiado de consumers caídos), Kubernetes/Azure (AKS) y bases multi-motor (PostgreSQL/MySQL/SQL Server).",
                    "Implementé consultas SQL avanzadas con CTEs y JSONB en PostgreSQL para analizar millones de registros (Notifications, WorkItems, OrderEvents), identificando registros obsoletos con 99.8% de precisión para sustentar el purgado en producción.",
                    "Desarrollé módulos de diagnóstico que traducen errores técnicos (exit codes, OOM, HikariPool, variables TMF622) a lenguaje operativo, con exportación a Excel/HTML; sostuve la calidad con ~527 pruebas automatizadas (pytest).",
                    "Diseñé y mantuve dashboards en Power BI y Grafana y análisis de logs en Datadog para KPIs y observabilidad, con detección proactiva de incidencias por severidad y frecuencia.",
                ],
            },
            {
                "title": "Analista de Soporte Técnico BO — Claro Empresas",
                "company": "Indra Minsait",
                "date": "Oct 2024 – Dic 2025",
                "bullets": [
                    "Analicé datos de monitoreo de redes FTTH y HFC en Grafana, identificando patrones de degradación en tiempo real que permitieron alertas tempranas y redujeron los tiempos de caída de servicio en 20%.",
                    "Integré Grafana con fuentes de datos personalizadas (bases internas, APIs de monitoreo), mejorando la detección de anomalías en 30% y centralizando la visibilidad operativa del equipo.",
                    "Extraje y consolidé datos de incidencias IPTV/OTT desde múltiples fuentes, generando reportes unificados en Excel para optimizar la asignación de recursos y priorizar casos críticos.",
                ],
            },
            {
                "title": "Supervisor de Soporte Técnico — Entel Empresas",
                "company": "Servicios de Call Center (SCC)",
                "date": "Ago 2022 – Oct 2024",
                "bullets": [
                    "Elaboré informes gerenciales procesando 15,000+ tickets mensuales con Excel avanzado (tablas dinámicas, macros VBA, fórmulas anidadas), dando a la gerencia visibilidad completa del rendimiento operativo.",
                    "Implementé un sistema de seguimiento de KPIs en Excel con actualización semi-automática que redujo en 60% el tiempo de generación de reportes semanales.",
                    "Desarrollé una herramienta en Excel que automatizó búsquedas y cálculos frecuentes, reduciendo en 20% el tiempo promedio de atención (TMA).",
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
        "role": "Data Analyst · Backend Developer · Automation Engineer",
        "loc": "Lima, Peru",
        "sec": dict(profile="Professional summary", skills="Technical skills",
                    exp="Work experience", proj="Featured projects",
                    edu="Education"),
        "profile": (
            "Data Analyst and Automation Engineer with 3+ years in Telecom (BSS/OSS). I design and "
            "build Python tools that ship to production and remove critical manual work: my flagship "
            "project is an operations hub (TUI + web) that unified ~12 tools, cut incident analysis "
            "from 1-2 h to ~20 min, and raised team output by ~50%. Full-stack experience (React, "
            "Next.js, Node, Supabase) and AI integration (Anthropic/Claude). Strong in advanced SQL, "
            "Power BI, and distributed-infrastructure analysis (Kubernetes, Azure, REST/GraphQL APIs). "
            "Focused on measurable impact."
        ),
        "skills": [
            ("Languages", "Python, JavaScript, TypeScript, SQL, Bash, AWK"),
            ("Frontend", "React, Next.js, HTML5, CSS3, Tailwind CSS, Vite"),
            ("Backend, APIs & AI", "Flask, Node.js, REST APIs, GraphQL, Supabase, Prisma, Anthropic (Claude)"),
            ("Data & BI", "PostgreSQL, SQL Server, Oracle, Power BI, Metabase, Grafana, Advanced Excel, ETL"),
            ("Infrastructure & DevOps", "Kubernetes, Azure, Camunda BPM, Kafka, Datadog, Git, GitHub Actions, CI/CD"),
            ("Testing", "Vitest, Playwright, pytest"),
            ("Tools", "Azure DevOps, JIRA, Trello, Postman, DBeaver"),
        ],
        "exp": [
            {
                "title": "Data Analyst / Automation & L1 Support Analyst",
                "company": "Indra Minsait — Pangea Project / NTTData",
                "date": "Dec 2025 – Present",
                "bullets": [
                    "Designed and built the N1 Operations Hub (TUI + web with Flask/HTMX/SSE) that unified the ~12 tools the team used to run one by one over SSH, with live streaming execution and a safe dry-run -> confirm flow for destructive operations. It cut incident analysis from ~1-2 h to ~20 min and operational tasks (releases/sanity checks) from 30+ min to 2-3 min, raised team output ~50% (4 analysts), and removed the OpenLens license dependency.",
                    "Integrated the BSS/OSS stack under a single declarative contract: Camunda BPM (process-tree analysis and root-cause detection), GraphQL/Apollo and TM Forum APIs, Kafka/Strimzi (guided restart of dead consumers), Kubernetes/Azure (AKS), and multi-engine databases (PostgreSQL/MySQL/SQL Server).",
                    "Built advanced SQL queries with CTEs and JSONB in PostgreSQL to analyze millions of records (Notifications, WorkItems, OrderEvents), identifying obsolete records with 99.8% accuracy to support data-purge decisions in production.",
                    "Developed diagnostic modules that translate technical errors (exit codes, OOM, HikariPool, TMF622 variables) into operational language, with Excel/HTML export; kept quality up with ~527 automated tests (pytest).",
                    "Designed and maintained Power BI and Grafana dashboards and Datadog log analysis for operational KPIs and observability, with proactive incident detection by severity and frequency.",
                ],
            },
            {
                "title": "Back Office Technical Support Analyst — Claro Enterprise",
                "company": "Indra Minsait",
                "date": "Oct 2024 – Dec 2025",
                "bullets": [
                    "Analyzed FTTH and HFC network monitoring data in Grafana, identifying real-time degradation patterns that enabled early alerts and reduced service downtime by 20%.",
                    "Integrated Grafana with custom data sources (internal databases, monitoring APIs), improving anomaly detection by 30% and centralizing the team's operational visibility.",
                    "Extracted and consolidated IPTV/OTT incident data from multiple sources into unified Excel reports to optimize resource allocation and prioritize critical cases.",
                ],
            },
            {
                "title": "Technical Support Supervisor — Entel Enterprise",
                "company": "Servicios de Call Center (SCC)",
                "date": "Aug 2022 – Oct 2024",
                "bullets": [
                    "Produced executive reports processing 15,000+ monthly tickets with advanced Excel (pivot tables, VBA macros, nested formulas), giving management full operational visibility.",
                    "Implemented a semi-automated KPI tracking system in Excel that cut weekly report generation time by 60%.",
                    "Built an Excel tool that automated frequent lookups and calculations, reducing average handling time (AHT) by 20%.",
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
        leftMargin=15 * mm, rightMargin=15 * mm,
        topMargin=10 * mm, bottomMargin=10 * mm,
        title=f"CV — {d['name']}", author=d["name"],
    )
    el = []
    # Encabezado: nombre, rol, contacto (en el cuerpo, parseable por ATS)
    el.append(Paragraph(d["name"], S["name"]))
    el.append(Paragraph(d["role"], S["role"]))
    contact_line = f'{d["loc"]} &nbsp;·&nbsp; {PHONE} &nbsp;·&nbsp; {EMAIL}'
    links_line = (
        f'Portfolio: <a href="https://{PORTFOLIO}"><font color="#0E7C66">{PORTFOLIO}</font></a> '
        f'&nbsp;·&nbsp; LinkedIn: <a href="https://{LINKEDIN}"><font color="#0E7C66">{LINKEDIN}</font></a> '
        f'&nbsp;·&nbsp; GitHub: <a href="https://{GITHUB}"><font color="#0E7C66">{GITHUB}</font></a>'
    )
    el.append(Paragraph(contact_line, S["contact"]))
    el.append(Paragraph(links_line, S["contact"]))

    el += section(d["sec"]["profile"], S)
    el.append(Paragraph(d["profile"], S["body"]))

    el += section(d["sec"]["skills"], S)
    for cat, items in d["skills"]:
        el.append(Paragraph(f'<b>{cat}:</b> {items}', S["skill"]))

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
