import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import type { UserProfile } from '../types/user';
import type { ExplorationState, TransitionDirection } from '../types/visionTree';
import { loadUserProgress, saveUserProgress } from '../utils/storage';
import { getNode, getPathToNode } from '../data/visionTree';

interface GameContextType {
  userProfile: UserProfile;
  exploration: ExplorationState;
  navigateTo: (nodeId: string) => void;
  navigateBack: () => void;
  jumpTo: (nodeId: string) => void;
}

const GameContext = createContext<GameContextType | null>(null);

function buildPathStack(nodeId: string): string[] {
  return getPathToNode(nodeId).map(n => n.id);
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useReducer(
    (_prev: UserProfile, next: UserProfile) => next,
    null as unknown as UserProfile,
    () => loadUserProgress()
  );

  const [exploration, setExploration] = useReducer(
    (_prev: ExplorationState, next: ExplorationState) => next,
    {
      currentNodeId: 'root',
      pathStack: ['root'],
      transitionDirection: 'in' as TransitionDirection,
      exploredNodes: new Set<string>(loadUserProgress().exploredNodeIds),
      bookmarkedNodes: loadUserProgress().bookmarkedNodeIds,
    } as ExplorationState,
  );

  useEffect(() => {
    saveUserProgress(userProfile);
  }, [userProfile]);

  const markExplored = useCallback((nodeId: string) => {
    const newExplored = new Set(exploration.exploredNodes);
    const isFirstVisit = !newExplored.has(nodeId);
    newExplored.add(nodeId);

    if (isFirstVisit) {
      const today = new Date().toISOString().slice(0, 10);
      setUserProfile({
        ...userProfile,
        exploredNodeIds: [...userProfile.exploredNodeIds, nodeId],
        lastOpenedDate: today,
      });
    }

    return newExplored;
  }, [exploration.exploredNodes, userProfile]);

  const navigateTo = useCallback((nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) return;

    const newExplored = markExplored(nodeId);

    setExploration({
      ...exploration,
      currentNodeId: nodeId,
      pathStack: [...exploration.pathStack, nodeId],
      transitionDirection: 'in',
      exploredNodes: newExplored,
    });
  }, [exploration, markExplored]);

  const navigateBack = useCallback(() => {
    if (exploration.pathStack.length <= 1) return;

    const newStack = exploration.pathStack.slice(0, -1);
    const parentId = newStack[newStack.length - 1];

    setExploration({
      ...exploration,
      currentNodeId: parentId,
      pathStack: newStack,
      transitionDirection: 'out',
    });
  }, [exploration]);

  const jumpTo = useCallback((nodeId: string) => {
    const idx = exploration.pathStack.indexOf(nodeId);
    if (idx === -1) {
      // Node not in current path — build new path
      const newStack = buildPathStack(nodeId);
      const newExplored = markExplored(nodeId);
      setExploration({
        ...exploration,
        currentNodeId: nodeId,
        pathStack: newStack,
        transitionDirection: 'jump',
        exploredNodes: newExplored,
      });
    } else {
      // Node is in current path — truncate
      const newStack = exploration.pathStack.slice(0, idx + 1);
      setExploration({
        ...exploration,
        currentNodeId: nodeId,
        pathStack: newStack,
        transitionDirection: 'out',
      });
    }
  }, [exploration, markExplored]);

  return (
    <GameContext.Provider value={{ userProfile, exploration, navigateTo, navigateBack, jumpTo }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
