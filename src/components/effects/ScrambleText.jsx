import { useEffect, useRef, useState } from "react";
import { useInView } from "../../utils/hooks"; // reuses your existing hook

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Drop-in replacement for a heading's text content. Scrambles random
 * characters then resolves into the real text once it scrolls into view.
 * Usage: <h2 style={{...}}><ScrambleText text="Technical Toolkit" /></h2>
 *
 * duration        - total time (ms) for the whole word to fully resolve
 * scrambleFps     - how often (times/sec) the *unrevealed* chars flicker
 *                    to a new random symbol. Lower = calmer, more readable.
 */
export default function ScrambleText({
  text,
  duration = 1600,
  scrambleFps = 12,
}) {
  const [ref, inView] = useInView(0.4);
  const [display, setDisplay] = useState(text);
  const played = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    if (!inView || played.current) return;
    played.current = true;

    const start = performance.now();
    const scrambleInterval = 1000 / scrambleFps;
    let lastScrambleAt = 0;
    let scrambleFrame = new Array(text.length).fill("");

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out so the reveal starts steady and settles gently at the end
      const eased = 1 - Math.pow(1 - progress, 2);
      const revealCount = Math.floor(eased * text.length);

      // only re-roll the random symbols a few times a second, not every frame
      if (now - lastScrambleAt > scrambleInterval) {
        lastScrambleAt = now;
        scrambleFrame = scrambleFrame.map(
          () => CHARS[Math.floor(Math.random() * CHARS.length)],
        );
      }

      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          out += " ";
        } else if (i < revealCount) {
          out += text[i];
        } else {
          out += scrambleFrame[i];
        }
      }
      setDisplay(out);

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [inView, text, duration, scrambleFps]);

  return <span ref={ref}>{display}</span>;
}
