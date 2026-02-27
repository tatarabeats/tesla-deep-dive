import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { storyScenes } from "../../data/storyScenes";

const CHAPTER_META: Record<number, { label: string; color: string }> = {
  1: { label: "単一惑星への依存", color: "rgba(80, 200, 255, 0.9)" },
  2: { label: "化石燃料への依存", color: "rgba(255, 90, 80, 0.9)" },
  3: { label: "制御できないAI", color: "rgba(180, 130, 255, 0.9)" },
  4: { label: "労働力の消滅", color: "rgba(80, 220, 140, 0.9)" },
  5: { label: "渋滞で失われる命", color: "rgba(200, 180, 150, 0.9)" },
  6: { label: "つながれない22億人", color: "rgba(232, 220, 200, 0.9)" },
};

export default function ChapterIndicator() {
  const { scrollYProgress } = useScroll();
  const [current, setCurrent] = useState<number | null>(null);
  const [justChanged, setJustChanged] = useState(false);
  const prevChapter = useRef<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.floor(v * storyScenes.length);
    const scene = storyScenes[Math.min(idx, storyScenes.length - 1)];
    setCurrent(scene?.chapter ?? null);
  });

  useEffect(() => {
    if (current !== prevChapter.current && current !== null) {
      setJustChanged(true);
      const timer = setTimeout(() => setJustChanged(false), 1500);
      prevChapter.current = current;
      return () => clearTimeout(timer);
    }
    if (current === null) {
      prevChapter.current = null;
    }
  }, [current]);

  const meta = current ? CHAPTER_META[current] : null;

  return (
    <AnimatePresence>
      {meta && (
        <motion.div
          className="chapter-indicator"
          key={current}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: justChanged ? 0.95 : 0.4,
            scale: justChanged ? 1.05 : 1,
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="chapter-indicator__num"
            style={{ color: meta.color }}
          >
            危機 {String(current).padStart(2, "0")}
          </span>
          <span className="chapter-indicator__divider" />
          <span className="chapter-indicator__label">{meta.label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
