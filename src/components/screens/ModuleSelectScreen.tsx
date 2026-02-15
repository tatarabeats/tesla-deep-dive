import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import type { ModuleId } from '../../types/quiz';

const modules: { id: ModuleId; name: string; icon: string; description: string; borderColor: string; scene?: string }[] = [
  { id: 'sec_filing', name: '10-K/10-Q クイズ', icon: '📄', description: 'テスラの年次・四半期報告書から出題', borderColor: 'var(--accent-blue)' },
  { id: 'earnings_call', name: '決算説明会', icon: '🎙️', description: 'イーロンの発言から投資判断を学ぶ', borderColor: 'var(--gold)' },
  { id: 'worst_case', name: '最悪シナリオ', icon: '🔥', description: '失敗シナリオを徹底的に考える', borderColor: 'var(--tesla-red)', scene: 'scenario' },
  { id: 'competitor', name: '競合比較', icon: '📊', description: 'BYD、トヨタ、Rivianと比較', borderColor: 'var(--accent-green)', scene: 'competitor_dashboard' },
  { id: 'segment', name: 'セグメント分析', icon: '📈', description: '事業別の売上・利益率推移', borderColor: 'var(--accent-purple)', scene: 'segment_charts' },
];

export function ModuleSelectScreen() {
  const { userProfile, startRound, navigate } = useGame();
  const { play } = useSound();

  const handleModuleClick = (mod: typeof modules[0]) => {
    play('select');
    if (mod.scene) {
      navigate(mod.scene as any);
    } else if (mod.id === 'sec_filing') {
      navigate('filing_input');
    } else if (mod.id === 'earnings_call') {
      navigate('transcript_input');
    } else {
      startRound(mod.id);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h1 className="text-xl font-extrabold gold-text">⚔️ 学習モジュール</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>能力の輪を広げよう</p>
      </div>

      <div className="space-y-3">
        {modules.map((mod, i) => {
          const stats = userProfile.moduleStats[mod.id];
          const accuracy = stats.questionsAnswered > 0
            ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100)
            : 0;

          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleModuleClick(mod)}
              className="w-full rpg-card flex items-center gap-3 text-left cursor-pointer hover:brightness-110 transition-all"
              style={{ borderColor: mod.borderColor }}
            >
              <span className="text-3xl">{mod.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>{mod.name}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{mod.description}</div>
                {stats.timesPlayed > 0 && (
                  <div className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>
                    {stats.timesPlayed}回プレイ・正答率
                    <span style={{ color: accuracy >= 80 ? 'var(--accent-green)' : 'var(--foreground)' }}>{accuracy}%</span>
                  </div>
                )}
              </div>
              <span className="text-lg" style={{ color: 'var(--muted)' }}>→</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
