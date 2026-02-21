import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import type { StoryScene } from '../../types/story';
import SceneImage from './SceneImage';
import SceneStat from './SceneStat';

interface Props {
  scene: StoryScene;
  index: number;
}

export default function Scene({ scene }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax for images
  const imageY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1.0]);

  // Text animations — staggered from scroll position
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.4], [40, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.25, 0.5], [30, 0]);

  const imgSrc = scene.imageUrl ? `${import.meta.env.BASE_URL}${scene.imageUrl}` : undefined;

  // ===== TEXT-ONLY =====
  if (scene.type === 'text-only') {
    return (
      <section ref={ref} className="scene scene--text-only" data-scene={scene.id}>
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
            <SceneStat stat={scene.stat} label={scene.statLabel} color={scene.accentColor} />
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
            style={{ color: scene.accentColor, opacity: textOpacity }}
          >
            {scene.text}
          </motion.span>
          <motion.h2
            className="scene__chapter-title"
            style={{ opacity: subOpacity, y: subY }}
          >
            {scene.subText}
          </motion.h2>
          {/* Horizontal accent line */}
          <motion.div
            className="scene__chapter-line"
            style={{ backgroundColor: scene.accentColor }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
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
            style={{ color: scene.accentColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {scene.text}
          </motion.p>
          {scene.elonQuote && (
            <motion.blockquote
              className="scene__epilogue-quote"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              transition={{ duration: 1.5, delay: 1.0 }}
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
          <div className="scene__multi-grid">
            {scene.multiItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="scene__multi-card"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
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
          </div>
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
            style={{ borderColor: scene.accentColor, color: scene.accentColor }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
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
          <SceneStat stat={scene.stat} label={scene.statLabel} color={scene.accentColor} />
        )}
        {/* Scroll hint on thesis scene */}
        {scene.id === 'open-thesis' && (
          <motion.div
            className="scene__scroll-hint"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="scene__scroll-arrow">↓</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
