import { useState } from "react";
import { SKILLS } from "../constants";
import { FadeIn } from "../utils/hooks";
import ScrambleText from "./effects/ScrambleText"; // NEW
import GithubStats from "./effects/GithubStats";

function SectionLabel({ children, t }) {
  return (
    <p
      style={{
        color: t.accentText,
        fontFamily: "monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.22em",
        marginBottom: "40px",
        transition: "color 0.4s",
      }}
    >
      {children}
    </p>
  );
}

// Category card that gently tilts toward the cursor — a subtle 3D
// wink instead of a plain static box.
function SkillCard({ category, items, t, delay }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -7, ry: px * 7 });
  };
  const handleLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <FadeIn delay={delay}>
      <div
        className="skills-card"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          background: t.bg,
          transition:
            "background 0.4s, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <p
          style={{
            color: t.accentText,
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.16em",
            marginBottom: "18px",
            transition: "color 0.4s",
          }}
        >
          {category.toUpperCase()}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {items.map((skill) => (
            <span
              key={skill}
              data-magnetic
              style={{
                padding: "5px 12px",
                border: "1px solid " + t.tagBorder,
                color: t.tagText,
                fontFamily: "monospace",
                fontSize: "0.68rem",
                cursor: "none",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.accentText;
                e.currentTarget.style.color = t.accentText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.tagBorder;
                e.currentTarget.style.color = t.tagText;
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export default function Skills({ t }) {
  return (
    <section
      id="skills"
      className="skills-section"
      style={{
        background: t.bgAlt,
        transition: "background 0.4s",
      }}
    >
      <style>{`
        .skills-section {
          padding: 120px 48px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1px;
        }
        .skills-card {
          padding: 32px;
        }

        @media (max-width: 640px) {
          .skills-section {
            padding: 72px 20px;
          }
          .skills-grid {
            grid-template-columns: 1fr;
          }
          .skills-card {
            padding: 24px 20px;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel t={t}>02 — SKILLS</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: t.heading,
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "56px",
              transition: "color 0.4s",
            }}
          >
            <ScrambleText text="Technical Toolkit" />
          </h2>
        </FadeIn>
        <div
          className="skills-grid"
          style={{
            border: "1px solid " + t.cardBorder,
            transition: "border-color 0.4s",
          }}
        >
          {Object.entries(SKILLS).map(([category, items], i) => (
            <SkillCard
              key={category}
              category={category}
              items={items}
              t={t}
              delay={0.08 * i}
            />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <GithubStats t={t} />
        </FadeIn>
      </div>
    </section>
  );
}
