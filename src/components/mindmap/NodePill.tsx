import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  isExplored: boolean;
  onTap: () => void;
  floatDelay?: number;
  isRootChild?: boolean;
}

export default function NodePill({ node, isExplored, onTap, floatDelay = 0, isRootChild = false }: Props) {
  return (
    <motion.button
      layoutId={`pill-${node.id}`}
      onClick={onTap}
      className={`node-pill ${isRootChild ? 'node-pill--root' : ''}`}
      whileTap={{ scale: 0.95 }}
      animate={isRootChild ? {
        y: [0, -4, 0, 3, 0],
      } : undefined}
      transition={isRootChild ? {
        y: {
          duration: 6 + floatDelay * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        layout: { type: 'spring', stiffness: 300, damping: 30 },
      } : {
        layout: { type: 'spring', stiffness: 300, damping: 30 },
      }}
    >
      <span className="node-pill__icon">{node.icon}</span>
      <span className="node-pill__title">{node.title}</span>
      {!isExplored && <span className="node-pill__glow" />}
    </motion.button>
  );
}
