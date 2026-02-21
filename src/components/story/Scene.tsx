import { useRef, forwardRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import type { StoryScene } from '../../types/story';
import SceneImage from './SceneImage';
import SceneStat from './SceneStat';

interface Props {
  scene: StoryScene;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Spring config for buttery smooth transforms
const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

export default function Scene({ scene, containerRef }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll within the container
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  // ── Parallax (image) with spring ──
  const rawImageY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  const rawImageScale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1.0]);
  const imageY = useSpring(rawImageY, SPRING);
  const imageScale = useSpring(rawImageScale, SPRING);

  // ── Text entrance + exit ──
  // 0.0 = scene entering from bottom, 0.5 = centered, 1.0 = exited top
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const rawTextY = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [60, 0, 0, -40]);
  const textY = useSpring(rawTextY, SPRING);

  // ── Sub text (staggered) ──
  const subOpacity = useTransform(scrollYProgress, [0.22, 0.42, 0.6, 0.82], [0, 1, 1, 0]);
  const rawSubY = useTransform(scrollYProgress, [0.22, 0.42, 0.6, 0.82], [50, 0, 0, -30]);
  const subY = useSpring(rawSubY, SPRING);

  // ── Badge (horizontal slide + fade) ──
  const badgeOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.65, 0.85], [0, 1, 1, 0]);
  const rawBadgeX = useTransform(scrollYProgress, [0.12, 0.32, 0.65, 0.85], [-80, 0, 0, 80]);
  const badgeX = useSpring(rawBadgeX, SPRING);

  // ── Chapter line (scaleX from scroll) ──
  const lineScale = useTransform(scrollYProgress, [0.28, 0.48, 0.65, 0.85], [0, 1, 1, 0]);

  // ── Scale entrance for stat numbers ──
  const statOpacity = useTransform(scrollYProgress, [0.25, 0.42, 0.6, 0.82], [0, 1, 1, 0]);
  const rawStatScale = useTransform(scrollYProgress, [0.25, 0.42], [0.6, 1]);
  const statScale = useSpring(rawStatScale, { stiffness: 80, damping: 20 });

  // ── Multi cards stagger ──
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.65, 0.85], [0, 1, 1, 0]);
  const rawCardY = useTransform(scrollYProgress, [0.2, 0.4], [80, 0]);
  const cardY = useSpring(rawCardY, SPRING);

  const imgSrc = scene.imageUrl ? `${import.meta.env.BASE_URL}${scene.imageUrl}` : undefined;

  // ===== PROLOGUE — character-by-character reveal =====
  if (scene.id === 'open-1') {
    return <PrologueScene ref={ref} scene={scene} scrollYProgress={scrollYProgress} />;
  }

  // ===== TEXT-ONLY =====
  if (scene.type === 'text-only') {
    const bgTint = getChapterTint(scene.chapter, scene.accentColor);

    return (
      <section ref={ref} className="scene scene--text-only" data-scene={scene.id} style={{ background: bgTint }}>
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__text-main"
            style={{ color: scene.accentColor, opacity: textOpacity, y: textY }}
          >
            {scene.text}
          </motion.h2>
          {scene.subText && (
            <motion.p
              className="scene__text-sub"
              style={{ opacity: subOpacity, y: subY }}
            >
              {scene.subText}
            </motion.p>
          )}
          {scene.stat && (
            <motion.div style={{ opacity: statOpacity, scale: statScale }}>
              <SceneStat stat={scene.stat} label={scene.statLabel} color={scene.accentColor} />
            </motion.div>
          )}
          {/* Watermark number in background */}
          {scene.stat && (
            <WatermarkNumber scrollYProgress={scrollYProgress} stat={scene.stat} color={scene.accentColor} />
          )}
        </div>
      </section>
    );
  }

  // ===== CHAPTER TITLE =====
  if (scene.type === 'chapter-title') {
    return (
      <section ref={ref} className="scene scene--chapter" data-scene={scene.id}>
        {imgSrc && <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />}
        <div className="scene__content scene__content--center">
          <motion.span
            className="scene__chapter-num"
            style={{
              color: scene.accentColor,
              opacity: textOpacity,
              scale: useSpring(useTransform(scrollYProgress, [0.15, 0.4], [0.5, 1]), { stiffness: 60, damping: 15 }),
            }}
          >
            {scene.text}
          </motion.span>
          <motion.h2
            className="scene__chapter-title"
            style={{ opacity: subOpacity, y: subY }}
          >
            {scene.subText}
          </motion.h2>
          <motion.div
            className="scene__chapter-line"
            style={{
              backgroundColor: scene.accentColor,
              scaleX: lineScale,
            }}
          />
        </div>
      </section>
    );
  }

  // ===== EPILOGUE =====
  if (scene.type === 'epilogue') {
    return (
      <section ref={ref} className="scene scene--epilogue" data-scene={scene.id}>
        {imgSrc && <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />}
        <div className="scene__content scene__content--center">
          <motion.p
            className="scene__epilogue-text"
            style={{ color: scene.accentColor, opacity: textOpacity, y: textY }}
          >
            {scene.text}
          </motion.p>
          {scene.elonQuote && (
            <motion.blockquote
              className="scene__epilogue-quote"
              style={{ opacity: useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.88], [0, 0.5, 0.5, 0]) }}
            >
              &ldquo;{scene.elonQuote}&rdquo;
              <cite>— Elon Musk</cite>
            </motion.blockquote>
          )}
        </div>
      </section>
    );
  }

  // ===== MULTI =====
  if (scene.type === 'multi' && scene.multiItems) {
    return (
      <section ref={ref} className="scene scene--multi" data-scene={scene.id}>
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__text-main"
            style={{ color: scene.accentColor, opacity: textOpacity, y: textY }}
          >
            {scene.text}
          </motion.h2>
          <motion.div className="scene__multi-grid" style={{ opacity: cardOpacity, y: cardY }}>
            {scene.multiItems.map((item) => (
              <div
                key={item.label}
                className="scene__multi-card"
              >
                <div className="scene__multi-img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${item.imageUrl}`}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    className="scene__multi-img"
                  />
                </div>
                <span className="scene__multi-label">{item.label}</span>
                <span className="scene__multi-stat" style={{ color: scene.accentColor }}>
                  {item.stat}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ===== IMAGE-HERO (default) =====
  return (
    <section ref={ref} className="scene scene--image-hero" data-scene={scene.id}>
      {imgSrc && <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />}
      <div className="scene__content">
        {scene.badge && (
          <motion.span
            className="scene__badge"
            style={{
              borderColor: scene.accentColor,
              color: scene.accentColor,
              opacity: badgeOpacity,
              x: badgeX,
            }}
          >
            {scene.badge}
          </motion.span>
        )}
        <motion.h2
          className="scene__hero-text"
          style={{ opacity: textOpacity, y: textY }}
        >
          {scene.text}
        </motion.h2>
        {scene.subText && (
          <motion.p
            className="scene__hero-sub"
            style={{ opacity: subOpacity, y: subY }}
          >
            {scene.subText}
          </motion.p>
        )}
        {scene.stat && (
          <motion.div style={{ opacity: statOpacity, scale: statScale }}>
            <SceneStat stat={scene.stat} label={scene.statLabel} color={scene.accentColor} />
          </motion.div>
        )}
        {/* Scroll hint on thesis scene */}
        {scene.id === 'open-thesis' && (
          <motion.div
            className="scene__scroll-hint"
            style={{ opacity: useTransform(scrollYProgress, [0.35, 0.48, 0.6, 0.75], [0, 0.4, 0.4, 0]) }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── Watermark component (avoids hook-in-conditional) ──
function WatermarkNumber({ scrollYProgress, stat, color }: { scrollYProgress: MotionValue<number>; stat: string; color: string }) {
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 0.04, 0.04, 0]);
  return (
    <motion.div
      className="scene__watermark"
      style={{ opacity, color }}
      aria-hidden
    >
      {stat}
    </motion.div>
  );
}

// ── Prologue special scene ──
interface PrologueProps {
  scene: StoryScene;
  scrollYProgress: MotionValue<number>;
}

const PrologueScene = forwardRef<HTMLDivElement, PrologueProps>(
  ({ scene, scrollYProgress }, ref) => {
    const chars = scene.text.split('');

    return (
      <section ref={ref} className="scene scene--prologue" data-scene={scene.id}>
        <div className="scene__content scene__content--center">
          <h2 className="scene__prologue-text" aria-label={scene.text}>
            {chars.map((char, i) => (
              <PrologueChar
                key={i}
                char={char}
                scrollYProgress={scrollYProgress}
                index={i}
                total={chars.length}
              />
            ))}
          </h2>
        </div>
        {/* Stars fade in after text */}
        <motion.div
          className="scene__prologue-stars"
          style={{
            opacity: useTransform(scrollYProgress, [0.35, 0.5, 0.7, 0.9], [0, 0.6, 0.6, 0]),
          }}
          aria-hidden
        >
          <div className="cosmos-stars__layer cosmos-stars__layer--1" />
          <div className="cosmos-stars__layer cosmos-stars__layer--2" />
        </motion.div>
      </section>
    );
  }
);

function PrologueChar({
  char,
  scrollYProgress,
  index,
  total,
}: {
  char: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  // Spread characters across 0.15-0.45 range (centered around 0.3)
  const startAt = 0.15 + (index / total) * 0.2;
  const endAt = startAt + 0.08;
  const exitStart = 0.65;
  const exitEnd = 0.85;

  const opacity = useTransform(
    scrollYProgress,
    [startAt, endAt, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [startAt, endAt],
    [20, 0]
  );

  return (
    <motion.span
      style={{ opacity, y, display: 'inline-block' }}
      aria-hidden
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

// ── Helper: Chapter background tint ──
function getChapterTint(chapter: number | null, accentColor: string): string {
  if (!chapter) return 'var(--bg)';
  const match = accentColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return 'var(--bg)';
  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.03)`;
}
