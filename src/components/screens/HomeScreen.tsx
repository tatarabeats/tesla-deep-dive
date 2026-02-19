import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { getLevelTitle } from '../../engine/progressionEngine';
import { visionTreeData, getChildren } from '../../data/visionTree';
import NodeContent from '../tree/NodeContent';
import type { VisionNode } from '../../types/visionTree';

function OutlinerNode({ node, depth }: { node: VisionNode; depth: number }) {
  const { exploration, toggleNode } = useGame();
  const { play } = useSound();
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

  return (
    <div className={depth > 0 ? 'outliner-indent' : ''}>
      {/* Node row */}
      <button
        onClick={() => {
          play(isExpanded ? 'click' : 'explore');
          toggleNode(node.id);
        }}
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
        <span className="text-lg shrink-0">{node.icon}</span>

        {/* Title */}
        <span className={`flex-1 text-left text-sm truncate ${isExplored ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}`}>
          {node.title}
        </span>

        {/* Subtitle for depth-1 nodes */}
        {node.subtitle && depth <= 1 && (
          <span className="text-[10px] text-[var(--muted)] shrink-0">{node.subtitle}</span>
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
  const { userProfile, overallProgress } = useGame();

  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  const rootNode = visionTreeData['root'];

  return (
    <div className="space-y-4 pb-4">
      {/* Compact header */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
          <svg viewBox="0 0 100 100" className="-rotate-90" style={{ width: '100%', height: '100%' }}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--card-border)" strokeWidth="7" />
            <motion.circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="var(--tesla-red)"
              strokeWidth="7"
              strokeDasharray={`${xpPercent * 2.64} 264`}
              strokeLinecap="round"
              initial={false}
              animate={{ strokeDasharray: `${xpPercent * 2.64} 264` }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-extrabold text-[var(--foreground)]">
              {userProfile.level}
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[var(--foreground)]">{getLevelTitle(userProfile.level)}</p>
          <p className="text-[10px] text-[var(--muted)]">
            {userProfile.totalXP} XP · 理解度 {overallProgress}%
            {userProfile.currentStreak > 0 && ` · ${userProfile.currentStreak}日連続`}
          </p>
        </div>
      </div>

      {/* Outliner tree */}
      <div className="outliner-tree">
        <OutlinerNode node={rootNode} depth={0} />
      </div>
    </div>
  );
}
