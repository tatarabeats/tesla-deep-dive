import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import type { CinematicScene } from "../../types/cinematic";
import SceneImage from "../story/SceneImage";
import ParticleField from "../effects/ParticleField";
import LetterReveal from "../effects/LetterReveal";
import { useIsMobile } from "./hooks/useIsMobile";

const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

function getChapterParticleHue(chapter: number | null): number {
  switch (chapter) {
    case 1:
      return 200;
    case 2:
      return 10;
    case 3:
      return 270;
    case 4:
      return 140;
    case 5:
      return 35;
    case 6:
      return 220;
    default:
      return 30;
  }
}

interface Props {
  scene: CinematicScene;
}

export default function ChapterGate({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Ken Burns: slow zoom + drift
  const rawImageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["10%", "-10%"],
  );
  const rawImageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [1, 1] : [1.2, 1.05],
  );
  const imageY = useSpring(rawImageY, SPRING);
  const imageScale = useSpring(rawImageScale, SPRING);
  const imageOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0, 0.15],
    [0, 1],
  );

  // Chapter number animation
  const numOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05, 0.9, 1] : [0.05, 0.18, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const numScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0.05, 0.18],
    isMobile ? [1, 1] : [0.5, 1],
  );

  // Title animation
  const titleOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08, 0.9, 1] : [0.08, 0.2, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const titleScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08, 0.9, 1] : [0.1, 0.25, 0.85, 0.95],
    isMobile ? [1, 1, 1, 1] : [0.8, 1, 1, 1.15],
  );
  const titleY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08] : [0.1, 0.25],
    isMobile ? [0, 0] : [30, 0],
  );

  // Decorative line
  const lineScaleX = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.1, 0.9, 1] : [0.15, 0.3, 0.85, 0.95],
    [0, 1, 1, 0],
  );

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;

  return (
    <section
      ref={ref}
      className="cin-scene cin-chapter-gate"
      data-scene={scene.id}
    >
      {imgSrc && (
        <SceneImage
          src={imgSrc}
          imageY={imageY}
          imageScale={imageScale}
          imageOpacity={imageOpacity}
        />
      )}

      {isInView && (
        <ParticleField
          count={isMobile ? 15 : 40}
          hue={getChapterParticleHue(scene.chapter)}
          speed={0.2}
          connectDistance={0}
          interactive={false}
          variant="stars"
        />
      )}

      <div className="cin-chapter-gate__content">
        <motion.span
          className="cin-chapter-gate__num"
          style={{
            color: scene.accentColor,
            opacity: numOpacity,
            scale: numScale,
          }}
        >
          {scene.chapterNum}
        </motion.span>

        <motion.div
          style={{
            opacity: titleOpacity,
            scale: titleScale,
            y: titleY,
          }}
        >
          <LetterReveal
            text={scene.text ?? ""}
            className="cin-chapter-gate__title"
            glowColor={scene.accentColor}
            staggerDelay={0.05}
          />
        </motion.div>

        <motion.div
          className="cin-chapter-gate__line"
          style={{
            backgroundColor: scene.accentColor,
            boxShadow: `0 0 20px ${scene.accentColor}`,
            scaleX: lineScaleX,
            transformOrigin: "center",
          }}
        />
      </div>
    </section>
  );
}
