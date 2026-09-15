import { useRef, useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse), (max-width: 640px)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return isMobile;
}

export function CustomCursor({ t }) {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const isMobile = useIsMobile();
  const [label, setLabel] = useState(null);

  useEffect(() => {
    // Skip entirely on touch/mobile — no mouse to track, and we don't
    // want to hide the real cursor or leave a stray dot/ring behind.
    if (isMobile) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current)
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const grow = (e) => {
      const text = e.currentTarget.dataset.cursor || null;
      setLabel(text);
      if (ring.current) {
        const size = text ? "76px" : "48px";
        ring.current.style.width = size;
        ring.current.style.height = size;
        ring.current.style.opacity = text ? "1" : "0.6";
      }
    };
    const shrink = () => {
      setLabel(null);
      if (ring.current) {
        ring.current.style.width = "28px";
        ring.current.style.height = "28px";
        ring.current.style.opacity = "1";
      }
    };
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ring.current)
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    // Magnetic pull: elements marked with data-magnetic get nudged
    // toward the cursor while hovered, and spring back on leave.
    const magneticEls = document.querySelectorAll("[data-magnetic]");
    const magneticMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const strength = 0.35;
      el.style.transition = "transform 0.1s linear";
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };
    const magneticLeave = (e) => {
      const el = e.currentTarget;
      el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "translate(0px, 0px)";
    };
    magneticEls.forEach((el) => {
      el.addEventListener("mousemove", magneticMove);
      el.addEventListener("mouseleave", magneticLeave);
    });

    document.addEventListener("mousemove", move);
    const hoverEls = document.querySelectorAll(
      "a, button, [data-hover], [data-cursor]",
    );
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      magneticEls.forEach((el) => {
        el.removeEventListener("mousemove", magneticMove);
        el.removeEventListener("mouseleave", magneticLeave);
      });
    };
  }, [isMobile]);

  // Render nothing on mobile so the browser's default touch behavior
  // (and any tappable cursor) is left untouched.
  if (isMobile) return null;

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          background: t.cursorBorder,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          marginLeft: "-2.5px",
          marginTop: "-2.5px",
          opacity: label ? 0 : 1,
          transition: "background 0.3s, opacity 0.2s",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "28px",
          height: "28px",
          border: `1.5px solid ${t.cursorBorder}`,
          background: label ? t.bg : "transparent",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          marginLeft: "-14px",
          marginTop: "-14px",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width 0.25s cubic-bezier(0.16,1,0.3,1),height 0.25s cubic-bezier(0.16,1,0.3,1),opacity 0.25s,border-color 0.3s,background 0.25s",
        }}
      >
        {label && (
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.08em",
              color: t.cursorBorder,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}

export function ScrollProgress({ t }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "2px",
        background: "transparent",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: t.progressBg,
          transition: "width 0.1s linear,background 0.4s",
        }}
      />
    </div>
  );
}
