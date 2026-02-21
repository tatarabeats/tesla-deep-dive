import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  compact?: boolean; // for deeper nodes, show less
}

function getAccent(depth: number): string {
  if (depth === 0) return 'rgba(255,225,140,0.9)';
  if (depth === 1) return 'rgba(255,90,80,0.9)';
  return 'rgba(80,200,255,0.9)';
}

export default function NodeContent({ node, compact = false }: Props) {
  const accent = getAccent(node.depth);
  const { content } = node;

  return (
    <motion.div
      className="node-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      {/* Hero stat (only if not already shown in branch-hero) */}
      {compact && node.heroStat && (
        <div className="node-content__hero" style={{ color: accent }}>
          {node.heroStat}
          {node.heroCaption && (
            <span className="node-content__hero-caption">{node.heroCaption}</span>
          )}
        </div>
      )}

      {/* Data chips */}
      {content.data && content.data.length > 0 && (
        <div className="node-content__data-row">
          {content.data.map((d, i) => (
            <div key={i} className="data-chip">
              <div className="data-chip__value" style={{ color: accent }}>{d.value}</div>
              <div className="data-chip__label">{d.label}</div>
              {d.context && <div className="data-chip__context">{d.context}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Quote */}
      {content.elonQuote && (
        <blockquote className="node-content__quote">
          <span className="node-content__quote-mark">"</span>
          {content.elonQuote}
          <span className="node-content__quote-mark">"</span>
          {content.quoteSource && (
            <cite className="node-content__cite">— {content.quoteSource}</cite>
          )}
        </blockquote>
      )}

      {/* Main text */}
      {content.mainText && (
        <p className="node-content__text">{content.mainText}</p>
      )}

      {/* First principle */}
      {content.firstPrinciple && (
        <div className="node-content__box node-content__box--principle">
          <span className="node-content__box-label">💡 第一原理</span>
          <p>{content.firstPrinciple}</p>
        </div>
      )}

      {/* Analogy */}
      {content.analogy && (
        <div className="node-content__box node-content__box--analogy">
          <span className="node-content__box-label">🪞 たとえ</span>
          <p>{content.analogy}</p>
        </div>
      )}
    </motion.div>
  );
}
