import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useMemo, useState } from "react";
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
  const [showIndicator, setShowIndicator] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);

  const chapterTitleIndices = useMemo(() => {
    const map: Record<number, number> = {};
    storyScenes.forEach((scene, i) => {
      if (scene.type === "chapter-title" && scene.chapter) {
        map[scene.chapter] = i;
      }
    });
    return map;
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = storyScenes.length;
    const idx = Math.min(Math.floor(v * total), total - 1);
    const scene = storyScenes[idx];
    const chapter = scene?.chapter ?? null;

    setCurrentChapter(chapter);

    if (chapter && chapterTitleIndices[chapter] !== undefined) {
      const titleIdx = chapterTitleIndices[chapter];
      setShowIndicator(idx > titleIdx + 1);
    } else {
      setShowIndicator(false);
    }
  });

  const meta = currentChapter ? CHAPTER_META[currentChapter] : null;

  return (
    <AnimatePresence>
      {showIndicator && meta && (
        <motion.div
          className="chapter-indicator"
          key={currentChapter}
          initial={{ opacity: 0, y: -10, scale: 1.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span
            className="chapter-indicator__num"
            style={{ color: meta.color }}
          >
            危機 {String(currentChapter).padStart(2, "0")}
          </span>
          <span className="chapter-indicator__divider" />
          <span className="chapter-indicator__label">{meta.label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
