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
import CountUp from "../effects/CountUp";
import ParticleField from "../effects/ParticleField";
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

export default function FullBleedStat({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image parallax
  const rawImageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["10%", "-10%"],
  );
  const rawImageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [1, 1] : [1.15, 1],
  );
  const imageY = useSpring(rawImageY, SPRING);
  const imageScale = useSpring(rawImageScale, SPRING);
  const imageOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0, 0.15],
    [0, 1],
  );

  // Stat animation: big number scales up
  const statOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08, 0.9, 1] : [0.1, 0.22, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const statScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08] : [0.1, 0.22],
    isMobile ? [1, 1] : [0.6, 1],
  );

  // Text animation
  const textOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05, 0.9, 1] : [0.06, 0.18, 0.88, 0.97],
    [0, 1, 1, 0],
  );
  const textY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0.06, 0.18],
    isMobile ? [0, 0] : [30, 0],
  );

  // Sub text
  const subOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08, 0.9, 1] : [0.12, 0.25, 0.85, 0.95],
    [0, 1, 1, 0],
  );

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;

  return (
    <section
      ref={ref}
      className="cin-scene cin-full-bleed"
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
          count={isMobile ? 10 : 30}
          hue={getChapterParticleHue(scene.chapter)}
          speed={0.15}
          connectDistance={0}
          interactive={false}
          variant="nebula"
        />
      )}

      <div className="cin-full-bleed__content">
        {scene.badge && (
          <motion.span
            className="cin-full-bleed__badge"
            style={{
              borderColor: scene.accentColor,
              color: scene.accentColor,
              opacity: textOpacity,
            }}
          >
            {scene.badge}
          </motion.span>
        )}

        <motion.h2
          className="cin-full-bleed__text"
          style={{ opacity: textOpacity, y: textY }}
        >
          {scene.text}
        </motion.h2>

        {scene.stat && (
          <motion.div
            className="cin-full-bleed__stat"
            style={{ opacity: statOpacity, scale: statScale }}
            whileHover={{
              scale: 1.08,
              filter: `drop-shadow(0 0 30px ${scene.accentColor}) drop-shadow(0 0 60px ${scene.accentColor}40)`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CountUp
              value={scene.stat}
              color={scene.accentColor}
              label={scene.statLabel}
              duration={2500}
            />
          </motion.div>
        )}

        {scene.subText && (
          <motion.p
            className="cin-full-bleed__sub"
            style={{ opacity: subOpacity }}
          >
            {scene.subText}
          </motion.p>
        )}
      </div>
    </section>
  );
}
