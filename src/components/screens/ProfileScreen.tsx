import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { getLevelTitle } from '../../engine/progressionEngine';

export function ProfileScreen() {
  const { userProfile, updateProfile } = useGame();

  const accuracy = userProfile.totalQuestionsAnswered > 0
    ? Math.round((userProfile.totalCorrect / userProfile.totalQuestionsAnswered) * 100)
    : 0;

  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  return (
    <div className="space-y-5">
      {/* Character Card */}
      <div className="rpg-card text-center">
        <div className="relative inline-block mb-3">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: 'var(--surface)', border: '2px solid var(--card-border)' }}
          >
            🧠
          </div>
          {/* Level badge */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'var(--tesla-red)', color: 'white', border: '2px solid var(--background)' }}
          >
            {userProfile.level}
          </div>
        </div>
        <div className="gold-text text-xl font-bold mb-1">{getLevelTitle(userProfile.level)}</div>
        <div className="text-xs" style={{ color: 'var(--muted)' }}>Lv.{userProfile.level}</div>

        {/* EXP Bar */}
        <div className="mt-4">
          <div className="exp-bar">
            <motion.div
              className="exp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="text-right text-[10px] mt-1" style={{ color: 'var(--muted)' }}>
            {userProfile.currentLevelXP} / {userProfile.xpToNextLevel} XP
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: '合計XP', value: userProfile.totalXP.toLocaleString(), icon: '💎', color: 'var(--gold)' },
          { label: '確信度', value: String(userProfile.convictionScore), icon: '🎯', color: 'var(--tesla-red)' },
          { label: '正答率', value: `${accuracy}%`, icon: '📊', color: 'var(--accent-blue)' },
          { label: '連続日数', value: String(userProfile.currentStreak), icon: '🔥', color: 'var(--accent-orange)' },
          { label: 'ラウンド数', value: String(userProfile.totalRoundsPlayed), icon: '⚔️', color: 'var(--accent-green)' },
          { label: '最大コンボ', value: `${userProfile.bestCombo}x`, icon: '💥', color: 'var(--accent-purple)' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rpg-card text-center !p-3"
          >
            <div className="text-2xl font-extrabold" style={{ color: stat.color }}>
              {stat.icon} {stat.value}
            </div>
            <div className="text-[10px] font-bold mt-1" style={{ color: 'var(--muted)' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Module Stats */}
      <div className="rpg-card">
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--gold)' }}>モジュール別実績</h2>
        {Object.entries(userProfile.moduleStats).map(([id, stat]) => {
          const modAccuracy = stat.questionsAnswered > 0
            ? Math.round((stat.correctAnswers / stat.questionsAnswered) * 100)
            : 0;
          const modNames: Record<string, string> = {
            sec_filing: '📄 SEC Filing',
            earnings_call: '🎙️ 決算説明会',
            worst_case: '🔥 最悪シナリオ',
            competitor: '📊 競合比較',
            segment: '📈 セグメント',
          };
          return (
            <div key={id} className="flex items-center justify-between py-2"
              style={{ borderBottom: '1px solid rgba(42,42,74,0.5)' }}
            >
              <span className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>
                {modNames[id] || id}
              </span>
              <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                <span>{stat.timesPlayed}回</span>
                <span style={{ color: modAccuracy >= 80 ? 'var(--accent-green)' : 'var(--muted)' }}>
                  {modAccuracy}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sound Toggle */}
      <button
        onClick={() => updateProfile(p => ({ ...p, soundEnabled: !p.soundEnabled }))}
        className="w-full choice-card"
      >
        <span className="text-xl">{userProfile.soundEnabled ? '🔊' : '🔇'}</span>
        <span className="flex-1 text-left text-sm font-bold">サウンド</span>
        <span className="text-xs font-bold"
          style={{ color: userProfile.soundEnabled ? 'var(--accent-green)' : 'var(--muted)' }}
        >
          {userProfile.soundEnabled ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
}
