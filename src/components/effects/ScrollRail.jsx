import { useEffect, useState } from "react";

// Mount ONCE in App.jsx. Pass the same section ids used in your Nav's
// NAV_LINKS / scrollTo() calls (e.g. ["about","skills","projects","experience","quiz"]).
const LABELS = {
  about: "About",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  quiz: "Quiz",
};

export default function ScrollRail({ sections, t }) {
  const [active, setActive] = useState(sections[0]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the top that's currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="scroll-rail"
      style={{
        position: "fixed",
        right: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "18px",
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .scroll-rail { display: none; }
        }
      `}</style>
      {sections.map((id) => {
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <button
            key={id}
            data-magnetic
            onClick={() => goTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Go to ${LABELS[id] || id}`}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              padding: "6px",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "block",
                width: isActive ? "8px" : "6px",
                height: isActive ? "8px" : "6px",
                borderRadius: "50%",
                background: isActive ? t.accentText : t.cardBorder,
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: `translateY(-50%) translateX(${
                  isHovered ? "0" : "6px"
                })`,
                opacity: isHovered ? 1 : 0,
                pointerEvents: "none",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: t.accentText,
                background: t.bg,
                border: "1px solid " + t.cardBorder,
                padding: "4px 10px",
                borderRadius: "3px",
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {LABELS[id] || id}
            </span>
          </button>
        );
      })}
    </div>
  );
}
