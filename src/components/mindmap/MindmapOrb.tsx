import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  x: number;
  y: number;
  isRoot?: boolean;
  isExplored: boolean;
  isExpanded: boolean;
  onTap: () => void;
}

export default function MindmapOrb({ node, x, y, isRoot, isExplored, isExpanded, onTap }: Props) {
  const size = isRoot ? 140 : 72;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ cursor: 'pointer' }}
      onClick={(e) => { e.stopPropagation(); onTap(); }}
    >
      {/* glow behind orb */}
      <motion.circle
        cx={x}
        cy={y}
        r={size / 2 + 8}
        fill="none"
        stroke="rgba(232,220,200,0.12)"
        strokeWidth={1}
        animate={
          !isExplored
            ? { strokeOpacity: [0.15, 0.5, 0.15] }
            : undefined
        }
        transition={
          !isExplored
            ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      />

      {/* main orb */}
      <motion.circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={`url(#orb-gradient-${isRoot ? 'root' : node.id})`}
        stroke={isExpanded ? 'rgba(232,220,200,0.3)' : 'rgba(232,220,200,0.12)'}
        strokeWidth={1}
        animate={isRoot ? {
          filter: [
            'drop-shadow(0 0 12px rgba(232,220,200,0.10))',
            'drop-shadow(0 0 30px rgba(232,220,200,0.20))',
            'drop-shadow(0 0 12px rgba(232,220,200,0.10))',
          ],
        } : undefined}
        transition={isRoot ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
        whileTap={{ scale: 0.92 }}
      />

      {/* radial gradient def */}
      <defs>
        <radialGradient
          id={`orb-gradient-${isRoot ? 'root' : node.id}`}
          cx="40%"
          cy="35%"
          r="60%"
        >
          <stop offset="0%" stopColor={isRoot ? 'rgba(232,220,200,0.12)' : 'rgba(232,220,200,0.08)'} />
          <stop offset="100%" stopColor="rgba(11,17,32,0.85)" />
        </radialGradient>
      </defs>

      {/* icon */}
      <text
        x={x}
        y={isRoot ? y - 8 : y - 4}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={isRoot ? 28 : 22}
        style={{ pointerEvents: 'none' }}
      >
        {node.icon}
      </text>

      {/* title */}
      <text
        x={x}
        y={isRoot ? y + 22 : y + 18}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={isRoot ? 14 : 9}
        fontWeight={isRoot ? 700 : 600}
        fill="#E8DCC8"
        style={{ pointerEvents: 'none' }}
      >
        {node.title.length > (isRoot ? 12 : 8)
          ? node.title.slice(0, isRoot ? 11 : 7) + '…'
          : node.title}
      </text>
    </motion.g>
  );
}
