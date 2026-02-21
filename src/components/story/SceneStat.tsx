import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  stat: string;
  label?: string;
  color: string;
}

function parseStatNumber(stat: string): { prefix: string; num: number; suffix: string; hasNum: boolean } {
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
  if (original.includes(',')) return n.toLocaleString('en-US');
  const match = original.match(/\.(\d+)/);
  if (match) return n.toFixed(match[1].length);
  return Math.round(n).toString();
}

export default function SceneStat({ stat, label, color }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Retrigger every time scene comes into view
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [displayNum, setDisplayNum] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const parsed = parseStatNumber(stat);

  useEffect(() => {
    if (!parsed.hasNum) return;

    if (isInView && !hasAnimated) {
      // Start animation
      setHasAnimated(true);
      const duration = 1400;
      const startTime = performance.now();
      const target = parsed.num;

      function animate(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayNum(target * eased);
        if (progress < 1) requestAnimationFrame(animate);
        else setDisplayNum(target);
      }

      requestAnimationFrame(animate);
    } else if (!isInView && hasAnimated) {
      // Reset when out of view so it retriggers
      setHasAnimated(false);
      setDisplayNum(0);
    }
  }, [isInView, hasAnimated, parsed.hasNum, parsed.num]);

  return (
    <div ref={ref} className="scene-stat">
      <div className="scene-stat__number" style={{ color }}>
        {parsed.hasNum ? (
          <>
            {parsed.prefix}
            {formatNumber(displayNum, stat)}
            {parsed.suffix}
          </>
        ) : (
          stat
        )}
      </div>
      {label && (
        <p className="scene-stat__label">
          {label}
        </p>
      )}
    </div>
  );
}
