import { useEffect } from "react";

/**
 * Mount ONCE in App.jsx. Renders nothing — just wires up a mousemove
 * listener that pulls any [data-magnetic] element toward the cursor
 * when it's nearby, and springs it back on mouse-leave.
 *
 * Works on existing markup with zero changes: Nav links, Hero CTAs,
 * Skills tags, Project slider buttons, Quiz options — anything that
 * already has data-magnetic="true" picks this up automatically.
 */
const RADIUS = 90; // px — how close the cursor needs to be to start pulling
const STRENGTH = 0.35; // 0-1, how far the element travels toward the cursor

export default function MagneticFX() {
  useEffect(() => {
    const isTouch = window.matchMedia?.("(pointer: coarse)").matches;
    if (isTouch) return; // no cursor on touch devices, skip entirely

    const elements = () =>
      Array.from(document.querySelectorAll("[data-magnetic]"));
    let raf = null;
    let mouse = { x: -9999, y: -9999 };

    const onMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        for (const el of elements()) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.hypot(dx, dy);

          if (dist < RADIUS) {
            const pull = (1 - dist / RADIUS) * STRENGTH;
            el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
          } else {
            el.style.transform = "";
          }
          el.style.transition = "transform 0.2s cubic-bezier(0.16,1,0.3,1)";
        }
      });
    };

    const onLeaveWindow = () => {
      for (const el of elements()) el.style.transform = "";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeaveWindow);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeaveWindow);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
