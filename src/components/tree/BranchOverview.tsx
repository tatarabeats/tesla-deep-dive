import { motion } from 'framer-motion';
import type { VisionNode, BranchProgress } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  progress: BranchProgress;
  onClick: () => void;
  index: number;
}

export default function BranchOverview({ node, progress, onClick, index }: Props) {
  const pct = progress.totalNodes > 0
    ? Math.round((progress.exploredNodes / progress.totalNodes) * 100)
    : 0;

  return (
    <motion.button
      onClick={onClick}
      className={`branch-card ${progress.fullyExplored ? 'branch-card-complete' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{node.icon}</span>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-[var(--foreground)] truncate">
            {node.title}
          </p>
          {node.subtitle && (
            <p className="text-xs text-[var(--muted)]">{node.subtitle}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-[var(--muted)]">
            {progress.exploredNodes}/{progress.totalNodes}
          </p>
          {progress.fullyExplored && <span className="text-xs">✨</span>}
        </div>
      </div>
      {/* Progress bar */}
      <div className="mt-2 w-full h-1 rounded-full bg-[var(--card-border)]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: `var(${node.color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
        />
      </div>
    </motion.button>
  );
}
