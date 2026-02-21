import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  x: number;
  y: number;
  depth: number;
  isCenter: boolean;
  isExplored: boolean;
  isExpanded: boolean;
  hasChildren: boolean;
  isActive: boolean;
  dimmed: boolean;
  onTap: () => void;
}

/** Split title into max 2 lines */
function wrapTitle(text: string, maxChars: number): string[] {
  const clean = text.replace(/\s*\{[^}]+\}/g, '');
  if (clean.length <= maxChars) return [clean];
  const breakChars = ['、', '—', ' ', '・', 'ー', '　', '（', '｛'];
  let breakIdx = -1;
  for (let i = Math.min(maxChars, clean.length - 1); i >= Math.max(1, maxChars - 5); i--) {
    if (breakChars.includes(clean[i])) { breakIdx = i + 1; break; }
  }
  if (breakIdx === -1) breakIdx = maxChars;
  const line1 = clean.slice(0, breakIdx);
  const rest = clean.slice(breakIdx);
  if (rest.length > maxChars + 2) return [line1, rest.slice(0, maxChars) + '…'];
  return [line1, rest];
}

function radiusByDepth(depth: number, isCenter: boolean): number {
  if (isCenter) return 52;
  if (depth <= 1) return 36;
  if (depth === 2) return 28;
  return 22;
}

/**
 * Star Wars color system:
 * - Root (L1): warm gold — the Force, origin
 * - L2 (threats/problems): red/orange — Dark Side
 * - L3+ (solutions): cyan/blue — Light Side, hope
 */
function getNodeColor(depth: number, isCenter: boolean): string {
  if (isCenter) return 'rgba(255,225,140,0.7)';   // warm gold
  if (depth <= 1) return 'rgba(255,90,80,0.7)';    // red — threat
  return 'rgba(80,200,255,0.7)';                     // cyan — solution
}

function getStrokeColor(depth: number, isCenter: boolean): string {
  if (isCenter) return 'rgba(255,225,140,0.25)';
  if (depth <= 1) return 'rgba(255,90,80,0.18)';
  return 'rgba(80,200,255,0.15)';
}

export default function MindmapOrb({ node, x, y, depth, isCenter, isExplored, isExpanded, hasChildren, isActive, dimmed, onTap }: Props) {
  const r = radiusByDepth(depth, isCenter);
  const maxChars = isCenter ? 12 : depth <= 1 ? 10 : 8;
  const titleLines = wrapTitle(node.title, maxChars);

  const nodeColor = getNodeColor(depth, isCenter);
  const strokeBase = getStrokeColor(depth, isCenter);

  const groupOpacity = dimmed ? 0.2 : 1;

  const iconSize = isCenter ? 26 : depth <= 1 ? 18 : depth === 2 ? 14 : 12;
  const titleSize = isCenter ? 12 : depth <= 1 ? 10 : 8.5;
  const titleWeight = isCenter ? 700 : depth <= 1 ? 600 : 500;

  // Stroke color logic
  const stroke = isActive
    ? nodeColor.replace(/[\d.]+\)$/, '0.6)')
    : isExpanded
      ? nodeColor.replace(/[\d.]+\)$/, '0.4)')
      : strokeBase;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: groupOpacity, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ cursor: 'pointer' }}
      onClick={(e) => { e.stopPropagation(); onTap(); }}
    >
      {/* Outer glow — root only */}
      {isCenter && (
        <>
          <motion.circle
            cx={x} cy={y}
            r={r + 30}
            fill={nodeColor.replace(/[\d.]+\)$/, '0.04)')}
            filter="url(#glow-lg)"
            animate={{ r: [r + 25, r + 38, r + 25], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={x} cy={y}
            r={r + 12}
            fill="none"
            stroke={nodeColor.replace(/[\d.]+\)$/, '0.15)')}
            strokeWidth={1}
            animate={{ r: [r + 8, r + 20, r + 8], strokeOpacity: [0.18, 0.03, 0.18] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Child glow */}
      {!isCenter && (
        <motion.circle
          cx={x} cy={y}
          r={r + 5}
          fill={nodeColor.replace(/[\d.]+\)$/, '0.04)')}
          filter="url(#glow-sm)"
          animate={
            !isExplored
              ? { opacity: [0.3, 0.9, 0.3] }
              : { opacity: isActive ? 0.9 : 0.35 }
          }
          transition={
            !isExplored
              ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      )}

      {/* Main orb — dark fill with colored stroke */}
      <circle
        cx={x} cy={y}
        r={r}
        fill="rgba(11,17,32,0.85)"
        stroke={stroke}
        strokeWidth={isCenter ? 2 : depth <= 1 ? 1.5 : 1}
      />

      {/* Inner subtle gradient overlay */}
      <circle
        cx={x} cy={y}
        r={r - 1}
        fill={nodeColor.replace(/[\d.]+\)$/, '0.06)')}
        style={{ pointerEvents: 'none' }}
      />

      {/* Icon */}
      <text
        x={x} y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={iconSize}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.icon}
      </text>

      {/* Expand dot */}
      {!isCenter && hasChildren && !isExpanded && (
        <circle
          cx={x + r * 0.6}
          cy={y - r * 0.6}
          r={3}
          fill={nodeColor.replace(/[\d.]+\)$/, '0.5)')}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Title */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + r + 12 + i * (titleSize + 2)}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={titleSize}
          fontWeight={titleWeight}
          fill="#E8DCC8"
          fillOpacity={isCenter ? 0.95 : depth <= 1 ? 0.8 : 0.65}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {line}
        </text>
      ))}

      {/* Subtitle for root only */}
      {isCenter && node.subtitle && (
        <text
          x={x}
          y={y + r + 12 + titleLines.length * 14 + 3}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={9}
          fill="#8B7E6A"
          fillOpacity={0.7}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {node.subtitle}
        </text>
      )}
    </motion.g>
  );
}
