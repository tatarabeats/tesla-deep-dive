import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { CinematicScene } from "../../types/cinematic";
import CountUp from "../effects/CountUp";
import { useIsMobile } from "./hooks/useIsMobile";

const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

interface Props {
  scene: CinematicScene;
}

export default function SideBySide({ scene }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const panels = scene.sidePanels ?? [];
  const panelCount = panels.length;
  const scrollHeight = `${(panelCount + 1) * 100}vh`;
  const mobileScrollHeight = isMobile
    ? `${(panelCount + 1) * 80}vh`
    : scrollHeight;

  // Image parallax
  const rawImageScale = useTransform(
    scrollYProgress,
    [0, 0.3],
    isMobile ? [1, 1] : [1.1, 1],
  );
  const imageScale = useSpring(rawImageScale, SPRING);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const imgSrc = scene.sideImage
    ? `${import.meta.env.BASE_URL}${scene.sideImage}`
    : undefined;

  return (
    <section
      ref={containerRef}
      className="cin-side-by-side"
      data-scene={scene.id}
      style={{ height: mobileScrollHeight }}
    >
      <div className="cin-side-by-side__viewport">
        {/* Left: fixed image */}
        <motion.div
          className="cin-side-by-side__image"
          style={{ opacity: imageOpacity }}
        >
          {imgSrc && (
            <motion.img
              src={imgSrc}
              alt=""
              draggable={false}
              loading="lazy"
              className="cin-side-by-side__image-img"
              style={{ scale: imageScale }}
            />
          )}
          <div className="cin-side-by-side__image-overlay" />
        </motion.div>

        {/* Right: scroll-driven panels */}
        <div className="cin-side-by-side__panels">
          {panels.map((panel, i) => (
            <SidePanel
              key={i}
              panel={panel}
              index={i}
              total={panelCount}
              scrollYProgress={scrollYProgress}
              accentColor={scene.accentColor}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SidePanel({
  panel,
  index,
  total,
  scrollYProgress,
  accentColor,
  isMobile,
}: {
  panel: NonNullable<CinematicScene["sidePanels"]>[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  accentColor: string;
  isMobile: boolean;
}) {
  const start = (index + 0.3) / (total + 1);
  const mid = (index + 0.8) / (total + 1);
  const fadeOut = (index + 1.5) / (total + 1);

  const opacity = useTransform(
    scrollYProgress,
    [start, mid, fadeOut, Math.min(fadeOut + 0.1, 1)],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const y = useTransform(
    scrollYProgress,
    [start, mid],
    isMobile ? [0, 0] : [40, 0],
  );

  return (
    <motion.div className="cin-side-by-side__panel" style={{ opacity, y }}>
      {panel.badge && (
        <span
          className="cin-side-by-side__badge"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          {panel.badge}
        </span>
      )}
      <h3 className="cin-side-by-side__title">{panel.text}</h3>
      {panel.subText && (
        <p className="cin-side-by-side__sub">{panel.subText}</p>
      )}
      {panel.stat && (
        <CountUp
          value={panel.stat}
          color={accentColor}
          label={panel.statLabel}
          duration={2500}
        />
      )}
    </motion.div>
  );
}
