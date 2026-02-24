import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { storyScenes } from "../../data/storyScenes";
import Scene from "./Scene";
import ProgressBar from "./ProgressBar";
import ChapterIndicator from "./ChapterIndicator";

export default function ScrollStory() {
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const rawStarY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rawStarY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const starY1 = useSpring(rawStarY1, { stiffness: 50, damping: 30 });
  const starY2 = useSpring(rawStarY2, { stiffness: 50, damping: 30 });

  const bgHue = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5, 0.65, 0.8, 0.9, 1],
    [
      "rgba(11,17,32,1)",
      "rgba(11,20,35,1)",
      "rgba(18,14,28,1)",
      "rgba(14,13,30,1)",
      "rgba(12,18,26,1)",
      "rgba(16,15,24,1)",
      "rgba(11,17,32,1)",
      "rgba(11,17,32,1)",
    ],
  );

  return (
    <>
      <div className="cosmos-stars" aria-hidden>
        <motion.div
          className="cosmos-stars__layer cosmos-stars__layer--1"
          style={{ y: starY1 }}
        />
        <motion.div
          className="cosmos-stars__layer cosmos-stars__layer--2"
          style={{ y: starY2 }}
        />
      </div>

      <motion.div
        className="scroll-story__atmosphere"
        style={{ backgroundColor: bgHue }}
        aria-hidden
      />

      <ProgressBar progress={progress} />
      <ChapterIndicator />

      <main className="scroll-story">
        {storyScenes.map((scene, i) => (
          <Scene key={scene.id} scene={scene} index={i} />
        ))}
      </main>
    </>
  );
}
