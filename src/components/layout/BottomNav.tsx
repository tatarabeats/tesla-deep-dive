import { useGame } from '../../store/gameContext';
import { useSound } from '../../hooks/useSound';
import type { GameScene } from '../../types/game';

const navItems: { scene: GameScene; label: string; icon: string }[] = [
  { scene: 'home', label: 'ホーム', icon: '🏠' },
  { scene: 'module_select', label: '学習', icon: '📚' },
  { scene: 'competitor_dashboard', label: 'チャート', icon: '📊' },
  { scene: 'scenario', label: 'シナリオ', icon: '🔥' },
  { scene: 'profile', label: 'MY', icon: '👤' },
];

export function BottomNav() {
  const { gameState, navigate } = useGame();
  const { play } = useSound();

  if (gameState.scene === 'round_active') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-duo-bg border-t-2 border-duo-border z-50">
      <div className="max-w-lg mx-auto flex">
        {navItems.map(({ scene, label, icon }) => {
          const isActive = gameState.scene === scene;
          return (
            <button
              key={scene}
              onClick={() => {
                play('click');
                navigate(scene);
              }}
              className={`flex-1 flex flex-col items-center py-2.5 text-[11px] font-bold transition-colors ${
                isActive
                  ? 'text-duo-blue'
                  : 'text-duo-text-muted hover:text-duo-text-secondary'
              }`}
            >
              <span className="text-xl mb-0.5">{icon}</span>
              <span>{label}</span>
              {isActive && (
                <div className="w-8 h-[3px] bg-duo-blue rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
