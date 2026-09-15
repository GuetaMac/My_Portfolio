import { useState, useEffect } from "react";
import { makeTheme } from "./utils/theme";
import { CustomCursor, ScrollProgress } from "./utils/cursor";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Quiz from "./components/Quiz";
import Contact from "./components/Contact";
import ChatWidget from "./components/ChatWidget";
import { NAV_LINKS } from "./constants";

function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reducedMotion) return false;
  return sessionStorage.getItem("introShown") !== "true";
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [isDark, setIsDark] = useState(true);
  const [showIntro, setShowIntro] = useState(shouldShowIntro);
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
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

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

  const handleIntroComplete = () => {
    sessionStorage.setItem("introShown", "true");
    setShowIntro(false);
  };

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
      {showIntro && <Intro t={t} onComplete={handleIntroComplete} />}
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
      <Quiz t={t} />
      <Contact t={t} />
      <ChatWidget t={t} />
    </div>
  );
}
