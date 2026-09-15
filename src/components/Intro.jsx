import { useState, useEffect, useRef } from "react";

/**
 * Signature interactive entrance gate.
 * Skipped entirely if the user prefers reduced motion.
 *
 * Flow:
 *   0ms     - loading phase (progress counter)
 *   done    - label fades in ("PORTFOLIO — 2026")
 *   +250ms  - name words start revealing (mask/slide-up, staggered)
 *   +1300ms - "ENTER" gate button becomes visible + clickable
 *   (wait)  - user clicks / taps / presses Enter or Space
 *   click   - button confirms, whole overlay slides up like a curtain
 *   +800ms  - onComplete() fires, parent unmounts this component
 */

function IntroWord({ word, active, delay, color, style = {} }) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "top",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-block",
          color,
          transform: active ? "translateY(0)" : "translateY(110%)",
          transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      >
        {word}
      </span>
    </span>
  );
}

function CustomCursor({ t, enabled }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target.closest?.("[data-cursor]");
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;

  if (!enabled || isTouch) return null;

  const size = hovering ? 72 : 10;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10001,
        pointerEvents: "none",
        width: size,
        height: size,
        borderRadius: "50%",
        border: hovering ? `1px solid ${t.accentText}` : "none",
        background: hovering ? "transparent" : t.accentText,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.1em",
        color: t.accentText,
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
        transition:
          "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, background 0.25s",
        willChange: "transform",
      }}
    >
      {hovering ? label : null}
    </div>
  );
}

export default function Intro({ t, onComplete }) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [phase, setPhase] = useState(
    prefersReducedMotion ? "ready" : "loading",
  ); // loading -> label -> name -> ready -> exit
  const [progress, setProgress] = useState(prefersReducedMotion ? 100 : 0);
  const [hover, setHover] = useState(false);

  const progressIntervalRef = useRef(null);
  const sequenceStartedRef = useRef(false); // guards against double-scheduling

  // reduced motion: skip straight through
  useEffect(() => {
    if (!prefersReducedMotion) return;
    const id = setTimeout(() => onComplete?.(), 50);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fake but natural-feeling progress bar
  useEffect(() => {
    if (prefersReducedMotion) return;

    progressIntervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        const next = p + (p < 70 ? Math.random() * 14 : Math.random() * 5);
        return Math.min(next, 100);
      });
    }, 90);

    return () => clearInterval(progressIntervalRef.current);
  }, [prefersReducedMotion]);

  // when progress hits 100, kick off the label -> name -> ready sequence
  // ONE TIME, using absolute timeouts that don't get re-triggered/cleared
  // by later phase changes (this was the bug: scheduling inside an effect
  // keyed on [phase] meant the cleanup from a phase change cancelled the
  // *next* still-pending timer).
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (progress < 100) return;
    if (sequenceStartedRef.current) return; // only run this once
    sequenceStartedRef.current = true;

    clearInterval(progressIntervalRef.current);

    const t1 = setTimeout(() => setPhase("label"), 200);
    const t2 = setTimeout(() => setPhase("name"), 200 + 250);
    const t3 = setTimeout(() => setPhase("ready"), 200 + 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, prefersReducedMotion]);

  const handleEnter = () => {
    if (phase !== "ready") return;
    setPhase("exit");
    setTimeout(() => onComplete?.(), 800);
  };

  useEffect(() => {
    if (phase !== "ready") return;
    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (prefersReducedMotion) return null;

  const isLoading = phase === "loading";
  const nameActive = phase === "name" || phase === "ready" || phase === "exit";
  const gateVisible = phase === "ready" || phase === "exit";
  const exiting = phase === "exit";

  return (
    // CustomCursor rendered as a SIBLING here, not a child of the
    // transformed div below — a `transform` on an ancestor creates a new
    // containing block for `position: fixed` descendants, which was
    // pinning the cursor to the wrong box instead of the viewport.
    <>
      <CustomCursor t={t} enabled={!isLoading} />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          background: t.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transform: exiting ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.65,0,0.35,1)",
        }}
      >
        {/* subtle grain texture */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: t.isDark ? 0.05 : 0.035,
            pointerEvents: "none",
            mixBlendMode: t.isDark ? "screen" : "multiply",
          }}
        >
          <filter id="intro-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#intro-grain)" />
        </svg>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "2.2rem",
                letterSpacing: "-0.02em",
                color: t.heading,
                margin: 0,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.floor(progress).toString().padStart(2, "0")}%
            </p>
            <div
              style={{
                width: "140px",
                height: "1px",
                background: t.muted,
                opacity: 0.3,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${progress}%`,
                  background: t.accentText,
                  transition: "width 0.15s linear",
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.28em",
                color: t.accentText,
                marginBottom: "24px",
                opacity: phase === "label" ? 0 : 1,
                transition: "opacity 0.6s ease",
              }}
            >
              PORTFOLIO — 2026
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 6vw, 4.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: 0,
                textAlign: "center",
              }}
            >
              <IntroWord
                word="Mac Kenny"
                active={nameActive}
                delay={0}
                color={t.heading}
                style={{ marginRight: "0.28em" }}
              />
              <IntroWord
                word="G. Aleta"
                active={nameActive}
                delay={0.12}
                color={t.accentText}
              />
            </h1>

            <div
              style={{
                position: "relative",
                marginTop: "56px",
                width: "104px",
                height: "104px",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-14px",
                  borderRadius: "50%",
                  border: `1px dashed ${t.accentText}`,
                  opacity: gateVisible ? 0.35 : 0,
                  animation: gateVisible
                    ? "intro-spin 14s linear infinite"
                    : "none",
                  transition: "opacity 0.6s ease",
                }}
              />
              <button
                onClick={handleEnter}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                data-magnetic
                data-cursor="OPEN"
                aria-label="Enter portfolio"
                style={{
                  width: "104px",
                  height: "104px",
                  borderRadius: "50%",
                  border: `1px solid ${t.accentText}`,
                  background: hover ? t.accentText : "transparent",
                  color: hover ? (t.isDark ? "#080808" : "#fff") : t.accentText,
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "none",
                  opacity: gateVisible ? 1 : 0,
                  transform: gateVisible ? "scale(1)" : "scale(0.85)",
                  pointerEvents: gateVisible ? "auto" : "none",
                  transition:
                    "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), background 0.25s, color 0.25s",
                }}
              >
                Enter
              </button>
            </div>

            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                color: t.muted,
                marginTop: "18px",
                opacity: gateVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.15s",
              }}
            >
              CLICK OR PRESS ENTER
            </p>
          </>
        )}

        <style>{`
          @keyframes intro-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}
