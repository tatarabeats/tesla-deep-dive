import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import type { StoryScene } from "../../types/story";
import SceneImage from "./SceneImage";
import SceneStat from "./SceneStat";

interface Props {
  scene: StoryScene;
  index: number;
}

// Spring config for parallax
const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const fadeUpSub = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};
const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1 },
};
const lineGrow = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

export default function Scene({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });

  // Parallax for images (continuous scroll-linked)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawImageY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rawImageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1.0]);
  const imageY = useSpring(rawImageY, SPRING);
  const imageScale = useSpring(rawImageScale, SPRING);

  const imgSrc = scene.imageUrl
    ? `${import.meta.env.BASE_URL}${scene.imageUrl}`
    : undefined;
  const vis = isInView ? "visible" : "hidden";

  // ===== PROLOGUE — character-by-character reveal =====
  if (scene.id === "prologue-crisis") {
    return <PrologueScene ref={ref} scene={scene} isInView={isInView} />;
  }

  // ===== TEXT-ONLY =====
  if (scene.type === "text-only") {
    const bgTint = getChapterTint(scene.chapter, scene.accentColor);
    return (
      <section
        ref={ref}
        className="scene scene--text-only"
        data-scene={scene.id}
        style={{ background: bgTint }}
      >
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__text-main"
            style={{ color: scene.accentColor }}
            variants={fadeUp}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {scene.text}
          </motion.h2>
          {scene.subText && (
            <motion.p
              className="scene__text-sub"
              variants={fadeUpSub}
              initial="hidden"
              animate={vis}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {scene.subText}
            </motion.p>
          )}
          {scene.stat && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={vis}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 18,
                delay: 0.35,
              }}
            >
              <SceneStat
                stat={scene.stat}
                label={scene.statLabel}
                color={scene.accentColor}
              />
            </motion.div>
          )}
          {/* Watermark number in background */}
          {scene.stat && (
            <motion.div
              className="scene__watermark"
              style={{ color: scene.accentColor }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.04 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
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
          <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />
        )}
        <div className="scene__content scene__content--center">
          <motion.span
            className="scene__chapter-num"
            style={{ color: scene.accentColor }}
            variants={scaleIn}
            initial="hidden"
            animate={vis}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            {scene.text}
          </motion.span>
          <motion.h2
            className="scene__chapter-title"
            variants={fadeUp}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            {scene.subText}
          </motion.h2>
          <motion.div
            className="scene__chapter-line"
            style={{ backgroundColor: scene.accentColor }}
            variants={lineGrow}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
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
          <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />
        )}
        <div className="scene__content scene__content--center">
          {/* Glowing accent line */}
          <motion.div
            style={{
              width: 60,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${scene.accentColor}, transparent)`,
              borderRadius: 1,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.p
            className="scene__epilogue-text"
            style={{ color: scene.accentColor }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          >
            {scene.text}
          </motion.p>
          {scene.elonQuote && (
            <motion.blockquote
              className="scene__epilogue-quote"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              transition={{ duration: 1.5, delay: 1.2 }}
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
            style={{ color: scene.accentColor }}
            variants={fadeUp}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {scene.text}
          </motion.h2>

          <div className="timeline">
            <div className="timeline__line" />
            {scene.timelineItems.map((item, i) => (
              <motion.div
                key={item.era}
                className="timeline__card"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.2,
                  ease: "easeOut",
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
                    }}
                    initial={{ scaleX: 0 }}
                    animate={
                      isInView ? { scaleX: item.percent / 100 } : { scaleX: 0 }
                    }
                    transition={{
                      duration: 1,
                      delay: 0.6 + i * 0.2,
                      ease: "easeOut",
                    }}
                  />
                  <motion.span
                    className="timeline__percent"
                    style={{ color: scene.accentColor }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.2 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + scene.timelineItems.length * 0.2 + 0.3,
                ease: "easeOut",
              }}
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
          <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />
        )}
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene__hero-text"
            variants={fadeUp}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            {scene.text}
          </motion.h2>

          {scene.subText && (
            <motion.p
              className="manga__subtitle"
              variants={fadeUpSub}
              initial="hidden"
              animate={vis}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {scene.subText}
            </motion.p>
          )}

          {scene.speechBubbles?.map((bubble, i) => (
            <motion.div
              key={i}
              className={`manga__bubble manga__bubble--${bubble.position || "right"}${bubble.emphasis ? ` manga__bubble--${bubble.emphasis}` : ""}`}
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.85, y: 15 }
              }
              transition={{
                duration: 0.6,
                delay: (bubble.delay ?? 0.6) + i * 0.3,
                ease: "easeOut",
              }}
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
            style={{ color: scene.accentColor }}
            variants={fadeUp}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {scene.text}
          </motion.h2>
          <div className="scene__multi-grid">
            {scene.multiItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="scene__multi-card"
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.15,
                  ease: "easeOut",
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

  // ===== IMAGE-HERO (default) =====
  return (
    <section
      ref={ref}
      className="scene scene--image-hero"
      data-scene={scene.id}
    >
      {imgSrc && (
        <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />
      )}
      <div className="scene__content">
        {scene.badge && (
          <motion.span
            className="scene__badge"
            style={{ borderColor: scene.accentColor, color: scene.accentColor }}
            variants={slideInLeft}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {scene.badge}
          </motion.span>
        )}
        <motion.h2
          className="scene__hero-text"
          variants={fadeUp}
          initial="hidden"
          animate={vis}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          {scene.text}
        </motion.h2>
        {scene.subText && (
          <motion.p
            className="scene__hero-sub"
            variants={fadeUpSub}
            initial="hidden"
            animate={vis}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {scene.subText}
          </motion.p>
        )}
        {scene.stat && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={vis}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 18,
              delay: 0.35,
            }}
          >
            <SceneStat
              stat={scene.stat}
              label={scene.statLabel}
              color={scene.accentColor}
            />
          </motion.div>
        )}
        {/* Scroll hint on thesis scene */}
        {scene.id === "prologue-thesis" && (
          <motion.div
            className="scene__scroll-hint"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
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
import { forwardRef } from "react";

interface PrologueProps {
  scene: StoryScene;
  isInView: boolean;
}

const PrologueScene = forwardRef<HTMLDivElement, PrologueProps>(
  ({ scene, isInView }, ref) => {
    const chars = scene.text.split("");

    return (
      <section
        ref={ref}
        className="scene scene--prologue"
        data-scene={scene.id}
      >
        <div className="scene__content scene__content--center">
          <h2 className="scene__prologue-text" aria-label={scene.text}>
            {chars.map((char, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.15,
                  ease: "easeOut",
                }}
                aria-hidden
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </div>
        {/* Stars fade in after text */}
        <motion.div
          className="scene__prologue-stars"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
          aria-hidden
        >
          <div className="cosmos-stars__layer cosmos-stars__layer--1" />
          <div className="cosmos-stars__layer cosmos-stars__layer--2" />
        </motion.div>
      </section>
    );
  },
);

// ── Helper: Chapter background tint ──
function getChapterTint(chapter: number | null, accentColor: string): string {
  if (!chapter) return "var(--bg)";
  const match = accentColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return "var(--bg)";
  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.03)`;
}
