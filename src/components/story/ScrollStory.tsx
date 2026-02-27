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
    [
      0, 0.05, 0.06, 0.38, 0.4, 0.53, 0.55, 0.73, 0.75, 0.8, 0.82, 0.89, 0.91,
      1,
    ],
    [
      "rgba(5,8,18,1)", // Prologue — void black
      "rgba(5,8,18,1)",
      "rgba(6,16,30,1)", // Ch1 — deep ocean cyan
      "rgba(6,16,30,1)",
      "rgba(22,8,10,1)", // Ch2 — dark crimson
      "rgba(22,8,10,1)",
      "rgba(12,6,24,1)", // Ch3 — deep purple
      "rgba(12,6,24,1)",
      "rgba(6,18,14,1)", // Ch4 — dark forest
      "rgba(6,18,14,1)",
      "rgba(20,16,8,1)", // Ch5 — amber
      "rgba(20,16,8,1)",
      "rgba(12,12,18,1)", // Ch6 — neutral
      "rgba(12,12,18,1)",
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
