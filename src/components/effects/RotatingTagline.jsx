import { useEffect, useState } from "react";

const DEFAULT_ROLES = [
  "Backend Developer",
  "QA / Software Quality Analyst",
  "IT Support",
  "Data Analyst",
  "Full Stack Developer",
  "Software Engineer",
  "Web Developer",
];

const HOLD_MS = 2200;
const TRANSITION_MS = 400;

export default function RotatingTagline({ roles = DEFAULT_ROLES, t }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, TRANSITION_MS);
    }, HOLD_MS);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span
      style={{
        display: "inline-block",
        color: t.accentText,
        fontFamily: "monospace",
        fontSize: "0.95rem",
        letterSpacing: "0.02em",
        minWidth: "1px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
      }}
    >
      {roles[index]}
    </span>
  );
}
