import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { CinematicScene } from "../../types/cinematic";
import SceneImage from "../story/SceneImage";
import ParticleField from "../effects/ParticleField";
import { useIsMobile } from "./hooks/useIsMobile";

interface Props {
  scene: CinematicScene;
}

export default function EpilogueScene({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;

  return (
    <section ref={ref} className="cin-scene cin-epilogue" data-scene={scene.id}>
      {imgSrc && <SceneImage src={imgSrc} />}

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
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
          }
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${scene.accentColor}, transparent)`,
            boxShadow: `0 0 20px ${scene.accentColor}`,
            transformOrigin: "center",
          }}
        />

        <motion.p
          className="cin-epilogue__text"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ color: scene.accentColor }}
        >
          {scene.text}
        </motion.p>

        {scene.elonQuote && (
          <motion.blockquote
            className="cin-epilogue__quote"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.85 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
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
