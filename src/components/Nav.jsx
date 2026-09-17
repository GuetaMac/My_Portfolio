import { useState } from "react";
import { NAV_LINKS } from "../constants";

const NAV_ICONS = {
  about: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2" />
    </>
  ),
  skills: (
    <>
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </>
  ),
  projects: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" />
    </>
  ),
  experience: (
    <>
      <rect x="2.5" y="7.5" width="19" height="12.5" rx="1.8" />
      <path d="M8 7.5V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7.5" />
      <line x1="2.5" y1="12.8" x2="21.5" y2="12.8" />
    </>
  ),
  contact: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.8" />
      <path d="m3.5 6 8.5 6.8L20.5 6" />
    </>
  ),
};

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/GuetaMac",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.2c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.2 10.2 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z"
        fill="currentColor"
      />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mac-kenny-aleta-6363ba39b/",
    icon: (
      <path
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21h-4z"
        fill="currentColor"
      />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "Email",
    href: "mailto:aletamackenny@gmail.com",
    icon: (
      <>
        <rect
          x="2.5"
          y="4.5"
          width="19"
          height="15"
          rx="1.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m3.5 6 8.5 6.8L20.5 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </>
    ),
    viewBox: "0 0 24 24",
  },
];

function openCommandPalette() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true }),
  );
}

function openTerminal() {
  window.dispatchEvent(new Event("mkg:open-terminal"));
}

function TerminalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <polyline points="6.5 9.5 10.5 12 6.5 14.5" />
      <line x1="12.5" y1="14.5" x2="16.5" y2="14.5" />
    </svg>
  );
}

export default function Nav({ active, isDark, onToggle, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const activeIndex = Math.max(NAV_LINKS.indexOf(active), 0);

  const ThemeToggleIcon = (
    <>
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          position: "absolute",
          opacity: isDark ? 1 : 0,
          transform: isDark
            ? "rotate(0deg) scale(1)"
            : "rotate(-90deg) scale(0.5)",
          transition:
            "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
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
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          position: "absolute",
          opacity: isDark ? 0 : 1,
          transform: isDark
            ? "rotate(90deg) scale(0.5)"
            : "rotate(0deg) scale(1)",
          transition:
            "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </>
  );

  return (
    <>
      <style>{`
        .nav-rail {
          display: none;
        }
        .nav-topbar {
          display: flex;
        }
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-hamburger {
          display: flex;
        }
        .nav-mobile-menu {
          display: none;
        }
        .nav-cmdk-hint {
          display: inline-flex;
        }

        @media (min-width: 641px) {
          .nav-rail {
            display: flex;
          }
          .nav-topbar {
            display: none;
          }
        }

        .nav-rail-link {
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: none;
          border-radius: 8px;
          transition: background 0.25s, color 0.25s;
        }
        .nav-rail-link::before {
          content: "";
          position: absolute;
          left: -14px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 0;
          background: currentColor;
          border-radius: 2px;
          transition: height 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-rail-link.active::before {
          height: 18px;
        }
        .nav-social-link {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: none;
          transition: color 0.2s, transform 0.2s;
        }
        .nav-social-link:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* ---------- Desktop: left sidebar rail ---------- */}
      <aside
        className="nav-rail"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "76px",
          zIndex: 50,
          flexDirection: "column",
          alignItems: "center",
          background: t.navBg,
          backdropFilter: "blur(16px)",
          borderRight: "1px solid " + t.navBorder,
          transition: "background 0.4s,border-color 0.4s",
          padding: "24px 0",
        }}
      >
        {/* Logo */}
        <button
          data-magnetic
          data-hover
          onClick={() => scrollTo("about")}
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            color: t.accentText,
            fontFamily: "monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            fontWeight: 500,
            writingMode: "vertical-rl",
            padding: "0 0 20px",
            marginBottom: "20px",
            borderBottom: "1px solid " + t.navBorder,
            transition: "color 0.4s,border-color 0.4s",
          }}
        >
          MKG
        </button>

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link;
            return (
              <button
                key={link}
                data-magnetic
                data-cursor={link.toUpperCase()}
                onClick={() => scrollTo(link)}
                className={"nav-rail-link" + (isActive ? " active" : "")}
                aria-label={link}
                style={{
                  color: isActive ? t.accentText : t.navLink,
                  background: isActive ? t.accentFaint : "transparent",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {NAV_ICONS[link]}
                </svg>
              </button>
            );
          })}
        </nav>

        {/* Section counter */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            color: t.muted,
            letterSpacing: "0.08em",
            marginBottom: "18px",
            transition: "color 0.4s",
          }}
        >
          0{activeIndex + 1}/0{NAV_LINKS.length}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            paddingTop: "18px",
            borderTop: "1px solid " + t.navBorder,
            width: "100%",
            transition: "border-color 0.4s",
          }}
        >
          {/* Theme toggle */}
          <button
            data-magnetic
            onClick={onToggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              position: "relative",
              width: "34px",
              height: "34px",
              background: t.toggleBg,
              border: "1px solid " + t.cardBorder,
              color: t.toggleColor,
              cursor: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.25s",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            {ThemeToggleIcon}
          </button>

          {/* Cmd+K trigger */}
          <button
            data-magnetic
            data-cursor="SEARCH"
            onClick={openCommandPalette}
            aria-label="Open command palette"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              background: "none",
              border: "1px solid " + t.cardBorder,
              borderRadius: "6px",
              padding: "5px 4px",
              cursor: "none",
              color: t.muted,
              fontFamily: "monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
          >
            <span>⌘</span>
            <span>K</span>
          </button>

          {/* Terminal trigger — visible + tappable, works on mobile too */}
          <button
            data-magnetic
            data-cursor="TERMINAL"
            onClick={openTerminal}
            aria-label="Open terminal"
            style={{
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "1px solid " + t.cardBorder,
              borderRadius: "6px",
              cursor: "none",
              color: t.accentText,
              transition: "all 0.2s",
            }}
          >
            <TerminalIcon />
          </button>

          {/* Socials */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingTop: "12px",
              borderTop: "1px solid " + t.navBorder,
              width: "100%",
              alignItems: "center",
              transition: "border-color 0.4s",
            }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-cursor={s.label.toUpperCase()}
                aria-label={s.label}
                className="nav-social-link"
                style={{ color: t.muted }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = t.accentText)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                <svg width="16" height="16" viewBox={s.viewBox}>
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* ---------- Mobile: top bar ---------- */}
      <nav
        className="nav-topbar nav-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          alignItems: "center",
          justifyContent: "space-between",
          background: t.navBg,
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid " + t.navBorder,
          transition: "background 0.4s,border-color 0.4s",
          padding: "16px 20px",
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

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onToggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              position: "relative",
              width: "34px",
              height: "34px",
              background: t.toggleBg,
              border: "1px solid " + t.cardBorder,
              color: t.toggleColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.25s",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            {ThemeToggleIcon}
          </button>

          <button
            data-cursor="TERMINAL"
            onClick={openTerminal}
            aria-label="Open terminal"
            style={{
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "1px solid " + t.cardBorder,
              borderRadius: "6px",
              color: t.accentText,
              transition: "all 0.2s",
            }}
          >
            <TerminalIcon />
          </button>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              background: "none",
              border: "1px solid " + t.cardBorder,
              color: t.toggleColor,
              padding: "6px 10px",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
              transition: "all 0.25s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <ul
          className={"nav-mobile-menu" + (menuOpen ? " open" : "")}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            flexDirection: menuOpen ? "column" : undefined,
            display: menuOpen ? "flex" : "none",
            gap: 0,
            listStyle: "none",
            margin: 0,
            padding: "8px 20px 16px",
            background: t.navBg,
            borderBottom: "1px solid " + t.navBorder,
            backdropFilter: "blur(16px)",
            transition: "background 0.4s,border-color 0.4s",
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link} style={{ borderTop: "1px solid " + t.navBorder }}>
              <button
                onClick={() => scrollTo(link)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: active === link ? t.accentText : t.navLink,
                  fontFamily: "monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  padding: "14px 0",
                }}
              >
                {link}
              </button>
            </li>
          ))}
          <li
            style={{
              borderTop: "1px solid " + t.navBorder,
              display: "flex",
              gap: "18px",
              padding: "16px 0 4px",
            }}
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                style={{ color: t.muted }}
              >
                <svg width="18" height="18" viewBox={s.viewBox}>
                  {s.icon}
                </svg>
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </>
  );
}
