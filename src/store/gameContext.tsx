import { createContext, useContext, useReducer, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import type { GameState, GameAction, GameScene } from '../types/game';
import type { UserProfile } from '../types/user';
import type { ExplorationState, BranchProgress, BranchId } from '../types/visionTree';
import { loadUserProgress, saveUserProgress } from '../utils/storage';
import { totalNodeCount, getNode, getNodesInBranch, getBranchIds } from '../data/visionTree';

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, scene: action.payload };
    default:
      return state;
  }
}

const initialGameState: GameState = {
  scene: 'home',
};

interface GameContextType {
  gameState: GameState;
  userProfile: UserProfile;
  exploration: ExplorationState;
  branchProgressMap: Record<BranchId, BranchProgress>;
  overallProgress: number;
  navigate: (scene: GameScene) => void;
  toggleNode: (nodeId: string) => void;
  toggleBookmark: (nodeId: string) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
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

  const navigate = useCallback((scene: GameScene) => {
    dispatch({ type: 'NAVIGATE', payload: scene });
  }, []);

  const toggleNode = useCallback((nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) return;

    const isExpanded = exploration.expandedNodes.has(nodeId);
    const newExpanded = new Set(exploration.expandedNodes);

    if (isExpanded) {
      // Collapse: remove this node and all descendants
      const removeDescendants = (id: string) => {
        newExpanded.delete(id);
        const n = getNode(id);
        if (n) n.childrenIds.forEach(removeDescendants);
      };
      removeDescendants(nodeId);
    } else {
      // Expand
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

  const toggleBookmark = useCallback((nodeId: string) => {
    const isBookmarked = exploration.bookmarkedNodes.includes(nodeId);
    const newBookmarks = isBookmarked
      ? exploration.bookmarkedNodes.filter(id => id !== nodeId)
      : [...exploration.bookmarkedNodes, nodeId];

    setExploration({
      ...exploration,
      bookmarkedNodes: newBookmarks,
    });
    setUserProfile({
      ...userProfile,
      bookmarkedNodeIds: newBookmarks,
    });
  }, [exploration, userProfile]);

  const branchProgressMap = useMemo(() => {
    const map = {} as Record<BranchId, BranchProgress>;
    for (const branchId of getBranchIds()) {
      const branchNodes = getNodesInBranch(branchId);
      const exploredInBranch = branchNodes.filter(n => exploration.exploredNodes.has(n.id));
      const maxDepth = exploredInBranch.reduce((max, n) => Math.max(max, n.depth), 0);
      map[branchId] = {
        totalNodes: branchNodes.length,
        exploredNodes: exploredInBranch.length,
        deepestDepth: maxDepth,
        fullyExplored: exploredInBranch.length === branchNodes.length,
      };
    }
    return map;
  }, [exploration.exploredNodes]);

  const overallProgress = useMemo(() => {
    const explorable = totalNodeCount - 1;
    const explored = Math.max(0, exploration.exploredNodes.size - (exploration.exploredNodes.has('root') ? 1 : 0));
    return explorable > 0 ? Math.round((explored / explorable) * 100) : 0;
  }, [exploration.exploredNodes]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        userProfile,
        exploration,
        branchProgressMap,
        overallProgress,
        navigate,
        toggleNode,
        toggleBookmark,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
