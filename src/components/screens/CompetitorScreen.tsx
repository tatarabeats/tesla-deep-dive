import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { competitorData } from '../../data/competitors';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function CompetitorScreen() {
  const { navigate } = useGame();

  return (
    <div className="space-y-5 pb-8">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold gold-text">📊 競合比較</h1>
        <p className="text-base mt-1" style={{ color: 'var(--muted)' }}>Tesla vs ライバル企業</p>
      </div>

      {/* Card-based layout for better mobile readability */}
      <div className="space-y-3">
        {competitorData.map((c, i) => (
          <motion.div
            key={c.ticker}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={c.ticker === 'TSLA' ? 'rpg-card-tesla' : 'rpg-card'}
          >
            <div className="flex items-center gap-3 mb-3">
              <div>
                <span className="font-extrabold text-base" style={{ color: 'var(--foreground)' }}>{c.company}</span>
                <span className="text-sm ml-2" style={{ color: 'var(--muted)' }}>{c.ticker}</span>
              </div>
              {c.ticker === 'TSLA' && (
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'rgba(227,25,55,0.2)', color: 'var(--tesla-red)' }}
                >注目</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>売上(TTM)</div>
                <div className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{formatCurrency(c.revenue * 1e9, true)}</div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>時価総額</div>
                <div className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{formatCurrency(c.marketCap * 1e9, true)}</div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>粗利率</div>
                <div className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{formatPercent(c.grossMargin)}</div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>営業利益率</div>
                <div className="text-sm font-bold"
                  style={{ color: c.operatingMargin >= 0 ? 'var(--accent-green)' : 'var(--tesla-red)' }}
                >
                  {formatPercent(c.operatingMargin)}
                </div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>PER</div>
                <div className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                  {c.peRatio ? c.peRatio.toFixed(1) + 'x' : 'N/A'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights */}
      <div className="rpg-card">
        <h2 className="text-base font-bold mb-3 gold-text">💡 考えるポイント</h2>
        <ul className="text-sm space-y-2 leading-relaxed" style={{ color: 'var(--muted)' }}>
          <li>• テスラの粗利率はBYDやトヨタと比較してどうか？</li>
          <li>• PERの差はどんな将来期待を反映しているか？</li>
          <li>• 営業利益率がマイナスの企業はなぜ生き残れるか？</li>
        </ul>
      </div>

      <button
        onClick={() => navigate('home')}
        className="w-full btn-rpg btn-rpg-outline py-4 text-base"
      >
        戻る
      </button>
    </div>
  );
}
