import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  path: VisionNode[];
  onJumpTo: (nodeId: string) => void;
}

export default function CosmicBreadcrumb({ path, onJumpTo }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [path]);

  if (path.length <= 1) return null;

  return (
    <motion.div
      className="breadcrumb"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="breadcrumb__scroll" ref={scrollRef}>
        {path.map((node, i) => {
          const isCurrent = i === path.length - 1;
          return (
            <span key={node.id} className="breadcrumb__segment">
              {i > 0 && <span className="breadcrumb__chevron">›</span>}
              <button
                onClick={() => !isCurrent && onJumpTo(node.id)}
                className={`breadcrumb__btn ${isCurrent ? 'breadcrumb__btn--current' : ''}`}
                disabled={isCurrent}
              >
                <span className="breadcrumb__icon">{node.icon}</span>
                <span className="breadcrumb__label">
                  {node.title.length > 8 ? node.title.slice(0, 8) + '…' : node.title}
                </span>
              </button>
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}
