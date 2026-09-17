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
import CommandPalette from "./components/effects/CommandPalette";
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

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const commands = [
    { label: "Go to About", hint: "section", action: () => scrollTo("about") },
    {
      label: "Go to Skills",
      hint: "section",
      action: () => scrollTo("skills"),
    },
    {
      label: "Go to Projects",
      hint: "section",
      action: () => scrollTo("projects"),
    },
    {
      label: "Go to Experience",
      hint: "section",
      action: () => scrollTo("experience"),
    },
    { label: "Take the Quiz", hint: "section", action: () => scrollTo("quiz") },
    {
      label: "Go to Contact",
      hint: "section",
      action: () => scrollTo("contact"),
    },
    {
      label: "Toggle theme",
      hint: isDark ? "light mode" : "dark mode",
      action: () => setIsDark((d) => !d),
    },
    {
      label: "Email me",
      hint: "mailto",
      action: () => (window.location.href = "mailto:aletamackenny@gmail.com"),
    },
    {
      label: "Download resume",
      hint: "pdf",
      action: () => {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Mac Kenny Aleta - Resume.pdf";
        a.click();
      },
    },
    {
      label: "Open GitHub",
      hint: "new tab",
      action: () => window.open("https://github.com/GuetaMac", "_blank"),
    },
    {
      label: "Open LinkedIn",
      hint: "new tab",
      action: () =>
        window.open(
          "https://www.linkedin.com/in/mac-kenny-aleta-6363ba39b/",
          "_blank",
        ),
    },
  ];

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
      <style>{`
        @media (min-width: 641px) {
          .page-content {
            padding-left: 76px;
          }
        }
      `}</style>
      {showIntro && <Intro t={t} onComplete={handleIntroComplete} />}
      <CustomCursor t={t} />
      <ScrollProgress t={t} />
      <Nav
        active={activeSection}
        isDark={isDark}
        onToggle={() => setIsDark(!isDark)}
        t={t}
      />
      <CommandPalette commands={commands} t={t} />
      <div className="page-content">
        <Hero t={t} />
        <Skills t={t} />
        <Projects t={t} />
        <Experience t={t} />
        <Quiz t={t} />
        <Contact t={t} />
      </div>
      <ChatWidget t={t} />
    </div>
  );
}
