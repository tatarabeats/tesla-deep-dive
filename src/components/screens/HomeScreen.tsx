import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData, getChildren } from '../../data/visionTree';
import NodeContent from '../tree/NodeContent';
import type { VisionNode } from '../../types/visionTree';

const smooth = [0.25, 0.1, 0.25, 1] as const;

const nodeVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: smooth },
      opacity: { duration: 0.3, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15 },
      height: { duration: 0.25, ease: smooth },
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.1, ease: smooth },
  },
};

const childStagger = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const childItem = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: smooth },
  },
};

function OutlinerNode({ node, depth }: { node: VisionNode; depth: number }) {
  const { exploration, toggleNode } = useGame();
  const contentRef = useRef<HTMLDivElement>(null);

  const isExpanded = exploration.expandedNodes.has(node.id);
  const children = getChildren(node.id);
  const hasChildren = children.length > 0;
  const isRoot = node.id === 'root';

  useEffect(() => {
    if (isExpanded && contentRef.current && !isRoot) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 200);
    }
  }, [isExpanded, isRoot]);

  return (
    <div>
      <motion.button
        onClick={() => toggleNode(node.id)}
        className="outliner-row"
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        <motion.span
          className={`outliner-toggle ${!hasChildren ? 'invisible' : ''}`}
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          ▾
        </motion.span>

        <span className={`flex-1 text-left ${
          isRoot
            ? 'text-3xl font-bold tracking-tight'
            : depth === 1
              ? 'text-xl font-semibold'
              : 'text-lg'
        } text-[var(--text)]`}>
          {node.title}
        </span>

        {node.subtitle && depth <= 1 && !isRoot && (
          <span className="text-sm text-[var(--text-secondary)] shrink-0">{node.subtitle}</span>
        )}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={contentRef}
            variants={nodeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ overflow: 'hidden' }}
          >
            {!isRoot && (
              <motion.div
                className="outliner-content"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <NodeContent content={node.content} />
              </motion.div>
            )}

            <motion.div
              variants={childStagger}
              initial="hidden"
              animate="visible"
            >
              {children.map(child => (
                <motion.div key={child.id} variants={childItem}>
                  <OutlinerNode node={child} depth={depth + 1} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HomeScreen() {
  const rootNode = visionTreeData['root'];

  return (
    <div className="max-w-xl mx-auto px-5 py-8">
      <OutlinerNode node={rootNode} depth={0} />
    </div>
  );
}
