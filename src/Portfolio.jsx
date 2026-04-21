import { useState, useEffect, useRef } from "react";
import { translations, camImages, ppImages, utpImages } from "./data.js";

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
const imageMap = { camImages, ppImages, utpImages };

function Carousel({ images }) {
  const [idx, setIdx] = useState(0);
  const len = images.length;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        marginBottom: 16,
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(0,0,0,0.3)",
        aspectRatio: "16/9",
        height: 0,
        paddingBottom: "56.25%",
      }}
    >
      <img
        src={images[idx].src}
        alt={images[idx].alt}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
      {len > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => setIdx((i) => (i - 1 + len) % len)}
            style={{
              position: "absolute",
              left: 8,
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
            }}
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => setIdx((i) => (i + 1) % len)}
            style={{
              position: "absolute",
              right: 8,
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
            }}
          >
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
// SKILL ICONS
// ============================================
const SKILL_ICONS = {
  Python: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7.5 2C5.5 2 5 3 5 4v2h3v.5H4.5C3 6.5 2 7.5 2 9.5s1 3 2.5 3H6v-2c0-1 1-2 2-2h3c1 0 2-1 2-2V4c0-1-.5-2-2.5-2h-3zm-.5 1c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z" fill="#3776AB"/>
      <path d="M8.5 14c2 0 2.5-1 2.5-2v-2h-3v-.5h3.5c1.5 0 2.5-1 2.5-3s-1-3-2.5-3H10v2c0 1-1 2-2 2H5c-1 0-2 1-2 2v3c0 1 .5 2 2.5 2h3zm.5-1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5.5.2.5.5-.2.5-.5.5z" fill="#3776AB"/>
    </svg>
  ),
  SQL: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="4" rx="5" ry="2" fill="#336791"/>
      <path d="M3 4v6c0 1.1 2.2 2 5 2s5-.9 5-2V4" fill="#336791" fillOpacity="0.7"/>
      <ellipse cx="8" cy="10" rx="5" ry="2" fill="#336791"/>
    </svg>
  ),
  JavaScript: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="2" fill="#F7DF1E"/>
      <path d="M9 11.5c0 1-.5 1.5-1.2 1.5-.6 0-1-.3-1.2-.8l-.8.5c.3.7 1 1.2 2 1.2 1.2 0 2-.6 2-1.7V7.5H9v4zm3.5 1.5c-1.2 0-2-.6-2.3-1.4l.8-.5c.2.4.5.7 1 .7.4 0 .7-.2.7-.5 0-.3-.3-.5-.8-.7l-.3-.1c-.9-.4-1.5-.9-1.5-1.9 0-.9.7-1.6 1.8-1.6 1 0 1.7.5 2 1.2l-.8.5c-.2-.4-.5-.6-.9-.6s-.6.2-.6.5c0 .3.2.4.7.6l.3.1c1.1.5 1.7.9 1.7 2 0 1.1-.9 1.7-2.1 1.7z" fill="#000" fillOpacity="0.8"/>
    </svg>
  ),
  React: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="8" rx="6.5" ry="2.5" stroke="#61DAFB" strokeWidth="1" fill="none"/>
      <ellipse cx="8" cy="8" rx="6.5" ry="2.5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 8 8)"/>
      <ellipse cx="8" cy="8" rx="6.5" ry="2.5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(-60 8 8)"/>
      <circle cx="8" cy="8" r="1.2" fill="#61DAFB"/>
    </svg>
  ),
  TypeScript: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="2" fill="#3178C6"/>
      <path d="M8.5 7.5V13h-1V7.5h-2v-.8h5v.8h-2zm3.5 2.3v3.2h-.9v-.7c-.2.3-.6.5-1.1.5-.7 0-1.2-.4-1.2-1.1 0-.7.5-1 1.4-1h.9v-.1c0-.4-.2-.6-.7-.6-.4 0-.7.1-.9.4l-.5-.6c.3-.4.9-.7 1.6-.7 1 0 1.4.5 1.4 1.4zm-.9 1.4v-.8h-.8c-.4 0-.6.2-.6.5 0 .3.2.5.5.5.4 0 .7-.1.9-.2z" fill="#fff"/>
    </svg>
  ),
  Bash: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="2" fill="#4EAA25" fillOpacity="0.2"/>
      <path d="M3 6l2-2 2 2-1 1-1-1-1 1-1-1zm5 4h3v1H8v-1z" fill="#4EAA25"/>
      <path d="M2 3h12v9H2V3z" stroke="#4EAA25" strokeWidth="1" fill="none"/>
    </svg>
  ),
  AWK: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="2" fill="#333"/>
      <text x="8" y="11" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle">awk</text>
    </svg>
  ),
  "REST APIs": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h4m2 0h4M8 5l3 3-3 3" stroke="#6BA539" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  GraphQL: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l5.5 3.5v5L8 14l-5.5-3.5v-5L8 2z" stroke="#E10098" strokeWidth="1.2" fill="none"/>
      <circle cx="8" cy="2" r="1" fill="#E10098"/>
      <circle cx="13.5" cy="5.5" r="1" fill="#E10098"/>
      <circle cx="13.5" cy="10.5" r="1" fill="#E10098"/>
      <circle cx="8" cy="14" r="1" fill="#E10098"/>
      <circle cx="2.5" cy="10.5" r="1" fill="#E10098"/>
      <circle cx="2.5" cy="5.5" r="1" fill="#E10098"/>
    </svg>
  ),
  Supabase: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9 2H7v5.5L5.5 9 4 10.5V14h2v-2.5l1.5-1.5L9 8.5V2z" fill="#3ECF8E"/>
      <path d="M10 6v6l1.5 1.5L13 14h-2v-2.5L9.5 10 8 8.5V14h2l2-2V6h-2z" fill="#3ECF8E"/>
    </svg>
  ),
  "Node.js": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l6 3.5v5L8 14l-6-3.5v-5L8 2z" fill="#339933"/>
      <path d="M8 3.5l4.5 2.6v4.3L8 13l-4.5-2.6V6.1L8 3.5z" fill="#0a0a0f"/>
    </svg>
  ),
  "Power BI": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="8" width="2.5" height="6" rx="0.5" fill="#F2C811"/>
      <rect x="6.5" y="5" width="2.5" height="9" rx="0.5" fill="#F2C811" fillOpacity="0.8"/>
      <rect x="10" y="2" width="2.5" height="12" rx="0.5" fill="#F2C811" fillOpacity="0.6"/>
    </svg>
  ),
  PostgreSQL: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 3c-1 0-1.5.5-1.5 1.5v5c0 .5.2 1 .5 1.3v2.7l1-1 1 1v-2.7c.3-.3.5-.8.5-1.3v-5C7.5 3.5 7 3 6 3z" fill="#336791"/>
      <path d="M10 3c-1 0-1.5.5-1.5 1.5v6c0 .5.2 1 .5 1.3v1.7l1-1 1 1v-1.7c.3-.3.5-.8.5-1.3v-6C11.5 3.5 11 3 10 3z" fill="#336791"/>
      <ellipse cx="6" cy="3.5" rx="1" ry="0.5" fill="#336791"/>
      <ellipse cx="10" cy="3.5" rx="1" ry="0.5" fill="#336791"/>
    </svg>
  ),
  Kubernetes: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L3 5v6l5 3 5-3V5l-5-3z" fill="#326CE5" fillOpacity="0.2"/>
      <circle cx="8" cy="8" r="2.5" fill="#326CE5"/>
      <path d="M8 2v3M8 11v3M3 5l2.5 1.5M10.5 9.5L13 11M3 11l2.5-1.5M10.5 6.5L13 5" stroke="#326CE5" strokeWidth="1.2"/>
    </svg>
  ),
  Git: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="4" cy="8" r="1.5" fill="#F05032"/>
      <circle cx="12" cy="8" r="1.5" fill="#F05032"/>
      <circle cx="8" cy="4" r="1.5" fill="#F05032"/>
      <path d="M5.3 7.5L7 5m1 0l1.7 2.5M5.5 8.5h5" stroke="#F05032" strokeWidth="1.2"/>
    </svg>
  ),
  "GitHub Actions": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1 4h4l-3 3 1 4-3-2-3 2 1-4-3-3h4l1-4z" fill="#2088FF" stroke="#2088FF" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  ),
  Docker: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="6" y="6" width="1.5" height="1.5" fill="#2496ED"/>
      <rect x="8" y="6" width="1.5" height="1.5" fill="#2496ED"/>
      <rect x="10" y="6" width="1.5" height="1.5" fill="#2496ED"/>
      <rect x="6" y="8" width="1.5" height="1.5" fill="#2496ED"/>
      <rect x="8" y="8" width="1.5" height="1.5" fill="#2496ED"/>
      <rect x="4" y="8" width="1.5" height="1.5" fill="#2496ED"/>
      <path d="M2 9.5c0 1 1 2 3 2h6c2 0 3-1 3-2" stroke="#2496ED" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  Datadog: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect width="16" height="16" rx="2" fill="#632CA6"/>
      <path d="M5 10V5h2v5H5zm3 1V4h2v7H8zm3-2V7h2v2h-2z" fill="#fff"/>
    </svg>
  ),
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
                src="/images/profile.jpg"
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
                          {p.tech.map((x, j) => (
                            <span key={j} className="ptt">
                              {x}
                            </span>
                          ))}
                        </div>
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
                    {p.tech.map((x, j) => (
                      <span key={j} className="ptt">
                        {x}
                      </span>
                    ))}
                  </div>
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
                  <span aria-hidden="true">✉</span>
                </div>
                <span style={{ wordBreak: "break-all" }}>
                  ademir_fernandez_hernandez03@outlook.com
                </span>
              </div>
              <div className="cci">
                <div className="cic">
                  <span aria-hidden="true">📍</span>
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
                  in {c.contact.linkedinLabel}
                </a>
                <a
                  href="https://github.com/zZloquilloZz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bo"
                >
                  &lt; / &gt; {c.contact.githubLabel}
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
