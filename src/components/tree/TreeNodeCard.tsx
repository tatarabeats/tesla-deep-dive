import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';
import { getChildren } from '../../data/visionTree';
import { haptic } from '../../utils/haptic';
import NodeOrb from './NodeOrb';
import NodeContent from './NodeContent';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const children = getChildren(node.id);
  const hasChildren = children.length > 0;
  const orbSize = depth <= 2 ? 44 : 36;
  const delay = staggerIndex !== undefined ? staggerIndex * 0.05 : 0;
  const cleanTitle = node.title.replace(/\s*\{[^}]+\}/g, '');

  const handleTap = useCallback(() => {
    haptic('light');
    onToggle(node.id);
    if (!isExpanded) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [node.id, isExpanded, onToggle]);

  return (
    <motion.div
      ref={cardRef}
      className={`tree-card tree-card--d${Math.min(depth, 4)} ${isExpanded ? 'tree-card--expanded' : ''}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
    >
      {/* Tappable row */}
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
          {node.subtitle && <div className="tree-card__subtitle">{node.subtitle}</div>}
          {!isExpanded && node.heroStat && (
            <div className="tree-card__stat-preview">{node.heroStat}</div>
          )}
        </div>

        <motion.div
          className="tree-card__chevron"
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ›
        </motion.div>
      </motion.div>

      {/* Expanded: content auto-shown + children */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="tree-card__content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <NodeContent node={node} compact />

            {hasChildren && (
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
