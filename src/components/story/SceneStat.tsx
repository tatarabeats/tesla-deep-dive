import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  stat: string;
  label?: string;
  color: string;
}

/** Extract numeric part and suffix for counter animation */
function parseStatNumber(stat: string): { prefix: string; num: number; suffix: string; hasNum: boolean } {
  // Match patterns like "374億", "$118億", "4.4倍", "138億年", "0.75", "10,000倍"
  const match = stat.match(/^([^\d]*?)([\d,]+\.?\d*)(.*?)$/);
  if (!match) return { prefix: '', num: 0, suffix: stat, hasNum: false };
  const numStr = match[2].replace(/,/g, '');
  return {
    prefix: match[1],
    num: parseFloat(numStr),
    suffix: match[3],
    hasNum: true,
  };
}

function formatNumber(n: number, original: string): string {
  // Preserve comma formatting from original
  if (original.includes(',')) {
    return n.toLocaleString('en-US');
  }
  // Preserve decimal places
  const match = original.match(/\.(\d+)/);
  if (match) {
    return n.toFixed(match[1].length);
  }
  return Math.round(n).toString();
}

export default function SceneStat({ stat, label, color }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayNum, setDisplayNum] = useState(0);
  const parsed = parseStatNumber(stat);

  useEffect(() => {
    if (!isInView || !parsed.hasNum) return;

    const duration = 1200; // ms
    const startTime = performance.now();
    const target = parsed.num;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(target * eased);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayNum(target);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, parsed.hasNum, parsed.num]);

  return (
    <div ref={ref} className="scene-stat">
      <motion.div
        className="scene-stat__number"
        style={{ color }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
      >
        {parsed.hasNum ? (
          <>
            {parsed.prefix}
            {formatNumber(displayNum, stat)}
            {parsed.suffix}
          </>
        ) : (
          stat
        )}
      </motion.div>
      {label && (
        <motion.p
          className="scene-stat__label"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}
