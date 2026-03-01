import { useRef } from "react";
import { useScroll, type MotionValue } from "framer-motion";

interface UseStickyScrollReturn {
  containerRef: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
}

/**
 * Sticky Sequence パターン用 hook
 * 高さのある wrapper (e.g. 300vh) 内で sticky コンテンツを固定し、
 * スクロール量を 0→1 の progress として返す
 */
export function useStickyScroll(): UseStickyScrollReturn {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return { containerRef, scrollYProgress };
}
