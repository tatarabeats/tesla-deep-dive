import { useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { visionTreeData, getChildren, totalNodeCount } from '../../data/visionTree';
import TreeHeader from './TreeHeader';
import NodeOrb from './NodeOrb';
import NodeInfo from './NodeInfo';
import TreeNodeCard from './TreeNodeCard';
import { useState } from 'react';

const ROOT_ID = 'root';

export function TreeExplorer() {
  const { mindmap, toggleNode } = useGame();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [rootDetail, setRootDetail] = useState(false);

  const rootNode = visionTreeData[ROOT_ID];
  const l1Nodes = getChildren(ROOT_ID);

  // Find which L1 is currently expanded
  const activeL1 = l1Nodes.find(n => mindmap.expandedNodes.has(n.id)) ?? null;

  const handleL1Tap = useCallback((nodeId: string) => {
    toggleNode(nodeId);
  }, [toggleNode]);

  const handleRootTap = useCallback(() => {
    // Root tap: expand root if collapsed, or toggle root detail
    if (!mindmap.expandedNodes.has(ROOT_ID)) {
      toggleNode(ROOT_ID);
    } else {
      setRootDetail(prev => !prev);
    }
  }, [mindmap.expandedNodes, toggleNode]);

  return (
    <div className="tree-explorer" ref={scrollRef}>
      <TreeHeader explored={mindmap.exploredNodes.size} total={totalNodeCount} />

      {/* Root Hero */}
      <motion.div
        className="root-hero"
        onClick={handleRootTap}
        whileTap={{ scale: 0.97 }}
      >
        <NodeOrb
          icon={rootNode.icon}
          imageUrl={rootNode.imageUrl}
          size={100}
          depth={0}
          isExplored={mindmap.exploredNodes.has(ROOT_ID)}
          isExpanded={mindmap.expandedNodes.has(ROOT_ID)}
        />
        <h1 className="root-hero__title">{rootNode.title}</h1>
        {rootNode.subtitle && (
          <p className="root-hero__subtitle">{rootNode.subtitle}</p>
        )}

        <AnimatePresence>
          {rootDetail && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden', width: '100%' }}
            >
              <NodeInfo
                node={rootNode}
                showDetail={rootDetail}
                onToggleDetail={() => setRootDetail(!rootDetail)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* L1 horizontal scroll row */}
      <AnimatePresence>
        {mindmap.expandedNodes.has(ROOT_ID) && (
          <motion.div
            className="l1-row-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="l1-row">
              {l1Nodes.map((node, i) => {
                const isActive = activeL1?.id === node.id;
                return (
                  <motion.button
                    key={node.id}
                    className={`l1-chip ${isActive ? 'l1-chip--active' : ''}`}
                    onClick={() => handleL1Tap(node.id)}
                    whileTap={{ scale: 0.93 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <NodeOrb
                      icon={node.icon}
                      imageUrl={node.imageUrl}
                      size={56}
                      depth={1}
                      isExplored={mindmap.exploredNodes.has(node.id)}
                      isExpanded={isActive}
                    />
                    <span className="l1-chip__title">
                      {node.title.length > 8 ? node.title.slice(0, 7) + '...' : node.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded L1 branch content */}
      <AnimatePresence mode="wait">
        {activeL1 && (
          <motion.div
            key={activeL1.id}
            className="branch-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* L1 branch header with hero stat */}
            <div className="branch-header">
              <h2 className="branch-header__title">
                {activeL1.icon} {activeL1.title.replace(/\s*\{[^}]+\}/g, '')}
              </h2>
              {activeL1.heroStat && (
                <motion.div
                  className="branch-header__stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 20 }}
                >
                  {activeL1.heroStat}
                </motion.div>
              )}
              {activeL1.heroCaption && (
                <p className="branch-header__caption">{activeL1.heroCaption}</p>
              )}
            </div>

            {/* L2+ children as tree cards */}
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

      {/* Bottom spacer */}
      <div style={{ height: 120 }} />
    </div>
  );
}
