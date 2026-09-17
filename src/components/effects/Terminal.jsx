import { useEffect, useRef, useState } from "react";
import { PROJECTS, SKILLS } from "../../constants";

const FACTS = [
  "Cum Laude graduate, BSIT — Business Analytics, BatStateU Alangilan (2026).",
  "Built this whole site in React + Vite.",
  "Placed 2nd in the BatStateU BI Challenge.",
  "Also builds real client systems — ask about AC Paint Center.",
  "Dean's Lister, 4 terms running.",
  "Currently open to IT Support / QA roles in the Philippines.",
];

const HELP_LINES = [
  "available commands:",
  "  whoami      — quick bio",
  "  skills      — tech stack",
  "  projects    — project list",
  "  facts       — random fact about me",
  "  resume      — download resume.pdf",
  "  github      — open GitHub profile",
  "  linkedin    — open LinkedIn profile",
  "  contact     — email address",
  "  sudo hire-me",
  "  theme       — toggle light/dark",
  "  clear       — clear the screen",
  "  exit        — close this",
];

/**
 * Mount ONCE in Portfolio.jsx. Listens for the sequence "help" typed
 * anywhere (not inside inputs) and opens a tiny fake-terminal overlay.
 */
export default function Terminal({ t, isDark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const bufferRef = useRef("");
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (open) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName))
        return;
      if (e.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + e.key).slice(-4).toLowerCase();
      if (bufferRef.current === "help") {
        setOpen(true);
        setLines(["type 'help' for a list of commands.", ""]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // External trigger — lets a visible button (works on mobile taps too)
  // open the same terminal that the hidden "type help" shortcut opens.
  useEffect(() => {
    const onExternalOpen = () => {
      setOpen(true);
      setLines(["type 'help' for a list of commands.", ""]);
    };
    window.addEventListener("mkg:open-terminal", onExternalOpen);
    return () =>
      window.removeEventListener("mkg:open-terminal", onExternalOpen);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const print = (cmd, output) =>
    setLines((l) => [
      ...l,
      "> " + cmd,
      ...(Array.isArray(output) ? output : [output]),
    ]);

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "exit":
        setOpen(false);
        return;

      case "clear":
        setLines([]);
        return;

      case "help":
        print(cmd, HELP_LINES);
        return;

      case "whoami":
        print(cmd, [
          "Mac Kenny G. Aleta — IT graduate, Batangas, PH.",
          "Full-stack leaning frontend, data-curious, Cum Laude '26.",
        ]);
        return;

      case "skills":
        print(
          cmd,
          Object.entries(SKILLS).map(
            ([cat, items]) => cat + ": " + items.join(", "),
          ),
        );
        return;

      case "projects":
        print(cmd, [
          `${PROJECTS.length} projects on record:`,
          ...PROJECTS.map((p) => `  ${p.id}  ${p.title}`),
          "→ scroll to #projects to see them.",
        ]);
        return;

      case "facts":
        print(cmd, FACTS[Math.floor(Math.random() * FACTS.length)]);
        return;

      case "resume": {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Mac Kenny Aleta - Resume.pdf";
        a.click();
        print(cmd, "downloading resume.pdf...");
        return;
      }

      case "github":
        window.open("https://github.com/GuetaMac", "_blank");
        print(cmd, "opening github.com/GuetaMac ↗");
        return;

      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/mac-kenny-aleta-6363ba39b/",
          "_blank",
        );
        print(cmd, "opening linkedin ↗");
        return;

      case "contact":
      case "email":
        print(cmd, "aletamackenny@gmail.com");
        return;

      case "sudo hire-me":
        print(cmd, [
          "permission granted.",
          "→ resume downloading, and here's my email: aletamackenny@gmail.com",
        ]);
        {
          const a = document.createElement("a");
          a.href = "/resume.pdf";
          a.download = "Mac Kenny Aleta - Resume.pdf";
          a.click();
        }
        return;

      case "theme":
        if (onToggleTheme) {
          onToggleTheme();
          print(cmd, `switched to ${isDark ? "light" : "dark"} mode.`);
        } else {
          print(cmd, "theme toggle unavailable.");
        }
        return;

      default:
        print(cmd, "unknown command. try 'help'.");
    }
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
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 100%)",
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
          mkg-terminal v2.0 — type 'help' for commands, 'exit' to close
        </p>
        <div ref={bodyRef} style={{ maxHeight: "260px", overflowY: "auto" }}>
          {lines.map((l, i) => (
            <p key={i} style={{ margin: "4px 0", lineHeight: 1.5 }}>
              {l}
            </p>
          ))}
        </div>
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
