import { useState, useCallback, type ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { LevelUpOverlay } from '../effects/LevelUpOverlay';
import { ExpGainToast } from '../effects/ExpGainToast';
import { getLevelTitle } from '../../engine/progressionEngine';

interface LevelUpEvent {
  oldLevel: number;
  newLevel: number;
  newTitle: string;
}

export function GameShell({ children }: { children: ReactNode }) {
  const [levelUp, setLevelUp] = useState<LevelUpEvent | null>(null);
  const [expGain, setExpGain] = useState<number | null>(null);

  const handleLevelUp = useCallback((_oldLevel: number, newLevel: number) => {
    setLevelUp({
      oldLevel: newLevel - 1,
      newLevel,
      newTitle: getLevelTitle(newLevel),
    });
  }, []);

  const handleExpGain = useCallback((amount: number) => {
    setExpGain(amount);
  }, []);

  if (typeof window !== 'undefined') {
    (window as any).__triggerLevelUp = handleLevelUp;
    (window as any).__triggerExpGain = handleExpGain;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <TopBar />
      <main className="flex-1 pb-20">
        <div className="max-w-lg mx-auto px-4 py-5">
          {children}
        </div>
      </main>
      <BottomNav />

      <LevelUpOverlay
        show={!!levelUp}
        oldLevel={levelUp?.oldLevel ?? 1}
        newLevel={levelUp?.newLevel ?? 1}
        newTitle={levelUp?.newTitle ?? ''}
        onComplete={() => setLevelUp(null)}
      />

      <ExpGainToast
        show={!!expGain}
        amount={expGain ?? 0}
        onComplete={() => setExpGain(null)}
      />
    </div>
  );
}
