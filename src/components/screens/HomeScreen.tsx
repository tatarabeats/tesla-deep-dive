import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import { getLevelTitle } from '../../engine/progressionEngine';

export function HomeScreen() {
  const { userProfile, startRound } = useGame();
  const { play } = useSound();

  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  const accuracy = userProfile.totalQuestionsAnswered > 0
    ? Math.round((userProfile.totalCorrect / userProfile.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="flex flex-col items-center pt-8 pb-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* Level circle */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-4"
        style={{ width: 120, height: 120 }}
      >
        <svg viewBox="0 0 100 100" className="-rotate-90" style={{ width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--card-border)" strokeWidth="5" />
          <motion.circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="var(--tesla-red)"
            strokeWidth="5"
            strokeDasharray={`${xpPercent * 2.64} 264`}
            strokeLinecap="round"
            initial={false}
            animate={{ strokeDasharray: `${xpPercent * 2.64} 264` }}
            transition={{ duration: 1 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold" style={{ color: 'var(--foreground)' }}>
            {userProfile.level}
          </span>
        </div>
      </motion.div>

      {/* Title */}
      <h1 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
        {getLevelTitle(userProfile.level)}
      </h1>

      {/* Stats row */}
      <div className="flex items-center gap-4 mt-3 text-sm" style={{ color: 'var(--muted)' }}>
        {userProfile.currentStreak > 0 && (
          <span>{userProfile.currentStreak}日連続</span>
        )}
        {userProfile.totalQuestionsAnswered > 0 && (
          <span>正答率 {accuracy}%</span>
        )}
        <span>{userProfile.totalXP} XP</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Single CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          play('roundStart');
          startRound('sec_filing', true);
        }}
        className="w-full btn-rpg btn-rpg-red py-5 text-xl"
      >
        学習を始める
      </motion.button>
    </div>
  );
}
