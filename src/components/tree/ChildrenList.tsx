import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';
import { useGame } from '../../store/gameContext';

interface Props {
  children: VisionNode[];
}

export default function ChildrenList({ children }: Props) {
  const { exploreNode, exploration } = useGame();

  return (
    <div className="space-y-2">
      {children.map((child, i) => {
        const isExplored = exploration.exploredNodes.has(child.id);
        return (
          <motion.button
            key={child.id}
            onClick={() => exploreNode(child.id)}
            className={`child-card ${isExplored ? 'child-card-explored' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{child.icon}</span>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)] truncate">
                  {child.title}
                </p>
                {child.subtitle && (
                  <p className="text-xs text-[var(--muted)]">{child.subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {isExplored && <span className="text-xs text-[var(--accent-green)]">✓</span>}
                <span className="text-[var(--muted)] text-sm">→</span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
