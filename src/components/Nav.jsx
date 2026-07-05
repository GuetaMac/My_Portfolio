import { useState } from "react";
import { NAV_LINKS } from "../constants";

export default function Nav({ active, isDark, onToggle, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="nav-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: t.navBg,
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid " + t.navBorder,
        transition: "background 0.4s,border-color 0.4s",
      }}
    >
      <style>{`
        .nav-bar {
          padding: 20px 48px;
        }
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-hamburger {
          display: none;
        }
        .nav-mobile-menu {
          display: none;
        }

        @media (max-width: 640px) {
          .nav-bar {
            padding: 16px 20px;
          }
          .nav-links {
            display: none;
          }
          .nav-hamburger {
            display: flex;
          }
          .nav-mobile-menu.open {
            display: flex;
          }
        }
      `}</style>
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

      <ul className="nav-links">
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

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

        {/* Hamburger toggle — mobile only */}
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
          flexDirection: "column",
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
      </ul>
    </nav>
  );
}
