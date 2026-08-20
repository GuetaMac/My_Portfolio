import { useEffect, useRef, useState } from "react";

/**
 * Mount ONCE in App.jsx. Opens on Cmd/Ctrl+K (or "/" when nothing is
 * focused). Pass a `commands` array of { label, hint, action } —
 * action is a plain function, e.g. () => scrollTo("projects").
 */
export default function CommandPalette({ commands, t }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      const isK = e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey);
      const isSlash =
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);

      if (isK || isSlash) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setHighlighted(0), [query]);

  const runCommand = (cmd) => {
    cmd.action();
    setOpen(false);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && filtered[highlighted]) {
      runCommand(filtered[highlighted]);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10002,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 90vw)",
          background: t.bg,
          border: "1px solid " + t.cardBorder,
          borderRadius: "10px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 18px",
            borderBottom: "1px solid " + t.cardBorder,
          }}
        >
          <span style={{ color: t.accentText, fontFamily: "monospace" }}>
            /
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Type a command or section…"
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              color: t.heading,
              fontFamily: "monospace",
              fontSize: "0.9rem",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              color: t.muted,
              border: "1px solid " + t.cardBorder,
              padding: "2px 6px",
              borderRadius: "3px",
            }}
          >
            ESC
          </span>
        </div>

        <div style={{ maxHeight: "320px", overflowY: "auto", padding: "6px" }}>
          {filtered.length === 0 && (
            <p
              style={{
                padding: "20px",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: t.muted,
                textAlign: "center",
              }}
            >
              No matches.
            </p>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.label}
              onClick={() => runCommand(cmd)}
              onMouseEnter={() => setHighlighted(i)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: "6px",
                border: "none",
                background: i === highlighted ? t.accentFaint : "transparent",
                color: i === highlighted ? t.accentText : t.bodyStrong,
                fontFamily: "monospace",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span>{cmd.label}</span>
              {cmd.hint && (
                <span style={{ fontSize: "0.65rem", color: t.muted }}>
                  {cmd.hint}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
