import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import LatteButton from "components/Button";
import LatteAccordion from "components/LatteAccordion";
import { Download, ExternalLink, Sun, Moon } from "lucide-react";
import "./CaseStudyPage.scss";

/*───────────────────────────────────────────────────────────
  Brand palettes – latte & espresso
───────────────────────────────────────────────────────────*/
const LATTE = {
  cream: "#F7F1E3",
  brownDark: "#3E2C1A",
  brownAccent: "#8C5C3A",
  brownLight: "#D7C7B4",
};
const ESPRESSO = {
  cream: "#F7F1E3",
  brownDark: "#F7F1E3",
  brownAccent: "#C27C48",
  brownLight: "#473627",
  bg: "#22160F",
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "contributions", label: "Contributions" },
  { id: "tech", label: "Tech" },
  { id: "timeline", label: "Timeline" },
  { id: "lessons", label: "Lessons" },
] as const;

/*───────────────────────────────────────────────────────────*/
export default function CaseStudyPage() {
  const [dark, setDark] = useState(false);
  const P = dark ? ESPRESSO : LATTE;
  const bgColor = dark ? ESPRESSO.bg : LATTE.cream;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled =
        (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === sequence[idx]) {
        idx += 1;
        if (idx === sequence.length) {
          launchBeans();
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  }, []);

  return (
    <div className="case-study-root" style={{ backgroundColor: bgColor, color: P.brownDark }}>
      <div className="texture-overlay" style={{ opacity: dark ? 0.2 : 0.12 }} />

      <button onClick={() => setDark((d) => !d)} className="dark-toggle" style={{ backgroundColor: P.brownAccent, color: P.cream }}>
        {dark ? <Sun /> : <Moon />}
      </button>

      <div className="cup-progress" style={{ borderColor: P.brownAccent }}>
        <div style={{ backgroundColor: P.brownAccent, height: `${progress}%` }} />
      </div>

      <section id="hero" className="hero-section">
        <video src="/media/haunted-hotel-loop.mp4" autoPlay muted loop playsInline className="hero-video" />
        <div className="hero-overlay" style={{ backgroundColor: `${bgColor}CC` }}>
          <Steam color={P.brownAccent} />
          <h1 className="hero-title" style={{ color: P.brownDark }}>Haunted Hotel Management</h1>
          <div className="badge-list">
            {["2025", "Unity", "C#", "Project Owner", "Solo Programmer", "Game Designer"].map((b) => (
              <span key={b} className="badge" style={{ backgroundColor: P.brownAccent, color: P.cream }}>{b}</span>
            ))}
          </div>
          <p className="hero-description">Sim‑style management game where you juggle guest happiness and ghostly chaos — scoped, built, and shipped in a 10‑week sprint by a five‑dev team.</p>
          <div className="hero-buttons">
            <LatteButton>Play WebGL Demo</LatteButton>
            <LatteButton>Source&nbsp;Code <ExternalLink /></LatteButton>
          </div>
        </div>
      </section>

      <nav className="section-nav" style={{ backgroundColor: `${P.brownLight}E6` }}>
        <ul className="section-nav-list">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => handleNavClick(e, id)} onMouseEnter={(ev) => (ev.currentTarget.style.color = P.brownAccent)} onMouseLeave={(ev) => (ev.currentTarget.style.color = "")}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="section-content">
        <Section id="overview" title="Project Overview" palette={P}><p> placeholder</p></Section>
        <Section id="contributions" title="My Contributions" palette={P}><p> placeholder</p></Section>
        <Section id="tech" title="Tech Highlights" palette={P}><p> placeholder</p></Section>
        <Section id="timeline" title="Timeline & Milestones" palette={P}><p> placeholder</p></Section>
        <Section id="lessons" title="Lessons & Next Steps" palette={P}><p> placeholder</p></Section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Alexander — All rights reserved.</footer>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  palette: typeof LATTE;
  children: React.ReactNode;
}
function Section({ id, title, palette, children }: SectionProps) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="section-wrapper">
      <span className="coffee-ring" style={{ borderColor: `${palette.brownAccent}40` }} />
      <h2 className="section-title" style={{ color: palette.brownAccent }}>{title}</h2>
      {children}
    </motion.section>
  );
}

function Steam({ color }: { color: string }) {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({ y: -120, opacity: 0, transition: { duration: 4, repeat: Infinity, repeatDelay: 1 } });
  }, [controls]);
  return (
    <>
      {[0, 1].map((i) => (
        <motion.div key={i} initial={{ y: 0, opacity: 0.35 }} animate={controls} style={{ width: 60, height: 120, position: "absolute", top: "50%", left: `calc(50% + ${i * 40 - 20}px)`, borderRadius: "50% 50% 0 0", background: `radial-gradient(circle at 30% 30%, ${color}20 0%, transparent 70%)` }} />
      ))}
    </>
  );
}

function launchBeans() {
  const beans = Array.from({ length: 40 });
  beans.forEach((_, i) => {
    const span = document.createElement("span");
    span.textContent = "☕";
    span.style.position = "fixed";
    span.style.left = Math.random() * 100 + "%";
    span.style.top = "-50px";
    span.style.fontSize = Math.random() * 24 + 24 + "px";
    span.style.pointerEvents = "none";
    span.style.transform = `rotate(${Math.random() * 360}deg)`;
    span.style.zIndex = "9999";
    document.body.appendChild(span);
    span.animate([{ transform: span.style.transform, top: "-50px", opacity: 1 }, { transform: `rotate(${Math.random() * 360}deg)`, top: "110%", opacity: 0.8 }], { duration: 3000 + Math.random() * 2000, easing: "linear", fill: "forwards" });
    setTimeout(() => span.remove(), 5500);
  });
}
