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

/** Split title into max 2 lines */
function wrapTitle(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const breakChars = ['、', '—', ' ', '・', 'ー', '　'];
  let breakIdx = -1;
  for (let i = Math.min(maxChars, text.length - 1); i >= maxChars - 4 && i >= 1; i--) {
    if (breakChars.includes(text[i])) { breakIdx = i + 1; break; }
  }
  if (breakIdx === -1) breakIdx = maxChars;
  const line1 = text.slice(0, breakIdx);
  const rest = text.slice(breakIdx);
  if (rest.length > maxChars) return [line1, rest.slice(0, maxChars - 1) + '…'];
  return [line1, rest];
}

export default function MindmapOrb({ node, x, y, isRoot, isExplored, isExpanded, onTap }: Props) {
  const size = isRoot ? 130 : 64;
  const titleLines = isRoot ? [node.title] : wrapTitle(node.title, 8);
  const filterId = `glow-${isRoot ? 'root' : node.id}`;
  const gradId = `orb-grad-${isRoot ? 'root' : node.id}`;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        {/* blur filter for glow */}
        <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={isRoot ? 18 : 8} />
        </filter>
        {/* radial gradient — brighter, more depth */}
        <radialGradient id={gradId} cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor={isRoot ? 'rgba(232,220,200,0.28)' : 'rgba(232,220,200,0.15)'} />
          <stop offset="35%" stopColor={isRoot ? 'rgba(180,170,150,0.10)' : 'rgba(140,130,120,0.06)'} />
          <stop offset="70%" stopColor={isRoot ? 'rgba(60,65,80,0.08)' : 'rgba(40,45,60,0.06)'} />
          <stop offset="100%" stopColor="rgba(11,17,32,0.92)" />
        </radialGradient>
      </defs>

      {/* ─── Root: dramatic glow layers ─── */}
      {isRoot && (
        <>
          {/* layer 1: wide ambient haze */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 55}
            fill="rgba(200,190,170,0.04)"
            filter={`url(#${filterId})`}
            animate={{
              r: [size / 2 + 45, size / 2 + 65, size / 2 + 45],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* layer 2: closer glow */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 20}
            fill="rgba(232,220,200,0.06)"
            filter={`url(#${filterId})`}
            animate={{
              r: [size / 2 + 15, size / 2 + 30, size / 2 + 15],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          {/* ring 1 — slow expanding breath */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 6}
            fill="none"
            stroke="rgba(232,220,200,0.15)"
            strokeWidth={1.5}
            animate={{
              r: [size / 2 + 6, size / 2 + 28, size / 2 + 6],
              strokeOpacity: [0.18, 0.03, 0.18],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* ring 2 — offset timing */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 3}
            fill="none"
            stroke="rgba(232,220,200,0.10)"
            strokeWidth={1}
            animate={{
              r: [size / 2 + 3, size / 2 + 38, size / 2 + 3],
              strokeOpacity: [0.12, 0.01, 0.12],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* inner core glow */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 - 8}
            fill="rgba(232,220,200,0.06)"
            filter={`url(#${filterId})`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* ─── Non-root: subtle glow ─── */}
      {!isRoot && (
        <motion.circle
          cx={x} cy={y}
          r={size / 2 + 4}
          fill="none"
          stroke="rgba(232,220,200,0.08)"
          strokeWidth={1}
          animate={
            !isExplored
              ? { strokeOpacity: [0.08, 0.35, 0.08] }
              : { strokeOpacity: isExpanded ? 0.15 : 0.06 }
          }
          transition={
            !isExplored
              ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      )}

      {/* main orb circle */}
      <circle
        cx={x} cy={y}
        r={size / 2}
        fill={`url(#${gradId})`}
        stroke={isExpanded ? 'rgba(232,220,200,0.30)' : isRoot ? 'rgba(232,220,200,0.18)' : 'rgba(232,220,200,0.10)'}
        strokeWidth={isRoot ? 1.5 : 1}
        onClick={(e) => { e.stopPropagation(); onTap(); }}
        style={{ cursor: 'pointer' }}
      />

      {/* icon */}
      <text
        x={x} y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={isRoot ? 34 : 22}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.icon}
      </text>

      {/* title below orb */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + size / 2 + 14 + i * (isRoot ? 18 : 13)}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isRoot ? 14 : 10}
          fontWeight={isRoot ? 700 : 600}
          fill="#E8DCC8"
          fillOpacity={isRoot ? 0.95 : 0.8}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {line}
        </text>
      ))}
    </motion.g>
  );
}
