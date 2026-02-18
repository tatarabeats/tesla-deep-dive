import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import type { GameScene } from '../../types/game';

const navItems: { scene: GameScene; label: string; icon: string }[] = [
  { scene: 'home', label: 'ホーム', icon: '🏠' },
  { scene: 'module_select', label: '学ぶ', icon: '⚔️' },
  { scene: 'profile', label: 'MY', icon: '👤' },
];

export function BottomNav() {
  const { gameState, navigate } = useGame();
  const { play } = useSound();

  if (gameState.scene === 'round_active') return null;

  // Map sub-scenes to their parent nav tab
  const activeTab = (() => {
    const scene = gameState.scene;
    if (scene === 'home') return 'home';
    if (scene === 'profile') return 'profile';
    // Everything else (module_select, scenario, competitor_dashboard, segment_charts, round_result, etc.) → "learn" tab
    return 'module_select';
  })();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        backgroundColor: 'rgba(18, 18, 42, 0.95)',
        backdropFilter: 'blur(8px)',
        borderColor: 'var(--card-border)',
      }}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around py-2"
        style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
      >
        {navItems.map(({ scene, label, icon }) => {
          const isActive = activeTab === scene;
          return (
            <button
              key={scene}
              onClick={() => {
                play('click');
                navigate(scene);
              }}
              className="flex flex-col items-center gap-0.5 px-6 py-1 transition-colors cursor-pointer"
              style={{
                color: isActive ? 'var(--gold)' : 'var(--muted)',
              }}
            >
              <span
                className="text-2xl"
                style={{
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(212,160,23,0.5))' : 'none',
                }}
              >
                {icon}
              </span>
              <span className="text-xs font-bold">{label}</span>
              {isActive && (
                <div
                  className="w-6 h-[2px] rounded-full mt-0.5"
                  style={{ backgroundColor: 'var(--gold)' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
