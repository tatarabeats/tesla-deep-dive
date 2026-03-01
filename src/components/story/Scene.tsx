import { useRef, forwardRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type MotionValue,
} from "framer-motion";
import type { StoryScene } from "../../types/story";
import SceneImage from "./SceneImage";
import CountUp from "../effects/CountUp";
import ParticleField from "../effects/ParticleField";
import GlitchText from "../effects/GlitchText";

interface Props {
  scene: StoryScene;
  index: number;
}

const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth <= 768;

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

export default function Scene({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Only for particle field toggling (perf)
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ─── Image parallax (desktop only) ───
  const rawImageY = useTransform(
    scrollYProgress,
    [0, 1],
    IS_MOBILE ? ["0%", "0%"] : ["12%", "-12%"],
  );
  const rawImageScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    IS_MOBILE ? [1, 1] : [1.2, 1.0],
  );
  const imageY = useSpring(rawImageY, SPRING);
  const imageScale = useSpring(rawImageScale, SPRING);

  // ─── Image reveal ───
  const imageOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0.0, 0.05] : [0.0, 0.2],
    [0, 1],
  );

  // On mobile: skip scroll-linked opacity, always show content
  // ─── Hero content (bottom-aligned: image-hero, manga-panel) ───
  const heroOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.05, 0.18, 0.88, 0.97],
    [0, 1, 1, 0],
  );
  const heroY = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.05, 0.18, 0.88, 0.97],
    IS_MOBILE ? [0, 0, 0, 0] : [40, 0, 0, -20],
  );

  // ─── Centered content (text-only, epilogue) ───
  const centerOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.08, 0.2, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const centerY = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.08, 0.2, 0.85, 0.95],
    IS_MOBILE ? [0, 0, 0, 0] : [30, 0, 0, -15],
  );

  // ─── Sub-text ───
  const subOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.1, 0.22, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const subY = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.1, 0.22, 0.85, 0.95],
    IS_MOBILE ? [0, 0, 0, 0] : [25, 0, 0, -12],
  );

  // ─── Stat ───
  const statOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03, 0.98, 1] : [0.12, 0.25, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const statScale = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03] : [0.12, 0.25],
    IS_MOBILE ? [1, 1] : [0.7, 1],
  );

  // ─── Badge ───
  const badgeOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.05, 0.18, 0.88, 0.97],
    [0, 1, 1, 0],
  );
  const badgeX = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.05, 0.18],
    IS_MOBILE ? [0, 0] : [-40, 0],
  );

  // ─── Chapter title zoom-through ───
  const chapterNumOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.05, 0.18, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const chapterNumScale = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.05, 0.18],
    IS_MOBILE ? [1, 1] : [0.5, 1],
  );
  const chapterTitleOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.08, 0.2, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const chapterTitleScale = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.1, 0.25, 0.85, 0.95],
    IS_MOBILE ? [1, 1, 1, 1] : [0.8, 1, 1, 1.15],
  );
  const chapterTitleY = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.1, 0.25, 0.85, 0.95],
    IS_MOBILE ? [0, 0, 0, 0] : [30, 0, 0, -20],
  );
  const lineScaleX = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03, 0.98, 1] : [0.15, 0.3, 0.85, 0.95],
    [0, 1, 1, 0],
  );

  // ─── Speech bubbles ───
  const bubble0Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.08, 0.2, 0.88, 0.97],
    [0, 1, 1, 0],
  );
  const bubble0Y = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.08, 0.2],
    IS_MOBILE ? [0, 0] : [20, 0],
  );
  const bubble0Scale = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.08, 0.2],
    IS_MOBILE ? [1, 1] : [0.88, 1],
  );

  const bubble1Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03, 0.98, 1] : [0.18, 0.3, 0.88, 0.97],
    [0, 1, 1, 0],
  );
  const bubble1Y = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03] : [0.18, 0.3],
    IS_MOBILE ? [0, 0] : [20, 0],
  );
  const bubble1Scale = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03] : [0.18, 0.3],
    IS_MOBILE ? [1, 1] : [0.88, 1],
  );

  // ─── Watermark ───
  const watermarkOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.1, 0.22, 0.85, 0.95],
    [0, 0.04, 0.04, 0],
  );

  // ─── Epilogue special ───
  const epilogueLineOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.05, 0.18, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const epilogueLineScaleX = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02] : [0.05, 0.22],
    [0, 1],
  );
  const epilogueTextOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.08, 0.2, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const epilogueTextY = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.08, 0.2],
    IS_MOBILE ? [0, 0] : [30, 0],
  );
  const epilogueQuoteOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.15, 0.28, 0.85, 0.95],
    [0, 0.85, 0.85, 0],
  );

  // ─── Climax ───
  const climaxFlashOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0.05, 0.12, 0.25] : [0.1, 0.2, 0.35],
    [0, 0.8, 0],
  );
  const climaxGlowOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0.05, 0.12, 0.4] : [0.1, 0.22, 0.5],
    [0, 0.6, 0.15],
  );
  const climaxGlowScale = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0.05, 0.12, 0.4] : [0.1, 0.22, 0.5],
    [0.3, 1.5, 2.0],
  );
  const climaxTextOpacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.08, 0.2, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const climaxTextScale = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.08, 0.2],
    IS_MOBILE ? [1, 1] : [0.5, 1],
  );
  const climaxTextY = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.08, 0.2],
    IS_MOBILE ? [0, 0] : [20, 0],
  );

  // ─── Timeline stagger (mobile: show all immediately) ───
  const tl0Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.06, 0.15, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const tl0X = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.06, 0.15],
    IS_MOBILE ? [0, 0] : [-40, 0],
  );
  const tl1Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.1, 0.19, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const tl1X = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02] : [0.1, 0.19],
    IS_MOBILE ? [0, 0] : [40, 0],
  );
  const tl2Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03, 0.98, 1] : [0.14, 0.23, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const tl2X = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03] : [0.14, 0.23],
    IS_MOBILE ? [0, 0] : [-40, 0],
  );
  const tl3Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.04, 0.98, 1] : [0.18, 0.27, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const tl3X = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.04] : [0.18, 0.27],
    IS_MOBILE ? [0, 0] : [40, 0],
  );
  const tl4Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.05, 0.98, 1] : [0.22, 0.31, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const tl4X = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.05] : [0.22, 0.31],
    IS_MOBILE ? [0, 0] : [-40, 0],
  );
  const tlBarScales = [
    useTransform(scrollYProgress, IS_MOBILE ? [0, 0.02] : [0.12, 0.22], [0, 1]),
    useTransform(scrollYProgress, IS_MOBILE ? [0, 0.03] : [0.16, 0.26], [0, 1]),
    useTransform(scrollYProgress, IS_MOBILE ? [0, 0.04] : [0.2, 0.3], [0, 1]),
    useTransform(scrollYProgress, IS_MOBILE ? [0, 0.05] : [0.24, 0.34], [0, 1]),
    useTransform(scrollYProgress, IS_MOBILE ? [0, 0.06] : [0.28, 0.38], [0, 1]),
  ];

  // ─── Multi-card stagger ───
  const multi0Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01, 0.98, 1] : [0.06, 0.16, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const multi0Y = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.01] : [0.06, 0.16],
    IS_MOBILE ? [0, 0] : [60, 0],
  );
  const multi1Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02, 0.98, 1] : [0.12, 0.22, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const multi1Y = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.02] : [0.12, 0.22],
    IS_MOBILE ? [0, 0] : [60, 0],
  );
  const multi2Opacity = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03, 0.98, 1] : [0.18, 0.28, 0.85, 0.95],
    [0, 1, 1, 0],
  );
  const multi2Y = useTransform(
    scrollYProgress,
    IS_MOBILE ? [0, 0.03] : [0.18, 0.28],
    IS_MOBILE ? [0, 0] : [60, 0],
  );

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;

  // Helper arrays for timeline/multi stagger
  const tlOpacities = [
    tl0Opacity,
    tl1Opacity,
    tl2Opacity,
    tl3Opacity,
    tl4Opacity,
  ];
  const tlXs = [tl0X, tl1X, tl2X, tl3X, tl4X];
  const multiOpacities = [multi0Opacity, multi1Opacity, multi2Opacity];
  const multiYs = [multi0Y, multi1Y, multi2Y];

  // Bubble style helpers
  const getBubbleStyle = (i: number) => ({
    opacity: i === 0 ? bubble0Opacity : bubble1Opacity,
    y: i === 0 ? bubble0Y : bubble1Y,
    scale: i === 0 ? bubble0Scale : bubble1Scale,
  });

  // ===== PROLOGUE =====
  if (scene.id === "prologue-crisis") {
    return (
      <PrologueScene
        ref={ref}
        scene={scene}
        isInView={isInView}
        scrollYProgress={scrollYProgress}
      />
    );
  }

  // ===== TEXT-ONLY =====
  if (scene.type === "text-only") {
    const bgTint = getChapterTint(scene.chapter, scene.accentColor);
    const mainColor = scene.textColor ?? scene.accentColor;
    return (
      <section
        ref={ref}
        className="scene scene--text-only"
        data-scene={scene.id}
        style={{ background: bgTint }}
      >
        {isInView && (
          <ParticleField
            count={IS_MOBILE ? 15 : 40}
            hue={getChapterParticleHue(scene.chapter)}
            speed={0.15}
            connectDistance={0}
            interactive={false}
            variant="nebula"
          />
        )}
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__text-main"
            style={{ color: mainColor, opacity: centerOpacity, y: centerY }}
          >
            {scene.textColor
              ? scene.text.split(/(6)/).map((part, i) =>
                  part === "6" ? (
                    <span
                      key={i}
                      style={{
                        color: scene.accentColor,
                        textShadow: `0 0 30px ${scene.accentColor}, 0 0 60px ${scene.accentColor}`,
                        fontWeight: 800,
                      }}
                    >
                      6
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )
              : scene.text}
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
              <CountUp
                value={scene.stat}
                color={scene.accentColor}
                label={scene.statLabel}
                duration={2500}
              />
            </motion.div>
          )}
          {scene.stat && (
            <motion.div
              className="scene__watermark"
              style={{ color: scene.accentColor, opacity: watermarkOpacity }}
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
  if (scene.type === "chapter-title") {
    return (
      <section ref={ref} className="scene scene--chapter" data-scene={scene.id}>
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
            count={IS_MOBILE ? 20 : 50}
            hue={getChapterParticleHue(scene.chapter)}
            speed={0.2}
            connectDistance={0}
            interactive={false}
            variant="stars"
          />
        )}
        <div className="scene__content scene__content--center">
          <motion.span
            className="scene__chapter-num"
            style={{
              color: scene.accentColor,
              opacity: chapterNumOpacity,
              scale: chapterNumScale,
            }}
          >
            {scene.text}
          </motion.span>
          <motion.h2
            className="scene__chapter-title"
            style={{
              textShadow: `0 0 60px ${scene.accentColor}, 0 0 120px ${scene.accentColor}40`,
              opacity: chapterTitleOpacity,
              scale: chapterTitleScale,
              y: chapterTitleY,
            }}
          >
            {scene.subText}
          </motion.h2>
          <motion.div
            className="scene__chapter-line"
            style={{
              backgroundColor: scene.accentColor,
              boxShadow: `0 0 20px ${scene.accentColor}`,
              scaleX: lineScaleX,
              transformOrigin: "center",
            }}
          />
        </div>
      </section>
    );
  }

  // ===== EPILOGUE =====
  if (scene.type === "epilogue") {
    return (
      <section
        ref={ref}
        className="scene scene--epilogue"
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
            count={IS_MOBILE ? 30 : 80}
            hue={40}
            speed={0.1}
            connectDistance={120}
            interactive={false}
            variant="nebula"
          />
        )}
        <div className="scene__content scene__content--center">
          <motion.div
            style={{
              width: 80,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${scene.accentColor}, transparent)`,
              borderRadius: 1,
              boxShadow: `0 0 20px ${scene.accentColor}`,
              opacity: epilogueLineOpacity,
              scaleX: epilogueLineScaleX,
              transformOrigin: "center",
            }}
          />
          <motion.p
            className="scene__epilogue-text"
            style={{
              color: scene.accentColor,
              opacity: epilogueTextOpacity,
              y: epilogueTextY,
            }}
          >
            {scene.text}
          </motion.p>
          {scene.elonQuote && (
            <motion.blockquote
              className="scene__epilogue-quote"
              style={{ opacity: epilogueQuoteOpacity }}
            >
              &ldquo;{scene.elonQuote}&rdquo;
              {scene.elonQuoteJp && (
                <span className="scene__epilogue-quote-jp">
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

  // ===== TIMELINE =====
  if (scene.type === "timeline" && scene.timelineItems) {
    const bgTint = getChapterTint(scene.chapter, scene.accentColor);
    return (
      <section
        ref={ref}
        className="scene scene--timeline"
        data-scene={scene.id}
        style={{ background: bgTint }}
      >
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__text-main"
            style={{
              color: scene.accentColor,
              opacity: centerOpacity,
              y: centerY,
            }}
          >
            {scene.text}
          </motion.h2>

          <div className="timeline">
            <div className="timeline__line" />
            {scene.timelineItems.map((item, i) => (
              <motion.div
                key={item.era}
                className="timeline__card"
                style={{
                  opacity: tlOpacities[i] ?? tl4Opacity,
                  x: tlXs[i] ?? tl4X,
                }}
              >
                <span className="timeline__icon">{item.icon}</span>
                <div className="timeline__info">
                  <span className="timeline__era">{item.era}</span>
                  <span className="timeline__years">{item.years}</span>
                  <span className="timeline__cause">{item.cause}</span>
                </div>
                <div className="timeline__bar-wrap">
                  <motion.div
                    className="timeline__bar"
                    style={{
                      background: `linear-gradient(90deg, ${scene.accentColor}, rgba(255, 90, 80, 0.9))`,
                      scaleX: tlBarScales[i] ?? tlBarScales[4],
                      transformOrigin: "left",
                      width: `${item.percent}%`,
                    }}
                  />
                  <motion.span
                    className="timeline__percent"
                    style={{
                      color: scene.accentColor,
                      opacity: tlOpacities[i] ?? tl4Opacity,
                    }}
                  >
                    全種の{item.percent}%が絶滅
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>

          {scene.subText && (
            <motion.p
              className="scene__text-sub timeline__footer"
              style={{ opacity: subOpacity, y: subY }}
            >
              {scene.subText}
            </motion.p>
          )}
        </div>
      </section>
    );
  }

  // ===== MANGA PANEL =====
  if (scene.type === "manga-panel") {
    return (
      <section
        ref={ref}
        className="scene scene--manga-panel"
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
        <div className="scene__content scene__content--center">
          {scene.text && (
            <motion.h2
              className="scene__hero-text"
              style={{ opacity: heroOpacity, y: heroY }}
            >
              {scene.text}
            </motion.h2>
          )}

          {scene.subText && (
            <motion.p
              className="manga__subtitle"
              style={{ opacity: subOpacity, y: subY }}
            >
              {scene.subText}
            </motion.p>
          )}

          {scene.speechBubbles?.map((bubble, i) => (
            <motion.div
              key={i}
              className={`manga__bubble manga__bubble--${bubble.position || "right"}${bubble.emphasis ? ` manga__bubble--${bubble.emphasis}` : ""}`}
              style={getBubbleStyle(i)}
            >
              <span className="manga__bubble-tail" />
              {bubble.speaker && (
                <div className="manga__bubble-speaker">
                  <img
                    src={`${import.meta.env.BASE_URL}${bubble.speaker}`}
                    alt=""
                    draggable={false}
                  />
                  {bubble.speakerName && <span>{bubble.speakerName}</span>}
                </div>
              )}
              <p className="manga__bubble-text">{bubble.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // ===== MULTI =====
  if (scene.type === "multi" && scene.multiItems) {
    return (
      <section ref={ref} className="scene scene--multi" data-scene={scene.id}>
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__text-main"
            style={{
              color: scene.accentColor,
              opacity: centerOpacity,
              y: centerY,
            }}
          >
            {scene.text}
          </motion.h2>
          <div className="scene__multi-grid">
            {scene.multiItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="scene__multi-card"
                style={{
                  opacity: multiOpacities[i] ?? multi2Opacity,
                  y: multiYs[i] ?? multi2Y,
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
                <span
                  className="scene__multi-stat"
                  style={{ color: scene.accentColor }}
                >
                  {item.stat}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ===== CLIMAX: 成功。 =====
  if (scene.id === "ch1-success") {
    return (
      <section
        ref={ref}
        className="scene scene--image-hero scene--climax"
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
            count={IS_MOBILE ? 30 : 80}
            hue={40}
            speed={0.6}
            connectDistance={0}
            interactive={false}
            variant="electric"
          />
        )}
        <motion.div
          className="scene__climax-flash"
          style={{ opacity: climaxFlashOpacity }}
          aria-hidden
        />
        <motion.div
          className="scene__climax-glow"
          style={{
            opacity: climaxGlowOpacity,
            scale: climaxGlowScale,
          }}
          aria-hidden
        />
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__climax-text"
            style={{
              opacity: climaxTextOpacity,
              scale: climaxTextScale,
              y: climaxTextY,
            }}
          >
            {scene.text}
          </motion.h2>
          {scene.subText && (
            <motion.p
              className="scene__hero-sub"
              style={{
                textAlign: "center",
                maxWidth: 520,
                opacity: subOpacity,
                y: subY,
              }}
            >
              {scene.subText}
            </motion.p>
          )}
        </div>
      </section>
    );
  }

  // ===== IMAGE-HERO (default) =====
  return (
    <section
      ref={ref}
      className="scene scene--image-hero"
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
          style={{ opacity: heroOpacity, y: heroY }}
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
            <CountUp
              value={scene.stat}
              label={scene.statLabel}
              color={scene.accentColor}
              duration={2500}
            />
          </motion.div>
        )}
        {scene.id === "prologue-thesis" && (
          <motion.div
            className="scene__scroll-hint"
            style={{ opacity: centerOpacity }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ── Prologue special scene ──

interface PrologueProps {
  scene: StoryScene;
  isInView: boolean;
  scrollYProgress: MotionValue<number>;
}

const PrologueScene = forwardRef<HTMLDivElement, PrologueProps>(
  ({ scene, isInView, scrollYProgress }, ref) => {
    // Scroll-linked exit: content fades + scales down as you scroll away
    const contentOpacity = useTransform(
      scrollYProgress,
      [0, 0.5, 0.75, 0.92],
      [1, 1, 0.5, 0],
    );
    const contentScale = useTransform(
      scrollYProgress,
      [0, 0.5, 0.75, 0.92],
      [1, 1, 0.95, 0.85],
    );

    return (
      <section
        ref={ref}
        className="scene scene--prologue"
        data-scene={scene.id}
      >
        <ParticleField
          count={IS_MOBILE ? 30 : 80}
          hue={20}
          speed={0.2}
          connectDistance={0}
          interactive={true}
          variant="stars"
        />

        <motion.div
          className="scene__content scene__content--center"
          style={{
            maxWidth: 1000,
            opacity: contentOpacity,
            scale: contentScale,
          }}
        >
          <h2 className="scene__prologue-text" aria-label={scene.text}>
            <GlitchText
              text={scene.text}
              duration={2500}
              delay={500}
              highlight="6"
              highlightColor={scene.accentColor}
              trigger={isInView}
              style={{ display: "block" }}
            />
          </h2>
          <motion.div
            className="scene__scroll-hint"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
            transition={{ duration: 2.5, delay: 3.5, repeat: Infinity }}
            style={{ marginTop: 60 }}
          >
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              SCROLL
            </span>
            <motion.div
              style={{
                width: 1,
                height: 32,
                background: "rgba(255,255,255,0.3)",
                marginTop: 8,
              }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="scene__prologue-glow"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView
              ? { opacity: [0, 0.3, 0.1], scale: [0.5, 1.2, 1.5] }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 3, delay: 1, ease: "easeOut" }}
          aria-hidden
        />
      </section>
    );
  },
);

// ── Helper ──
function getChapterTint(chapter: number | null, accentColor: string): string {
  if (!chapter) return "var(--bg)";
  const match = accentColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return "var(--bg)";
  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.03)`;
}
