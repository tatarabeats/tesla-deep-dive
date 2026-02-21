import { motion } from 'framer-motion';

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dimmed?: boolean;
  targetDepth?: number;
}

export default function MindmapEdge({ x1, y1, x2, y2, dimmed, targetDepth }: Props) {
  // Color by target depth: to L2 = red tint, to L3+ = cyan tint
  const color = targetDepth !== undefined && targetDepth <= 1
    ? 'rgba(255,90,80,0.10)'
    : 'rgba(80,200,255,0.08)';

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: dimmed ? 0.15 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    />
  );
}
