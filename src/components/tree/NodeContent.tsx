import type { NodeContent as NodeContentType } from '../../types/visionTree';

interface Props {
  content: NodeContentType;
}

export default function NodeContent({ content }: Props) {
  return (
    <div className="space-y-1">
      <p className="text-[var(--text)] leading-relaxed">
        {content.mainText}
      </p>

      {content.elonQuote && (
        <div className="quote-block">
          <p className="text-sm italic text-[var(--text)]">
            "{content.elonQuote}"
          </p>
          {content.quoteSource && (
            <p className="text-xs text-[var(--text-secondary)] mt-1">— {content.quoteSource}</p>
          )}
        </div>
      )}

      {content.firstPrinciple && (
        <div className="first-principle-box">
          <p className="text-xs font-semibold text-[var(--text-secondary)] mb-1 tracking-wide uppercase">
            First Principles
          </p>
          <p className="text-sm text-[var(--text)]">
            {content.firstPrinciple}
          </p>
        </div>
      )}

      {content.data && content.data.length > 0 && (
        <div>
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
        </div>
      )}

      {content.analogy && (
        <div className="analogy-box">
          <p className="text-sm text-[var(--text-secondary)]">
            {content.analogy}
          </p>
        </div>
      )}
    </div>
  );
}
