import { useState, useEffect, useRef, cloneElement } from "react";
import { createPortal } from "react-dom";
import { translations, hubImages, ppImages, utpImages, ksImages } from "./data.js";
import {
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaDatabase,
  FaTerminal,
  FaFileExcel,
  FaInfinity,
  FaExchangeAlt,
  FaChartBar,
  FaCss3Alt,
  FaVial,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  SiPython,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiGnubash,
  SiGraphql,
  SiSupabase,
  SiNodedotjs,
  SiKubernetes,
  SiDatadog,
  SiGit,
  SiGithubactions,
  SiPostman,
  SiDbeaver,
  SiVite,
  SiGrafana,
  SiJira,
  SiTrello,
  SiMetabase,
  SiHtml5,
  SiTailwindcss,
  SiNextdotjs,
  SiFlask,
  SiPrisma,
  SiAnthropic,
  SiCamunda,
  SiApachekafka,
  SiVitest,
  SiPytest,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscAzureDevops, VscAzure } from "react-icons/vsc";

// ============================================
// CONFIGURACIÓN / CONSTANTES
// ============================================

// ╔════════════════════════════════════════════════════════════════════════╗
// ║                                                                        ║
// ║  FORMSPREE_ENDPOINT: Pega aquí tu URL de Formspree                    ║
// ║  Ejemplo: "https://formspree.io/f/tu-codigo-aqui"                     ║
// ║                                                                        ║
// ║  1. Ve a https://formspree.io/                                        ║
// ║  2. Crea una cuenta o inicia sesión                                   ║
// ║  3. Crea un nuevo formulario                                          ║
// ║  4. Copia el endpoint URL que te proporcionen                         ║
// ║  5. Pégalo entre las comillas abajo                                   ║
// ║                                                                        ║
// ╚════════════════════════════════════════════════════════════════════════╝
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeeplnqp";

const SCROLL_THRESHOLD_PX = 50; // Umbral de scroll para activar navbar sticky
const SCROLL_THROTTLE_MS = 100; // Delay del throttle para el listener de scroll
const FORM_ERROR_TIMEOUT_MS = 3000; // Duración del mensaje de error del formulario
const INTERSECTION_THRESHOLD = 0.1; // Threshold para IntersectionObserver (0-1)

// Mapeo de nombres de imágenes a arrays reales
const imageMap = { hubImages, ppImages, utpImages, ksImages };

function Carousel({ images }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const len = images.length;
  const prev = () => setIdx((i) => (i - 1 + len) % len);
  const next = () => setIdx((i) => (i + 1) % len);

  // Teclado en el lightbox: Esc cierra, flechas navegan
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, len]);

  const arrowStyle = (side) => ({
    position: "absolute",
    [side]: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.6)",
    color: "#00d4aa",
    border: "none",
    borderRadius: "50%",
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: 18,
    zIndex: 1,
  });

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 360,
          marginBottom: 16,
          borderRadius: 6,
          overflow: "hidden",
          background: "#0d0d14",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={images[idx].src}
          alt={images[idx].alt}
          loading="lazy"
          onClick={() => setOpen(true)}
          title="Click para ampliar"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            cursor: "zoom-in",
            display: "block",
          }}
        />
        {len > 1 && (
          <>
            <button aria-label="Anterior" onClick={prev} style={arrowStyle("left")}>
              ‹
            </button>
            <button aria-label="Siguiente" onClick={next} style={arrowStyle("right")}>
              ›
            </button>
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 6,
                zIndex: 1,
              }}
            >
              {images.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    cursor: "pointer",
                    background: i === idx ? "#00d4aa" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(5,5,8,0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            cursor: "zoom-out",
          }}
        >
          <button
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: 40,
              height: 40,
              cursor: "pointer",
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <img
            src={images[idx].src}
            alt={images[idx].alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: 6,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              cursor: "default",
            }}
          />
          {len > 1 && (
            <>
              <button
                aria-label="Anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                style={{ ...arrowStyle("left"), left: 16, width: 44, height: 44, fontSize: 26 }}
              >
                ‹
              </button>
              <button
                aria-label="Siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                style={{ ...arrowStyle("right"), right: 16, width: 44, height: 44, fontSize: 26 }}
              >
                ›
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#c0c0c0",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 13,
                }}
              >
                {idx + 1} / {len}
              </div>
            </>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}

function useInView(th = INTERSECTION_THRESHOLD) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.unobserve(el);
        }
      },
      { threshold: th },
    );
    o.observe(el);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

function Section({ id, children }) {
  const [ref, v] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s, transform 0.7s",
        padding: "80px 0",
      }}
    >
      {children}
    </section>
  );
}

// ============================================
// EDUCATION ICONS
// ============================================
const EDUCATION_ICONS = {
  "Universidad Tecnológica del Perú (UTP)": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {/* Mortero académico */}
      <path d="M16 8L8 11v6c0 3.5 3.5 7 8 7s8-3.5 8-7v-6l-8-3z" fill="#00d4aa" fillOpacity="0.3"/>
      <path d="M16 8L6 12l10 4 10-4L16 8z" fill="#00d4aa"/>
      <circle cx="16" cy="16" r="1.5" fill="#00d4aa"/>
      <path d="M8 11v6c0 3.5 3.5 7 8 7s8-3.5 8-7v-6" stroke="#00d4aa" strokeWidth="1.5" fill="none"/>
      <rect x="4" y="12" width="1.5" height="10" fill="#00d4aa"/>
      <rect x="3" y="21" width="3.5" height="1.5" rx="0.5" fill="#00d4aa"/>
    </svg>
  ),
  "IDAT": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      {/* Computadora/código */}
      <rect x="6" y="8" width="20" height="14" rx="1" stroke="#00d4aa" strokeWidth="1.5" fill="none"/>
      <path d="M10 24h12" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 22v2" stroke="#00d4aa" strokeWidth="1.5"/>
      {/* Símbolos de código */}
      <path d="M12 13l-2 2 2 2M20 13l2 2-2 2" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 12l-2 6" stroke="#00d4aa" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

// ============================================
// SKILL ICONS — react-icons (offline, sin imágenes rotas)
// Marcas en su color real; conceptos genéricos en el teal del sitio.
// ============================================
const TEAL = "#00d4aa";
const ico = (Cmp, color = TEAL) => (
  <Cmp size={16} color={color} style={{ display: "block", flexShrink: 0 }} />
);

const SKILL_ICONS = {
  // Lenguajes
  Python:           ico(SiPython, "#4B8BBE"),
  JavaScript:       ico(SiJavascript, "#F7DF1E"),
  TypeScript:       ico(SiTypescript, "#3178C6"),
  SQL:              ico(FaDatabase),
  Bash:             ico(SiGnubash, "#4EAA25"),
  AWK:              ico(FaTerminal),
  // Frontend
  React:            ico(SiReact, "#61DAFB"),
  "Next.js":        ico(SiNextdotjs, "#FFFFFF"),
  HTML5:            ico(SiHtml5, "#E34F26"),
  CSS3:             ico(FaCss3Alt, "#2E64C9"),
  "Tailwind CSS":   ico(SiTailwindcss, "#06B6D4"),
  Vite:             ico(SiVite, "#646CFF"),
  // Backend, APIs & IA
  Flask:            ico(SiFlask, "#FFFFFF"),
  "Node.js":        ico(SiNodedotjs, "#5FA04E"),
  "REST APIs":      ico(TbApi),
  GraphQL:          ico(SiGraphql, "#E10098"),
  Supabase:         ico(SiSupabase, "#3FCF8E"),
  Prisma:           ico(SiPrisma, "#FFFFFF"),
  "Anthropic (Claude)": ico(SiAnthropic, "#D97757"),
  // Datos & BI
  PostgreSQL:       ico(SiPostgresql, "#4169E1"),
  "SQL Server":     ico(FaDatabase, "#D04A4A"),
  Oracle:           ico(FaDatabase, "#F80000"),
  "Power BI":       ico(FaChartBar, "#F2C811"),
  Metabase:         ico(SiMetabase, "#509EE3"),
  Grafana:          ico(SiGrafana, "#F46800"),
  "Excel Avanzado": ico(FaFileExcel, "#1D9C5A"),
  "Advanced Excel": ico(FaFileExcel, "#1D9C5A"),
  ETL:              ico(FaExchangeAlt),
  // Infraestructura & DevOps
  Kubernetes:       ico(SiKubernetes, "#5C8DEF"),
  Azure:            ico(VscAzure, "#3299E0"),
  "Camunda BPM":    ico(SiCamunda, "#FC5D0D"),
  Kafka:            ico(SiApachekafka, "#FFFFFF"),
  Datadog:          ico(SiDatadog, "#8A5CF6"),
  Git:              ico(SiGit, "#F05032"),
  "GitHub Actions": ico(SiGithubactions, "#2088FF"),
  "CI/CD":          ico(FaInfinity),
  // Testing
  Vitest:           ico(SiVitest, "#8AC93A"),
  Playwright:       ico(FaVial, "#45BA4B"),
  pytest:           ico(SiPytest, "#2C9FD3"),
  // Herramientas
  "Azure DevOps":   ico(VscAzureDevops, "#3299E0"),
  JIRA:             ico(SiJira, "#2684FF"),
  Trello:           ico(SiTrello, "#3B7BE0"),
  Postman:          ico(SiPostman, "#FF6C37"),
  DBeaver:          ico(SiDbeaver, "#73B5A0"),
};

export default function Portfolio() {
  const [lang, setLang] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const c = translations[lang];

  useEffect(() => {
    let timeout = null;
    const fn = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
        timeout = null;
      }, SCROLL_THROTTLE_MS);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      if (timeout) clearTimeout(timeout);
    };
  }, []);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const send = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones básicas
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), FORM_ERROR_TIMEOUT_MS);
      return;
    }
    if (!emailRegex.test(form.email)) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), FORM_ERROR_TIMEOUT_MS);
      return;
    }

    // Verificar que FORMSPREE_ENDPOINT esté configurado
    if (!FORMSPREE_ENDPOINT) {
      alert("Por favor configura FORMSPREE_ENDPOINT en Portfolio.jsx");
      return;
    }

    // Enviar formulario
    setFormState("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setFormState("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), FORM_ERROR_TIMEOUT_MS);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), FORM_ERROR_TIMEOUT_MS);
      }
    } catch (error) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), FORM_ERROR_TIMEOUT_MS);
    }
  };
  const navs = [
    "about",
    "skills",
    "experience",
    "projects",
    "education",
    "contact",
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans',sans-serif",
        color: "#e0e0e0",
        background: "#0a0a0f",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <nav className={`nav ${scrolled ? "nav-s" : ""}`}>
        <div className="ni">
          <div className="nl" onClick={() => go("hero")}>
            AF
          </div>
          <div className="nls">
            {navs.map((id) => (
              <button key={id} className="nk" onClick={() => go(id)}>
                {c.nav[id]}
              </button>
            ))}
            <button
              className="lb"
              onClick={() => setLang((l) => (l === "es" ? "en" : "es"))}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
          <button
            className="hm"
            aria-label="Menú principal"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{ zIndex: 101 }}
          >
            <span
              style={
                menuOpen
                  ? { transform: "rotate(45deg) translate(5px,5px)" }
                  : {}
              }
            />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span
              style={
                menuOpen
                  ? { transform: "rotate(-45deg) translate(5px,-5px)" }
                  : {}
              }
            />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mm">
          {navs.map((id) => (
            <button
              key={id}
              className="nk"
              style={{ fontSize: 18 }}
              onClick={() => go(id)}
            >
              {c.nav[id]}
            </button>
          ))}
          <button
            className="lb"
            onClick={() => {
              setLang((l) => (l === "es" ? "en" : "es"));
              setMenuOpen(false);
            }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      )}

      <div id="hero" className="hero">
        <div
          className="ctn"
          style={{
            position: "relative",
            zIndex: 1,
            animation: "fadeIn 1s ease",
          }}
        >
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hg">{c.hero.greeting}</div>
              <h1 className="hn">{c.hero.name}</h1>
              <p className="hr">{c.hero.role}</p>
              <p className="hp">{c.hero.pitch}</p>
              <div className="hero-badge">{c.hero.availability}</div>
              <p className="hl">{c.hero.location}</p>
              <div className="hb">
                <button className="bp" onClick={() => go("contact")}>
                  {c.hero.cta1}
                </button>
                <a
                  className="bo"
                  href={`/porfolio_AdemirF/cv/CV_Ademir_Fernandez_${lang === "es" ? "ES" : "EN"}.pdf`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.hero.cta2}
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="images/profile.jpg"
                alt="Ademir Fernández"
                className="profile-img"
              />
            </div>
          </div>
        </div>
      </div>

      <Section id="about">
        <div className="ctn">
          <h2 className="st">{c.about.title}</h2>
          <div className="sl" />
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "#a0a0b0",
              maxWidth: 800,
            }}
          >
            {c.about.text}
          </p>
        </div>
      </Section>

      <Section id="skills">
        <div className="ctn">
          <h2 className="st">{c.skills.title}</h2>
          <div className="sl" />
          <div className="sg">
            {c.skills.categories.map((cat, i) => (
              <div key={i} className="sc">
                <div className="sn">{cat.name}</div>
                <div className="ss">
                  {cat.items.map((it, j) => {
                    const icon = SKILL_ICONS[it];
                    return (
                      <span key={j} className="st2" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {icon || (
                          <span style={{ color: "#00d4aa", fontSize: 16, lineHeight: 1 }}>•</span>
                        )}
                        {it}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience">
        <div className="ctn">
          <h2 className="st">{c.experience.title}</h2>
          <div className="sl" />
          <div className="tl">
            {c.experience.jobs.map((j, i) => (
              <div key={i} className="jb">
                <div className="jh">
                  <span className="jt">{j.title}</span>
                  <span className="jd">{j.date}</span>
                </div>
                <div className="jc">{j.company}</div>
                <ul className="jbl">
                  {j.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="projects">
        <div className="ctn">
          <h2 className="st">{c.projects.title}</h2>
          <div className="sl" />
          {/* Featured projects with images */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginBottom: 24,
            }}
          >
            {c.projects.items
              .filter((p) => p.images)
              .map((p, i) => {
                const images = imageMap[p.images];
                return (
                  <div key={i} className="pc">
                    <div
                      className="pw"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr",
                        gap: 24,
                        alignItems: "start",
                      }}
                    >
                      <Carousel images={images} />
                      <div>
                        <div className="pn">{p.name}</div>
                        <div className="pd2">{p.desc}</div>
                        <div className="pi">{p.impact}</div>
                        <div className="pt">
                          {p.tech.map((x, j) => {
                            const ic = SKILL_ICONS[x];
                            return (
                              <span key={j} className="ptt">
                                {ic && cloneElement(ic, { size: 12 })}
                                {x}
                              </span>
                            );
                          })}
                        </div>
                        {(p.link || p.repo) && (
                          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            {p.link && (
                              <a
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="plk"
                              >
                                {c.viewProject} →
                              </a>
                            )}
                            {p.repo && (
                              <a
                                href={p.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="plk"
                              >
                                {c.viewCode} →
                              </a>
                            )}
                          </div>
                        )}
                        {p.note && <div className="pnote">{p.note}</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* Regular projects without images */}
          <div className="pg">
            {c.projects.items
              .filter((p) => !p.images)
              .map((p, i) => (
                <div key={i} className="pc">
                  <div className="pn">{p.name}</div>
                  <div className="pd2">{p.desc}</div>
                  <div className="pi">{p.impact}</div>
                  <div className="pt">
                    {p.tech.map((x, j) => {
                      const ic = SKILL_ICONS[x];
                      return (
                        <span key={j} className="ptt">
                          {ic && cloneElement(ic, { size: 12 })}
                          {x}
                        </span>
                      );
                    })}
                  </div>
                  {(p.link || p.repo) && (
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="plk"
                        >
                          {c.viewProject} →
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="plk"
                        >
                          {c.viewCode} →
                        </a>
                      )}
                    </div>
                  )}
                  {p.note && <div className="pnote">{p.note}</div>}
                </div>
              ))}
          </div>
        </div>
      </Section>

      <Section id="education">
        <div className="ctn">
          <h2 className="st">{c.education.title}</h2>
          <div className="sl" />
          <div className="eg">
            {c.education.items.map((e, i) => {
              const icon = EDUCATION_ICONS[e.school];
              return (
                <div key={i} className="ec" style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  {icon && <div style={{ flexShrink: 0 }}>{icon}</div>}
                  <div style={{ flex: 1 }}>
                    <div className="ed">{e.degree}</div>
                    <div className="es">{e.school}</div>
                  </div>
                  <div className="edt">{e.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section id="contact">
        <div className="ctn">
          <h2 className="st">{c.contact.title}</h2>
          <div className="sl" />
          <p style={{ color: "#8a8a9a", fontSize: 15, marginBottom: 32 }}>
            {c.contact.subtitle}
          </p>
          <div className="cg">
            <div className="ci">
              <div className="cci">
                <div className="cic">
                  <MdEmail size={18} color="#00d4aa" />
                </div>
                <span style={{ wordBreak: "break-all" }}>
                  ademir_fernandez_hernandez03@outlook.com
                </span>
              </div>
              <div className="cci">
                <div className="cic">
                  <FaMapMarkerAlt size={18} color="#00d4aa" />
                </div>
                <span>Lima, Perú</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                <a
                  href="https://www.linkedin.com/in/ademir-fernandez-hernandez-1ab502271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bo"
                >
                  <FaLinkedin size={16} style={{marginRight: 6}} /> in {c.contact.linkedinLabel}
                </a>
                <a
                  href="https://github.com/zZloquilloZz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bo"
                >
                  <FaGithub size={16} style={{marginRight: 6}} /> {c.contact.githubLabel}
                </a>
              </div>
            </div>
            <div className="cf">
              <input
                className="fi"
                placeholder={c.contact.name}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
              <input
                className="fi"
                type="email"
                placeholder={c.contact.email}
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
              <textarea
                className="fi"
                rows={5}
                placeholder={c.contact.message}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
              />
              <button
                className="bp"
                onClick={send}
                disabled={formState === "sending"}
                style={{
                  width: "100%",
                  opacity: formState === "sending" ? 0.6 : 1,
                }}
              >
                {formState === "sending" ? c.contact.sending : c.contact.send}
              </button>
              {formState === "sent" && (
                <div className="fs fss">{c.contact.sent}</div>
              )}
              {formState === "error" && (
                <div className="fs fse">{c.contact.error}</div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <footer className="ft">
        <div className="ctn">
          <div className="fls">
            <a
              href="https://www.linkedin.com/in/ademir-fernandez-hernandez-1ab502271"
              target="_blank"
              rel="noopener noreferrer"
              className="fl"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/zZloquilloZz"
              target="_blank"
              rel="noopener noreferrer"
              className="fl"
            >
              GitHub
            </a>
          </div>
          <p className="ftx">© 2026 Ademir Fernández. {c.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
