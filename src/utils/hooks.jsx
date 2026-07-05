import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      {
        threshold,
        // Trigger a bit before the element is fully in the viewport —
        // helps on mobile where stacked/reordered layout can push
        // elements close to the fold on initial load.
        rootMargin: "0px 0px -5% 0px",
      },
    );
    obs.observe(node);

    // Fallback: if the element is already on-screen at mount time
    // (common right after a layout reorder on mobile), the observer's
    // first callback can be missed in some browsers. Check manually.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      setInView(true);
    }

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedWord({ word, delay, color, style = {} }) {
  const [ref, inView] = useInView(0.1);
  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        color,
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) skewY(0deg)"
          : "translateY(60px) skewY(3deg)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {word}
    </span>
  );
}
