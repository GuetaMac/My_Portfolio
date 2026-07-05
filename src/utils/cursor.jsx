import { useRef, useState, useEffect } from "react";

export function CustomCursor({ t }) {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current)
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const grow = () => {
      if (ring.current) {
        ring.current.style.width = "48px";
        ring.current.style.height = "48px";
        ring.current.style.opacity = "0.6";
      }
    };
    const shrink = () => {
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
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    raf.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

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
          transition: "background 0.3s",
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
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          marginLeft: "-14px",
          marginTop: "-14px",
          opacity: 1,
          transition:
            "width 0.25s cubic-bezier(0.16,1,0.3,1),height 0.25s cubic-bezier(0.16,1,0.3,1),opacity 0.25s,border-color 0.3s",
        }}
      />
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
