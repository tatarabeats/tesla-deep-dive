import { motion } from 'framer-motion';
import { useGame } from '../../store/gameContext';

export function TopBar() {
  const { userProfile } = useGame();
  const xpPercent = userProfile.xpToNextLevel > 0
    ? Math.min(100, (userProfile.currentLevelXP / userProfile.xpToNextLevel) * 100)
    : 0;

  return (
    <div className="bg-duo-bg border-b border-duo-border px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl">🔥</span>
          <span className={`font-bold text-sm ${
            userProfile.currentStreak > 0 ? 'text-duo-orange' : 'text-duo-text-muted'
          }`}>
            {userProfile.currentStreak}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xl">⚡</span>
          <span className="font-bold text-sm text-duo-gold">
            {userProfile.totalXP.toLocaleString()}
          </span>
        </div>

        {/* Conviction Score */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl">🎯</span>
          <span className="font-bold text-sm text-duo-purple">
            {userProfile.convictionScore}
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-duo-bg-surface)" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="15"
                fill="none"
                stroke="var(--color-duo-green)"
                strokeWidth="3"
                strokeDasharray={`${xpPercent * 0.94} 94.2`}
                strokeLinecap="round"
                initial={false}
                animate={{ strokeDasharray: `${xpPercent * 0.94} 94.2` }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-duo-green">
              {userProfile.level}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
