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
      }}
    >
      <img
        src={images[idx].src}
        alt={images[idx].alt}
        style={{ width: "100%", display: "block", borderRadius: 4 }}
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

const globalStyles = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap');*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:#0a0a0f}::selection{background:#00d4aa;color:#0a0a0f}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#1a3a5c;border-radius:3px}.ctn{max-width:1100px;margin:0 auto;padding:0 24px}.nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:all .3s}.nav-s{background:rgba(10,10,15,.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(0,212,170,.1)}.ni{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1100px;margin:0 auto}.nl{font-family:'Space Mono',monospace;font-size:18px;font-weight:700;color:#00d4aa;cursor:pointer}.nls{display:flex;gap:28px;align-items:center}.nk{color:#8a8a9a;font-size:13px;cursor:pointer;transition:color .3s;text-transform:uppercase;letter-spacing:1.5px;font-weight:500;background:none;border:none;font-family:inherit}.nk:hover{color:#00d4aa}.lb{background:rgba(0,212,170,.1);border:1px solid rgba(0,212,170,.3);color:#00d4aa;padding:5px 12px;border-radius:4px;font-size:12px;cursor:pointer;font-family:'Space Mono',monospace;font-weight:700}.hm{display:none;background:none;border:none;cursor:pointer}.hm span{display:block;width:22px;height:2px;background:#00d4aa;margin:5px 0;transition:all .3s}.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden}.hero::before{content:'';position:absolute;top:-50%;right:-30%;width:800px;height:800px;background:radial-gradient(circle,rgba(0,212,170,.06) 0%,transparent 70%);pointer-events:none}.hg{font-size:16px;color:#00d4aa;font-family:'Space Mono',monospace;margin-bottom:12px;letter-spacing:2px}.hn{font-size:clamp(40px,7vw,72px);font-weight:700;color:#fff;line-height:1.1;margin-bottom:16px;letter-spacing:-2px}.hr{font-size:clamp(14px,2vw,18px);color:#6a6a7a;margin-bottom:8px;font-weight:300}.hl{font-size:13px;color:#4a4a5a;margin-bottom:32px;font-family:'Space Mono',monospace}.hb{display:flex;gap:16px;flex-wrap:wrap}.bp{padding:14px 32px;background:#00d4aa;color:#0a0a0f;border:none;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .3s;border-radius:2px}.bp:hover{background:#00eabb;transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,212,170,.3)}.bo{padding:14px 32px;background:transparent;color:#00d4aa;border:1px solid rgba(0,212,170,.4);font-size:14px;cursor:pointer;font-family:inherit;transition:all .3s;border-radius:2px;text-decoration:none;display:inline-flex;align-items:center}.bo:hover{border-color:#00d4aa;background:rgba(0,212,170,.05)}.st{font-size:32px;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:-1px}.sl{width:50px;height:3px;background:#00d4aa;margin-bottom:40px}.sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}.sc{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);padding:28px;border-radius:4px;transition:all .3s}.sc:hover{border-color:rgba(0,212,170,.3);transform:translateY(-3px)}.sn{font-family:'Space Mono',monospace;font-size:12px;color:#00d4aa;margin-bottom:16px;letter-spacing:2px;text-transform:uppercase}.ss{display:flex;flex-wrap:wrap;gap:8px}.st2{padding:6px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);font-size:13px;color:#c0c0c0;border-radius:2px}.tl{position:relative;padding-left:28px}.tl::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(0,212,170,.3),transparent)}.jb{position:relative;margin-bottom:40px}.jb::before{content:'';position:absolute;left:-32px;top:6px;width:9px;height:9px;background:#0a0a0f;border:2px solid #00d4aa;border-radius:50%}.jh{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:4px}.jt{font-size:16px;font-weight:700;color:#fff}.jd{font-family:'Space Mono',monospace;font-size:12px;color:#00d4aa;white-space:nowrap}.jc{font-size:13px;color:#6a6a7a;font-style:italic;margin-bottom:12px}.jbl{list-style:none}.jbl li{position:relative;padding-left:16px;font-size:14px;color:#a0a0b0;line-height:1.7;margin-bottom:6px}.jbl li::before{content:'›';position:absolute;left:0;color:#00d4aa;font-weight:700}.pg{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}.pc{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);padding:24px;border-radius:4px;transition:all .4s;position:relative;overflow:hidden}.pc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00d4aa,transparent);opacity:0;transition:opacity .4s}.pc:hover{border-color:rgba(0,212,170,.3);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.3)}.pc:hover::before{opacity:1}.pn{font-size:16px;font-weight:700;color:#fff;margin-bottom:10px}.pd2{font-size:13px;color:#8a8a9a;line-height:1.6;margin-bottom:12px}.pi{font-family:'Space Mono',monospace;font-size:12px;color:#00d4aa;margin-bottom:16px;padding:8px 12px;background:rgba(0,212,170,.06);border-left:2px solid #00d4aa}.pt{display:flex;flex-wrap:wrap;gap:6px}.ptt{font-size:11px;padding:3px 10px;background:rgba(255,255,255,.04);color:#7a7a8a;border-radius:2px}.plk{display:inline-block;margin-top:12px;color:#00d4aa;font-size:13px;text-decoration:none}.eg{display:grid;gap:20px}.ec{display:flex;justify-content:space-between;align-items:flex-start;padding:24px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:4px;flex-wrap:wrap;gap:8px}.ed{font-size:16px;font-weight:700;color:#fff;margin-bottom:4px}.es{font-size:13px;color:#6a6a7a}.edt{font-family:'Space Mono',monospace;font-size:12px;color:#00d4aa}.cg{display:grid;grid-template-columns:1fr 1fr;gap:48px}.ci{display:flex;flex-direction:column;gap:20px}.cci{display:flex;align-items:center;gap:12px;color:#a0a0b0;font-size:14px}.cic{width:40px;height:40px;background:rgba(0,212,170,.08);border:1px solid rgba(0,212,170,.2);display:flex;align-items:center;justify-content:center;border-radius:4px;color:#00d4aa;font-size:16px;flex-shrink:0}.cf{display:flex;flex-direction:column;gap:16px}.fi{padding:14px 16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#e0e0e0;font-size:14px;font-family:inherit;border-radius:2px;outline:none;resize:vertical}.fi:focus{border-color:rgba(0,212,170,.5)}.fi::placeholder{color:#4a4a5a}.fs{padding:12px;text-align:center;font-size:13px;border-radius:2px}.fss{background:rgba(0,212,170,.1);color:#00d4aa}.fse{background:rgba(255,80,80,.1);color:#ff5050}.ft{border-top:1px solid rgba(255,255,255,.05);padding:32px 0;text-align:center}.ftx{font-size:13px;color:#4a4a5a}.fls{display:flex;justify-content:center;gap:24px;margin-bottom:16px}.fl{color:#6a6a7a;font-size:13px;text-decoration:none;transition:color .3s}.fl:hover{color:#00d4aa}.mm{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,10,15,.98);z-index:99;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px}@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media(max-width:768px){.nls{display:none}.hm{display:block}.cg{grid-template-columns:1fr}.hn{letter-spacing:-1px}.hb{flex-direction:column}.bp,.bo{text-align:center;justify-content:center}.jh{flex-direction:column}.pg{grid-template-columns:1fr}.ec{flex-direction:column}.pw{grid-template-columns:1fr!important}}`;

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
      <style>{globalStyles}</style>

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
          <div className="hg">{c.hero.greeting}</div>
          <h1 className="hn">{c.hero.name}</h1>
          <p className="hr">{c.hero.role}</p>
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
                  {cat.items.map((it, j) => (
                    <span key={j} className="st2">
                      {it}
                    </span>
                  ))}
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
            {c.education.items.map((e, i) => (
              <div key={i} className="ec">
                <div>
                  <div className="ed">{e.degree}</div>
                  <div className="es">{e.school}</div>
                </div>
                <div className="edt">{e.date}</div>
              </div>
            ))}
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
                  <span aria-hidden="true">📱</span>
                </div>
                <span>+51 900 569 010</span>
              </div>
              <div className="cci">
                <div className="cic">
                  <span aria-hidden="true">📍</span>
                </div>
                <span>Lima, Perú</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <a
                  href="https://www.linkedin.com/in/ademir-fernandez-hernandez-1ab502271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fl"
                  style={{ color: "#00d4aa" }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/zZloquilloZz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fl"
                  style={{ color: "#00d4aa" }}
                >
                  GitHub
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
