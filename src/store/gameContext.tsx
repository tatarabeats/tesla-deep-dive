import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import type { UserProfile } from '../types/user';
import type { ExplorationState } from '../types/visionTree';
import { loadUserProgress, saveUserProgress } from '../utils/storage';
import { getNode } from '../data/visionTree';

interface GameContextType {
  userProfile: UserProfile;
  exploration: ExplorationState;
  toggleNode: (nodeId: string) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useReducer(
    (_prev: UserProfile, next: UserProfile) => next,
    null as unknown as UserProfile,
    () => loadUserProgress()
  );

  const [exploration, setExploration] = useReducer(
    (_prev: ExplorationState, next: ExplorationState) => next,
    {
      expandedNodes: new Set<string>(['root']),
      exploredNodes: new Set<string>(loadUserProgress().exploredNodeIds),
      bookmarkedNodes: loadUserProgress().bookmarkedNodeIds,
    } as ExplorationState,
  );

  useEffect(() => {
    saveUserProgress(userProfile);
  }, [userProfile]);

  const toggleNode = useCallback((nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) return;

    const isExpanded = exploration.expandedNodes.has(nodeId);
    const newExpanded = new Set(exploration.expandedNodes);

    if (isExpanded) {
      const removeDescendants = (id: string) => {
        newExpanded.delete(id);
        const n = getNode(id);
        if (n) n.childrenIds.forEach(removeDescendants);
      };
      removeDescendants(nodeId);
    } else {
      newExpanded.add(nodeId);
    }

    const newExplored = new Set(exploration.exploredNodes);
    const isFirstVisit = !newExplored.has(nodeId);
    newExplored.add(nodeId);

    setExploration({
      ...exploration,
      expandedNodes: newExpanded,
      exploredNodes: newExplored,
    });

    if (isFirstVisit) {
      const today = new Date().toISOString().slice(0, 10);
      setUserProfile({
        ...userProfile,
        exploredNodeIds: [...userProfile.exploredNodeIds, nodeId],
        lastOpenedDate: today,
      });
    }
  }, [exploration, userProfile]);

  return (
    <GameContext.Provider value={{ userProfile, exploration, toggleNode }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
