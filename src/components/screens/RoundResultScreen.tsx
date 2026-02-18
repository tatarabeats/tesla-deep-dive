import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { useEffect } from 'react';
import { getLevelTitle } from '../../engine/progressionEngine';

export function RoundResultScreen() {
  const { gameState, navigate } = useGame();
  const { play } = useSound();

  const result = gameState.lastResult;

  useEffect(() => {
    if (result) {
      // Trigger EXP toast
      if (result.xpEarned > 0 && typeof window !== 'undefined' && (window as any).__triggerExpGain) {
        setTimeout(() => (window as any).__triggerExpGain(result.xpEarned), 300);
      }

      // Trigger level up overlay
      if (result.leveledUp && result.newLevel && typeof window !== 'undefined' && (window as any).__triggerLevelUp) {
        setTimeout(() => (window as any).__triggerLevelUp(result.newLevel! - 1, result.newLevel!), 1500);
      }

      if (result.accuracy >= 80) play('roundComplete');
    }
  }, []);

  if (!result) return null;

  return (
    <div className="space-y-6 text-center">
      {/* Trophy */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
      >
        <div className="text-6xl mb-3">
          {result.accuracy >= 80 ? '🏆' : result.accuracy >= 60 ? '⚔️' : '📖'}
        </div>
        <h1 className="gold-text text-2xl font-extrabold">クエスト完了！</h1>
      </motion.div>

      {/* Results Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rpg-card"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-extrabold" style={{ color: 'var(--gold)' }}>{result.totalScore}</div>
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>スコア</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold" style={{ color: 'var(--accent-blue)' }}>{result.accuracy}%</div>
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>正答率</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold" style={{ color: 'var(--tesla-red)' }}>+{result.xpEarned}</div>
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>XP獲得</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold gold-text">+{result.convictionGain}</div>
            <div className="text-xs font-bold" style={{ color: 'var(--muted)' }}>確信度</div>
          </div>
        </div>
        {result.maxCombo >= 3 && (
          <div className="mt-3 text-sm font-bold" style={{ color: 'var(--accent-orange)' }}>
            🔥 最大コンボ: {result.maxCombo}x
          </div>
        )}
      </motion.div>

      {/* Level up notice */}
      {result.leveledUp && result.newLevel && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="rpg-card animate-celebrate"
          style={{ borderColor: 'var(--gold)' }}
        >
          <div className="text-3xl mb-1">✨</div>
          <div className="gold-text font-extrabold text-lg">レベルアップ！</div>
          <div className="text-sm" style={{ color: 'var(--muted)' }}>
            Lv.{result.newLevel} — {getLevelTitle(result.newLevel)}
          </div>
        </motion.div>
      )}

      {/* Answer Review */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-left"
      >
        <h2 className="text-sm font-bold mb-2" style={{ color: 'var(--muted)' }}>解答レビュー</h2>
        <div className="space-y-1">
          {result.answers.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
              style={{
                backgroundColor: a.isCorrect ? 'rgba(76,175,80,0.1)' : 'rgba(227,25,55,0.1)',
              }}
            >
              <span>{a.isCorrect ? '✅' : '❌'}</span>
              <span style={{ color: 'var(--muted)' }}>Q{i + 1}</span>
              {a.pointsEarned > 0 && (
                <span className="ml-auto font-bold" style={{ color: 'var(--gold)' }}>+{a.pointsEarned}pt</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => navigate('home')}
          className="w-full btn-rpg btn-rpg-red py-4 text-base"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
}
