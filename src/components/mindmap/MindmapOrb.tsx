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

/** Split title into max 2 lines at ~maxChars per line */
function wrapTitle(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  // try to break at a natural point
  const breakChars = ['、', '—', ' ', '・', 'ー', '　'];
  let breakIdx = -1;
  for (let i = Math.min(maxChars, text.length - 1); i >= maxChars - 4 && i >= 1; i--) {
    if (breakChars.includes(text[i])) {
      breakIdx = i + 1;
      break;
    }
  }
  if (breakIdx === -1) breakIdx = maxChars;
  const line1 = text.slice(0, breakIdx);
  const rest = text.slice(breakIdx);
  if (rest.length > maxChars) {
    return [line1, rest.slice(0, maxChars - 1) + '…'];
  }
  return [line1, rest];
}

export default function MindmapOrb({ node, x, y, isRoot, isExplored, isExpanded, onTap }: Props) {
  const size = isRoot ? 140 : 80;
  const titleLines = isRoot
    ? [node.title]
    : wrapTitle(node.title, 10);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ cursor: 'pointer' }}
    >
      {/* glow ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={size / 2 + 6}
        fill="none"
        stroke="rgba(232,220,200,0.10)"
        strokeWidth={1}
        animate={
          !isExplored
            ? { strokeOpacity: [0.12, 0.45, 0.12] }
            : { strokeOpacity: isExpanded ? 0.2 : 0.08 }
        }
        transition={
          !isExplored
            ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.3 }
        }
      />

      {/* clickable orb */}
      <circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={`url(#orb-gradient-${isRoot ? 'root' : node.id})`}
        stroke={isExpanded ? 'rgba(232,220,200,0.25)' : 'rgba(232,220,200,0.10)'}
        strokeWidth={1}
        onClick={(e) => { e.stopPropagation(); onTap(); }}
        style={{ cursor: 'pointer' }}
      />

      {/* pulsing glow for root */}
      {isRoot && (
        <motion.circle
          cx={x}
          cy={y}
          r={size / 2 + 2}
          fill="none"
          stroke="rgba(232,220,200,0.12)"
          strokeWidth={2}
          animate={{
            r: [size / 2 + 2, size / 2 + 18, size / 2 + 2],
            strokeOpacity: [0.12, 0.03, 0.12],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* radial gradient def */}
      <defs>
        <radialGradient
          id={`orb-gradient-${isRoot ? 'root' : node.id}`}
          cx="40%"
          cy="35%"
          r="60%"
        >
          <stop offset="0%" stopColor={isRoot ? 'rgba(232,220,200,0.14)' : 'rgba(232,220,200,0.08)'} />
          <stop offset="100%" stopColor="rgba(11,17,32,0.9)" />
        </radialGradient>
      </defs>

      {/* icon — centered in orb */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={isRoot ? 32 : 26}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.icon}
      </text>

      {/* title — below orb, multi-line */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + size / 2 + 16 + i * 14}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isRoot ? 15 : 11}
          fontWeight={isRoot ? 700 : 600}
          fill="#E8DCC8"
          fillOpacity={isRoot ? 1 : 0.85}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {line}
        </text>
      ))}
    </motion.g>
  );
}
