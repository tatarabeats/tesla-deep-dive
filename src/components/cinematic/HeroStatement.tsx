import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { CinematicScene } from "../../types/cinematic";
import ParticleField from "../effects/ParticleField";
import GlitchText from "../effects/GlitchText";
import SceneImage from "../story/SceneImage";
import { useIsMobile } from "./hooks/useIsMobile";

interface Props {
  scene: CinematicScene;
}

export default function HeroStatement({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Prologue scenes are already visible on page load —
  // only animate EXIT (fade out when scrolling past), not entrance
  const isPrologue =
    scene.id === "prologue-crisis" || scene.id === "prologue-thesis";

  // Exit fade: opacity goes from 1→0 as you scroll this scene out
  const exitOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const exitScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    isMobile ? [1, 1, 1] : [1, 1, 0.95],
  );
  const exitY = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    isMobile ? [0, 0, 0] : [0, 0, -30],
  );

  // Non-prologue: full entrance + exit via scroll
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.7, 0.95],
    [0, 1, 1, 0],
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.7, 0.95],
    isMobile ? [1, 1, 1, 1] : [0.92, 1, 1, 0.95],
  );
  const scrollY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.7, 0.95],
    isMobile ? [0, 0, 0, 0] : [30, 0, 0, -20],
  );

  // Image
  const imageOpacity = isPrologue
    ? undefined // Prologue image always visible
    : useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const rawImageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["6%", "-6%"],
  );
  const rawImageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? [1, 1] : [1.1, 1],
  );

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;

  const isGlitch = scene.id === "prologue-crisis";
  const mainColor = scene.textColor ?? scene.accentColor;

  return (
    <section
      ref={ref}
      className="cin-scene cin-hero-statement"
      data-scene={scene.id}
    >
      {imgSrc && (
        <SceneImage
          src={imgSrc}
          imageY={rawImageY}
          imageScale={rawImageScale}
          imageOpacity={imageOpacity}
        />
      )}

      {isInView && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <ParticleField
            count={isMobile ? 20 : 50}
            hue={20}
            speed={0.15}
            connectDistance={0}
            interactive={isGlitch}
            variant="stars"
          />
        </div>
      )}

      <motion.div
        className="cin-hero-statement__content"
        style={
          isPrologue
            ? { opacity: exitOpacity, scale: exitScale, y: exitY }
            : { opacity: scrollOpacity, scale: scrollScale, y: scrollY }
        }
      >
        {isGlitch ? (
          <h2 className="cin-hero-statement__text" aria-label={scene.text}>
            <GlitchText
              text={scene.text ?? ""}
              duration={2500}
              delay={500}
              highlight={scene.glitchHighlight}
              highlightColor={scene.accentColor}
              trigger={isInView}
              style={{ display: "block" }}
            />
          </h2>
        ) : (
          <h2 className="cin-hero-statement__text" style={{ color: mainColor }}>
            {scene.text}
          </h2>
        )}

        {scene.subText && (
          <p className="cin-hero-statement__sub">{scene.subText}</p>
        )}

        {isGlitch && (
          <motion.div
            className="cin-scroll-hint"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
            transition={{ duration: 2.5, delay: 3.5, repeat: Infinity }}
          >
            <span className="cin-scroll-hint__label">SCROLL</span>
            <motion.div
              className="cin-scroll-hint__line"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
