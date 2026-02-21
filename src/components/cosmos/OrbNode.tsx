import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';
import { haptic } from '../../utils/haptic';

interface Props {
  node: VisionNode;
  x: number;
  y: number;
  size: number;
  isExplored: boolean;
  isExpanded: boolean;
  onTap: (nodeId: string) => void;
  breathDelay: number;
}

function getGlow(depth: number): string {
  if (depth === 0) return 'rgba(255,225,140,0.5)';
  if (depth === 1) return 'rgba(255,90,80,0.4)';
  return 'rgba(80,200,255,0.35)';
}

function getBorder(depth: number, expanded: boolean): string {
  if (depth === 0) return expanded ? 'rgba(255,225,140,0.6)' : 'rgba(255,225,140,0.3)';
  if (depth === 1) return expanded ? 'rgba(255,90,80,0.5)' : 'rgba(255,90,80,0.2)';
  return expanded ? 'rgba(80,200,255,0.45)' : 'rgba(80,200,255,0.15)';
}

export default function OrbNode({ node, x, y, size, isExplored, isExpanded, onTap, breathDelay }: Props) {
  const glow = getGlow(node.depth);
  const border = getBorder(node.depth, isExpanded);
  const imgUrl = node.imageUrl ? `${import.meta.env.BASE_URL}${node.imageUrl}` : undefined;
  const iconSize = size * 0.38;
  const cleanTitle = node.title.replace(/\s*\{[^}]+\}/g, '');
  // Short title: max 8 chars
  const label = cleanTitle.length > 10 ? cleanTitle.slice(0, 9) + '…' : cleanTitle;

  return (
    <motion.div
      className="orb-node"
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -6, 0],
      }}
      transition={{
        scale: { type: 'spring', stiffness: 220, damping: 16 },
        opacity: { duration: 0.3 },
        y: { duration: 3 + breathDelay, repeat: Infinity, ease: 'easeInOut', delay: breathDelay },
      }}
      whileTap={{ scale: 0.88 }}
      onClick={(e) => {
        e.stopPropagation();
        haptic('light');
        onTap(node.id);
      }}
    >
      {/* Pulse ring for unexplored */}
      {!isExplored && (
        <motion.div
          className="orb-node__pulse"
          style={{
            borderColor: glow,
            width: size + 12,
            height: size + 12,
            left: -6,
            top: -6,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Glow */}
      {isExpanded && (
        <div
          className="orb-node__glow"
          style={{
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
            width: size + 24,
            height: size + 24,
            left: -12,
            top: -12,
          }}
        />
      )}

      {/* Orb circle */}
      <div
        className="orb-node__circle"
        style={{
          width: size,
          height: size,
          borderColor: border,
        }}
      >
        {imgUrl ? (
          <img src={imgUrl} alt="" className="orb-node__img" loading="lazy" draggable={false} />
        ) : (
          <div className="orb-node__fallback" />
        )}
        <span className="orb-node__icon" style={{ fontSize: iconSize }}>
          {node.icon}
        </span>
      </div>

      {/* Label below */}
      <div className="orb-node__label">
        <span className="orb-node__title">{label}</span>
        {node.heroStat && <span className="orb-node__stat">{node.heroStat}</span>}
      </div>
    </motion.div>
  );
}
