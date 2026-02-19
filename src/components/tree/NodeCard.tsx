import { motion, AnimatePresence } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';
import NodeContent from './NodeContent';
import WhyButton from './WhyButton';
import ChildrenList from './ChildrenList';
import { getChildren } from '../../data/visionTree';
import { useGame } from '../../store/gameContext';

interface Props {
  node: VisionNode;
  direction: 'left' | 'right' | 'none';
}

export default function NodeCard({ node, direction }: Props) {
  const { exploreNode, exploration, toggleBookmark } = useGame();
  const children = getChildren(node.id);
  const isBookmarked = exploration.bookmarkedNodes.includes(node.id);
  const isLeaf = children.length === 0;

  const variants = {
    enter: (dir: string) => ({
      x: dir === 'left' ? 200 : dir === 'right' ? -200 : 0,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: string) => ({
      x: dir === 'left' ? -200 : dir === 'right' ? 200 : 0,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={node.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="space-y-4"
      >
        {/* Node header */}
        <div className="node-card" style={{ borderColor: `var(${node.color})` }}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-2xl">{node.icon}</span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-[var(--foreground)] leading-tight">
                  {node.title}
                </h2>
                {node.subtitle && (
                  <p className="text-xs text-[var(--muted)]">{node.subtitle}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleBookmark(node.id)}
              className="text-lg shrink-0 ml-2"
            >
              {isBookmarked ? '⭐' : '☆'}
            </button>
          </div>

          <NodeContent content={node.content} color={node.color} />
        </div>

        {/* Children / Why button / Leaf */}
        {isLeaf ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-4"
          >
            <p className="text-sm text-[var(--muted)]">🌱 この枝の最深部に到達</p>
          </motion.div>
        ) : children.length === 1 ? (
          <WhyButton onClick={() => exploreNode(children[0].id)} />
        ) : (
          <div>
            <p className="text-xs text-[var(--muted)] mb-2 px-1">掘り下げる:</p>
            <ChildrenList children={children} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
