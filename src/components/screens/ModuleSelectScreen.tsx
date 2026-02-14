import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import type { ModuleId } from '../../types/quiz';

const modules: { id: ModuleId; name: string; icon: string; description: string; color: string; scene?: string }[] = [
  { id: 'sec_filing', name: '10-K/10-Q クイズ', icon: '📄', description: 'テスラの年次・四半期報告書から出題', color: 'border-duo-blue' },
  { id: 'earnings_call', name: '決算説明会', icon: '🎙️', description: 'イーロンの発言から投資判断を学ぶ', color: 'border-duo-gold' },
  { id: 'worst_case', name: '最悪シナリオ', icon: '🔥', description: '失敗シナリオを徹底的に考える', color: 'border-duo-red', scene: 'scenario' },
  { id: 'competitor', name: '競合比較', icon: '📊', description: 'BYD、トヨタ、Rivianと比較', color: 'border-duo-green', scene: 'competitor_dashboard' },
  { id: 'segment', name: 'セグメント分析', icon: '📈', description: '事業別の売上・利益率推移', color: 'border-duo-purple', scene: 'segment_charts' },
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
        <h1 className="text-xl font-extrabold">学習モジュール</h1>
        <p className="text-sm text-duo-text-secondary mt-1">能力の輪を広げよう</p>
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
              className={`w-full choice-card ${mod.color}`}
            >
              <span className="text-3xl">{mod.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-bold text-sm">{mod.name}</div>
                <div className="text-xs text-duo-text-muted">{mod.description}</div>
                {stats.timesPlayed > 0 && (
                  <div className="text-[10px] text-duo-text-muted mt-1">
                    {stats.timesPlayed}回プレイ・正答率{accuracy}%
                  </div>
                )}
              </div>
              <span className="text-duo-text-muted text-lg">→</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
