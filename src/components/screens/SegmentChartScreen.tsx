import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { segmentData } from '../../data/segments';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export function SegmentChartScreen() {
  const { navigate } = useGame();

  return (
    <div className="space-y-5 pb-8">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold gold-text">📈 セグメント分析</h1>
        <p className="text-base mt-1" style={{ color: 'var(--muted)' }}>テスラの事業別パフォーマンス</p>
      </div>

      {segmentData.map((seg, idx) => {
        const latestPeriod = seg.periods[seg.periods.length - 1];
        const prevPeriod = seg.periods.length > 1 ? seg.periods[seg.periods.length - 2] : null;
        const revenueGrowth = prevPeriod
          ? ((latestPeriod.revenue - prevPeriod.revenue) / prevPeriod.revenue * 100)
          : 0;

        return (
          <motion.div
            key={seg.segment}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rpg-card"
          >
            <h2 className="text-base font-extrabold mb-3 gold-text">{seg.label}</h2>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-lg font-extrabold" style={{ color: 'var(--accent-blue)' }}>
                  {formatCurrency(latestPeriod.revenue * 1e6, true)}
                </div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>売上</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold" style={{ color: 'var(--accent-green)' }}>
                  {formatPercent(latestPeriod.grossMargin)}
                </div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>粗利率</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold"
                  style={{ color: revenueGrowth >= 0 ? 'var(--accent-green)' : 'var(--tesla-red)' }}
                >
                  {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                </div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>QoQ成長率</div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="space-y-2">
              {seg.periods.slice(-6).map(p => {
                const maxRevenue = Math.max(...seg.periods.map(pp => pp.revenue));
                const width = (p.revenue / maxRevenue) * 100;
                return (
                  <div key={p.period} className="flex items-center gap-2">
                    <span className="text-xs w-16 shrink-0" style={{ color: 'var(--muted)' }}>{p.period}</span>
                    <div className="flex-1 h-5 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--card-bg)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--tesla-red-dark), var(--tesla-red))' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      />
                    </div>
                    <span className="text-xs w-14 text-right" style={{ color: 'var(--muted)' }}>
                      {formatCurrency(p.revenue * 1e6, true)}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      <button
        onClick={() => navigate('home')}
        className="w-full btn-rpg btn-rpg-outline py-4 text-base"
      >
        戻る
      </button>
    </div>
  );
}
