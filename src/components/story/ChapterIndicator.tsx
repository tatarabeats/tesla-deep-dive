import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const CHAPTER_META: Record<number, { label: string; color: string }> = {
  1: { label: "単一惑星への依存", color: "rgba(80, 200, 255, 0.9)" },
  2: { label: "化石燃料への依存", color: "rgba(255, 90, 80, 0.9)" },
  3: { label: "制御できないAI", color: "rgba(180, 130, 255, 0.9)" },
  4: { label: "労働力の消滅", color: "rgba(80, 220, 140, 0.9)" },
  5: { label: "渋滞で失われる命", color: "rgba(200, 180, 150, 0.9)" },
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

  useEffect(() => {
    // Track which chapter-title elements are currently visible
    const visible = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ch = Number(entry.target.getAttribute("data-chapter"));
          if (entry.isIntersecting) {
            visible.add(ch);
          } else {
            visible.delete(ch);
          }
        }

        // Find the highest chapter whose title has scrolled OUT of view
        // by checking scroll position relative to each title element
        let best: number | null = null;
        for (const [ch, id] of CHAPTER_IDS) {
          const el = document.querySelector(`[data-scene="${id}"]`);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // Title has scrolled past (bottom edge is above viewport)
          if (rect.bottom < 0 && !visible.has(ch)) {
            best = ch;
          }
        }
        setActiveChapter(best);
      },
      { threshold: 0 },
    );

    // Wait for DOM to be ready, then observe chapter-title elements
    const timer = setTimeout(() => {
      for (const [, id] of CHAPTER_IDS) {
        const el = document.querySelector(`[data-scene="${id}"]`);
        if (el) {
          el.setAttribute(
            "data-chapter",
            String(CHAPTER_IDS.find(([, i]) => i === id)![0]),
          );
          observer.observe(el);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Also listen to scroll to update which chapter is "past"
  useEffect(() => {
    const onScroll = () => {
      let best: number | null = null;
      for (const [ch, id] of CHAPTER_IDS) {
        const el = document.querySelector(`[data-scene="${id}"]`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0) {
          best = ch;
        }
      }
      setActiveChapter(best);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const meta = activeChapter ? CHAPTER_META[activeChapter] : null;

  return (
    <div className="chapter-indicator-wrapper">
      <AnimatePresence>
        {activeChapter && meta && (
          <motion.div
            className="chapter-indicator"
            key={activeChapter}
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
