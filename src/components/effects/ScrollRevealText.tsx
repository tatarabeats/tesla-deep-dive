import { motion, useTransform, type MotionValue } from "framer-motion";

/** Single character driven by scroll progress */
function ScrollChar({
  char,
  progress,
  index,
  total,
}: {
  char: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = Math.min((index + 1.5) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);

  return (
    <motion.span style={{ opacity, y, display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

interface Props {
  text: string;
  /** MotionValue 0→1 controlling reveal progress */
  progress: MotionValue<number>;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollRevealText({
  text,
  progress,
  className,
  style,
}: Props) {
  const chars = text.split("");
  return (
    <span className={className} style={style} aria-label={text}>
      {chars.map((char, i) => (
        <ScrollChar
          key={i}
          char={char}
          progress={progress}
          index={i}
          total={chars.length}
        />
      ))}
    </span>
  );
}
