import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  isRoot: boolean;
}

export default function NodeHero({ node, isRoot }: Props) {
  if (isRoot) {
    return (
      <div className="hero hero--root">
        <motion.div
          className="hero__orb"
          animate={{
            boxShadow: [
              '0 0 20px 4px rgba(232,220,200,0.12)',
              '0 0 50px 12px rgba(232,220,200,0.22)',
              '0 0 20px 4px rgba(232,220,200,0.12)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="hero__orb-text">{node.title}</span>
        </motion.div>
        {node.subtitle && (
          <p className="hero__subtitle">{node.subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      layoutId={`pill-${node.id}`}
      className="hero hero--node"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <span className="hero__icon">{node.icon}</span>
      <div>
        <h1 className="hero__title">{node.title}</h1>
        {node.subtitle && (
          <p className="hero__node-subtitle">{node.subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
