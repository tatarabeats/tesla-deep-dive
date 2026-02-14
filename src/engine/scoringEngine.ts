import type { Difficulty } from '../types/quiz';

const BASE_POINTS: Record<Difficulty, number> = {
  easy: 100,
  medium: 200,
  hard: 300,
};

const MAX_COMBO_MULTIPLIER = 4.0;
const COMBO_INCREMENT = 0.25;

export interface ScoreResult {
  basePoints: number;
  comboMultiplier: number;
  totalPoints: number;
}

export function calculateScore(params: {
  isCorrect: boolean;
  difficulty: Difficulty;
  currentCombo: number;
}): ScoreResult {
  if (!params.isCorrect) {
    return { basePoints: 0, comboMultiplier: 1, totalPoints: 0 };
  }

  const basePoints = BASE_POINTS[params.difficulty];
  const comboMultiplier = Math.min(
    MAX_COMBO_MULTIPLIER,
    1.0 + params.currentCombo * COMBO_INCREMENT
  );
  const totalPoints = Math.round(basePoints * comboMultiplier);

  return { basePoints, comboMultiplier, totalPoints };
}
