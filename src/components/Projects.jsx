import { useRef, useState } from "react";
import { PROJECTS } from "../constants";
import { FadeIn } from "../utils/hooks";
import { motion } from "framer-motion";
import ScrambleText from "./effects/ScrambleText"; // NEW

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

function ProjectCard({ project, index, t }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [hovered, setHovered] = useState(false);

  // NEW: swipe support for the image frame (mobile-friendly)
  const touchStartX = useRef(null);
  const SWIPE_THRESHOLD = 40; // px

  const goTo = (i) => {
    setImgIndex(i);
  };

  const next = () =>
    goTo(imgIndex === project.images.length - 1 ? 0 : imgIndex + 1);
  const prev = () =>
    goTo(imgIndex === 0 ? project.images.length - 1 : imgIndex - 1);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <FadeIn delay={0.1 * index}>
      <div
        data-hover
        className="project-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border:
            "1px solid " +
            (hovered && !project.placeholder
              ? t.cardBorderHover
              : t.cardBorder),
          background:
            hovered && !project.placeholder ? t.cardBgHover : "transparent",
          opacity: project.placeholder ? 0.3 : 1,
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          cursor: "default",
          transform:
            hovered && !project.placeholder
              ? "translateY(-3px)"
              : "translateY(0)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
            <span
              style={{
                color: t.accentText,
                fontFamily: "monospace",
                fontSize: "0.65rem",
                transition: "color 0.4s",
              }}
            >
              {project.id}
            </span>
            <h3
              className="project-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: hovered ? t.heading : t.bodyStrong,
                fontWeight: 600,
                transition: "color 0.3s",
              }}
            >
              {project.title}
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {project.highlight && (
              <span
                style={{
                  padding: "4px 12px",
                  background: hovered ? t.accentFaint : "transparent",
                  color: t.accentText,
                  border: "1px solid " + t.accentBorder,
                  fontFamily: "monospace",
                  fontSize: "0.62rem",
                  transition: "all 0.3s",
                }}
              >
                {project.highlight}
              </span>
            )}
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.62rem",
                color: t.muted,
                transition: "color 0.4s",
              }}
            >
              {project.type} · {project.year}
            </span>
          </div>
        </div>
        <p
          style={{
            color: t.body,
            fontSize: "0.88rem",
            lineHeight: 1.8,
            marginBottom: "24px",
            maxWidth: "680px",
            fontFamily: "Georgia, serif",
            transition: "color 0.4s",
          }}
        >
          {project.description}
        </p>
        {project.tech.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: project.images ? "24px" : 0,
            }}
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "3px 10px",
                  border: "1px solid " + t.tagBorder,
                  color: hovered ? t.tagText : t.muted,
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  transition: "all 0.3s",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.images && (
          <div style={{ marginTop: "20px" }}>
            {/* Toggle button */}
            <button
              onClick={() => {
                setShowImages((p) => !p);
                setImgIndex(0);
              }}
              data-magnetic
              data-cursor={showImages ? "HIDE" : "VIEW"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "1px solid " + t.accentBorder,
                color: t.accentText,
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                padding: "7px 16px",
                cursor: "none",
                borderRadius: "4px",
                marginBottom: showImages ? "16px" : 0,
                transition: "all 0.2s",
              }}
            >
              <span>{showImages ? "▲" : "▼"}</span>
              <span>{showImages ? "HIDE PROOF" : "VIEW PROOF"}</span>
              <span style={{ color: t.muted }}>({project.images.length})</span>
            </button>

            {showImages && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Slider row */}
                <div
                  className="project-slider-row"
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  {/* Prev */}
                  <button
                    className="project-slider-btn"
                    onClick={prev}
                    data-magnetic
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid " + t.cardBorder,
                      color: t.accentText,
                      width: "44px",
                      height: "44px",
                      borderRadius: "8px",
                      cursor: "none",
                      fontSize: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    ‹
                  </button>

                  {/* Image frame — now swipeable on touch devices */}
                  <div
                    className="project-image-frame"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    style={{
                      flex: 1,
                      position: "relative",
                      border: "1px solid " + t.cardBorder,
                      borderRadius: "8px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      touchAction: "pan-y", // let vertical scroll pass through, capture horizontal swipe
                    }}
                  >
                    <motion.img
                      src={project.images[imgIndex]}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        userSelect: "none",
                        WebkitUserDrag: "none",
                      }}
                      draggable={false}
                    />

                    {/* Counter badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        fontFamily: "monospace",
                        fontSize: "0.62rem",
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {imgIndex + 1} / {project.images.length}
                    </div>

                    {/* Swipe hint — mobile only, fades in briefly */}
                    <div
                      className="project-swipe-hint"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontFamily: "monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.45)",
                        background: "rgba(0,0,0,0.5)",
                        padding: "3px 9px",
                        borderRadius: "10px",
                        pointerEvents: "none",
                      }}
                    >
                      ← swipe →
                    </div>
                  </div>

                  {/* Next */}
                  <button
                    className="project-slider-btn"
                    onClick={next}
                    data-magnetic
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid " + t.cardBorder,
                      color: t.accentText,
                      width: "44px",
                      height: "44px",
                      borderRadius: "8px",
                      cursor: "none",
                      fontSize: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    ›
                  </button>
                </div>

                {/* Dot indicators */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "14px",
                    justifyContent: "center",
                  }}
                >
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      style={{
                        width: i === imgIndex ? "20px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        border: "none",
                        background:
                          i === imgIndex ? t.accentText : t.cardBorder,
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.3s",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </FadeIn>
  );
}
export default function Projects({ t }) {
  return (
    <section
      id="projects"
      className="projects-section"
      style={{
        background: t.bg,
        transition: "background 0.4s",
      }}
    >
      <style>{`
        .projects-section {
          padding: 120px 48px;
        }
        .project-card {
          padding: 40px 44px;
        }
        .project-title {
          font-size: 1.35rem;
        }
        .project-image-frame {
          aspect-ratio: 16 / 9;
          height: auto;
        }
        .project-slider-btn {
          width: 44px;
          height: 44px;
        }
        .project-swipe-hint {
          display: none;
        }

        @media (max-width: 640px) {
          .projects-section {
            padding: 72px 20px;
          }
          .project-card {
            padding: 28px 22px;
          }
          .project-title {
            font-size: 1.1rem;
          }
          .project-image-frame {
            aspect-ratio: 16 / 9;
            height: auto;
          }
          .project-slider-row {
            gap: 8px !important;
          }
          .project-slider-btn {
            width: 34px;
            height: 34px;
            font-size: 18px !important;
          }
          .project-swipe-hint {
            display: block;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel t={t}>03 — PROJECTS</SectionLabel>
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
            <ScrambleText text="My Projects" />
          </h2>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
