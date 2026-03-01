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

export default function EpilogueScene({ scene }: Props) {
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
    isMobile ? ["0%", "0%"] : ["8%", "-8%"],
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

  // Decorative line
  const lineOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05, 0.9, 1] : [0.05, 0.18, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const lineScaleX = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08] : [0.05, 0.22],
    [0, 1],
  );

  // Main text
  const textOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05, 0.9, 1] : [0.08, 0.2, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const textY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0.08, 0.2],
    isMobile ? [0, 0] : [30, 0],
  );

  // Quote
  const quoteOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.08, 0.9, 1] : [0.15, 0.28, 0.85, 0.95],
    [0, 0.85, 0.85, 0],
  );

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;

  return (
    <section ref={ref} className="cin-scene cin-epilogue" data-scene={scene.id}>
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
          count={isMobile ? 20 : 60}
          hue={40}
          speed={0.1}
          connectDistance={120}
          interactive={false}
          variant="nebula"
        />
      )}

      <div className="cin-epilogue__content">
        <motion.div
          className="cin-epilogue__line"
          style={{
            background: `linear-gradient(90deg, transparent, ${scene.accentColor}, transparent)`,
            boxShadow: `0 0 20px ${scene.accentColor}`,
            opacity: lineOpacity,
            scaleX: lineScaleX,
            transformOrigin: "center",
          }}
        />

        <motion.p
          className="cin-epilogue__text"
          style={{
            color: scene.accentColor,
            opacity: textOpacity,
            y: textY,
          }}
        >
          {scene.text}
        </motion.p>

        {scene.elonQuote && (
          <motion.blockquote
            className="cin-epilogue__quote"
            style={{ opacity: quoteOpacity }}
          >
            &ldquo;{scene.elonQuote}&rdquo;
            {scene.elonQuoteJp && (
              <span className="cin-epilogue__quote-jp">
                {scene.elonQuoteJp}
              </span>
            )}
            <cite>— Elon Musk</cite>
          </motion.blockquote>
        )}
      </div>
    </section>
  );
}
