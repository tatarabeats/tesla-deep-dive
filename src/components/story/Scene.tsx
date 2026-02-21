import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import type { StoryScene } from '../../types/story';
import SceneImage from './SceneImage';
import SceneText from './SceneText';
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

  // Parallax + zoom for images
  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1.0]);

  // Text reveal
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.4], ['30px', '0px']);

  const imgSrc = scene.imageUrl ? `${import.meta.env.BASE_URL}${scene.imageUrl}` : undefined;

  // ===== COLD OPEN =====
  if (scene.type === 'cold-open') {
    return (
      <section ref={ref} className="scene scene--cold-open" data-scene={scene.id}>
        <motion.div
          className="scene__cold-text"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <span className="scene__cold-ja">{scene.text}</span>
          <span className="scene__cold-en">{scene.subText}</span>
        </motion.div>
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
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {scene.text}
          </motion.p>
          {scene.elonQuote && (
            <motion.blockquote
              className="scene__epilogue-quote"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              "{scene.elonQuote}"
              <cite>— Elon Musk</cite>
            </motion.blockquote>
          )}
        </div>
      </section>
    );
  }

  // ===== MULTI (3-card layout) =====
  if (scene.type === 'multi' && scene.multiItems) {
    return (
      <section ref={ref} className="scene scene--multi" data-scene={scene.id}>
        <div className="scene__content scene__content--center">
          <motion.h2
            className="scene-text__main"
            style={{ opacity: textOpacity, y: textY }}
          >
            {scene.text}
          </motion.h2>
          <div className="scene__multi-grid">
            {scene.multiItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="scene__multi-card"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
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

  // ===== DEFAULT (threat / solution / root) =====
  const isThreat = scene.type === 'threat';

  return (
    <section ref={ref} className={`scene ${isThreat ? 'scene--threat' : ''}`} data-scene={scene.id}>
      {imgSrc && <SceneImage src={imgSrc} imageY={imageY} imageScale={imageScale} />}
      <div className="scene__content">
        <SceneText
          text={scene.text}
          subText={scene.subText}
          textOpacity={textOpacity}
          textY={textY}
          isThreat={isThreat}
        />
        {scene.stat && (
          <SceneStat stat={scene.stat} label={scene.statLabel} color={scene.accentColor} />
        )}
        {scene.type === 'root' && (
          <motion.div
            className="scene__scroll-hint"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="scene__scroll-arrow">↓</span>
            <span className="scene__scroll-label">Scroll</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
