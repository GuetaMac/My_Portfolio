import { useEffect, useRef, useState } from "react";
import { SKILLS, PROJECTS, CERTS } from "../constants";

// Short bio context, mirroring what's already shown in Hero.jsx — kept here
// as plain text so the chatbot can quote/paraphrase it without needing a
// DOM scrape.
const BIO = `Mac Kenny G. Aleta (goes by "Macky") is an IT graduate specializing in web system development, based in Batangas, Philippines. He graduated Cum Laude with a BSIT degree (Business Analytics specialization) from Batangas State University – Alangilan Campus in 2026. He was a Dean's Lister for four consecutive semesters (2nd Sem AY2022-2023 through 2nd Sem AY2024-2025). He's passionate about building responsive websites and functional web applications that solve real-world problems.`;

const EXPERIENCE = `OJT Trainee, Research Management Services (Feb–May 2026) — Led development and debugging of a Research Publication Management System (PHP/Laravel/PostgreSQL). Designed and implemented new features based on supervisor feedback, improved UI/responsive layouts, implemented in-system and email notifications, enhanced workflows (archive management, manuscript handling, volume organization), and managed publication data/reporting in Excel.`;

// Starter prompts shown in the empty state — tappable, so a first-time
// visitor doesn't need to think of a question themselves.
const SUGGESTIONS = [
  "What's his backend experience?",
  "Tell me about his projects",
  "What certifications does he have?",
];

function buildContext() {
  const skillsText = Object.entries(SKILLS)
    .map(([category, items]) => `${category}: ${items.join(", ")}`)
    .join("\n");

  const projectsText = PROJECTS.map(
    (p) =>
      `- ${p.title} (${p.type}, ${p.year}${p.highlight ? `, ${p.highlight}` : ""}): ${p.description} Tech: ${p.tech.join(", ")}.`,
  ).join("\n");

  const certsText = CERTS.map(
    (c) => `- ${c.title} — ${c.org} (${c.year})`,
  ).join("\n");

  return `## Bio\n${BIO}\n\n## Skills\n${skillsText}\n\n## Projects\n${projectsText}\n\n## Experience\n${EXPERIENCE}\n\n## Certifications & Training\n${certsText}`;
}

// Built once per page load — this data doesn't change at runtime.
const CONTEXT = buildContext();

function ChatIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4.5 4V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export default function ChatWidget({ t }) {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [messages, setMessages] = useState([]); // { role: "user"|"model", text }
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 480,
  );
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== "undefined"
      ? (window.visualViewport?.height ?? window.innerHeight)
      : null,
  );
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= 480);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // On phones, the visual viewport shrinks when the on-screen keyboard
  // opens — some in-app browsers (Messenger, etc.) don't reflow a
  // 100dvh panel to match, which was hiding the input behind the
  // keyboard. Track the real visible height and size the panel to it.
  useEffect(() => {
    if (!open || !isMobile) return;
    const vv = window.visualViewport;
    if (!vv) return;
    function update() {
      setViewportHeight(vv.height);
    }
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [open, isMobile]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending, open]);

  // Focus the input as soon as the panel opens, and mark that the visitor
  // has engaged at least once (turns off the FAB's attention pulse).
  useEffect(() => {
    if (open) {
      setEverOpened(true);
      const id = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Close on Escape, and return focus to something sane.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Auto-grow the textarea up to a max height instead of scrolling inside
  // a fixed single line.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [input, open]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const nextMessages = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
          context: CONTEXT,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err) {
      console.error("Chat widget error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, something went wrong. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setSending(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  function handleSend(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const labelStyle = {
    fontFamily: "monospace",
    fontSize: "0.62rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  };

  return (
    <>
      <style>{`
        @keyframes mk-chat-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes mk-msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mk-dot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
        @keyframes mk-pulse {
          0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.18); }
          100% { box-shadow: 0 0 0 10px rgba(0,0,0,0); }
        }
        .mk-chat-panel {
          animation: mk-chat-in 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mk-msg {
          animation: mk-msg-in 0.18s ease-out;
        }
        .mk-dot {
          animation: mk-dot 1.1s infinite ease-in-out;
        }
        .mk-fab-pulse::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: mk-pulse 1.8s infinite;
        }
        .mk-chip:hover,
        .mk-send:hover:not(:disabled),
        .mk-close:hover {
          opacity: 0.75;
        }
        .mk-input::placeholder {
          opacity: 0.6;
        }
      `}</style>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ask about Macky"
          className="mk-chat-panel"
          style={{
            position: "fixed",
            bottom: "96px",
            right: "24px",
            width: "min(380px, calc(100vw - 48px))",
            height: "min(520px, calc(100vh - 160px))",
            background: t.bg,
            border: "1px solid " + t.cardBorder,
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            cursor: "auto",
            ...(isMobile && {
              top: 0,
              left: 0,
              right: 0,
              bottom: "auto",
              width: "100vw",
              height: (viewportHeight ?? window.innerHeight) + "px",
              maxHeight: "none",
              border: "none",
            }),
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid " + t.divider,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div>
              <p
                style={{
                  ...labelStyle,
                  color: t.accentText,
                  marginBottom: "4px",
                }}
              >
                Ask about Macky
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "0.95rem",
                  color: t.heading,
                }}
              >
                Skills, projects & experience
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="mk-close"
              style={{
                background: "transparent",
                border: "none",
                color: t.muted,
                cursor: "pointer",
                padding: "4px",
                transition: "opacity 0.15s ease",
              }}
            >
              <CloseIcon style={{ width: "18px", height: "18px" }} />
            </button>
          </div>

          <div
            role="log"
            aria-live="polite"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.length === 0 && (
              <>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: t.muted,
                    lineHeight: 1.6,
                  }}
                >
                  Ask me anything about Macky's skills, projects, or experience.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="mk-chip"
                      onClick={() => sendMessage(q)}
                      style={{
                        textAlign: "left",
                        fontSize: "0.78rem",
                        lineHeight: 1.4,
                        padding: "10px 12px",
                        border: "1px solid " + t.cardBorder,
                        background: t.bgAlt,
                        color: t.body,
                        cursor: "pointer",
                        transition: "opacity 0.15s ease",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className="mk-msg"
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  fontSize: "0.82rem",
                  lineHeight: 1.6,
                  border:
                    "1px solid " +
                    (m.isError
                      ? "#b3564f"
                      : m.role === "user"
                        ? t.accentText
                        : t.cardBorder),
                  color: m.isError
                    ? "#b3564f"
                    : m.role === "user"
                      ? t.accentText
                      : t.body,
                  background: m.role === "user" ? "transparent" : t.bgAlt,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {m.text}
              </div>
            ))}

            {sending && (
              <div
                className="mk-msg"
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                  padding: "12px 14px",
                  border: "1px solid " + t.cardBorder,
                  background: t.bgAlt,
                }}
                aria-label="Thinking"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="mk-dot"
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: t.muted,
                      display: "inline-block",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSend}
            style={{
              display: "flex",
              gap: "8px",
              padding: "14px 20px",
              borderTop: "1px solid " + t.divider,
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <textarea
              ref={inputRef}
              className="mk-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a question..."
              disabled={sending}
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid " + t.cardBorder,
                color: t.bodyStrong,
                fontSize: "0.82rem",
                fontFamily: "inherit",
                padding: "8px 12px",
                outline: "none",
                cursor: "text",
                resize: "none",
                maxHeight: "120px",
                lineHeight: 1.5,
              }}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="mk-send"
              style={{
                ...labelStyle,
                padding: "9px 16px",
                border: "1px solid " + t.accentText,
                color: t.accentText,
                background: "transparent",
                cursor: "pointer",
                opacity: sending || !input.trim() ? 0.4 : 1,
                transition: "opacity 0.15s ease",
                flexShrink: 0,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {!open && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 1001,
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            className={!everOpened ? "mk-fab-pulse" : ""}
            style={{
              position: "relative",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: t.accentText,
              color: t.isDark ? "#080808" : "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              cursor: "pointer",
            }}
          >
            <ChatIcon style={{ width: "22px", height: "22px" }} />
          </button>
        </div>
      )}
    </>
  );
}
