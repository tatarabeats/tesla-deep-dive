import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHAPTER_META: Record<number, { label: string; color: string }> = {
  1: { label: "単一惑星への依存", color: "rgba(80, 200, 255, 0.9)" },
  2: { label: "化石燃料への依存", color: "rgba(255, 90, 80, 0.9)" },
  3: { label: "制御できないAI", color: "rgba(180, 130, 255, 0.9)" },
  4: { label: "労働力の不足", color: "rgba(80, 220, 140, 0.9)" },
  5: { label: "動かない車、消える時間", color: "rgba(200, 180, 150, 0.9)" },
  6: { label: "つながれない22億人", color: "rgba(232, 220, 200, 0.9)" },
};

const CHAPTER_IDS: [number, string][] = [
  [1, "ch1-title"],
  [2, "ch2-title"],
  [3, "ch3-title"],
  [4, "ch4-title"],
  [5, "ch5-title"],
  [6, "ch6-title"],
];

export default function ChapterIndicator() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  // Cache DOM elements so we querySelector only once
  const elMapRef = useRef<Map<number, Element>>(new Map());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Populate cached element map after DOM is ready
    const timer = setTimeout(() => {
      for (const [ch, id] of CHAPTER_IDS) {
        const el = document.querySelector(`[data-scene="${id}"]`);
        if (el) elMapRef.current.set(ch, el);
      }
    }, 100);

    // Throttled scroll handler using requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        let best: number | null = null;
        for (const [ch] of CHAPTER_IDS) {
          const el = elMapRef.current.get(ch);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 0) {
            best = ch;
          }
        }
        setActiveChapter(best);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const meta = activeChapter ? CHAPTER_META[activeChapter] : null;

  return (
    <div className="chapter-indicator-wrapper">
      <AnimatePresence>
        {activeChapter && meta && (
          <motion.div
            className="chapter-indicator"
            key={activeChapter}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="chapter-indicator__num"
              style={{ color: meta.color }}
            >
              危機 {String(activeChapter).padStart(2, "0")}
            </span>
            <span className="chapter-indicator__divider" />
            <span className="chapter-indicator__label">{meta.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
