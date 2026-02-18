import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import type { ModuleId } from '../../types/quiz';

interface ModuleItem {
  id: ModuleId;
  name: string;
  icon: string;
  description: string;
  borderColor: string;
  questionCount: string;
}

const modules: ModuleItem[] = [
  { id: 'sec_filing', name: '10-K 財務分析', icon: '📄', description: '売上・利益・バランスシートを学ぶ', borderColor: 'var(--accent-blue)', questionCount: '45問' },
  { id: 'earnings_call', name: '決算コール', icon: '🎙️', description: 'イーロンの発言と戦略を理解する', borderColor: 'var(--gold)', questionCount: '45問' },
  { id: 'worst_case', name: 'リスク分析', icon: '🔥', description: '最悪シナリオとバリュエーション', borderColor: 'var(--tesla-red)', questionCount: '45問' },
  { id: 'competitor', name: '競合比較', icon: '📊', description: 'BYD・Waymo・伝統メーカーと比較', borderColor: 'var(--accent-green)', questionCount: '45問' },
  { id: 'segment', name: 'セグメント分析', icon: '📈', description: 'Auto・Energy・Servicesの収益構造', borderColor: 'var(--accent-purple)', questionCount: '35問' },
];

export function ModuleSelectScreen() {
  const { userProfile, startRound } = useGame();
  const { play } = useSound();

  const handleModuleClick = (mod: ModuleItem) => {
    play('roundStart');
    startRound(mod.id);
  };

  const totalAnswered = userProfile.totalQuestionsAnswered;
  const totalCorrect = userProfile.totalCorrect;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-extrabold gold-text">⚔️ 学習モジュール</h1>
        {totalAnswered > 0 && (
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {totalAnswered}問回答・正答率 {overallAccuracy}%
          </p>
        )}
      </div>

      {/* Module List */}
      <div className="space-y-3">
        {modules.map((mod, i) => {
          const stats = userProfile.moduleStats[mod.id];
          const accuracy = stats.questionsAnswered > 0
            ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100)
            : 0;

          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModuleClick(mod)}
              className="w-full rpg-card flex items-center gap-3 text-left cursor-pointer hover:brightness-110 transition-all"
              style={{ borderColor: mod.borderColor }}
            >
              <span className="text-3xl">{mod.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base" style={{ color: 'var(--foreground)' }}>{mod.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: 'var(--surface)', color: 'var(--muted)' }}
                  >
                    {mod.questionCount}
                  </span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{mod.description}</div>
                {stats.timesPlayed > 0 && (
                  <div className="text-[10px] mt-1 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                    <span>{stats.timesPlayed}回プレイ</span>
                    <span style={{ color: accuracy >= 80 ? 'var(--accent-green)' : 'var(--foreground)' }}>
                      正答率 {accuracy}%
                    </span>
                  </div>
                )}
              </div>
              <span className="text-lg shrink-0" style={{ color: mod.borderColor }}>▶</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
