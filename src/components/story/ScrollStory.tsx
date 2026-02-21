import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { storyScenes } from '../../data/storyScenes';
import Scene from './Scene';
import ProgressBar from './ProgressBar';
import VisionTreeExplorer from '../tree/VisionTreeExplorer';

export default function ScrollStory() {
  // Use the window/document as scroll container (no fixed div)
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Stars parallax — moves at ~8% of scroll speed for depth
  const rawStarY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rawStarY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const starY1 = useSpring(rawStarY1, { stiffness: 50, damping: 30 });
  const starY2 = useSpring(rawStarY2, { stiffness: 50, damping: 30 });

  // Global background color shift based on scroll position
  const bgHue = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5, 0.65, 0.8, 0.9, 1], [
    'rgba(11,17,32,1)',      // prologue
    'rgba(11,20,35,1)',      // ch1 — slight cyan
    'rgba(18,14,28,1)',      // ch2 — slight red-brown
    'rgba(14,13,30,1)',      // ch3 — purple
    'rgba(12,18,26,1)',      // ch4 — green-dark
    'rgba(16,15,24,1)',      // ch5 — warm
    'rgba(11,17,32,1)',      // ch6
    'rgba(11,17,32,1)',      // epilogue
  ]);

  return (
    <>
      {/* Star background — parallax to scroll */}
      <div className="cosmos-stars" aria-hidden>
        <motion.div className="cosmos-stars__layer cosmos-stars__layer--1" style={{ y: starY1 }} />
        <motion.div className="cosmos-stars__layer cosmos-stars__layer--2" style={{ y: starY2 }} />
      </div>

      {/* Atmospheric background color */}
      <motion.div
        className="scroll-story__atmosphere"
        style={{ backgroundColor: bgHue }}
        aria-hidden
      />

      <ProgressBar progress={progress} />

      <main className="scroll-story">
        {storyScenes.map((scene, i) => (
          <Scene key={scene.id} scene={scene} index={i} />
        ))}

        {/* Interactive Vision Tree — Deep Dive */}
        <VisionTreeExplorer />
      </main>
    </>
  );
}
