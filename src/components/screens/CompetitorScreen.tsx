import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { competitorData } from '../../data/competitors';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function CompetitorScreen() {
  const { navigate } = useGame();

  return (
    <div className="space-y-5 pb-8">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold">📊 競合比較</h1>
        <p className="text-base text-duo-text-secondary mt-1">Tesla vs ライバル企業</p>
      </div>

      {/* Card-based layout for better mobile readability */}
      <div className="space-y-3">
        {competitorData.map((c, i) => (
          <motion.div
            key={c.ticker}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-duo-bg-card rounded-2xl p-4 border ${c.ticker === 'TSLA' ? 'border-duo-red/50 bg-duo-red/5' : 'border-duo-border'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div>
                <span className="font-extrabold text-base text-duo-text">{c.company}</span>
                <span className="text-sm text-duo-text-muted ml-2">{c.ticker}</span>
              </div>
              {c.ticker === 'TSLA' && (
                <span className="ml-auto text-xs font-bold text-duo-red bg-duo-red/20 px-2 py-0.5 rounded-full">注目</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-duo-text-muted mb-0.5">売上(TTM)</div>
                <div className="text-sm font-bold text-duo-text">{formatCurrency(c.revenue * 1e9, true)}</div>
              </div>
              <div>
                <div className="text-xs text-duo-text-muted mb-0.5">時価総額</div>
                <div className="text-sm font-bold text-duo-text">{formatCurrency(c.marketCap * 1e9, true)}</div>
              </div>
              <div>
                <div className="text-xs text-duo-text-muted mb-0.5">粗利率</div>
                <div className="text-sm font-bold text-duo-text">{formatPercent(c.grossMargin)}</div>
              </div>
              <div>
                <div className="text-xs text-duo-text-muted mb-0.5">営業利益率</div>
                <div className={`text-sm font-bold ${c.operatingMargin >= 0 ? 'text-duo-green' : 'text-duo-red'}`}>
                  {formatPercent(c.operatingMargin)}
                </div>
              </div>
              <div>
                <div className="text-xs text-duo-text-muted mb-0.5">PER</div>
                <div className="text-sm font-bold text-duo-text">
                  {c.peRatio ? c.peRatio.toFixed(1) + 'x' : 'N/A'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights */}
      <div className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border">
        <h2 className="text-base font-bold mb-3">💡 考えるポイント</h2>
        <ul className="text-sm text-duo-text-secondary space-y-2 leading-relaxed">
          <li>• テスラの粗利率はBYDやトヨタと比較してどうか？</li>
          <li>• PERの差はどんな将来期待を反映しているか？</li>
          <li>• 営業利益率がマイナスの企業はなぜ生き残れるか？</li>
        </ul>
      </div>

      <button
        onClick={() => navigate('module_select')}
        className="w-full btn-duo btn-duo-outline py-4 text-base"
      >
        戻る
      </button>
    </div>
  );
}
