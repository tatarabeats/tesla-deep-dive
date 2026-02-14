import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';

export function HomeScreen() {
  const { userProfile, startRound, navigate } = useGame();
  const { play } = useSound();

  const convictionLevel = userProfile.convictionScore >= 80 ? '確信' :
    userProfile.convictionScore >= 60 ? '理解' :
    userProfile.convictionScore >= 40 ? '学習中' :
    userProfile.convictionScore >= 20 ? '初心者' : '未知';

  const convictionColor = userProfile.convictionScore >= 80 ? 'text-duo-green' :
    userProfile.convictionScore >= 60 ? 'text-duo-blue' :
    userProfile.convictionScore >= 40 ? 'text-duo-gold' :
    userProfile.convictionScore >= 20 ? 'text-duo-orange' : 'text-duo-text-muted';

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-extrabold mb-1">Tesla Deep Dive</h1>
        <p className="text-duo-text-secondary text-base">能力の輪を構築しよう</p>
      </motion.div>

      {/* Conviction Meter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-duo-bg-card rounded-2xl p-5 border border-duo-border"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-duo-text-secondary">テスラ投資 確信度</span>
          <span className={`text-sm font-bold ${convictionColor}`}>{convictionLevel}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="-rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-duo-bg-surface)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="var(--color-duo-red)"
                strokeWidth="8"
                strokeDasharray={`${userProfile.convictionScore * 2.64} 264`}
                strokeLinecap="round"
                initial={false}
                animate={{ strokeDasharray: `${userProfile.convictionScore * 2.64} 264` }}
                transition={{ duration: 0.8 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-duo-text">
              {userProfile.convictionScore}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-duo-text-muted leading-relaxed">
              テスラを深く理解するほどスコアが上がります。
              目標: 李録の基準（80+）に到達すること。
            </p>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenge */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => {
          play('roundStart');
          startRound('sec_filing', true);
        }}
        className="w-full btn-duo btn-duo-green py-4 text-lg"
      >
        🎯 今日のチャレンジ
      </motion.button>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-3"
      >
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-xl font-extrabold text-duo-gold">{userProfile.totalRoundsPlayed}</div>
          <div className="text-xs text-duo-text-muted font-bold mt-1">ラウンド</div>
        </div>
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-xl font-extrabold text-duo-blue">
            {userProfile.totalQuestionsAnswered > 0
              ? Math.round((userProfile.totalCorrect / userProfile.totalQuestionsAnswered) * 100)
              : 0}%
          </div>
          <div className="text-xs text-duo-text-muted font-bold mt-1">正答率</div>
        </div>
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-xl font-extrabold text-duo-orange">{userProfile.longestStreak}</div>
          <div className="text-xs text-duo-text-muted font-bold mt-1">最長連続</div>
        </div>
      </motion.div>

      {/* Module Quick Access */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-sm font-bold text-duo-text-secondary mb-3">クイックアクセス</h2>
        <div className="space-y-2">
          <button
            onClick={() => { play('click'); navigate('module_select'); }}
            className="w-full choice-card"
          >
            <span className="text-2xl">📚</span>
            <div className="flex-1 text-left">
              <div className="font-bold text-base">学習モジュール</div>
              <div className="text-sm text-duo-text-muted">5つのモジュールで深く学ぶ</div>
            </div>
            <span className="text-duo-text-muted">→</span>
          </button>
          <button
            onClick={() => { play('click'); navigate('scenario'); }}
            className="w-full choice-card"
          >
            <span className="text-2xl">🔥</span>
            <div className="flex-1 text-left">
              <div className="font-bold text-base">最悪シナリオ</div>
              <div className="text-sm text-duo-text-muted">テスラが失敗するシナリオを考える</div>
            </div>
            <span className="text-duo-text-muted">→</span>
          </button>
          <button
            onClick={() => { play('click'); navigate('competitor_dashboard'); }}
            className="w-full choice-card"
          >
            <span className="text-2xl">📊</span>
            <div className="flex-1 text-left">
              <div className="font-bold text-base">競合比較</div>
              <div className="text-sm text-duo-text-muted">Tesla vs BYD, Toyota, Rivian...</div>
            </div>
            <span className="text-duo-text-muted">→</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
