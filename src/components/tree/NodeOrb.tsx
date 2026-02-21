import { motion } from 'framer-motion';

interface Props {
  icon: string;
  imageUrl?: string;
  size: number;
  depth: number;
  isExplored: boolean;
  isExpanded: boolean;
}

function getGlowColor(depth: number): string {
  if (depth === 0) return 'rgba(255,225,140,0.5)';
  if (depth === 1) return 'rgba(255,90,80,0.4)';
  return 'rgba(80,200,255,0.35)';
}

function getBorderColor(depth: number, isExpanded: boolean): string {
  if (depth === 0) return isExpanded ? 'rgba(255,225,140,0.6)' : 'rgba(255,225,140,0.3)';
  if (depth === 1) return isExpanded ? 'rgba(255,90,80,0.5)' : 'rgba(255,90,80,0.2)';
  return isExpanded ? 'rgba(80,200,255,0.45)' : 'rgba(80,200,255,0.15)';
}

export default function NodeOrb({ icon, imageUrl, size, depth, isExplored, isExpanded }: Props) {
  const glow = getGlowColor(depth);
  const border = getBorderColor(depth, isExpanded);
  const resolvedUrl = imageUrl ? `${import.meta.env.BASE_URL}${imageUrl}` : undefined;

  return (
    <motion.div
      className="node-orb"
      style={{
        width: size,
        height: size,
        borderColor: border,
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {/* Pulse ring for unexplored */}
      {!isExplored && (
        <motion.div
          className="node-orb__pulse"
          style={{ borderColor: glow }}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Glow when expanded */}
      {isExpanded && (
        <div
          className="node-orb__glow"
          style={{
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Image or fallback */}
      {resolvedUrl ? (
        <img
          src={resolvedUrl}
          alt=""
          className="node-orb__img"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <div className="node-orb__fallback" />
      )}

      {/* Icon overlay */}
      <span
        className="node-orb__icon"
        style={{ fontSize: size * 0.35 }}
      >
        {icon}
      </span>
    </motion.div>
  );
}
