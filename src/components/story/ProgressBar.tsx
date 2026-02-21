import { motion, type MotionValue } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="story-progress">
      <motion.div
        className="story-progress__fill"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
