import { motion } from 'framer-motion';
import type { VisionNode } from '../../types/visionTree';

interface Props {
  node: VisionNode;
  onClose: () => void;
}

export default function DetailPanel({ node, onClose }: Props) {
  const { content } = node;

  return (
    <motion.div
      className="detail-panel"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
    >
      {/* Handle bar */}
      <div className="detail-handle" onClick={onClose}>
        <div className="detail-handle-bar" />
      </div>

      <div className="detail-scroll">
        {/* Header */}
        <div className="detail-header">
          <span className="detail-icon">{node.icon}</span>
          <h2 className="detail-title">{node.title}</h2>
        </div>

        {/* Main text */}
        <p className="detail-text">{content.mainText}</p>

        {/* First principle */}
        {content.firstPrinciple && (
          <div className="detail-section">
            <h3 className="detail-label">First Principle</h3>
            <p className="detail-text-sm">{content.firstPrinciple}</p>
          </div>
        )}

        {/* Data points */}
        {content.data && content.data.length > 0 && (
          <div className="detail-section">
            <h3 className="detail-label">Data</h3>
            <div className="detail-data-grid">
              {content.data.map((d, i) => (
                <div key={i} className="detail-data-item">
                  <div className="detail-data-value">{d.value}</div>
                  <div className="detail-data-label">{d.label}</div>
                  {d.context && <div className="detail-data-context">{d.context}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Elon quote */}
        {content.elonQuote && (
          <div className="detail-section">
            <blockquote className="detail-quote">
              "{content.elonQuote}"
            </blockquote>
            {content.quoteSource && (
              <div className="detail-quote-source">— {content.quoteSource}</div>
            )}
          </div>
        )}

        {/* Analogy */}
        {content.analogy && (
          <div className="detail-section">
            <h3 className="detail-label">Analogy</h3>
            <p className="detail-text-sm">{content.analogy}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
