export function makeTheme(isDark) {
  return {
    isDark,

    // Base surfaces
    bg: isDark ? "#0a0e0f" : "#fbfdfc",
    bgAlt: isDark ? "#10171a" : "#f1f5f4",
    navBg: isDark ? "rgba(10,14,15,0.92)" : "rgba(251,253,252,0.92)",
    navBorder: isDark ? "rgba(94,234,212,0.10)" : "rgba(6,95,70,0.10)",

    // Text
    heading: isDark ? "#eef2f2" : "#0b1615",
    bodyStrong: isDark ? "#cdd6d6" : "#253433",
    body: isDark ? "#93a3a3" : "#52605f",
    muted: isDark ? "#5f7373" : "#8a9998",

    // Cards
    cardBorder: isDark ? "rgba(94,234,212,0.10)" : "rgba(6,95,70,0.14)",
    cardBorderHover: isDark ? "rgba(52,224,127,0.35)" : "rgba(6,120,60,0.35)",
    cardBg: isDark ? "rgba(255,255,255,0.02)" : "rgba(6,95,70,0.02)",
    cardBgHover: isDark ? "rgba(52,224,127,0.04)" : "rgba(6,95,70,0.04)",
    divider: isDark ? "rgba(94,234,212,0.08)" : "rgba(6,95,70,0.10)",

    // Primary accent (terminal green — softened, not neon)
    accentText: isDark ? "#34e07f" : "#0a8f4c",
    accentMuted: isDark ? "rgba(52,224,127,0.55)" : "rgba(10,143,76,0.6)",
    accentFaint: isDark ? "rgba(52,224,127,0.08)" : "rgba(10,143,76,0.07)",
    accentBorder: isDark ? "rgba(52,224,127,0.25)" : "rgba(10,143,76,0.24)",

    // Secondary accent (teal — for links/hover, keeps it from being monochrome)
    accentSecondary: isDark ? "#5eead4" : "#0f8f86",
    accentSecondaryFaint: isDark
      ? "rgba(94,234,212,0.10)"
      : "rgba(15,143,134,0.08)",
    accentSecondaryBorder: isDark
      ? "rgba(94,234,212,0.28)"
      : "rgba(15,143,134,0.24)",

    // Nav / footer / misc text
    navLink: isDark ? "#6b8080" : "#7c8b8a",
    footerText: isDark ? "#35403f" : "#c6cfce",

    // Tags
    tagBorder: isDark ? "rgba(94,234,212,0.12)" : "rgba(6,95,70,0.14)",
    tagText: isDark ? "#7fa8a3" : "#4d6663",

    // Toggle / cursor / progress
    toggleBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(6,95,70,0.05)",
    toggleColor: isDark ? "#93a3a3" : "#52605f",
    cursorBorder: isDark ? "#34e07f" : "#0a8f4c",
    progressBg: isDark ? "#34e07f" : "#0a8f4c",

    // Photo accents (used elsewhere, e.g. Hero/Intro)
    photoBorder: isDark ? "rgba(52,224,127,0.18)" : "rgba(10,143,76,0.18)",
    photoGlow: isDark ? "rgba(52,224,127,0.07)" : "rgba(10,143,76,0.06)",

    // Project card grid + modal
    scanlineColor: isDark ? "rgba(52,224,127,0.06)" : "rgba(10,143,76,0.05)",
    overlayScrim: isDark
      ? "linear-gradient(to top, rgba(6,10,11,0.95) 0%, rgba(6,10,11,0.55) 45%, rgba(6,10,11,0) 100%)"
      : "linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 100%)",
    modalOverlay: isDark ? "rgba(4,7,8,0.88)" : "rgba(15,23,22,0.75)",
  };
}
