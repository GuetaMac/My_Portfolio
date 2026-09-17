import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../constants";
import { FadeIn } from "../utils/hooks";
import { AnimatePresence, motion } from "framer-motion";
import ScrambleText from "./effects/ScrambleText";

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

function ProjectCard({ project, index, t, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const cover = project.images?.[0];
  const hasImages = Boolean(project.images?.length);

  return (
    <FadeIn delay={0.06 * index}>
      <div
        data-hover
        data-cursor={hasImages ? "VIEW" : undefined}
        className="project-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => hasImages && onOpen(project)}
        style={{
          cursor: hasImages ? "none" : "default",
          border: "1px solid " + (hovered ? t.cardBorderHover : t.cardBorder),
          background: hovered ? t.cardBgHover : t.cardBg,
          borderRadius: "10px",
          overflow: "hidden",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          opacity: project.placeholder ? 0.35 : 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {cover && (
          <div
            className="project-card-image"
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              background: t.bgAlt,
            }}
          >
            <motion.img
              src={cover}
              alt={`${project.title} preview`}
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
              }}
              draggable={false}
            />

            {/* scanline flicker on hover */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s",
                background:
                  "repeating-linear-gradient(0deg, " +
                  t.scanlineColor +
                  " 0px, " +
                  t.scanlineColor +
                  " 1px, transparent 1px, transparent 3px)",
                mixBlendMode: "overlay",
              }}
            />

            {/* bottom scrim revealing tags + prompt */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "16px",
                background: t.overlayScrim,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "10px",
                }}
              >
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "2px 8px",
                      border: "1px solid " + t.accentSecondaryBorder,
                      color: t.accentSecondary,
                      fontFamily: "monospace",
                      fontSize: "0.6rem",
                      borderRadius: "3px",
                      background: "rgba(0,0,0,0.3)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: t.accentText,
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                }}
              >
                <span>VIEW_PROJECT</span>
                <span>▸</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>
                  ({project.images.length})
                </span>
              </div>
            </div>

            {/* id badge */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                fontFamily: "monospace",
                fontSize: "0.62rem",
                color: t.accentText,
                background: "rgba(0,0,0,0.45)",
                padding: "3px 8px",
                borderRadius: "4px",
                letterSpacing: "0.08em",
              }}
            >
              {project.id}
            </div>

            {project.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  fontFamily: "monospace",
                  fontSize: "0.58rem",
                  color: t.accentSecondary,
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid " + t.accentSecondaryBorder,
                  padding: "3px 9px",
                  borderRadius: "4px",
                  letterSpacing: "0.05em",
                  maxWidth: "60%",
                  textAlign: "right",
                }}
              >
                {project.highlight}
              </div>
            )}
          </div>
        )}

        <div
          style={{
            padding: "20px 22px 24px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h3
            className="project-card-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: hovered ? t.heading : t.bodyStrong,
              fontWeight: 600,
              transition: "color 0.3s",
              marginBottom: "6px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.62rem",
              color: t.muted,
              letterSpacing: "0.06em",
              marginBottom: "12px",
              transition: "color 0.4s",
            }}
          >
            {project.type} · {project.year}
          </p>
          <p
            style={{
              color: t.body,
              fontSize: "0.84rem",
              lineHeight: 1.7,
              fontFamily: "Georgia, serif",
              marginBottom: "16px",
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.4s",
            }}
          >
            {project.description}
          </p>
          {project.tech.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "3px 9px",
                    border: "1px solid " + t.tagBorder,
                    color: t.tagText,
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    transition: "all 0.3s",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function ProjectModal({ project, t, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef(null);
  const SWIPE_THRESHOLD = 40;

  useEffect(() => {
    setImgIndex(0);
  }, [project]);

  const goTo = (i) => setImgIndex(i);
  const next = () =>
    goTo(imgIndex === project.images.length - 1 ? 0 : imgIndex + 1);
  const prev = () =>
    goTo(imgIndex === 0 ? project.images.length - 1 : imgIndex - 1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgIndex, project]);

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

  const sliderBtnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: t.accentText,
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    cursor: "none",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.2s, border-color 0.2s",
    zIndex: 2,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="project-modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: t.modalOverlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        cursor: "default",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="project-modal"
        style={{
          background: t.bg,
          border: "1px solid " + t.cardBorder,
          borderRadius: "12px",
          maxWidth: "980px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "24px 28px 0",
            gap: "16px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                color: t.accentText,
                letterSpacing: "0.1em",
              }}
            >
              {project.id}
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: t.heading,
                fontWeight: 700,
                margin: "6px 0 4px",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                color: t.muted,
                letterSpacing: "0.06em",
              }}
            >
              {project.type} · {project.year}
              {project.highlight ? " · " + project.highlight : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            data-hover
            data-cursor="CLOSE"
            style={{
              background: "transparent",
              border: "1px solid " + t.cardBorder,
              color: t.body,
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              cursor: "none",
              fontSize: "16px",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div
          className="project-modal-body"
          style={{ padding: "20px 28px 28px" }}
        >
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              position: "relative",
              width: "100%",
              border: "1px solid " + t.cardBorder,
              borderRadius: "8px",
              overflow: "hidden",
              aspectRatio: "16 / 9",
              background: t.bgAlt,
              touchAction: "pan-y",
            }}
          >
            <button
              onClick={prev}
              data-magnetic
              style={{ ...sliderBtnStyle, left: "10px" }}
            >
              ‹
            </button>
            <button
              onClick={next}
              data-magnetic
              style={{ ...sliderBtnStyle, right: "10px" }}
            >
              ›
            </button>

            <motion.img
              key={imgIndex}
              src={project.images[imgIndex]}
              alt={`${project.title} screenshot ${imgIndex + 1}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                userSelect: "none",
              }}
              draggable={false}
            />
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
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                zIndex: 2,
              }}
            >
              {imgIndex + 1} / {project.images.length}
            </div>
          </div>

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
                  background: i === imgIndex ? t.accentText : t.cardBorder,
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          <p
            style={{
              color: t.body,
              fontSize: "0.9rem",
              lineHeight: 1.8,
              fontFamily: "Georgia, serif",
              margin: "24px 0 16px",
            }}
          >
            {project.description}
          </p>

          {project.tech.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "3px 10px",
                    border: "1px solid " + t.tagBorder,
                    color: t.tagText,
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ t }) {
  const [openProject, setOpenProject] = useState(null);

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
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        .project-card-title {
          font-size: 1.15rem;
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .projects-section {
            padding: 72px 20px;
          }
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .project-card-title {
            font-size: 1.05rem;
          }
          .project-modal {
            max-height: 92vh;
          }
          .project-modal-body {
            padding: 14px 14px 20px !important;
          }
          .project-modal-backdrop {
            padding: 10px !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              t={t}
              onOpen={setOpenProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            t={t}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
