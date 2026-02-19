import type { UserProfile } from '../types/user';
import { STORAGE_KEYS } from './constants';
import { xpForLevel } from '../engine/progressionEngine';

export function createDefaultProfile(): UserProfile {
  return {
    name: 'Explorer',
    createdAt: Date.now(),
    totalXP: 0,
    level: 1,
    currentLevelXP: 0,
    xpToNextLevel: xpForLevel(1),
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '',
    exploredNodeIds: [],
    bookmarkedNodeIds: [],
    totalNodesExplored: 0,
    deepestDepthReached: 0,
    understandingScore: 0,
    nodeMemory: {},
    soundEnabled: true,
  };
}

export function loadUserProgress(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (raw) {
      return JSON.parse(raw) as UserProfile;
    }
  } catch {
    // corrupted data, reset
  }
  return createDefaultProfile();
}

export function saveUserProgress(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(profile));
}
