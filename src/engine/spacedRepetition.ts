import type { NodeMemory } from '../types/user';

export function updateNodeMemory(
  memory: NodeMemory | undefined,
  nodeId: string,
): NodeMemory {
  const now = Date.now();

  if (!memory) {
    return {
      nodeId,
      timesVisited: 1,
      lastVisited: now,
      easeFactor: 2.5,
      interval: 3,
      nextSuggestedVisit: now + 3 * 86400000,
    };
  }

  const interval = Math.round(memory.interval * memory.easeFactor);
  const easeFactor = Math.min(3.0, memory.easeFactor + 0.05);

  return {
    nodeId,
    timesVisited: memory.timesVisited + 1,
    lastVisited: now,
    easeFactor,
    interval,
    nextSuggestedVisit: now + interval * 86400000,
  };
}
