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

export default function Contact({ t }) {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 48px 80px",
        background: t.bg,
        transition: "background 0.4s",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel t={t}>05 — CONTACT</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: t.heading,
              fontWeight: 700,
              lineHeight: 1.0,
              marginBottom: "32px",
              letterSpacing: "-0.02em",
              transition: "color 0.4s",
            }}
          >
            Let's work
            <br />
            <span style={{ color: t.accentText }}>together.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p
            style={{
              color: t.body,
              fontFamily: "Georgia, serif",
              maxWidth: "440px",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "56px",
              transition: "color 0.4s",
            }}
          >
            Open to web developer roles, freelance projects, and collaboration.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div
            style={{
              borderTop: "1px solid " + t.divider,
              transition: "border-color 0.4s",
            }}
          >
            {[
              {
                label: "Email",
                value: "aletamackenny@gmail.com",
                href: "mailto:aletamackenny@gmail.com",
              },
              { label: "Phone", value: "09086503617", href: "tel:09086503617" },
              {
                label: "Location",
                value: "Palindan Ibaan, Batangas, PH",
                href: null,
              },
              {
                label: "LinkedIn",
                value: "mac-kenny-aleta",
                href: "https://www.linkedin.com/in/mac-kenny-aleta-6363ba39b/",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "32px",
                  padding: "20px 0",
                  borderBottom: "1px solid " + t.divider,
                  transition: "border-color 0.4s",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.62rem",
                    width: "60px",
                    color: t.accentMuted,
                    letterSpacing: "0.12em",
                    flexShrink: 0,
                    transition: "color 0.4s",
                  }}
                >
                  {item.label.toUpperCase()}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      color: t.bodyStrong,
                      textDecoration: "none",
                      fontFamily: "Georgia, serif",
                      fontSize: "0.9rem",
                      transition: "color 0.22s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = t.accentText)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = t.bodyStrong)
                    }
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      color: t.body,
                      fontFamily: "Georgia, serif",
                      fontSize: "0.9rem",
                      transition: "color 0.4s",
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              marginTop: "80px",
              paddingBottom: "16px",
              color: t.footerText,
              letterSpacing: "0.14em",
              transition: "color 0.4s",
            }}
          ></p>
        </FadeIn>
      </div>
    </section>
  );
}
