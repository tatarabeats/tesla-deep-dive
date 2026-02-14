import type { ModuleId } from './quiz';

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
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalRoundsPlayed: number;
  bestRoundScore: number;
  bestCombo: number;
  moduleStats: Record<ModuleId, ModuleStat>;
  soundEnabled: boolean;
  questionHistory: Record<string, QuestionMemory>;
  convictionScore: number;
  analyses: UserAnalysis[];
}

export interface ModuleStat {
  questionsAnswered: number;
  correctAnswers: number;
  bestScore: number;
  timesPlayed: number;
}

export interface QuestionMemory {
  questionId: string;
  timesShown: number;
  timesCorrect: number;
  lastShown: number;
  easeFactor: number;
  interval: number;
  nextReviewDate: number;
}

export interface UserAnalysis {
  scenarioId: string;
  userText: string;
  timestamp: number;
  selfRating: 1 | 2 | 3 | 4 | 5;
}
