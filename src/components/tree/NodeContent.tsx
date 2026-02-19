import type { NodeContent as NodeContentType } from '../../types/visionTree';

interface Props {
  content: NodeContentType;
  color: string;
}

export default function NodeContent({ content, color }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-[var(--foreground)] leading-relaxed text-sm">
        {content.mainText}
      </p>

      {content.elonQuote && (
        <div className="quote-block" style={{ borderColor: `var(${color})` }}>
          <p className="text-sm italic text-[var(--foreground)] opacity-90">
            "{content.elonQuote}"
          </p>
          {content.quoteSource && (
            <p className="text-xs text-[var(--muted)] mt-1">— {content.quoteSource}</p>
          )}
        </div>
      )}

      {content.firstPrinciple && (
        <div className="first-principle-box">
          <div className="text-xs font-bold text-[var(--gold)] mb-1 flex items-center gap-1">
            <span>💡</span> First Principles
          </div>
          <p className="text-sm text-[var(--foreground)] opacity-90">
            {content.firstPrinciple}
          </p>
        </div>
      )}

      {content.data && content.data.length > 0 && (
        <div className="space-y-2">
          {content.data.map((d, i) => (
            <div key={i} className="data-point">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[var(--muted)]">{d.label}</span>
                <span className="text-sm font-bold text-[var(--foreground)]">{d.value}</span>
              </div>
              {d.context && (
                <p className="text-xs text-[var(--muted)] mt-0.5">{d.context}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {content.analogy && (
        <div className="analogy-box">
          <p className="text-sm text-[var(--foreground)] opacity-80">
            <span className="text-[var(--gold)]">🔗</span> {content.analogy}
          </p>
        </div>
      )}
    </div>
  );
}
