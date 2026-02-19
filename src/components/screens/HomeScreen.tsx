import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData, getChildren } from '../../data/visionTree';
import NodeContent from '../tree/NodeContent';
import type { VisionNode } from '../../types/visionTree';

function OutlinerNode({ node, depth }: { node: VisionNode; depth: number }) {
  const { exploration, toggleNode } = useGame();
  const contentRef = useRef<HTMLDivElement>(null);

  const isExpanded = exploration.expandedNodes.has(node.id);
  const isExplored = exploration.exploredNodes.has(node.id);
  const children = getChildren(node.id);
  const hasChildren = children.length > 0;
  const isRoot = node.id === 'root';

  useEffect(() => {
    if (isExpanded && contentRef.current && !isRoot) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }, [isExpanded, isRoot]);

  const indent = isRoot ? 0 : Math.min(depth * 16, 64);

  return (
    <div style={{ paddingLeft: indent }}>
      <button
        onClick={() => toggleNode(node.id)}
        className="outliner-row"
      >
        <span className={`outliner-toggle ${!hasChildren ? 'invisible' : ''}`}>
          {isExpanded ? '▾' : '▸'}
        </span>

        <span className={`flex-1 text-left ${
          isRoot
            ? 'text-2xl font-bold tracking-tight'
            : depth === 1
              ? 'text-lg font-semibold'
              : 'text-base'
        } ${isExplored || isRoot ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'}`}>
          {node.title}
        </span>

        {node.subtitle && depth <= 1 && !isRoot && (
          <span className="text-xs text-[var(--text-secondary)] shrink-0">{node.subtitle}</span>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {!isRoot && (
              <div className="outliner-content">
                <NodeContent content={node.content} />
              </div>
            )}

            {children.map(child => (
              <OutlinerNode key={child.id} node={child} depth={depth + 1} />
            ))}
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
