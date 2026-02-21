import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  hasChildren: boolean;
  isExpanded: boolean;
  onClose: () => void;
  onToggleExpand: () => void;
}

function getAccentColor(depth: number): string {
  if (depth === 0) return 'rgba(255,225,140,0.9)';
  if (depth === 1) return 'rgba(255,90,80,0.9)';
  return 'rgba(80,200,255,0.9)';
}

export default function ImpactCard({ node, hasChildren, isExpanded, onClose, onToggleExpand }: Props) {
  const [showDetail, setShowDetail] = useState(false);
  const accent = getAccentColor(node.depth);
  const { content } = node;

  return (
    <motion.div
      className="impact-card-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      <motion.div
        className={`impact-card ${showDetail ? 'impact-card--expanded' : ''}`}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact view */}
        <div className="impact-card__header">
          <span className="impact-card__icon">{node.icon}</span>
          <span className="impact-card__title">{node.title.replace(/\s*\{[^}]+\}/g, '')}</span>
        </div>

        {node.heroStat && (
          <div className="impact-card__hero" style={{ color: accent }}>
            {node.heroStat}
          </div>
        )}
        {node.heroCaption && (
          <div className="impact-card__caption">{node.heroCaption}</div>
        )}

        {content.elonQuote && !showDetail && (
          <div className="impact-card__quote-preview">
            &ldquo;{content.elonQuote.length > 80
              ? content.elonQuote.slice(0, 80) + '...'
              : content.elonQuote}&rdquo;
          </div>
        )}

        {/* Action buttons row */}
        <div className="impact-card__actions">
          {(content.data || content.elonQuote || content.mainText) && (
            <button
              className="impact-card__toggle"
              onClick={() => setShowDetail(!showDetail)}
            >
              {showDetail ? '閉じる' : '詳しく'}
            </button>
          )}

          {hasChildren && (
            <button
              className="impact-card__toggle impact-card__toggle--expand"
              style={{ borderColor: accent.replace('0.9)', '0.3)') }}
              onClick={onToggleExpand}
            >
              {isExpanded ? '折りたたむ ▲' : '展開する ▼'}
            </button>
          )}
        </div>

        {/* Expanded detail view */}
        <AnimatePresence>
          {showDetail && (
            <motion.div
              className="impact-card__detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Data points as horizontal scroll */}
              {content.data && content.data.length > 0 && (
                <div className="impact-card__data-scroll">
                  {content.data.map((d, i) => (
                    <div key={i} className="impact-card__data-chip">
                      <div className="impact-card__data-value" style={{ color: accent }}>{d.value}</div>
                      <div className="impact-card__data-label">{d.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Full quote */}
              {content.elonQuote && (
                <blockquote className="impact-card__quote-full">
                  &ldquo;{content.elonQuote}&rdquo;
                  {content.quoteSource && (
                    <cite>— {content.quoteSource}</cite>
                  )}
                </blockquote>
              )}

              {/* Main text */}
              <p className="impact-card__text">{content.mainText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
