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

  // Scroll into view when expanded
  useEffect(() => {
    if (isExpanded && contentRef.current && !isRoot) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }, [isExpanded, isRoot]);

  // Compact indent: 12px per level, max 48px so deep nodes stay readable
  const indent = isRoot ? 0 : Math.min(depth * 12, 48);

  return (
    <div style={{ paddingLeft: indent }}>
      {/* Node row */}
      <button
        onClick={() => toggleNode(node.id)}
        className={`outliner-row ${isExpanded ? 'outliner-row-expanded' : ''} ${isRoot ? 'outliner-row-root' : ''}`}
        style={{
          borderLeftColor: depth > 0 ? `var(${node.color})` : 'transparent',
        }}
      >
        {/* Toggle indicator */}
        <span className={`outliner-toggle ${!hasChildren ? 'invisible' : ''}`}>
          {isExpanded ? '▼' : '▶'}
        </span>

        {/* Icon */}
        <span className="text-xl shrink-0">{node.icon}</span>

        {/* Title */}
        <span className={`flex-1 text-left truncate ${isExplored ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
          {node.title}
        </span>

        {/* Subtitle for branch-level nodes */}
        {node.subtitle && depth <= 1 && (
          <span className="text-xs text-[var(--muted)] shrink-0">{node.subtitle}</span>
        )}
      </button>

      {/* Expanded content + children */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={contentRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Content (show for non-root expanded nodes) */}
            {!isRoot && (
              <div className="outliner-content" style={{ borderLeftColor: `var(${node.color})` }}>
                <NodeContent content={node.content} color={node.color} />
              </div>
            )}

            {/* Children */}
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
  const { overallProgress } = useGame();

  const rootNode = visionTreeData['root'];

  return (
    <div className="space-y-3 pb-4">
      {/* Simple progress */}
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-[var(--foreground)]">Elon's Vision Tree</p>
        <span className="text-xs text-[var(--muted)]">{overallProgress}% 探索済</span>
      </div>

      {/* Outliner tree */}
      <div className="outliner-tree">
        <OutlinerNode node={rootNode} depth={0} />
      </div>
    </div>
  );
}
