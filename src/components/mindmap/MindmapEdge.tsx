import { motion } from 'framer-motion';

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dimmed?: boolean;
}

export default function MindmapEdge({ x1, y1, x2, y2, dimmed }: Props) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(232,220,200,0.08)"
      strokeWidth={1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: dimmed ? 0.15 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  );
}
