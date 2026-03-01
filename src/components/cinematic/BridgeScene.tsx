import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { CinematicScene } from "../../types/cinematic";
import SceneImage from "../story/SceneImage";
import { useIsMobile } from "./hooks/useIsMobile";

const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

interface Props {
  scene: CinematicScene;
}

export default function BridgeScene({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  // Bubble
  const bubbleOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05, 0.9, 1] : [0.1, 0.22, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const bubbleY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0.1, 0.22],
    isMobile ? [0, 0] : [25, 0],
  );
  const bubbleScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05] : [0.1, 0.22],
    isMobile ? [1, 1] : [0.9, 1],
  );

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;
  const bubble = scene.speechBubble;

  return (
    <section ref={ref} className="cin-scene cin-bridge" data-scene={scene.id}>
      {imgSrc && (
        <SceneImage
          src={imgSrc}
          imageY={imageY}
          imageScale={imageScale}
          imageOpacity={imageOpacity}
        />
      )}

      <div className="cin-bridge__content">
        {bubble && (
          <motion.div
            className={`cin-bridge__bubble cin-bridge__bubble--${bubble.emphasis ?? "quiet"}`}
            style={{
              opacity: bubbleOpacity,
              y: bubbleY,
              scale: bubbleScale,
            }}
          >
            {bubble.speaker && (
              <div className="cin-bridge__speaker">
                <img
                  src={`${import.meta.env.BASE_URL}${bubble.speaker}`}
                  alt=""
                  draggable={false}
                />
                {bubble.speakerName && <span>{bubble.speakerName}</span>}
              </div>
            )}
            <p className="cin-bridge__bubble-text">{bubble.text}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
