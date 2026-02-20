import { motion } from 'framer-motion';
import type { NodeContent } from '../../types/visionTree';

interface Props {
  content: NodeContent;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

export default function NodeContentPanel({ content }: Props) {
  return (
    <motion.div
      className="content-panel"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className="content-panel__main"
        variants={sectionVariants}
        transition={{ duration: 0.4 }}
      >
        {content.mainText}
      </motion.p>

      {content.elonQuote && (
        <motion.div className="quote-block" variants={sectionVariants} transition={{ duration: 0.4 }}>
          <p className="text-sm italic text-[var(--text)]">
            "{content.elonQuote}"
          </p>
          {content.quoteSource && (
            <p className="text-xs text-[var(--text-secondary)] mt-1">— {content.quoteSource}</p>
          )}
        </motion.div>
      )}

      {content.firstPrinciple && (
        <motion.div className="first-principle-box" variants={sectionVariants} transition={{ duration: 0.4 }}>
          <p className="text-xs font-semibold text-[var(--text-secondary)] mb-1 tracking-wide uppercase">
            First Principles
          </p>
          <p className="text-sm text-[var(--text)]">
            {content.firstPrinciple}
          </p>
        </motion.div>
      )}

      {content.data && content.data.length > 0 && (
        <motion.div variants={sectionVariants} transition={{ duration: 0.4 }}>
          {content.data.map((d, i) => (
            <div key={i} className="data-point">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-[var(--text-secondary)]">{d.label}</span>
                <span className="text-sm font-semibold text-[var(--text)]">{d.value}</span>
              </div>
              {d.context && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{d.context}</p>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {content.analogy && (
        <motion.div className="analogy-box" variants={sectionVariants} transition={{ duration: 0.4 }}>
          <p className="text-sm text-[var(--text-secondary)]">
            {content.analogy}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
