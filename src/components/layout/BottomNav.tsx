import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import type { GameScene } from '../../types/game';

const navItems: { scene: GameScene; label: string; icon: string }[] = [
  { scene: 'home', label: 'ホーム', icon: '🌳' },
  { scene: 'profile', label: 'MY', icon: '👤' },
];

export function BottomNav() {
  const { gameState, navigate } = useGame();
  const { play } = useSound();

  const activeTab = gameState.scene === 'profile' ? 'profile' : 'home';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        backgroundColor: 'rgba(15, 15, 26, 0.95)',
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
              className="flex flex-col items-center gap-0.5 px-8 py-1 transition-colors cursor-pointer"
              style={{
                color: isActive ? 'var(--foreground)' : 'var(--muted)',
              }}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-xs font-bold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
