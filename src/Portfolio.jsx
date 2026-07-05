import { useState, useEffect } from "react";
import { makeTheme } from "./utils/theme";
import { CustomCursor, ScrollProgress } from "./utils/cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { NAV_LINKS } from "./constants";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [isDark, setIsDark] = useState(true);
  const t = makeTheme(isDark);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    const observers = NAV_LINKS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div
      style={{
        background: t.bg,
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        transition: "background 0.4s",
        cursor: "none",
      }}
    >
      <CustomCursor t={t} />
      <ScrollProgress t={t} />
      <Nav
        active={activeSection}
        isDark={isDark}
        onToggle={() => setIsDark(!isDark)}
        t={t}
      />
      <Hero t={t} />
      <Skills t={t} />
      <Projects t={t} />
      <Experience t={t} />
      <Contact t={t} />
    </div>
  );
}
