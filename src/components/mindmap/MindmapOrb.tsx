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
  // Strip {Company} tags for display
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

// Size by depth: root=52, L2=36, L3=28, L4+=22
function radiusByDepth(depth: number, isCenter: boolean): number {
  if (isCenter) return 52;
  if (depth <= 1) return 36;
  if (depth === 2) return 28;
  return 22;
}

export default function MindmapOrb({ node, x, y, depth, isCenter, isExplored, isExpanded, hasChildren, isActive, dimmed, onTap }: Props) {
  const r = radiusByDepth(depth, isCenter);
  const maxChars = isCenter ? 12 : depth <= 1 ? 10 : 8;
  const titleLines = wrapTitle(node.title, maxChars);
  const gradId = isCenter ? 'star-grad-center' : 'star-grad-child';

  const branchColors: Record<string, string> = {
    'root': 'rgba(255,245,200,0.7)',
    'single-planet': 'rgba(130,170,255,0.7)',
    'fossil-fuel': 'rgba(255,130,130,0.7)',
    'intelligence-limits': 'rgba(190,140,255,0.7)',
    'population-decline': 'rgba(130,220,160,0.7)',
    'mobility-inefficiency': 'rgba(180,180,190,0.6)',
    'info-finance-gap': 'rgba(200,200,220,0.7)',
  };
  const glowColor = branchColors[node.branchId] || 'rgba(232,220,200,0.5)';

  // Dimmed opacity for non-active branches
  const groupOpacity = dimmed ? 0.2 : 1;

  // Font sizes by depth
  const iconSize = isCenter ? 26 : depth <= 1 ? 18 : depth === 2 ? 14 : 12;
  const titleSize = isCenter ? 12 : depth <= 1 ? 10 : 8.5;
  const titleWeight = isCenter ? 700 : depth <= 1 ? 600 : 500;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: groupOpacity, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ cursor: 'pointer' }}
      onClick={(e) => { e.stopPropagation(); onTap(); }}
    >
      {/* Outer glow — center (root) node only */}
      {isCenter && (
        <>
          <motion.circle
            cx={x} cy={y}
            r={r + 30}
            fill={glowColor.replace(/[\d.]+\)$/, '0.04)')}
            filter="url(#glow-lg)"
            animate={{ r: [r + 25, r + 38, r + 25], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={x} cy={y}
            r={r + 12}
            fill="none"
            stroke={glowColor.replace(/[\d.]+\)$/, '0.12)')}
            strokeWidth={1}
            animate={{ r: [r + 8, r + 20, r + 8], strokeOpacity: [0.15, 0.03, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Child glow */}
      {!isCenter && (
        <motion.circle
          cx={x} cy={y}
          r={r + 5}
          fill={glowColor.replace(/[\d.]+\)$/, '0.03)')}
          filter="url(#glow-sm)"
          animate={
            !isExplored
              ? { opacity: [0.4, 1, 0.4] }
              : { opacity: isActive ? 0.9 : 0.4 }
          }
          transition={
            !isExplored
              ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      )}

      {/* Main orb */}
      <circle
        cx={x} cy={y}
        r={r}
        fill={`url(#${gradId})`}
        stroke={isActive
          ? glowColor.replace(/[\d.]+\)$/, '0.5)')
          : isExpanded
            ? glowColor.replace(/[\d.]+\)$/, '0.35)')
            : isCenter
              ? 'rgba(232,220,200,0.2)'
              : 'rgba(232,220,200,0.1)'}
        strokeWidth={isCenter ? 1.5 : 1}
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

      {/* Expand dot for nodes with children */}
      {!isCenter && hasChildren && !isExpanded && (
        <circle
          cx={x + r * 0.6}
          cy={y - r * 0.6}
          r={3}
          fill={glowColor.replace(/[\d.]+\)$/, '0.45)')}
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
