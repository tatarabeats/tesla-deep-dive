import { useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';
import { getChildren } from '../../data/visionTree';
import NodeOrb from './NodeOrb';
import NodeInfo from './NodeInfo';

interface Props {
  node: VisionNode;
  isExpanded: boolean;
  isExplored: boolean;
  expandedNodes: Set<string>;
  exploredNodes: Set<string>;
  onToggle: (nodeId: string) => void;
  depth: number;
  staggerIndex?: number;
}

export default function TreeNodeCard({
  node,
  isExpanded,
  isExplored,
  expandedNodes,
  exploredNodes,
  onToggle,
  depth,
  staggerIndex,
}: Props) {
  const [showDetail, setShowDetail] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const children = getChildren(node.id);
  const hasChildren = children.length > 0;

  const orbSize = depth <= 1 ? 56 : depth === 2 ? 48 : 40;

  const handleTap = useCallback(() => {
    onToggle(node.id);
    // Scroll into view after expand animation starts
    if (!isExpanded) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
  }, [node.id, isExpanded, onToggle]);

  const delay = staggerIndex !== undefined ? staggerIndex * 0.06 : 0;

  // Clean title (remove company tags)
  const cleanTitle = node.title.replace(/\s*\{[^}]+\}/g, '');

  return (
    <motion.div
      ref={cardRef}
      className={`tree-card tree-card--d${Math.min(depth, 4)} ${isExpanded ? 'tree-card--expanded' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      layout
    >
      {/* Tappable row: orb + title + chevron */}
      <motion.div
        className="tree-card__row"
        onClick={handleTap}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      >
        <NodeOrb
          icon={node.icon}
          imageUrl={node.imageUrl}
          size={orbSize}
          depth={node.depth}
          isExplored={isExplored}
          isExpanded={isExpanded}
        />

        <div className="tree-card__text">
          <div className="tree-card__title">{cleanTitle}</div>
          {node.subtitle && (
            <div className="tree-card__subtitle">{node.subtitle}</div>
          )}
          {/* Inline hero stat preview (collapsed state) */}
          {!isExpanded && node.heroStat && (
            <div className="tree-card__stat-preview">
              {node.heroStat}
            </div>
          )}
        </div>

        {hasChildren && (
          <motion.div
            className="tree-card__chevron"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            &#x203A;
          </motion.div>
        )}
      </motion.div>

      {/* Expanded content: NodeInfo + children */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="tree-card__content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <NodeInfo
              node={node}
              showDetail={showDetail}
              onToggleDetail={() => setShowDetail(!showDetail)}
            />

            {/* Children */}
            {children.length > 0 && (
              <div className="tree-card__children">
                {children.map((child, i) => (
                  <TreeNodeCard
                    key={child.id}
                    node={child}
                    isExpanded={expandedNodes.has(child.id)}
                    isExplored={exploredNodes.has(child.id)}
                    expandedNodes={expandedNodes}
                    exploredNodes={exploredNodes}
                    onToggle={onToggle}
                    depth={child.depth}
                    staggerIndex={i}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
