import { useState } from "react";
import { motion } from "framer-motion";

const LATTE = {
  brownAccent: "#8C5C3A",
  cream: "#F7F1E3",
};

const P = LATTE;

const SECTIONS = [
  { id: "contributions", label: "My Contributions" },
  { id: "tech", label: "Technology" },
  { id: "lessons", label: "Lessons Learned" },
];

/*───────────────────────────────────────────────────────────
  Latte-Themed Accordion (no Tailwind UI dependency)
───────────────────────────────────────────────────────────*/
interface LatteAccordionProps {
  title: string;
  children: React.ReactNode;
  palette: typeof LATTE;
}
function LatteAccordion({ title, children, palette }: LatteAccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 rounded-xl shadow-md overflow-hidden" style={{ backgroundColor: palette.cream, border: `2px dashed ${palette.brownAccent}66` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 font-semibold text-left cursor-pointer"
        style={{ color: palette.brownAccent }}
      >
        <span>{title}</span>
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
          ☕
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
        className="px-4 pb-4 text-sm text-left"
      >
        {children}
      </motion.div>
    </div>
  );
}

/*───────────────────────────────────────────────────────────
  Sample LatteAccordion Usages Inside Section Render Loop
───────────────────────────────────────────────────────────*/
export default function CaseStudyPage() {
  return (













        <main className="mx-auto w-full flex-1 max-w-7xl px-4 md:px-8">
      {SECTIONS.map(({ id, label }) => (
        <section key={id} id={id} className="py-10">
          <h2 className="text-2xl font-bold mb-4">{label}</h2>
          {id === "contributions" && (
            <LatteAccordion title="Programming Systems" palette={P}>
              <ul className="list-disc pl-5">
                <li>Save/load system using binary data & room-wise delta encoding</li>
                <li>Ghost AI using FSMs and sensory triggers</li>
              </ul>
            </LatteAccordion>
          )}
          {id === "tech" && (
            <LatteAccordion title="Engine and Tools" palette={P}>
              <ul className="list-disc pl-5">
                <li>Unity 2022.3 LTS</li>
                <li>Custom inspector tooling for level prefabs</li>
                <li>Git + UnityYAML merge strategy</li>
              </ul>
            </LatteAccordion>
          )}
          {id === "lessons" && (
            <LatteAccordion title="What I Learned" palette={P}>
              <ul className="list-disc pl-5">
                <li>Scope discipline over feature creep</li>
                <li>Coordinating async pipelines in Unity without coroutines</li>
              </ul>
            </LatteAccordion>
          )}
          <p className="text-sm opacity-60">Coming soon…</p>
        </section>
      ))}
    </main>
  );
}
