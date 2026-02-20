import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';
import NodePill from './NodePill';

interface Props {
  children: VisionNode[];
  exploredNodes: Set<string>;
  onSelect: (nodeId: string) => void;
  isRoot: boolean;
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
};

export default function ChildrenOrbit({ children, exploredNodes, onSelect, isRoot }: Props) {
  if (children.length === 0) return null;

  return (
    <motion.div
      className={isRoot ? 'orbit orbit--root' : 'orbit orbit--branch'}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, i) => (
        <motion.div key={child.id} variants={item}>
          <NodePill
            node={child}
            isExplored={exploredNodes.has(child.id)}
            onTap={() => onSelect(child.id)}
            floatDelay={i}
            isRootChild={isRoot}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
