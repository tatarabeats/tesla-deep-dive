import type { TeslaFeedCardData } from '../../data/feedCards';

const accentColors: Record<TeslaFeedCardData['cardType'], string> = {
  news: 'pill-blue',
  fact: 'pill-gold',
  history: 'pill-purple',
  quote: 'pill-green',
};

const bgGradients: Record<TeslaFeedCardData['cardType'], string> = {
  news: 'from-accent-blue/5',
  fact: 'from-gold/5',
  history: 'from-accent-purple/5',
  quote: 'from-accent-green/5',
};

interface TeslaFeedCardProps {
  card: TeslaFeedCardData;
  showSwipeHint?: boolean;
  onDeepDive?: () => void;
}

export function TeslaFeedCard({ card, showSwipeHint, onDeepDive }: TeslaFeedCardProps) {
  return (
    <div className={`w-full h-full flex flex-col bg-gradient-to-b ${bgGradients[card.cardType]} to-background`}>
      {/* Category pill */}
      <div className="px-5 pt-5 pb-2">
        <span className={`pill ${accentColors[card.cardType]}`}>
          <span>{card.icon}</span>
          <span>{card.categoryLabel}</span>
        </span>
      </div>

      {/* Card content */}
      <div className="flex-1 px-5 flex flex-col justify-center">
        {card.cardType === 'quote' ? (
          <QuoteLayout card={card} />
        ) : card.cardType === 'fact' ? (
          <FactLayout card={card} />
        ) : card.cardType === 'history' ? (
          <HistoryLayout card={card} />
        ) : (
          <NewsLayout card={card} />
        )}
      </div>

      {/* Bottom area */}
      <div className="px-5 pb-6 flex flex-col items-center gap-3">
        {card.relatedModule && onDeepDive && (
          <button
            onClick={onDeepDive}
            className="w-full py-3 rounded-xl btn-rpg btn-rpg-outline text-sm"
          >
            ⚔️ このテーマのクイズに挑戦
          </button>
        )}

        {showSwipeHint && (
          <div className="flex flex-col items-center text-muted text-xs animate-bounce">
            <span className="text-lg">↕</span>
            <span>スワイプして次へ</span>
          </div>
        )}
      </div>
    </div>
  );
}

function QuoteLayout({ card }: { card: TeslaFeedCardData }) {
  return (
    <div className="space-y-4">
      <div className="text-3xl" style={{ color: 'var(--gold)', opacity: 0.3 }}>"</div>
      <h2 className="text-xl font-bold leading-relaxed" style={{ color: 'var(--foreground)' }}>
        {card.title}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {card.body}
      </p>
      {card.source && (
        <p className="text-xs font-bold" style={{ color: 'var(--accent-green)' }}>
          — {card.source}
        </p>
      )}
    </div>
  );
}

function FactLayout({ card }: { card: TeslaFeedCardData }) {
  return (
    <div className="space-y-4">
      {card.highlight && (
        <div className="gold-text text-4xl font-extrabold">{card.highlight}</div>
      )}
      <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
        {card.title}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {card.body}
      </p>
    </div>
  );
}

function HistoryLayout({ card }: { card: TeslaFeedCardData }) {
  return (
    <div className="space-y-4">
      <div className="pill pill-purple inline-block">{card.title.split(':')[0]}</div>
      <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
        {card.title.includes(':') ? card.title.split(':').slice(1).join(':').trim() : card.title}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {card.body}
      </p>
    </div>
  );
}

function NewsLayout({ card }: { card: TeslaFeedCardData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
        {card.title}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {card.body}
      </p>
    </div>
  );
}
