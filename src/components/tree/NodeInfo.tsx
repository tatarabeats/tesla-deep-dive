import { motion, AnimatePresence } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  showDetail: boolean;
  onToggleDetail: () => void;
}

function getAccent(depth: number): string {
  if (depth === 0) return 'rgba(255,225,140,0.9)';
  if (depth === 1) return 'rgba(255,90,80,0.9)';
  return 'rgba(80,200,255,0.9)';
}

export default function NodeInfo({ node, showDetail, onToggleDetail }: Props) {
  const accent = getAccent(node.depth);
  const { content } = node;
  const hasDetail = !!(content.data?.length || content.elonQuote || content.mainText);

  return (
    <div className="node-info">
      {/* Hero stat */}
      {node.heroStat && (
        <motion.div
          className="node-info__hero"
          style={{ color: accent }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
        >
          {node.heroStat}
        </motion.div>
      )}

      {/* Caption */}
      {node.heroCaption && (
        <motion.div
          className="node-info__caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {node.heroCaption}
        </motion.div>
      )}

      {/* Detail toggle */}
      {hasDetail && (
        <button
          className="node-info__detail-btn"
          onClick={(e) => { e.stopPropagation(); onToggleDetail(); }}
        >
          {showDetail ? '閉じる' : '詳しく'}
        </button>
      )}

      {/* Expandable detail */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            className="node-info__detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="node-info__detail-inner">
              {/* Data chips */}
              {content.data && content.data.length > 0 && (
                <div className="node-info__data-scroll">
                  {content.data.map((d, i) => (
                    <div key={i} className="node-info__data-chip">
                      <div className="node-info__data-value" style={{ color: accent }}>{d.value}</div>
                      <div className="node-info__data-label">{d.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quote */}
              {content.elonQuote && (
                <blockquote className="node-info__quote">
                  &ldquo;{content.elonQuote}&rdquo;
                  {content.quoteSource && <cite>— {content.quoteSource}</cite>}
                </blockquote>
              )}

              {/* Main text */}
              {content.mainText && (
                <p className="node-info__text">{content.mainText}</p>
              )}

              {/* First principle */}
              {content.firstPrinciple && (
                <div className="node-info__principle">
                  <span className="node-info__principle-label">第一原理</span>
                  <p>{content.firstPrinciple}</p>
                </div>
              )}

              {/* Analogy */}
              {content.analogy && (
                <div className="node-info__analogy">
                  <span className="node-info__analogy-label">たとえ</span>
                  <p>{content.analogy}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
