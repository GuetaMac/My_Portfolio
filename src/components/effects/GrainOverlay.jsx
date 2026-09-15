// Mount ONCE in App.jsx, above everything else. Fixed, pointer-events none,
// so it never blocks clicks — it's purely a texture layer.
export default function GrainOverlay({ isDark }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: isDark ? 0.05 : 0.035,
        pointerEvents: "none",
        zIndex: 9998,
        mixBlendMode: isDark ? "screen" : "multiply",
      }}
    >
      <filter id="site-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#site-grain)" />
    </svg>
  );
}
