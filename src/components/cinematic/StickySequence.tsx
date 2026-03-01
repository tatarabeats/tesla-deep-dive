import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type MotionValue,
} from "framer-motion";
import type { CinematicScene, Beat } from "../../types/cinematic";
import CountUp from "../effects/CountUp";
import { useIsMobile } from "./hooks/useIsMobile";

const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

interface Props {
  scene: CinematicScene;
}

function BeatContent({
  beat,
  progress,
  accentColor,
  isMobile,
}: {
  beat: Beat;
  progress: MotionValue<number>;
  accentColor: string;
  isMobile: boolean;
}) {
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(
    progress,
    [0, 0.15, 0.85, 1],
    isMobile ? [0, 0, 0, 0] : [30, 0, 0, -15],
  );

  return (
    <motion.div className="cin-sticky__beat" style={{ opacity, y }}>
      {beat.text && <h3 className="cin-sticky__beat-title">{beat.text}</h3>}
      {beat.subText && <p className="cin-sticky__beat-sub">{beat.subText}</p>}
      {beat.speechBubble && (
        <div
          className={`cin-sticky__bubble cin-sticky__bubble--${beat.speechBubble.emphasis ?? "quiet"}`}
        >
          {beat.speechBubble.speaker && (
            <div className="cin-sticky__bubble-speaker">
              <img
                src={`${import.meta.env.BASE_URL}${beat.speechBubble.speaker}`}
                alt=""
                draggable={false}
              />
              {beat.speechBubble.speakerName && (
                <span>{beat.speechBubble.speakerName}</span>
              )}
            </div>
          )}
          <p className="cin-sticky__bubble-text">{beat.speechBubble.text}</p>
        </div>
      )}
      {beat.stat && (
        <CountUp
          value={beat.stat}
          color={accentColor}
          label={beat.statLabel}
          duration={2500}
        />
      )}
    </motion.div>
  );
}

export default function StickySequence({ scene }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(containerRef, { once: false, amount: 0.05 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const beats = scene.beats ?? [];
  const beatCount = beats.length;

  // Determine scroll height
  const scrollHeight = scene.scrollHeight ?? `${beatCount * 100}vh`;
  const mobileScrollHeight = isMobile
    ? `${parseInt(scrollHeight) * 0.7}vh`
    : scrollHeight;

  // Image crossfade: each beat gets a slice of progress
  const imageElements = beats
    .map((beat, i) => {
      if (!beat.imageUrl) return null;
      const start = i / beatCount;
      const fadeIn = start;
      const fadeOut = (i + 1) / beatCount;
      return { beat, index: i, fadeIn, fadeOut };
    })
    .filter(
      (
        item,
      ): item is {
        beat: Beat;
        index: number;
        fadeIn: number;
        fadeOut: number;
      } => item !== null,
    );

  return (
    <section
      ref={containerRef}
      className="cin-sticky"
      data-scene={scene.id}
      style={{ height: mobileScrollHeight }}
    >
      <div className="cin-sticky__viewport">
        {/* Background images with crossfade */}
        {isInView &&
          imageElements.map((item) => (
            <StickyImage
              key={item.index}
              src={`${import.meta.env.BASE_URL}${item.beat.imageUrl}`}
              scrollYProgress={scrollYProgress}
              fadeIn={item.fadeIn}
              fadeOut={item.fadeOut}
              isFirst={item.index === 0}
              isMobile={isMobile}
            />
          ))}

        {/* Dark overlay for readability */}
        <div className="cin-sticky__overlay" />

        {/* Beat content */}
        <div className="cin-sticky__content">
          {beats.map((beat, i) => {
            const start = i / beatCount;
            const end = (i + 1) / beatCount;
            return (
              <BeatContentWrapper
                key={i}
                beat={beat}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
                accentColor={scene.accentColor}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StickyImage({
  src,
  scrollYProgress,
  fadeIn,
  fadeOut,
  isFirst,
  isMobile,
}: {
  src: string;
  scrollYProgress: MotionValue<number>;
  fadeIn: number;
  fadeOut: number;
  isFirst: boolean;
  isMobile: boolean;
}) {
  // Fade in just before the beat, fade out just after
  const margin = 0.02;
  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, fadeIn + margin, fadeOut - margin, fadeOut + margin]
      : [fadeIn - margin, fadeIn + margin, fadeOut - margin, fadeOut + margin],
    isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0],
  );

  // Subtle Ken Burns
  const rawScale = useTransform(
    scrollYProgress,
    [fadeIn, fadeOut],
    isMobile ? [1, 1] : [1.08, 1],
  );
  const scale = useSpring(rawScale, SPRING);

  return (
    <motion.div className="cin-sticky__image" style={{ opacity }}>
      <motion.img
        src={src}
        alt=""
        draggable={false}
        loading="lazy"
        className="cin-sticky__image-img"
        style={{ scale }}
      />
    </motion.div>
  );
}

function BeatContentWrapper({
  beat,
  scrollYProgress,
  start,
  end,
  accentColor,
  isMobile,
}: {
  beat: Beat;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  accentColor: string;
  isMobile: boolean;
}) {
  // Remap global progress to beat-local 0→1
  const beatProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  return (
    <BeatContent
      beat={beat}
      progress={beatProgress}
      accentColor={accentColor}
      isMobile={isMobile}
    />
  );
}
