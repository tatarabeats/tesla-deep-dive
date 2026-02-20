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
  const size = isRoot ? 120 : 56;
  const titleLines = isRoot ? [node.title] : wrapTitle(node.title, 8);
  // Use shared filter IDs defined in MindmapScreen defs
  const filterId = isRoot ? 'glow-root' : 'glow-child';
  const gradId = isRoot ? 'orb-grad-root' : 'orb-grad-child';

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ cursor: 'pointer' }}
    >
      {/* ─── Root: dramatic glow layers (no blur filter — use opacity circles) ─── */}
      {isRoot && (
        <>
          {/* layer 1: wide ambient haze — NO filter, just big translucent circle */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 50}
            fill="rgba(200,190,170,0.03)"
            animate={{
              r: [size / 2 + 40, size / 2 + 58, size / 2 + 40],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* layer 2: closer glow — use shared blur filter */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 18}
            fill="rgba(232,220,200,0.05)"
            filter={`url(#${filterId})`}
            animate={{
              r: [size / 2 + 12, size / 2 + 25, size / 2 + 12],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          {/* ring 1 — slow expanding breath */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 5}
            fill="none"
            stroke="rgba(232,220,200,0.14)"
            strokeWidth={1.2}
            animate={{
              r: [size / 2 + 5, size / 2 + 24, size / 2 + 5],
              strokeOpacity: [0.16, 0.02, 0.16],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* ring 2 — offset timing */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 + 3}
            fill="none"
            stroke="rgba(232,220,200,0.08)"
            strokeWidth={0.8}
            animate={{
              r: [size / 2 + 3, size / 2 + 32, size / 2 + 3],
              strokeOpacity: [0.10, 0.01, 0.10],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* inner core glow — no filter */}
          <motion.circle
            cx={x} cy={y}
            r={size / 2 - 6}
            fill="rgba(232,220,200,0.05)"
            animate={{ opacity: [0.5, 1, 0.5] }}
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
        fontSize={isRoot ? 30 : 20}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.icon}
      </text>

      {/* title below orb */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + size / 2 + 12 + i * (isRoot ? 16 : 12)}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isRoot ? 13 : 9.5}
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
