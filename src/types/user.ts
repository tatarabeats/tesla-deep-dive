export interface UserProfile {
  name: string;
  createdAt: number;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  xpToNextLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;
  exploredNodeIds: string[];
  bookmarkedNodeIds: string[];
  totalNodesExplored: number;
  deepestDepthReached: number;
  understandingScore: number;
  nodeMemory: Record<string, NodeMemory>;
  soundEnabled: boolean;
}

export interface NodeMemory {
  nodeId: string;
  timesVisited: number;
  lastVisited: number;
  nextSuggestedVisit: number;
  easeFactor: number;
  interval: number;
}
