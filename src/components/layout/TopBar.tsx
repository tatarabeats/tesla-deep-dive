import { useGame } from '../../store/gameContext';

export function TopBar() {
  const { userProfile } = useGame();

  return (
    <header className="sticky top-0 z-40 border-b px-4 py-2.5"
      style={{
        backgroundColor: 'rgba(15, 15, 26, 0.9)',
        backdropFilter: 'blur(8px)',
        borderColor: 'var(--card-border)',
      }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* App title */}
        <div className="flex items-center gap-1.5">
          <span className="text-lg">⚡</span>
          <span className="gold-text text-sm font-bold">テスラ投資RPG</span>
        </div>

        {/* Minimal stats */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>
            🔥 {userProfile.currentStreak}
          </span>
          <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>
            💎 {userProfile.totalXP.toLocaleString()}
          </span>
          <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(227,25,55,0.2)', color: 'var(--tesla-red)' }}
          >
            Lv.{userProfile.level}
          </span>
        </div>
      </div>
    </header>
  );
}
