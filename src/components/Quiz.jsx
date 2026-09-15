import { useEffect, useState } from "react";
import { PROJECTS, SKILLS, CERTS } from "../constants";
import { FadeIn } from "../utils/hooks";
import { triggerConfetti } from "../utils/confetti"; // NEW

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

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// All questions are derived live from the portfolio's own data
// (constants.js) so they stay accurate as projects/skills/certs change.
function buildQuestions() {
  const questions = [];

  // Q1 — which project won the BI Challenge
  const biProject = PROJECTS.find((p) => p.highlight.includes("BI Challenge"));
  if (biProject) {
    const distractors = pickRandom(
      PROJECTS.filter((p) => p.id !== biProject.id).map((p) => p.title),
      3,
    );
    const options = shuffle([biProject.title, ...distractors]);
    questions.push({
      question:
        "Which of Mac Kenny's projects placed 2nd in the BatStateU BI Challenge?",
      options,
      correctIndex: options.indexOf(biProject.title),
    });
  }

  // Q2 — tech stack of a random project
  const techProject = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
  const correctTech =
    techProject.tech[Math.floor(Math.random() * techProject.tech.length)];
  const otherTechPool = [
    ...new Set(
      PROJECTS.filter((p) => p.id !== techProject.id)
        .flatMap((p) => p.tech)
        .filter((t) => !techProject.tech.includes(t)),
    ),
  ];
  const techDistractors = pickRandom(otherTechPool, 3);
  const techOptions = shuffle([correctTech, ...techDistractors]);
  questions.push({
    question: `Which of these was used in "${techProject.title}"?`,
    options: techOptions,
    correctIndex: techOptions.indexOf(correctTech),
  });

  // Q3 — how many projects total (always accurate, self-updating)
  const total = PROJECTS.length;
  const countOptions = shuffle([total, total - 2, total + 1, total + 3]).map(
    String,
  );
  questions.push({
    question: "How many projects are currently in Mac Kenny's portfolio?",
    options: countOptions,
    correctIndex: countOptions.indexOf(String(total)),
  });

  // Q4 — odd one out from a skill category
  const categories = Object.keys(SKILLS);
  const targetCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const realSkills = pickRandom(SKILLS[targetCategory], 3);
  const otherCategoryPool = categories
    .filter((c) => c !== targetCategory)
    .flatMap((c) => SKILLS[c])
    .filter((s) => !SKILLS[targetCategory].includes(s));
  const intruder =
    otherCategoryPool[Math.floor(Math.random() * otherCategoryPool.length)];
  const skillOptions = shuffle([...realSkills, intruder]);
  questions.push({
    question: `Which of these four is NOT one of his "${targetCategory}" skills?`,
    options: skillOptions,
    correctIndex: skillOptions.indexOf(intruder),
  });

  // Q5 — real certification vs. project-title decoys
  const realCert = CERTS[Math.floor(Math.random() * CERTS.length)];
  const certDistractors = pickRandom(
    PROJECTS.map((p) => p.title),
    3,
  );
  const certOptions = shuffle([realCert.title, ...certDistractors]);
  questions.push({
    question:
      "Which of these is an actual certification or training he completed?",
    options: certOptions,
    correctIndex: certOptions.indexOf(realCert.title),
  });

  return questions;
}

const RESULT_TIERS = [
  { min: 5, label: "Perfect score — you really know Mac Kenny!" },
  { min: 3, label: "Great job — almost a perfect run!" },
  { min: 1, label: "Not bad, you know a fair bit about him." },
  { min: 0, label: "Time to scroll back up and learn more!" },
];

function ActionButton({ children, onClick, style = {}, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "11px 28px",
        border: `1px solid var(--accent)`,
        color: "var(--accent)",
        background: "transparent",
        fontFamily: "monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: "none",
        borderRadius: "4px",
        transition: "all 0.22s",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Quiz({ t }) {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState(() => buildQuestions());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const isLast = index === questions.length - 1;
  const tier = RESULT_TIERS.find((r) => score >= r.min);

  // NEW: fire confetti once, right when a perfect run finishes
  useEffect(() => {
    if (finished && score === questions.length) {
      triggerConfetti(t.accentText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const handlePick = (i) => {
    if (locked) return;
    setSelected(i);
  };

  const handleCheck = () => {
    if (selected === null || locked) return;
    setLocked(true);
    if (selected === current.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((n) => n + 1);
    setSelected(null);
    setLocked(false);
  };

  const handleStart = () => {
    setQuestions(buildQuestions());
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const btnHover = (e, enter) => {
    e.currentTarget.style.background = enter ? t.accentText : "transparent";
    e.currentTarget.style.color = enter
      ? t.isDark
        ? "#080808"
        : "#fff"
      : t.accentText;
  };

  return (
    <section
      id="quiz"
      className="quiz-section"
      style={{
        background: t.bg,
        transition: "background 0.4s",
        "--accent": t.accentText,
      }}
    >
      <style>{`
        .quiz-section {
          padding: 120px 48px;
        }
        .quiz-card {
          padding: 40px;
        }
        .quiz-option {
          padding: 16px 20px;
        }

        @media (max-width: 640px) {
          .quiz-section {
            padding: 72px 24px;
          }
          .quiz-card {
            padding: 24px 20px;
          }
          .quiz-option {
            padding: 14px 16px;
          }
        }
      `}</style>

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel t={t}>05 — HOW WELL DO YOU KNOW ME?</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.08}>
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
            Mini Quiz
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div
            className="quiz-card"
            style={{
              border: `1px solid ${t.cardBorder}`,
              background: t.cardBg,
              borderRadius: "8px",
              transition: "background 0.4s, border-color 0.4s",
            }}
          >
            {!started ? (
              // ---- Ready / start screen ----
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontSize: "2.2rem", marginBottom: "16px" }}></p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    color: t.heading,
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  Ready to test how well you know me?
                </p>
                <p
                  style={{
                    color: t.body,
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    maxWidth: "420px",
                    margin: "0 auto 32px",
                  }}
                >
                  5 quick questions, all pulled straight from the projects,
                  skills, and certifications above.
                </p>
                <ActionButton
                  onClick={handleStart}
                  data-magnetic
                  data-cursor="START"
                  onMouseEnter={(e) => btnHover(e, true)}
                  onMouseLeave={(e) => btnHover(e, false)}
                >
                  Start quiz
                </ActionButton>
              </div>
            ) : !finished ? (
              // ---- Active question ----
              <>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    color: t.accentMuted,
                    marginBottom: "18px",
                  }}
                >
                  QUESTION {index + 1} / {questions.length}
                </p>
                <p
                  style={{
                    color: t.heading,
                    fontSize: "1.1rem",
                    lineHeight: 1.5,
                    marginBottom: "28px",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {current.question}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {current.options.map((opt, i) => {
                    const isCorrect = i === current.correctIndex;
                    const isSelected = i === selected;
                    let borderColor = t.cardBorder;
                    let bg = "transparent";
                    let textColor = t.bodyStrong;

                    if (locked) {
                      if (isCorrect) {
                        borderColor = t.accentText;
                        bg = t.accentFaint;
                        textColor = t.accentText;
                      } else if (isSelected) {
                        borderColor = "#e5484d";
                        bg = "rgba(229,72,77,0.08)";
                        textColor = "#e5484d";
                      }
                    } else if (isSelected) {
                      borderColor = t.accentText;
                      bg = t.accentFaint;
                      textColor = t.heading;
                    }

                    return (
                      <button
                        key={i}
                        className="quiz-option"
                        onClick={() => handlePick(i)}
                        data-magnetic={!locked ? true : undefined}
                        style={{
                          textAlign: "left",
                          border: `1px solid ${borderColor}`,
                          background: bg,
                          color: textColor,
                          borderRadius: "6px",
                          fontSize: "0.9rem",
                          cursor: locked ? "default" : "none",
                          transition:
                            "border-color 0.25s, background 0.25s, color 0.25s",
                        }}
                        onMouseEnter={(e) => {
                          if (!locked && !isSelected)
                            e.currentTarget.style.borderColor =
                              t.cardBorderHover;
                        }}
                        onMouseLeave={(e) => {
                          if (!locked && !isSelected)
                            e.currentTarget.style.borderColor = t.cardBorder;
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: "28px" }}>
                  {!locked ? (
                    <ActionButton
                      onClick={handleCheck}
                      data-magnetic={selected !== null ? true : undefined}
                      data-cursor="CHECK"
                      disabled={selected === null}
                      onMouseEnter={(e) =>
                        selected !== null && btnHover(e, true)
                      }
                      onMouseLeave={(e) => btnHover(e, false)}
                      style={{
                        opacity: selected === null ? 0.4 : 1,
                        cursor: selected === null ? "default" : "none",
                      }}
                    >
                      Check answer
                    </ActionButton>
                  ) : (
                    <ActionButton
                      onClick={handleNext}
                      data-magnetic
                      data-cursor={isLast ? "RESULTS" : "NEXT"}
                      onMouseEnter={(e) => btnHover(e, true)}
                      onMouseLeave={(e) => btnHover(e, false)}
                    >
                      {isLast ? "See results" : "Next question →"}
                    </ActionButton>
                  )}
                </div>
              </>
            ) : (
              // ---- Results screen ----
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <p style={{ fontSize: "2.4rem", marginBottom: "12px" }}>
                  {tier.emoji}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    color: t.heading,
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {score} / {questions.length}
                </p>
                <p
                  style={{
                    color: t.body,
                    fontSize: "0.95rem",
                    marginBottom: "32px",
                  }}
                >
                  {tier.label}
                </p>
                <ActionButton
                  onClick={handleStart}
                  data-magnetic
                  data-cursor="REPLAY"
                  onMouseEnter={(e) => btnHover(e, true)}
                  onMouseLeave={(e) => btnHover(e, false)}
                >
                  Play again
                </ActionButton>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
