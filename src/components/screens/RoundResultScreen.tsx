import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { useEffect } from 'react';

export function RoundResultScreen() {
  const { gameState, navigate } = useGame();
  const { play } = useSound();

  const result = gameState.lastResult;

  useEffect(() => {
    if (result) {
      if (result.accuracy >= 80) play('roundComplete');
      if (result.leveledUp) setTimeout(() => play('levelUp'), 500);
    }
  }, []);

  if (!result) return null;

  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
      >
        <div className="text-6xl mb-3">
          {result.accuracy >= 80 ? '🏆' : result.accuracy >= 60 ? '👍' : '📖'}
        </div>
        <h1 className="text-2xl font-extrabold">ラウンド完了！</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-duo-bg-card rounded-2xl p-5 border border-duo-border"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-extrabold text-duo-gold">{result.totalScore}</div>
            <div className="text-xs text-duo-text-muted font-bold">スコア</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-duo-blue">{result.accuracy}%</div>
            <div className="text-xs text-duo-text-muted font-bold">正答率</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-duo-green">+{result.xpEarned}</div>
            <div className="text-xs text-duo-text-muted font-bold">XP獲得</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-duo-purple">+{result.convictionGain}</div>
            <div className="text-xs text-duo-text-muted font-bold">確信度</div>
          </div>
        </div>
        {result.maxCombo >= 3 && (
          <div className="mt-3 text-sm text-duo-orange font-bold">
            🔥 最大コンボ: {result.maxCombo}x
          </div>
        )}
      </motion.div>

      {result.leveledUp && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="bg-duo-gold/10 border-2 border-duo-gold rounded-2xl p-4 animate-celebrate"
        >
          <div className="text-3xl mb-1">🎉</div>
          <div className="font-extrabold text-duo-gold">レベルアップ！</div>
          <div className="text-sm text-duo-text-secondary">Level {result.newLevel}</div>
        </motion.div>
      )}

      {/* Answer Review */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-left"
      >
        <h2 className="text-sm font-bold text-duo-text-secondary mb-2">解答レビュー</h2>
        <div className="space-y-1">
          {result.answers.map((a, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl ${
                a.isCorrect ? 'bg-duo-green/10' : 'bg-duo-red/10'
              }`}
            >
              <span>{a.isCorrect ? '✅' : '❌'}</span>
              <span className="text-duo-text-secondary">Q{i + 1}</span>
              {a.pointsEarned > 0 && (
                <span className="ml-auto text-duo-gold font-bold">+{a.pointsEarned}pt</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('module_select')}
          className="flex-1 btn-duo btn-duo-outline py-3 text-sm"
        >
          モジュール選択
        </button>
        <button
          onClick={() => navigate('home')}
          className="flex-1 btn-duo btn-duo-green py-3 text-sm"
        >
          ホームへ
        </button>
      </div>
    </div>
  );
}
