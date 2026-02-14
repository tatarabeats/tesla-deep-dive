import type { UserProfile } from '../types/user';
import type { ModuleId } from '../types/quiz';
import { STORAGE_KEYS } from './constants';
import { xpForLevel } from '../engine/progressionEngine';

const DEFAULT_MODULE_STAT = {
  questionsAnswered: 0,
  correctAnswers: 0,
  bestScore: 0,
  timesPlayed: 0,
};

export function createDefaultProfile(): UserProfile {
  const allModules: ModuleId[] = [
    'sec_filing', 'earnings_call', 'worst_case', 'competitor', 'segment',
  ];

  const moduleStats = {} as Record<ModuleId, typeof DEFAULT_MODULE_STAT>;
  for (const mod of allModules) {
    moduleStats[mod] = { ...DEFAULT_MODULE_STAT };
  }

  return {
    name: 'Investor',
    createdAt: Date.now(),
    totalXP: 0,
    level: 1,
    currentLevelXP: 0,
    xpToNextLevel: xpForLevel(1),
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '',
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    totalRoundsPlayed: 0,
    bestRoundScore: 0,
    bestCombo: 0,
    moduleStats,
    soundEnabled: true,
    questionHistory: {},
    convictionScore: 0,
    analyses: [],
  };
}

export function loadUserProgress(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (raw) {
      const profile = JSON.parse(raw) as UserProfile;
      const allModules: ModuleId[] = [
        'sec_filing', 'earnings_call', 'worst_case', 'competitor', 'segment',
      ];
      let needsMigration = false;
      for (const mod of allModules) {
        if (!profile.moduleStats[mod]) {
          profile.moduleStats[mod] = { ...DEFAULT_MODULE_STAT };
          needsMigration = true;
        }
      }
      if (needsMigration) {
        saveUserProgress(profile);
      }
      return profile;
    }
  } catch {
    // corrupted data, reset
  }
  return createDefaultProfile();
}

export function saveUserProgress(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(profile));
}
