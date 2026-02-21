import { useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData, getChildren, totalNodeCount } from '../../data/visionTree';
import { haptic } from '../../utils/haptic';
import TreeHeader from './TreeHeader';
import NodeOrb from './NodeOrb';
import NodeContent from './NodeContent';
import TreeNodeCard from './TreeNodeCard';

const ROOT_ID = 'root';

export function TreeExplorer() {
  const { mindmap, toggleNode } = useGame();
  const branchRef = useRef<HTMLDivElement>(null);

  const rootNode = visionTreeData[ROOT_ID];
  const l1Nodes = getChildren(ROOT_ID);
  const activeL1 = l1Nodes.find(n => mindmap.expandedNodes.has(n.id)) ?? null;
  const isRootExpanded = mindmap.expandedNodes.has(ROOT_ID);

  const handleRootTap = useCallback(() => {
    if (!isRootExpanded) {
      haptic('medium');
      toggleNode(ROOT_ID);
    }
  }, [isRootExpanded, toggleNode]);

  const handleL1Tap = useCallback((nodeId: string) => {
    haptic('light');
    toggleNode(nodeId);
  }, [toggleNode]);

  // Scroll to branch content when L1 changes
  useEffect(() => {
    if (activeL1 && branchRef.current) {
      setTimeout(() => {
        branchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [activeL1?.id]);

  return (
    <div className="tree-explorer">
      <TreeHeader explored={mindmap.exploredNodes.size} total={totalNodeCount} />

      {/* Root Hero */}
      <motion.div
        className="root-hero"
        onClick={handleRootTap}
        whileTap={!isRootExpanded ? { scale: 0.97 } : undefined}
      >
        <NodeOrb
          icon={rootNode.icon}
          imageUrl={rootNode.imageUrl}
          size={isRootExpanded ? 72 : 100}
          depth={0}
          isExplored={mindmap.exploredNodes.has(ROOT_ID)}
          isExpanded={isRootExpanded}
        />
        <h1 className="root-hero__title">{rootNode.title}</h1>
        {rootNode.subtitle && (
          <p className="root-hero__subtitle">{rootNode.subtitle}</p>
        )}

        {/* Tap hint when not expanded */}
        {!isRootExpanded && (
          <motion.p
            className="root-hero__hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            タップして探索を始める
          </motion.p>
        )}

        {/* Root quote - shown after expand */}
        <AnimatePresence>
          {isRootExpanded && rootNode.content.analogy && (
            <motion.p
              className="root-hero__quote"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {rootNode.content.analogy}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* L1 Branch Cards */}
      <AnimatePresence>
        {isRootExpanded && (
          <motion.div
            className="l1-grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {l1Nodes.map((node, i) => {
              const isActive = activeL1?.id === node.id;
              return (
                <motion.button
                  key={node.id}
                  className={`l1-card ${isActive ? 'l1-card--active' : ''}`}
                  onClick={() => handleL1Tap(node.id)}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <NodeOrb
                    icon={node.icon}
                    imageUrl={node.imageUrl}
                    size={44}
                    depth={1}
                    isExplored={mindmap.exploredNodes.has(node.id)}
                    isExpanded={isActive}
                  />
                  <div className="l1-card__text">
                    <span className="l1-card__title">{node.title}</span>
                    {node.heroStat && (
                      <span className="l1-card__stat">{node.heroStat}</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Branch Content */}
      <AnimatePresence mode="wait">
        {activeL1 && (
          <motion.div
            key={activeL1.id}
            ref={branchRef}
            className="branch-section"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Branch Hero */}
            <div className="branch-hero">
              <div className="branch-hero__icon">{activeL1.icon}</div>
              <h2 className="branch-hero__title">
                {activeL1.title.replace(/\s*\{[^}]+\}/g, '')}
              </h2>
              {activeL1.heroStat && (
                <motion.div
                  className="branch-hero__stat"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08, type: 'spring', damping: 22 }}
                >
                  {activeL1.heroStat}
                </motion.div>
              )}
              {activeL1.heroCaption && (
                <p className="branch-hero__caption">{activeL1.heroCaption}</p>
              )}
            </div>

            {/* Branch main content - auto shown */}
            <NodeContent node={activeL1} />

            {/* L2+ children */}
            <div className="branch-nodes">
              {getChildren(activeL1.id).map((child, i) => (
                <TreeNodeCard
                  key={child.id}
                  node={child}
                  isExpanded={mindmap.expandedNodes.has(child.id)}
                  isExplored={mindmap.exploredNodes.has(child.id)}
                  expandedNodes={mindmap.expandedNodes}
                  exploredNodes={mindmap.exploredNodes}
                  onToggle={toggleNode}
                  depth={child.depth}
                  staggerIndex={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: 100 }} />
    </div>
  );
}
