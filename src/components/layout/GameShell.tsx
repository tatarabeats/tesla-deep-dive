import { useState, useCallback, type ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { useGame } from '../../store/gameContext';
import { LevelUpOverlay } from '../effects/LevelUpOverlay';
import { ExpGainToast } from '../effects/ExpGainToast';
import { getLevelTitle } from '../../engine/progressionEngine';

interface LevelUpEvent {
  oldLevel: number;
  newLevel: number;
  newTitle: string;
}

export function GameShell({ children }: { children: ReactNode }) {
  const { gameState } = useGame();
  const showChrome = gameState.scene !== 'round_active';

  const [levelUp, setLevelUp] = useState<LevelUpEvent | null>(null);
  const [expGain, setExpGain] = useState<number | null>(null);

  // These will be called from result screen via context
  // For now, expose them via window for simplicity
  const handleLevelUp = useCallback((oldLevel: number, newLevel: number) => {
    setLevelUp({
      oldLevel,
      newLevel,
      newTitle: getLevelTitle(newLevel),
    });
  }, []);

  const handleExpGain = useCallback((amount: number) => {
    setExpGain(amount);
  }, []);

  // Expose to window for child components to trigger
  if (typeof window !== 'undefined') {
    (window as any).__triggerLevelUp = handleLevelUp;
    (window as any).__triggerExpGain = handleExpGain;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {showChrome && <TopBar />}
      <main className={`flex-1 ${showChrome ? 'pb-20' : ''}`}>
        <div className="max-w-lg mx-auto px-4 py-5">
          {children}
        </div>
      </main>
      <BottomNav />

      {/* Level Up Overlay */}
      <LevelUpOverlay
        show={!!levelUp}
        oldLevel={levelUp?.oldLevel ?? 1}
        newLevel={levelUp?.newLevel ?? 1}
        newTitle={levelUp?.newTitle ?? ''}
        onComplete={() => setLevelUp(null)}
      />

      {/* EXP Gain Toast */}
      <ExpGainToast
        show={!!expGain}
        amount={expGain ?? 0}
        onComplete={() => setExpGain(null)}
      />
    </div>
  );
}
