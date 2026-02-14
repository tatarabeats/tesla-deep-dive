import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';

export function ProfileScreen() {
  const { userProfile, updateProfile } = useGame();

  const accuracy = userProfile.totalQuestionsAnswered > 0
    ? Math.round((userProfile.totalCorrect / userProfile.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="text-5xl mb-2">🧠</div>
        <h1 className="text-xl font-extrabold">{userProfile.name}</h1>
        <p className="text-sm text-duo-text-secondary">Level {userProfile.level} テスラ投資家</p>
      </div>

      {/* XP Progress */}
      <div className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border">
        <div className="flex justify-between text-xs text-duo-text-muted mb-2">
          <span>Level {userProfile.level}</span>
          <span>{userProfile.currentLevelXP} / {userProfile.xpToNextLevel} XP</span>
        </div>
        <div className="progress-bar-duo">
          <motion.div
            className="progress-bar-duo-fill"
            animate={{ width: `${(userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-2xl font-extrabold text-duo-gold">{userProfile.totalXP.toLocaleString()}</div>
          <div className="text-[10px] text-duo-text-muted font-bold mt-1">合計XP</div>
        </div>
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-2xl font-extrabold text-duo-red">{userProfile.convictionScore}</div>
          <div className="text-[10px] text-duo-text-muted font-bold mt-1">確信度</div>
        </div>
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-2xl font-extrabold text-duo-blue">{accuracy}%</div>
          <div className="text-[10px] text-duo-text-muted font-bold mt-1">正答率</div>
        </div>
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-2xl font-extrabold text-duo-orange">{userProfile.currentStreak}</div>
          <div className="text-[10px] text-duo-text-muted font-bold mt-1">連続日数</div>
        </div>
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-2xl font-extrabold text-duo-green">{userProfile.totalRoundsPlayed}</div>
          <div className="text-[10px] text-duo-text-muted font-bold mt-1">ラウンド数</div>
        </div>
        <div className="bg-duo-bg-card rounded-xl p-3 text-center border border-duo-border">
          <div className="text-2xl font-extrabold text-duo-purple">{userProfile.bestCombo}x</div>
          <div className="text-[10px] text-duo-text-muted font-bold mt-1">最大コンボ</div>
        </div>
      </div>

      {/* Module Stats */}
      <div className="bg-duo-bg-card rounded-2xl p-4 border border-duo-border">
        <h2 className="text-sm font-bold mb-3">モジュール別実績</h2>
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
            <div key={id} className="flex items-center justify-between py-2 border-b border-duo-border/50 last:border-0">
              <span className="text-xs font-bold">{modNames[id] || id}</span>
              <div className="flex items-center gap-3 text-xs text-duo-text-muted">
                <span>{stat.timesPlayed}回</span>
                <span>{modAccuracy}%</span>
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
        <span className={`text-xs font-bold ${userProfile.soundEnabled ? 'text-duo-green' : 'text-duo-text-muted'}`}>
          {userProfile.soundEnabled ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
}
