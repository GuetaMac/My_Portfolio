import { NAV_LINKS } from "../constants";

export default function Nav({ active, isDark, onToggle, t }) {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        background: t.navBg,
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid " + t.navBorder,
        transition: "background 0.4s,border-color 0.4s",
      }}
    >
      <span
        style={{
          color: t.accentText,
          fontFamily: "monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.22em",
          fontWeight: 500,
        }}
      >
        MKG
      </span>
      <ul
        style={{
          display: "flex",
          gap: "32px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <button
              onClick={() => scrollTo(link)}
              style={{
                position: "relative",
                color: active === link ? t.accentText : t.navLink,
                fontFamily: "monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "none",
                transition: "color 0.2s",
                padding: "2px 0",
              }}
            >
              {link}
              {active === link && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: t.accentText,
                    transition: "background 0.3s",
                  }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onToggle}
        style={{
          background: t.toggleBg,
          border: "1px solid " + t.cardBorder,
          color: t.toggleColor,
          padding: "6px 14px",
          cursor: "none",
          fontFamily: "monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "all 0.25s",
          borderRadius: "2px",
        }}
      >
        {isDark ? (
          <>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            LIGHT
          </>
        ) : (
          <>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            DARK
          </>
        )}
      </button>
    </nav>
  );
}
