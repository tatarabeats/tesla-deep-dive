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
  staggerIndex?: number;
  onTap: () => void;
}

/** Split title for orb display - keep it short */
function wrapTitle(text: string, maxChars: number): string[] {
  // Strip company tags like {SpaceX}
  let clean = text.replace(/\s*\{[^}]+\}/g, '').trim();

  // If title has a dash separator, use only the first part for very short limits
  if (clean.length > maxChars * 2) {
    const dashIdx = clean.indexOf(' \u2014 ');
    if (dashIdx > 0 && dashIdx <= maxChars * 2) {
      clean = clean.slice(0, dashIdx);
    }
  }

  if (clean.length <= maxChars) return [clean];

  // Find a good break point
  const breakChars = ['\u3001', '\u2014', ' ', '\u30FB', '\u30FC', '\u3000', '\uFF08', '\uFF5B', ':'];
  let breakIdx = -1;
  for (let i = Math.min(maxChars, clean.length - 1); i >= Math.max(1, maxChars - 5); i--) {
    if (breakChars.includes(clean[i])) { breakIdx = i + 1; break; }
  }
  if (breakIdx === -1) breakIdx = maxChars;
  const line1 = clean.slice(0, breakIdx).trim();
  const rest = clean.slice(breakIdx).trim();
  if (rest.length > maxChars + 2) return [line1, rest.slice(0, maxChars) + '\u2026'];
  if (rest.length === 0) return [line1];
  return [line1, rest];
}

function radiusByDepth(depth: number, isCenter: boolean): number {
  if (isCenter) return 52;
  if (depth <= 1) return 36;
  if (depth === 2) return 28;
  return 22;
}

function getNodeColor(depth: number, isCenter: boolean): string {
  if (isCenter) return 'rgba(255,225,140,0.7)';
  if (depth <= 1) return 'rgba(255,90,80,0.7)';
  return 'rgba(80,200,255,0.7)';
}

function getStrokeColor(depth: number, isCenter: boolean): string {
  if (isCenter) return 'rgba(255,225,140,0.25)';
  if (depth <= 1) return 'rgba(255,90,80,0.18)';
  return 'rgba(80,200,255,0.15)';
}

export default function MindmapOrb({ node, x, y, depth, isCenter, isExplored, isExpanded, hasChildren, isActive, dimmed, staggerIndex, onTap }: Props) {
  const r = radiusByDepth(depth, isCenter);
  const maxChars = isCenter ? 12 : depth <= 1 ? 10 : 8;
  const titleLines = wrapTitle(node.title, maxChars);

  const imageHref = node.imageUrl ? `${import.meta.env.BASE_URL}${node.imageUrl}` : undefined;
  const nodeColor = getNodeColor(depth, isCenter);
  const strokeBase = getStrokeColor(depth, isCenter);

  const groupOpacity = dimmed ? 0.2 : 1;

  const iconSize = isCenter ? 26 : depth <= 1 ? 18 : depth === 2 ? 14 : 12;
  const titleSize = isCenter ? 12 : depth <= 1 ? 10 : 8.5;
  const titleWeight = isCenter ? 700 : depth <= 1 ? 600 : 500;

  const stroke = isActive
    ? nodeColor.replace(/[\d.]+\)$/, '0.6)')
    : isExpanded
      ? nodeColor.replace(/[\d.]+\)$/, '0.4)')
      : strokeBase;

  // Floating animation
  const floatHash = node.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const floatDur = 3 + (floatHash % 20) / 10;
  const floatAmt = isCenter ? 2 : 1.2;

  const staggerDelay = staggerIndex !== undefined ? staggerIndex * 0.06 : 0;

  // Expand indicator: small dot on the border
  const showExpandDot = !isCenter && hasChildren;

  // Total click area: use a larger invisible rect covering orb + title area
  const clickAreaHeight = r + 12 + titleLines.length * (titleSize + 2) + 10;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: groupOpacity }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: staggerDelay }}
      style={{ cursor: 'pointer' }}
    >
      {/* Position + floating */}
      <motion.g
        animate={{
          translateX: x,
          translateY: [y - floatAmt, y + floatAmt],
        }}
        transition={{
          translateX: { duration: 0 },
          translateY: {
            duration: floatDur,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
      >
        {/* Large invisible click target covering orb + title */}
        <rect
          x={-r - 10}
          y={-r - 10}
          width={(r + 10) * 2}
          height={clickAreaHeight + 10}
          fill="transparent"
          onClick={(e) => { e.stopPropagation(); onTap(); }}
        />

        {/* Outer glow — root only */}
        {isCenter && (
          <>
            <motion.circle
              cx={0} cy={0}
              r={r + 30}
              fill={nodeColor.replace(/[\d.]+\)$/, '0.04)')}
              filter="url(#glow-lg)"
              animate={{ r: [r + 25, r + 38, r + 25], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ pointerEvents: 'none' }}
            />
            <motion.circle
              cx={0} cy={0}
              r={r + 12}
              fill="none"
              stroke={nodeColor.replace(/[\d.]+\)$/, '0.15)')}
              strokeWidth={1}
              animate={{ r: [r + 8, r + 20, r + 8], strokeOpacity: [0.18, 0.03, 0.18] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ pointerEvents: 'none' }}
            />
          </>
        )}

        {/* Discovery pulse for unexplored nodes */}
        {!isCenter && !isExplored && (
          <motion.circle
            cx={0} cy={0}
            r={r + 10}
            fill="none"
            stroke={nodeColor.replace(/[\d.]+\)$/, '0.3)')}
            strokeWidth={1.5}
            animate={{
              r: [r + 8, r + 18, r + 8],
              strokeOpacity: [0.3, 0.05, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Subtle glow for explored child nodes */}
        {!isCenter && isExplored && (
          <circle
            cx={0} cy={0}
            r={r + 5}
            fill={nodeColor.replace(/[\d.]+\)$/, '0.04)')}
            filter="url(#glow-sm)"
            opacity={isActive ? 0.9 : 0.35}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Clip path for circular image */}
        {node.imageUrl && (
          <defs>
            <clipPath id={`clip-${node.id}`}>
              <circle cx={0} cy={0} r={r - 1} />
            </clipPath>
          </defs>
        )}

        {/* Main orb */}
        <circle
          cx={0} cy={0}
          r={r}
          fill="rgba(11,17,32,0.85)"
          stroke={stroke}
          strokeWidth={isCenter ? 2 : depth <= 1 ? 1.5 : 1}
          style={{ pointerEvents: 'none' }}
        />

        {/* Image inside orb (if available) */}
        {node.imageUrl ? (
          <>
            <image
              href={imageHref}
              x={-(r - 1)}
              y={-(r - 1)}
              width={(r - 1) * 2}
              height={(r - 1) * 2}
              clipPath={`url(#clip-${node.id})`}
              preserveAspectRatio="xMidYMid slice"
              style={{ pointerEvents: 'none' }}
            />
            <circle
              cx={0} cy={0}
              r={r - 1}
              fill="rgba(0,0,0,0.35)"
              style={{ pointerEvents: 'none' }}
            />
            <circle
              cx={0} cy={0}
              r={r - 1}
              fill={nodeColor.replace(/[\d.]+\)$/, '0.12)')}
              style={{ pointerEvents: 'none' }}
            />
          </>
        ) : (
          <circle
            cx={0} cy={0}
            r={r - 1}
            fill={nodeColor.replace(/[\d.]+\)$/, '0.06)')}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Icon */}
        <text
          x={0} y={0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={iconSize}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            filter: node.imageUrl ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' : 'none',
          }}
        >
          {node.icon}
        </text>

        {/* Small expand indicator dot */}
        {showExpandDot && (
          <circle
            cx={r * 0.7}
            cy={-r * 0.7}
            r={isExpanded ? 3 : 3.5}
            fill={isExpanded
              ? nodeColor.replace(/[\d.]+\)$/, '0.25)')
              : nodeColor.replace(/[\d.]+\)$/, '0.55)')
            }
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Title */}
        {titleLines.map((line, i) => (
          <text
            key={i}
            x={0}
            y={r + 12 + i * (titleSize + 2)}
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
            x={0}
            y={r + 12 + titleLines.length * 14 + 3}
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
    </motion.g>
  );
}
