import { useEffect, useRef, useState } from "react";

const FACTS = [
  "Cum Laude graduate, BSIT — Business Analytics, BatStateU Alangilan (2026).",
  "Built this whole site in React + Vite.",
  "Placed 2nd in the BatStateU BI Challenge.",
  "Also builds real client systems — ask about AC Paint Center.",
  "Dean's Lister, 4 terms running.",
  "Currently open to IT Support / QA roles in the Philippines.",
];

/**
 * Mount ONCE in App.jsx. Listens for the sequence "help" typed anywhere
 * (not inside inputs) and opens a tiny fake-terminal overlay with fun
 * facts. Type "exit" or press Esc to close.
 */
export default function Terminal({ t }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const bufferRef = useRef("");
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName))
        return;
      if (e.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + e.key).slice(-4).toLowerCase();
      if (bufferRef.current === "help") {
        setOpen(true);
        setLines([
          "type 'facts' for something you might not know,",
          "or 'exit' to close this.",
        ]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "exit") {
      setOpen(false);
      return;
    }
    if (trimmed === "facts") {
      const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
      setLines((l) => [...l, "> " + cmd, fact]);
      return;
    }
    setLines((l) => [
      ...l,
      "> " + cmd,
      "unknown command. try 'facts' or 'exit'.",
    ]);
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10003,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(480px, 90vw)",
          background: "#0a0a0a",
          border: "1px solid " + t.cardBorder,
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "0.78rem",
          color: "#8aff8a",
          padding: "16px 18px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <p style={{ color: t.muted, marginBottom: "10px" }}>
          mkg-terminal v1.0 — type 'exit' to close
        </p>
        {lines.map((l, i) => (
          <p key={i} style={{ margin: "4px 0", lineHeight: 1.5 }}>
            {l}
          </p>
        ))}
        <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
          <span style={{ color: t.accentText }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                runCommand(input);
                setInput("");
              }
              if (e.key === "Escape") setOpen(false);
            }}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              color: "#8aff8a",
              fontFamily: "monospace",
              fontSize: "0.78rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}
