import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { useGame } from '../../store/gameContext';

export function GameShell({ children }: { children: ReactNode }) {
  const { gameState } = useGame();
  const showChrome = gameState.scene !== 'round_active';

  return (
    <div className="min-h-screen flex flex-col bg-duo-bg">
      {showChrome && <TopBar />}
      <main className={`flex-1 ${showChrome ? 'pb-20' : ''}`}>
        <div className="max-w-lg mx-auto px-4 py-5">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
