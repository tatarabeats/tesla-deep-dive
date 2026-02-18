import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { getLevelTitle } from '../../engine/progressionEngine';

export function HomeScreen() {
  const { userProfile, startRound, navigate } = useGame();
  const { play } = useSound();

  const convictionLevel = userProfile.convictionScore >= 80 ? '確信' :
    userProfile.convictionScore >= 60 ? '理解' :
    userProfile.convictionScore >= 40 ? '学習中' :
    userProfile.convictionScore >= 20 ? '初心者' : '未知';

  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  return (
    <div className="space-y-6 flex flex-col items-center pt-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-3xl">⚡</span>
        <h1 className="gold-text text-2xl font-extrabold mt-1">テスラ投資RPG</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          テスラを深く理解して確信度を上げよう
        </p>
      </div>

      {/* Conviction Meter - the core metric */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative" style={{ width: 160, height: 160 }}>
          <svg viewBox="0 0 100 100" className="-rotate-90" style={{ width: '100%', height: '100%' }}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--card-border)" strokeWidth="6" />
            <motion.circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="var(--tesla-red)"
              strokeWidth="6"
              strokeDasharray={`${userProfile.convictionScore * 2.64} 264`}
              strokeLinecap="round"
              initial={false}
              animate={{ strokeDasharray: `${userProfile.convictionScore * 2.64} 264` }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold" style={{ color: 'var(--foreground)' }}>
              {userProfile.convictionScore}
            </span>
            <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>確信度</span>
          </div>
        </div>
        <span className="gold-text text-lg font-bold mt-2">{convictionLevel}</span>
      </motion.div>

      {/* Level + Streak row */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏅</span>
          <div>
            <div className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
              Lv.{userProfile.level} {getLevelTitle(userProfile.level)}
            </div>
            <div className="w-24 h-1.5 rounded-full mt-1" style={{ backgroundColor: 'var(--card-border)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: 'var(--tesla-red)' }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-bold"
            style={{ color: userProfile.currentStreak > 0 ? 'var(--accent-orange)' : 'var(--muted)' }}
          >
            {userProfile.currentStreak}日連続
          </span>
        </div>
      </div>

      {/* Primary CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          play('roundStart');
          startRound('sec_filing', true);
        }}
        className="w-full btn-rpg btn-rpg-red py-5 text-xl animate-pulse-glow"
      >
        ⚔️ 今日のクエストを始める
      </motion.button>

      {/* Secondary CTA */}
      <button
        onClick={() => {
          play('click');
          navigate('module_select');
        }}
        className="w-full btn-rpg btn-rpg-outline py-3 text-base"
      >
        📚 モジュールを選んで学ぶ
      </button>
    </div>
  );
}
