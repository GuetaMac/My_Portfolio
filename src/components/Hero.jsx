import { useState } from "react";
import photo from "../assets/photo.jpg";
import { FadeIn, AnimatedWord } from "../utils/hooks";

export default function Hero({ t }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      id="about"
      className="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: t.bg,
        transition: "background 0.4s",
      }}
    >
      <style>{`
        .hero-section {
          padding: 100px 48px 80px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 80px;
          align-items: center;
        }
        .hero-photo-wrap {
          width: 220px;
          height: 220px;
        }
        .hero-meta-row {
          display: flex;
          gap: 0;
          flex-wrap: wrap;
        }
        .hero-meta-item {
          padding-right: 40px;
          margin-right: 40px;
        }
        .hero-cta-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .hero-section {
            padding: 100px 24px 56px;
            min-height: unset;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-grid > div:first-child {
            order: 2;
          }
          .hero-grid > div:last-child {
            order: 1;
          }
          .hero-photo-wrap {
            width: 160px;
            height: 160px;
          }
          .hero-meta-row {
            flex-direction: column;
            gap: 20px;
            padding-top: 20px !important;
          }
          .hero-meta-item {
            padding-right: 0;
            margin-right: 0;
            border-right: none !important;
          }
          .hero-cta-row {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-cta-row a,
          .hero-cta-row button {
            text-align: center;
          }
        }
      `}</style>
      <div
        className="hero-grid"
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Left: text */}
        <div>
          <FadeIn delay={0.05}>
            <p
              style={{
                color: t.accentText,
                fontFamily: "monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                marginBottom: "28px",
                transition: "color 0.4s",
              }}
            >
              DEVELOPER — BATANGAS, PH
            </p>
          </FadeIn>

          <div style={{ overflow: "hidden", marginBottom: "6px" }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.2rem, 5vw, 4.8rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                color: t.heading,
                letterSpacing: "-0.025em",
                margin: 0,
                transition: "color 0.4s",
              }}
            >
              <AnimatedWord
                word="Mac"
                delay={0.1}
                color={t.heading}
                style={{ marginRight: "0.22em" }}
              />
              <AnimatedWord word="Kenny" delay={0.22} color={t.heading} />
            </h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "32px" }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.2rem, 5vw, 4.8rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                margin: 0,
                letterSpacing: "-0.025em",
              }}
            >
              <AnimatedWord
                word="G."
                delay={0.32}
                color={t.accentText}
                style={{ marginRight: "0.22em" }}
              />
              <AnimatedWord word="Aleta" delay={0.42} color={t.accentText} />
            </h1>
          </div>

          <FadeIn delay={0.56}>
            <p
              style={{
                color: t.body,
                fontFamily: "Georgia, serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: "460px",
                marginBottom: "36px",
                transition: "color 0.4s",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              IT graduate specializing in web system development. Passionate
              about building responsive websites and functional web applications
              that provide seamless user experiences and solve real-world
              challenges.
            </p>
          </FadeIn>

          <FadeIn delay={0.68}>
            <div
              className="hero-cta-row"
              style={{
                marginBottom: "56px",
              }}
            >
              <a
                href="mailto:aletamackenny@gmail.com"
                style={{
                  padding: "11px 28px",
                  border: "1px solid " + t.accentText,
                  color: t.accentText,
                  background: "transparent",
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "all 0.22s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = t.accentText;
                  e.currentTarget.style.color = t.isDark ? "#080808" : "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = t.accentText;
                }}
              >
                Get in touch
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  padding: "11px 28px",
                  border: "1px solid " + t.cardBorder,
                  color: t.muted,
                  background: "transparent",
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "none",
                  transition: "all 0.22s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = t.bodyStrong;
                  e.currentTarget.style.color = t.heading;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.cardBorder;
                  e.currentTarget.style.color = t.muted;
                }}
              >
                View work ↓
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.78}>
            <div
              className="hero-meta-row"
              style={{
                borderTop: "1px solid " + t.divider,
                paddingTop: "28px",
                transition: "border-color 0.4s",
              }}
            >
              {[
                { label: "Degree", value: "BSIT — Business Analytics" },
                { label: "University", value: "BatStateU Alangilan" },
                { label: "Year", value: "2026" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="hero-meta-item"
                  style={{
                    borderRight: i < 2 ? "1px solid " + t.divider : "none",
                    transition: "border-color 0.4s",
                  }}
                >
                  <p
                    style={{
                      color: t.accentMuted,
                      fontFamily: "monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      marginBottom: "5px",
                      transition: "color 0.4s",
                    }}
                  >
                    {item.label.toUpperCase()}
                  </p>
                  <p
                    style={{
                      color: t.bodyStrong,
                      fontSize: "0.82rem",
                      transition: "color 0.4s",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right: photo */}
        <FadeIn delay={0.3}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              className="hero-photo-wrap"
              style={{
                borderRadius: "50%",
                padding: "4px",
                background: `conic-gradient(${t.accentText} 0deg, ${t.accentText} 120deg, transparent 120deg, transparent 180deg, ${t.accentText} 180deg, ${t.accentText} 300deg, transparent 300deg)`,
                transition: "background 0.4s",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  padding: "3px",
                  background: t.bg,
                  transition: "background 0.4s",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: t.bgAlt,
                  }}
                >
                  <img
                    src={photo}
                    alt="Mac Kenny G. Aleta"
                    onLoad={() => setImgLoaded(true)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                      opacity: imgLoaded ? 1 : 0,
                      transition: "opacity 0.6s ease",
                    }}
                  />
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: t.accentMuted,
                transition: "color 0.4s",
              }}
            >
              MKG / 2026
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
