import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';
import { getLevelTitle } from '../../engine/progressionEngine';

export function TopBar() {
  const { userProfile } = useGame();
  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  return (
    <header className="sticky top-0 z-40 border-b px-4 py-3"
      style={{
        backgroundColor: 'rgba(15, 15, 26, 0.9)',
        backdropFilter: 'blur(8px)',
        borderColor: 'var(--card-border)',
      }}
    >
      <div className="max-w-lg mx-auto flex items-center gap-3">
        {/* App title */}
        <div className="flex items-center gap-1.5">
          <span className="text-lg">⚡</span>
          <span className="gold-text text-sm font-bold">テスラ投資RPG</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1">
          <span className="text-base">🔥</span>
          <span className="text-xs font-bold"
            style={{ color: userProfile.currentStreak > 0 ? 'var(--accent-orange)' : 'var(--muted)' }}
          >
            {userProfile.currentStreak}
          </span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1">
          <span className="text-sm">💎</span>
          <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>
            {userProfile.totalXP.toLocaleString()}
          </span>
        </div>

        {/* Level badge (right) */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[10px] font-bold" style={{ color: 'var(--muted)' }}>
            {getLevelTitle(userProfile.level)}
          </span>
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--card-border)" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="15"
                fill="none"
                stroke="var(--tesla-red)"
                strokeWidth="3"
                strokeDasharray={`${xpPercent * 0.94} 94.2`}
                strokeLinecap="round"
                initial={false}
                animate={{ strokeDasharray: `${xpPercent * 0.94} 94.2` }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold"
              style={{ color: 'var(--tesla-red)' }}
            >
              {userProfile.level}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
