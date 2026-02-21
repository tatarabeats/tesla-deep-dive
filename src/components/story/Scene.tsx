import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import type { StoryScene } from '../../types/story';
import SceneImage from './SceneImage';
import SceneStat from './SceneStat';

interface Props {
  scene: StoryScene;
  index: number;
}

// Spring config for buttery smooth transforms
const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

export default function Scene({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // ── Parallax (image) with spring ──
  const rawImageY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  const rawImageScale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1.0]);
  const imageY = useSpring(rawImageY, SPRING);
  const imageScale = useSpring(rawImageScale, SPRING);

  // ── Text entrance + exit ──
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const rawTextY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [60, 0, 0, -40]);
  const textY = useSpring(rawTextY, SPRING);

  // ── Sub text (staggered, slightly later) ──
  const subOpacity = useTransform(scrollYProgress, [0.18, 0.38, 0.65, 0.85], [0, 1, 1, 0]);
  const rawSubY = useTransform(scrollYProgress, [0.18, 0.38, 0.65, 0.85], [50, 0, 0, -30]);
  const subY = useSpring(rawSubY, SPRING);

  // ── Badge (horizontal slide + fade) ──
  const badgeOpacity = useTransform(scrollYProgress, [0.08, 0.28, 0.7, 0.88], [0, 1, 1, 0]);
  const rawBadgeX = useTransform(scrollYProgress, [0.08, 0.28, 0.7, 0.88], [-80, 0, 0, 80]);
  const badgeX = useSpring(rawBadgeX, SPRING);

  // ── Chapter line (scaleX from scroll) ──
  const lineScale = useTransform(scrollYProgress, [0.25, 0.5, 0.7, 0.9], [0, 1, 1, 0]);

  // ── Scale entrance for stat numbers ──
  const statOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.65, 0.85], [0, 1, 1, 0]);
  const rawStatScale = useTransform(scrollYProgress, [0.2, 0.4], [0.6, 1]);
  const statScale = useSpring(rawStatScale, { stiffness: 80, damping: 20 });

  // ── Multi cards stagger ──
  const cardOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.88], [0, 1, 1, 0]);
  const rawCardY = useTransform(scrollYProgress, [0.15, 0.35], [80, 0]);
  const cardY = useSpring(rawCardY, SPRING);

  const imgSrc = scene.imageUrl ? `${import.meta.env.BASE_URL}${scene.imageUrl}` : undefined;

  // ===== PROLOGUE — character-by-character reveal =====
  if (scene.id === 'open-1') {
    return <PrologueScene ref={ref} scene={scene} scrollYProgress={scrollYProgress} />;
  }

  // ===== TEXT-ONLY =====
  if (scene.type === 'text-only') {
    // Determine chapter tint
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
            <motion.div
              className="scene__watermark"
              style={{ opacity: useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 0.04, 0.04, 0]), color: scene.accentColor }}
              aria-hidden
            >
              {scene.stat}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // ===== CHAPTER TITLE =====
  if (scene.type === 'chapter-title') {
    // Chapter number scale entrance
    const chapterNumScale = useTransform(scrollYProgress, [0.1, 0.35], [0.5, 1]);
    const chapterNumSpring = useSpring(chapterNumScale, { stiffness: 60, damping: 15 });

    return (
      <section ref={ref} className="scene scene--chapter" data-scene={scene.id}>
        {imgSrc && <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />}
        <div className="scene__content scene__content--center">
          <motion.span
            className="scene__chapter-num"
            style={{
              color: scene.accentColor,
              opacity: textOpacity,
              scale: chapterNumSpring,
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
    const quoteOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.75, 0.95], [0, 0.5, 0.5, 0]);

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
              style={{ opacity: quoteOpacity }}
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
            {scene.multiItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="scene__multi-card"
                style={{
                  // Stagger: offset each card slightly via individual transforms
                  y: useTransform(scrollYProgress, [0.15 + i * 0.05, 0.35 + i * 0.05], [40, 0]),
                }}
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
              </motion.div>
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
            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.65, 0.8], [0, 0.4, 0.4, 0]) }}
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

// ── Prologue special scene ──
import { forwardRef } from 'react';
import type { MotionValue } from 'framer-motion';

interface PrologueProps {
  scene: StoryScene;
  scrollYProgress: MotionValue<number>;
}

const PrologueScene = forwardRef<HTMLDivElement, PrologueProps>(
  ({ scene, scrollYProgress }, ref) => {
    const chars = scene.text.split('');
    const [starsVisible, setStarsVisible] = useState(false);

    // Track scroll to trigger stars after text appears
    useEffect(() => {
      const unsubscribe = scrollYProgress.on('change', (v) => {
        if (v > 0.35 && !starsVisible) setStarsVisible(true);
        if (v < 0.1) setStarsVisible(false);
      });
      return unsubscribe;
    }, [scrollYProgress, starsVisible]);

    return (
      <section ref={ref} className="scene scene--prologue" data-scene={scene.id}>
        <div className="scene__content scene__content--center">
          <h2 className="scene__prologue-text" aria-label={scene.text}>
            {chars.map((char, i) => {
              // Each character fades in at a slightly different scroll position
              const startAt = 0.12 + i * 0.04;
              const endAt = startAt + 0.06;
              const exitStart = 0.7;
              const exitEnd = 0.9;
              return (
                <PrologueChar
                  key={i}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  startAt={startAt}
                  endAt={endAt}
                  exitStart={exitStart}
                  exitEnd={exitEnd}
                />
              );
            })}
          </h2>
        </div>
        {/* Stars fade in after text */}
        <motion.div
          className="scene__prologue-stars"
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.75, 0.95], [0, 0.6, 0.6, 0]),
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
  startAt,
  endAt,
  exitStart,
  exitEnd,
}: {
  char: string;
  scrollYProgress: MotionValue<number>;
  startAt: number;
  endAt: number;
  exitStart: number;
  exitEnd: number;
}) {
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
  // Extract RGB from accent color and apply very subtle tint
  const match = accentColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return 'var(--bg)';
  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.03)`;
}
