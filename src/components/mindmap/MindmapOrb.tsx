import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  x: number;
  y: number;
  isCenter: boolean;
  isExplored: boolean;
  hasChildren: boolean;
  isActive: boolean;
  onTap: () => void;
}

/** Split title into max 2 lines for child orbs */
function wrapTitle(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const breakChars = ['、', '—', ' ', '・', 'ー', '　', '（', '｛'];
  let breakIdx = -1;
  for (let i = Math.min(maxChars, text.length - 1); i >= Math.max(1, maxChars - 5); i--) {
    if (breakChars.includes(text[i])) { breakIdx = i + 1; break; }
  }
  if (breakIdx === -1) breakIdx = maxChars;
  const line1 = text.slice(0, breakIdx);
  const rest = text.slice(breakIdx);
  if (rest.length > maxChars + 2) return [line1, rest.slice(0, maxChars) + '…'];
  return [line1, rest];
}

export default function MindmapOrb({ node, x, y, isCenter, isExplored, hasChildren, isActive, onTap }: Props) {
  const r = isCenter ? 52 : 32;
  const titleLines = isCenter ? wrapTitle(node.title, 12) : wrapTitle(node.title, 8);
  const gradId = isCenter ? 'star-grad-center' : 'star-grad-child';

  // Branch color mapping
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

  return (
    <g style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onTap(); }}>
      {/* Outer glow */}
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

      {/* Child glow — pulse if unexplored */}
      {!isCenter && (
        <motion.circle
          cx={x} cy={y}
          r={r + 6}
          fill={glowColor.replace(/[\d.]+\)$/, '0.03)')}
          filter="url(#glow-sm)"
          animate={
            !isExplored
              ? { opacity: [0.4, 1, 0.4] }
              : { opacity: isActive ? 0.9 : 0.5 }
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
        fontSize={isCenter ? 26 : 18}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.icon}
      </text>

      {/* Expand indicator for nodes with children */}
      {!isCenter && hasChildren && (
        <circle
          cx={x + r * 0.65}
          cy={y - r * 0.65}
          r={4}
          fill={glowColor.replace(/[\d.]+\)$/, '0.5)')}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Title */}
      {titleLines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + r + 14 + i * (isCenter ? 15 : 12)}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={isCenter ? 12 : 9}
          fontWeight={isCenter ? 700 : 500}
          fill="#E8DCC8"
          fillOpacity={isCenter ? 0.95 : 0.75}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {line}
        </text>
      ))}

      {/* Subtitle for center node */}
      {isCenter && node.subtitle && (
        <text
          x={x}
          y={y + r + 14 + titleLines.length * 15 + 2}
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
    </g>
  );
}
