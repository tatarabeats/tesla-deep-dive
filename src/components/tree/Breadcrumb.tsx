import { motion } from 'framer-motion';
import { getPathToNode } from '../../data/visionTree';
import { useGame } from '../../store/gameContext';

interface Props {
  currentNodeId: string;
}

export default function Breadcrumb({ currentNodeId }: Props) {
  const { exploreNode, goToRoot } = useGame();
  const path = getPathToNode(currentNodeId);

  return (
    <div className="breadcrumb-trail">
      {path.map((node, i) => {
        const isLast = i === path.length - 1;
        return (
          <motion.span
            key={node.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center shrink-0"
          >
            {i > 0 && <span className="text-[var(--muted)] mx-1 text-xs">→</span>}
            <button
              onClick={() => {
                if (node.id === 'root') goToRoot();
                else if (!isLast) exploreNode(node.id);
              }}
              className={`breadcrumb-pill ${isLast ? 'breadcrumb-pill-active' : ''}`}
              disabled={isLast}
            >
              <span>{node.icon}</span>
              {path.length <= 4 && (
                <span className="truncate max-w-[80px]">{node.title}</span>
              )}
            </button>
          </motion.span>
        );
      })}
    </div>
  );
}
