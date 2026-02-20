import { motion } from 'framer-motion';
import type { VisionNode, TransitionDirection } from '../../types/visionTree';
import { getChildren } from '../../data/visionTree';
import NodeHero from './NodeHero';
import NodeContentPanel from './NodeContentPanel';
import ChildrenOrbit from './ChildrenOrbit';

interface Props {
  node: VisionNode;
  direction: TransitionDirection;
  exploredNodes: Set<string>;
  onNavigateTo: (nodeId: string) => void;
}

const pageVariants = {
  enterFromBelow: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  enterFromAbove: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  instant: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export default function NodeUniverse({ node, direction, exploredNodes, onNavigateTo }: Props) {
  const children = getChildren(node.id);
  const isRoot = node.id === 'root';

  const variant = direction === 'in'
    ? pageVariants.enterFromBelow
    : direction === 'out'
      ? pageVariants.enterFromAbove
      : pageVariants.instant;

  return (
    <motion.div
      className="universe"
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <div className="universe__scroll">
        <NodeHero node={node} isRoot={isRoot} />

        {!isRoot && (
          <NodeContentPanel content={node.content} />
        )}

        {isRoot && node.content.analogy && (
          <motion.p
            className="universe__root-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {node.content.mainText}
          </motion.p>
        )}

        <ChildrenOrbit
          children={children}
          exploredNodes={exploredNodes}
          onSelect={onNavigateTo}
          isRoot={isRoot}
        />
      </div>
    </motion.div>
  );
}
