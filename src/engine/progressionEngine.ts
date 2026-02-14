import type { UserProfile } from '../types/user';

const SCORE_TO_XP_RATIO = 0.5;

export function xpForLevel(level: number): number {
  return Math.round(150 * level * (1 + level * 0.05));
}

export function scoreToXP(score: number): number {
  return Math.round(score * SCORE_TO_XP_RATIO);
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

export function calculateConvictionGain(accuracy: number, questionsAnswered: number): number {
  if (questionsAnswered === 0) return 0;
  const base = accuracy >= 80 ? 5 : accuracy >= 60 ? 3 : 1;
  return base;
}
