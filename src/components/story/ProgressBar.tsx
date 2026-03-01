import { motion, type MotionValue, useTransform } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

export default function ProgressBar({ progress }: Props) {
  // Color shifts through chapter colors as you progress
  const barColor = useTransform(
    progress,
    [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1],
    [
      "#50c8ff", // Ch1 cyan
      "#ff5a50", // Ch2 red
      "#b482ff", // Ch3 purple
      "#50dc8c", // Ch4 green
      "#c8b496", // Ch5 amber
      "#e8dcc8", // Ch6 warm
      "#ffffff",
    ],
  );

  return (
    <div className="story-progress">
      <motion.div
        className="story-progress__fill"
        style={{
          scaleX: progress,
          backgroundColor: barColor,
        }}
      />
      <motion.div
        className="story-progress__glow"
        style={{
          left: progress as unknown as string,
          backgroundColor: barColor,
        }}
      />
    </div>
  );
}
