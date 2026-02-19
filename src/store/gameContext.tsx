import { createContext, useContext, useReducer, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import type { GameState, GameAction, GameScene } from '../types/game';
import type { UserProfile } from '../types/user';
import type { ExplorationState, BranchProgress, BranchId } from '../types/visionTree';
import { loadUserProgress, saveUserProgress } from '../utils/storage';
import { applyXP, updateDailyStreak, calculateUnderstandingScore } from '../engine/progressionEngine';
import { updateNodeMemory } from '../engine/spacedRepetition';
import { totalNodeCount, getNode, getNodesInBranch, getBranchIds } from '../data/visionTree';
import { XP_PER_NEW_NODE, XP_DEPTH_BONUS } from '../utils/constants';

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
  exploreNode: (nodeId: string) => void;
  goBack: () => void;
  goToRoot: () => void;
  toggleBookmark: (nodeId: string) => void;
  updateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
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
      currentNodeId: 'root',
      exploredNodes: new Set<string>(loadUserProgress().exploredNodeIds),
      bookmarkedNodes: loadUserProgress().bookmarkedNodeIds,
      pathHistory: [],
    } as ExplorationState,
  );

  useEffect(() => {
    saveUserProgress(userProfile);
  }, [userProfile]);

  const navigate = useCallback((scene: GameScene) => {
    dispatch({ type: 'NAVIGATE', payload: scene });
  }, []);

  const updateProfile = useCallback((updater: (prev: UserProfile) => UserProfile) => {
    setUserProfile(updater(userProfile));
  }, [userProfile]);

  const exploreNode = useCallback((nodeId: string) => {
    const node = getNode(nodeId);
    if (!node) return;

    const isFirstVisit = !exploration.exploredNodes.has(nodeId);
    const newExplored = new Set(exploration.exploredNodes);
    newExplored.add(nodeId);

    setExploration({
      ...exploration,
      currentNodeId: nodeId,
      exploredNodes: newExplored,
      pathHistory: [...exploration.pathHistory, exploration.currentNodeId],
    });

    if (isFirstVisit) {
      const xpEarned = XP_PER_NEW_NODE + (node.depth * XP_DEPTH_BONUS);
      const progression = applyXP(userProfile, xpEarned);
      const streak = updateDailyStreak(userProfile);
      const today = new Date().toISOString().slice(0, 10);
      const newExploredIds = [...userProfile.exploredNodeIds, nodeId];

      const newMemory = { ...userProfile.nodeMemory };
      newMemory[nodeId] = updateNodeMemory(newMemory[nodeId], nodeId);

      setUserProfile({
        ...userProfile,
        totalXP: progression.newTotalXP,
        level: progression.newLevel,
        currentLevelXP: progression.newCurrentLevelXP,
        xpToNextLevel: progression.newXpToNextLevel,
        currentStreak: streak.newStreak,
        longestStreak: streak.newLongestStreak,
        lastPlayedDate: today,
        exploredNodeIds: newExploredIds,
        totalNodesExplored: newExploredIds.length,
        deepestDepthReached: Math.max(userProfile.deepestDepthReached, node.depth),
        understandingScore: calculateUnderstandingScore(newExploredIds.length, totalNodeCount),
        nodeMemory: newMemory,
      });

      // Trigger XP toast
      if (typeof window !== 'undefined' && (window as any).__triggerExpGain) {
        (window as any).__triggerExpGain(xpEarned);
      }
      // Trigger level up
      if (progression.leveledUp && typeof window !== 'undefined' && (window as any).__triggerLevelUp) {
        (window as any).__triggerLevelUp(progression.newLevel);
      }
    } else {
      // Revisit: update memory
      const newMemory = { ...userProfile.nodeMemory };
      newMemory[nodeId] = updateNodeMemory(newMemory[nodeId], nodeId);
      setUserProfile({ ...userProfile, nodeMemory: newMemory });
    }

    // Navigate to explore screen if not already there
    if (gameState.scene !== 'explore') {
      dispatch({ type: 'NAVIGATE', payload: 'explore' });
    }
  }, [exploration, userProfile, gameState.scene]);

  const goBack = useCallback(() => {
    if (exploration.pathHistory.length === 0) {
      dispatch({ type: 'NAVIGATE', payload: 'home' });
      return;
    }
    const newHistory = [...exploration.pathHistory];
    const previousNodeId = newHistory.pop()!;
    setExploration({
      ...exploration,
      currentNodeId: previousNodeId,
      pathHistory: newHistory,
    });
  }, [exploration]);

  const goToRoot = useCallback(() => {
    setExploration({
      ...exploration,
      currentNodeId: 'root',
      pathHistory: [],
    });
    dispatch({ type: 'NAVIGATE', payload: 'home' });
  }, [exploration]);

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
    // Exclude root node from count
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
        exploreNode,
        goBack,
        goToRoot,
        toggleBookmark,
        updateProfile,
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
