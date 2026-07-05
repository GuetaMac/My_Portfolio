import { CERTS } from "../constants";
import { FadeIn } from "../utils/hooks";

function SectionLabel({ children, t }) {
  return (
    <p
      style={{
        color: t.accentText,
        fontFamily: "monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.22em",
        marginBottom: "40px",
        transition: "color 0.4s",
      }}
    >
      {children}
    </p>
  );
}

export default function Experience({ t }) {
  return (
    <section
      id="experience"
      className="experience-section"
      style={{
        background: t.bgAlt,
        transition: "background 0.4s",
      }}
    >
      <style>{`
        .experience-section {
          padding: 120px 48px;
        }
        .experience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 80px;
        }
        .experience-card {
          padding: 28px 32px;
        }

        @media (max-width: 640px) {
          .experience-section {
            padding: 72px 24px;
          }
          .experience-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .experience-card {
            padding: 22px 20px;
          }
        }
      `}</style>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel t={t}>04 — EXPERIENCE & RECOGNITION</SectionLabel>
        </FadeIn>
        <div className="experience-grid">
          {/* Left column */}
          <div>
            <FadeIn delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  color: t.heading,
                  fontWeight: 700,
                  marginBottom: "40px",
                  transition: "color 0.4s",
                }}
              >
                Internship
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div
                className="experience-card"
                style={{
                  border: "1px solid " + t.cardBorder,
                  transition: "border-color 0.4s",
                }}
              >
                <p
                  style={{
                    color: t.accentText,
                    fontFamily: "monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.14em",
                    marginBottom: "10px",
                    transition: "color 0.4s",
                  }}
                >
                  FEB – MAY 2026
                </p>
                <h3
                  style={{
                    color: t.heading,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    marginBottom: "6px",
                    transition: "color 0.4s",
                  }}
                >
                  OJT Trainee
                </h3>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    color: t.muted,
                    marginBottom: "20px",
                    lineHeight: 1.6,
                    transition: "color 0.4s",
                  }}
                >
                  Research Management Services –<br />
                  Research Publication Management
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    "Led development and debugging of a Research Publication Management System",
                    "Built database integration and workflow implementation",
                    "Produced charts and visual reports for documentation",
                    "Installed and configured 3 office systems",
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "12px",
                        color: t.body,
                        fontSize: "0.85rem",
                        fontFamily: "Georgia, serif",
                        lineHeight: 1.6,
                        transition: "color 0.4s",
                      }}
                    >
                      <span
                        style={{
                          color: t.accentText,
                          flexShrink: 0,
                          marginTop: "1px",
                          transition: "color 0.4s",
                        }}
                      >
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div style={{ marginTop: "36px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.05rem",
                    color: t.heading,
                    marginBottom: "18px",
                    transition: "color 0.4s",
                  }}
                >
                  Academic Honors
                </h3>

                {/* Cum Laude highlight */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 16px",
                    marginBottom: "14px",
                    border: "1px solid " + t.cardBorder,
                    transition: "border-color 0.4s, color 0.4s",
                  }}
                >
                  <span
                    style={{
                      color: t.accentText,
                      fontFamily: "monospace",
                      fontSize: "0.7rem",
                    }}
                  >
                    ✦
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.75rem",
                      color: t.bodyStrong,
                      letterSpacing: "0.06em",
                    }}
                  >
                    Cum Laude — Graduate
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {[
                    "2nd Sem AY 2022–2023",
                    "2nd Sem AY 2023–2024",
                    "1st Sem AY 2024–2025",
                    "2nd Sem AY 2024–2025",
                  ].map((sem) => (
                    <div
                      key={sem}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        paddingBottom: "12px",
                        borderBottom: "1px solid " + t.divider,
                        transition: "border-color 0.4s",
                      }}
                    >
                      <span
                        style={{
                          color: t.accentText,
                          fontFamily: "monospace",
                          fontSize: "0.6rem",
                          transition: "color 0.4s",
                        }}
                      >
                        ★
                      </span>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.72rem",
                          color: t.body,
                          transition: "color 0.4s",
                        }}
                      >
                        Dean's Lister — {sem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right column */}
          <div>
            <FadeIn delay={0.1}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  color: t.heading,
                  fontWeight: 700,
                  marginBottom: "40px",
                  transition: "color 0.4s",
                }}
              >
                Certifications
              </h2>
            </FadeIn>
            <div>
              {CERTS.map((cert, i) => (
                <FadeIn key={cert.title} delay={0.12 * i}>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      padding: "20px 0",
                      borderBottom: "1px solid " + t.divider,
                      transition: "border-color 0.4s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.65rem",
                        color: t.accentMuted,
                        minWidth: "32px",
                        paddingTop: "2px",
                        flexShrink: 0,
                        transition: "color 0.4s",
                      }}
                    >
                      {cert.year}
                    </span>
                    <div>
                      <p
                        style={{
                          color: t.bodyStrong,
                          fontSize: "0.85rem",
                          fontFamily: "Georgia, serif",
                          lineHeight: 1.6,
                          marginBottom: "4px",
                          transition: "color 0.4s",
                        }}
                      >
                        {cert.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.62rem",
                          color: t.muted,
                          letterSpacing: "0.04em",
                          transition: "color 0.4s",
                        }}
                      >
                        {cert.org}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
