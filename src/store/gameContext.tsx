import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import type { UserProfile } from '../types/user';
import { loadUserProgress, saveUserProgress } from '../utils/storage';
import { visionTreeData, getChildren } from '../data/visionTree';

/* ── State ── */
interface MindmapState {
  expandedNodes: Set<string>;   // which nodes have their children visible
  exploredNodes: Set<string>;   // nodes the user has ever tapped
}

interface GameContextType {
  userProfile: UserProfile;
  mindmap: MindmapState;
  toggleNode: (nodeId: string) => void;   // expand / collapse children
  exploreNode: (nodeId: string) => void;  // mark explored without toggling expand
}

const GameContext = createContext<GameContextType | null>(null);

/** Recursively collect all descendant IDs */
function getSubtreeIds(nodeId: string): string[] {
  const ids: string[] = [];
  const kids = getChildren(nodeId);
  for (const kid of kids) {
    ids.push(kid.id);
    ids.push(...getSubtreeIds(kid.id));
  }
  return ids;
}

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
    const node = visionTreeData[nodeId];

    if (newExpanded.has(nodeId)) {
      // Collapse: remove this node + all descendants
      newExpanded.delete(nodeId);
      for (const descId of getSubtreeIds(nodeId)) {
        newExpanded.delete(descId);
      }
    } else {
      // Expand
      newExpanded.add(nodeId);

      // L1 Accordion: if this is a depth-1 node, collapse other L1 siblings + their subtrees
      if (node && node.depth === 1) {
        const siblings = getChildren('root');
        for (const sib of siblings) {
          if (sib.id !== nodeId && newExpanded.has(sib.id)) {
            newExpanded.delete(sib.id);
            for (const descId of getSubtreeIds(sib.id)) {
              newExpanded.delete(descId);
            }
          }
        }
      }
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

  const exploreNode = useCallback((nodeId: string) => {
    const newExplored = new Set(mindmap.exploredNodes);
    if (newExplored.has(nodeId)) return;

    newExplored.add(nodeId);
    const today = new Date().toISOString().slice(0, 10);
    setUserProfile({
      ...userProfile,
      exploredNodeIds: [...userProfile.exploredNodeIds, nodeId],
      lastOpenedDate: today,
    });
    setMindmap({ expandedNodes: mindmap.expandedNodes, exploredNodes: newExplored });
  }, [mindmap, userProfile]);

  return (
    <GameContext.Provider value={{ userProfile, mindmap, toggleNode, exploreNode }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
