import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cinematicScenes } from "../../data/cinematicScenes";
import CinematicScene from "../cinematic/CinematicScene";
import ProgressBar from "./ProgressBar";
import ChapterIndicator from "./ChapterIndicator";
import FurtherReading from "./FurtherReading";

export default function ScrollStory() {
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const rawStarY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rawStarY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const starY1 = useSpring(rawStarY1, { stiffness: 50, damping: 30 });
  const starY2 = useSpring(rawStarY2, { stiffness: 50, damping: 30 });

  // Background color transitions keyed to new 28-scene structure
  // Prologue(2) → Ch1(6) → Bridge → Ch2(4) → Bridge → Ch3(5) → Bridge → Ch4(3) → Ch5(3) → Bridge → Ch6(3) → Epilogue(2)
  const bgHue = useTransform(
    scrollYProgress,
    [
      0,
      0.06, // Prologue — void black
      0.07,
      0.35, // Ch1 — deep ocean cyan
      0.36,
      0.5, // Ch2 — dark crimson
      0.51,
      0.7, // Ch3 — deep purple
      0.71,
      0.78, // Ch4 — dark forest
      0.79,
      0.86, // Ch5 — amber
      0.87,
      0.95, // Ch6 — neutral
      0.96,
      1, // Epilogue — warm gold
    ],
    [
      "rgba(5,8,18,1)", // Prologue
      "rgba(5,8,18,1)",
      "rgba(6,16,30,1)", // Ch1
      "rgba(6,16,30,1)",
      "rgba(22,8,10,1)", // Ch2
      "rgba(22,8,10,1)",
      "rgba(12,6,24,1)", // Ch3
      "rgba(12,6,24,1)",
      "rgba(6,18,14,1)", // Ch4
      "rgba(6,18,14,1)",
      "rgba(20,16,8,1)", // Ch5
      "rgba(20,16,8,1)",
      "rgba(12,12,18,1)", // Ch6
      "rgba(12,12,18,1)",
      "rgba(8,6,12,1)", // Epilogue
      "rgba(8,6,12,1)",
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
        {cinematicScenes.map((scene) => (
          <CinematicScene key={scene.id} scene={scene} />
        ))}
        <FurtherReading />
      </main>
    </>
  );
}
