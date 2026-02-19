import type { UserProfile } from '../types/user';

export function xpForLevel(level: number): number {
  return Math.round(150 * level * (1 + level * 0.05));
}

export interface ProgressionResult {
  newTotalXP: number;
  newLevel: number;
  newCurrentLevelXP: number;
  newXpToNextLevel: number;
  leveledUp: boolean;
}

export function applyXP(
  profile: UserProfile,
  xpEarned: number
): ProgressionResult {
  const totalXP = profile.totalXP + xpEarned;
  let level = profile.level;
  let leveledUp = false;

  let cumulativeXP = 0;
  for (let i = 1; i < level; i++) {
    cumulativeXP += xpForLevel(i);
  }
  let currentLevelXP = totalXP - cumulativeXP;

  while (currentLevelXP >= xpForLevel(level)) {
    currentLevelXP -= xpForLevel(level);
    level++;
    leveledUp = true;
  }

  return {
    newTotalXP: totalXP,
    newLevel: level,
    newCurrentLevelXP: currentLevelXP,
    newXpToNextLevel: xpForLevel(level),
    leveledUp,
  };
}

export function updateDailyStreak(profile: UserProfile): {
  newStreak: number;
  newLongestStreak: number;
} {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (profile.lastPlayedDate === today) {
    return { newStreak: profile.currentStreak, newLongestStreak: profile.longestStreak };
  }

  let newStreak: number;
  if (profile.lastPlayedDate === yesterday) {
    newStreak = profile.currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const newLongestStreak = Math.max(profile.longestStreak, newStreak);
  return { newStreak, newLongestStreak };
}

export function calculateUnderstandingScore(
  exploredCount: number,
  totalNodes: number
): number {
  if (totalNodes === 0) return 0;
  return Math.round((exploredCount / totalNodes) * 100);
}

export function getLevelTitle(level: number): string {
  if (level >= 20) return 'ビジョナリー';
  if (level >= 15) return 'First Principles思考者';
  if (level >= 11) return '深層理解者';
  if (level >= 8) return 'WHYの探究者';
  if (level >= 5) return '枝を辿る者';
  if (level >= 3) return 'ビジョンの芽';
  return '探索者見習い';
}
