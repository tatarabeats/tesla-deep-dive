import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

export function GameShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <main className="flex-1 pb-16">
        <div className="max-w-lg mx-auto px-4 py-4">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
