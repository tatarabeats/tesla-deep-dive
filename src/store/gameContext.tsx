import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import type { UserProfile } from '../types/user';
import { loadUserProgress, saveUserProgress } from '../utils/storage';

/* ── State ── */
interface MindmapState {
  expandedNodes: Set<string>;   // which nodes have their children visible
  exploredNodes: Set<string>;   // nodes the user has ever tapped
}

interface GameContextType {
  userProfile: UserProfile;
  mindmap: MindmapState;
  toggleNode: (nodeId: string) => void;   // expand / collapse children
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useReducer(
    (_prev: UserProfile, next: UserProfile) => next,
    null as unknown as UserProfile,
    () => loadUserProgress(),
  );

  const [mindmap, setMindmap] = useReducer(
    (_prev: MindmapState, next: MindmapState) => next,
    {
      expandedNodes: new Set<string>(),
      exploredNodes: new Set<string>(loadUserProgress().exploredNodeIds),
    } as MindmapState,
  );

  /* persist user progress */
  useEffect(() => {
    saveUserProgress(userProfile);
  }, [userProfile]);

  const toggleNode = useCallback((nodeId: string) => {
    const newExpanded = new Set(mindmap.expandedNodes);
    const newExplored = new Set(mindmap.exploredNodes);
    const isFirstVisit = !newExplored.has(nodeId);

    if (newExpanded.has(nodeId)) {
      // collapse
      newExpanded.delete(nodeId);
    } else {
      // expand
      newExpanded.add(nodeId);
    }

    newExplored.add(nodeId);

    if (isFirstVisit) {
      const today = new Date().toISOString().slice(0, 10);
      setUserProfile({
        ...userProfile,
        exploredNodeIds: [...userProfile.exploredNodeIds, nodeId],
        lastOpenedDate: today,
      });
    }

    setMindmap({ expandedNodes: newExpanded, exploredNodes: newExplored });
  }, [mindmap, userProfile]);

  return (
    <GameContext.Provider value={{ userProfile, mindmap, toggleNode }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
