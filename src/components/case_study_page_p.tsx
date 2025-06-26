import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Download, ExternalLink, Sun, Moon } from "lucide-react";

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
  /* Theming */
  const [dark, setDark] = useState(false);
  const P = dark ? ESPRESSO : LATTE;
  const bgColor = dark ? ESPRESSO.bg : LATTE.cream;

  /* Cup‑fill scrollbar progress */
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

  /* Konami bean‑rain easter egg */
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

  /* Smooth scroll helper */
  const handleNavClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col font-sans"
      style={{
        backgroundColor: bgColor,
        color: P.brownDark,
        backgroundImage: "url(/textures/paper-noise.png)",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* Latte‑texture overlay stronger in dark mode */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/textures/paper-noise.png)",
          opacity: dark ? 0.2 : 0.12,
          mixBlendMode: "multiply",
        }}
      />

      {/* Dark‑mode toggle */}
      <button
        onClick={() => setDark((d) => !d)}
        className="fixed right-4 top-4 z-30 rounded-full p-2 shadow-md transition-colors"
        style={{ backgroundColor: P.brownAccent, color: P.cream }}
      >
        {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {/* Cup progress bar */}
      <div
        className="fixed bottom-4 right-4 z-20 flex h-20 w-10 flex-col items-center justify-end rounded-lg border-2"
        style={{ borderColor: P.brownAccent }}
      >
        <div
          style={{
            backgroundColor: P.brownAccent,
            width: "100%",
            height: `${progress}%`,
            transition: "height 0.2s",
          }}
        />
      </div>

      {/* ── Hero */}
      <section
        id="hero"
        className="relative h-[60vh] w-full overflow-hidden cursor-[url('/icons/spoon.cur'),auto]"
      >
        <video
          src="/media/haunted-hotel-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          className="relative z-10 flex h-full flex-col items-center justify-center gap-6 p-4 backdrop-blur-sm"
          style={{ backgroundColor: `${bgColor}CC` }}
        >
          {/* Steam waves */}
          <Steam color={P.brownAccent} />
          <h1
            className="font-serif text-4xl font-extrabold drop-shadow-sm md:text-6xl"
            style={{ color: P.brownDark }}
          >
            Haunted Hotel Management
          </h1>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 text-sm">
            {[
              "2025",
              "Unity",
              "C#",
              "Project Owner",
              "Solo Programmer",
              "Game Designer",
            ].map((b) => (
              <span
                key={b}
                className="rounded-2xl px-3 py-1 shadow-md whitespace-nowrap"
                style={{ backgroundColor: P.brownAccent, color: P.cream }}
              >
                {b}
              </span>
            ))}
          </div>
          <p className="max-w-xl text-center text-base font-light md:text-lg">
            Sim‑style management game where you juggle guest happiness and
            ghostly chaos — scoped, built, and shipped in a 10‑week sprint by a
            five‑dev team.
          </p>
          <div className="flex gap-4">
            <LatteButton palette={P}>Play WebGL Demo</LatteButton>
            <LatteButton palette={P} outline>
              Source&nbsp;Code <ExternalLink className="ml-1 h-4 w-4" />
            </LatteButton>
          </div>
        </div>
      </section>

      {/* ── Sticky nav */}
      <nav
        className="sticky top-0 z-20 backdrop-blur-md shadow-md"
        style={{ backgroundColor: `${P.brownLight}E6` }}
      >
        <ul className="flex gap-6 overflow-x-auto px-6 py-3 text-sm font-medium md:text-base">
          {SECTIONS.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className="cursor-pointer transition-colors"
                style={{}}
                onMouseEnter={(ev) =>
                  (ev.currentTarget.style.color = P.brownAccent)
                }
                onMouseLeave={(ev) => (ev.currentTarget.style.color = "")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Content */}
      <main className="mx-auto w-full flex-1 max-w-7xl px-4 md:px-8 cursor-auto">
        <Section id="overview" title="Project Overview" palette={P}>
          <p>placeholder</p>
        </Section>
        <Section id="contributions" title="My Contributions" palette={P}>
          <p>placeholder</p>
        </Section>
        <Section id="tech" title="Tech Highlights" palette={P}>
          <p>placeholder</p>
        </Section>
        <Section id="timeline" title="Timeline & Milestones" palette={P}>
          <p>placeholder</p>
        </Section>
        <Section id="lessons" title="Lessons & Next Steps" palette={P}>
          <p>placeholder</p>
        </Section>
      </main>

      <footer
        className="py-6 text-center text-sm"
        style={{ color: P.brownDark }}
      >
        © {new Date().getFullYear()} Alexander — All rights reserved.
      </footer>
    </div>
  );
}

/*───────────────────────────────────────────────────────────
  Components
───────────────────────────────────────────────────────────*/
interface LatteButtonProps {
  children: React.ReactNode;
  palette: typeof LATTE;
  outline?: boolean;
}
function LatteButton({ children, palette, outline }: LatteButtonProps) {
  return (
    <Button
      size="lg"
      className="relative rounded-2xl border-none shadow-md overflow-hidden group"
      style={
        outline
          ? {
              background: "transparent",
              color: palette.brownAccent,
              border: `2px solid ${palette.brownAccent}`,
            }
          : { backgroundColor: palette.brownAccent, color: palette.cream }
      }
    >
      {/* splash */}
      <span
        className="pointer-events-none absolute inset-0 scale-0 rounded-full opacity-20 transition-transform duration-300 group-hover:scale-125"
        style={{ backgroundColor: palette.brownAccent }}
      />
      <span className="relative z-10 flex items-center gap-1">{children}</span>
    </Button>
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
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="relative py-14 md:py-20"
    >
      {/* coffee ring divider */}
      <span
        className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 rotate-[15deg]"
        style={{
          border: `4px solid ${palette.brownAccent}40`,
          borderRadius: "50%",
          width: 120,
          height: 120,
        }}
      />
      <h2
        className="font-serif text-3xl font-bold md:text-4xl mb-6"
        style={{ color: palette.brownAccent }}
      >
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

/* Steam component */
function Steam({ color }: { color: string }) {
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({
      y: -120,
      opacity: 0,
      transition: { duration: 4, repeat: Infinity, repeatDelay: 1 },
    });
  }, [controls]);
  return (
    <>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0.35 }}
          animate={controls}
          style={{
            width: 60,
            height: 120,
            position: "absolute",
            top: "50%",
            left: `calc(50% + ${i * 40 - 20}px)`,
            borderRadius: "50% 50% 0 0",
            background: `radial-gradient(circle at 30% 30%, ${color}20 0%, transparent 70%)`,
          }}
        />
      ))}
    </>
  );
}

/* Bean rain */
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
    span.animate(
      [
        { transform: span.style.transform, top: "-50px", opacity: 1 },
        {
          transform: `rotate(${Math.random() * 360}deg)`,
          top: "110%",
          opacity: 0.8,
        },
      ],
      {
        duration: 3000 + Math.random() * 2000,
        easing: "linear",
        fill: "forwards",
      }
    );
    setTimeout(() => span.remove(), 5500);
  });
}
