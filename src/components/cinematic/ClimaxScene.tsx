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
import { useIsMobile } from "./hooks/useIsMobile";

const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

interface Props {
  scene: CinematicScene;
}

export default function ClimaxScene({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image
  const rawImageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["10%", "-10%"],
  );
  const rawImageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [1, 1] : [1.2, 1],
  );
  const imageY = useSpring(rawImageY, SPRING);
  const imageScale = useSpring(rawImageScale, SPRING);
  const imageOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0, 0.15],
    [0, 1],
  );

  // Flash overlay
  const flashOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0.05, 0.12, 0.25] : [0.1, 0.2, 0.35],
    [0, 0.8, 0],
  );

  // Glow
  const glowOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0.05, 0.12, 0.4] : [0.1, 0.22, 0.5],
    [0, 0.6, 0.15],
  );
  const glowScale = useTransform(
    scrollYProgress,
    isMobile ? [0.05, 0.12, 0.4] : [0.1, 0.22, 0.5],
    [0.3, 1.5, 2.0],
  );

  // Text
  const textOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05, 0.9, 1] : [0.08, 0.2, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const textScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0.08, 0.2],
    isMobile ? [1, 1] : [0.5, 1],
  );
  const textY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0.08, 0.2],
    isMobile ? [0, 0] : [20, 0],
  );

  // Sub text
  const subOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08, 0.9, 1] : [0.12, 0.25, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const subY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08] : [0.12, 0.25],
    isMobile ? [0, 0] : [20, 0],
  );

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;

  return (
    <section ref={ref} className="cin-scene cin-climax" data-scene={scene.id}>
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
          count={isMobile ? 25 : 70}
          hue={40}
          speed={0.6}
          connectDistance={0}
          interactive={false}
          variant="electric"
        />
      )}

      <motion.div
        className="cin-climax__flash"
        style={{ opacity: flashOpacity }}
        aria-hidden
      />
      <motion.div
        className="cin-climax__glow"
        style={{ opacity: glowOpacity, scale: glowScale }}
        aria-hidden
      />

      <div className="cin-climax__content">
        <motion.h2
          className="cin-climax__text"
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
        >
          {scene.text}
        </motion.h2>
        {scene.subText && (
          <motion.p
            className="cin-climax__sub"
            style={{ opacity: subOpacity, y: subY }}
          >
            {scene.subText}
          </motion.p>
        )}
      </div>
    </section>
  );
}
