import type { ModuleId, Question } from './quiz';

export type GameScene =
  | 'home'
  | 'module_select'
  | 'round_active'
  | 'round_result'
  | 'profile';

export type AnswerState = 'waiting' | 'answered_correct' | 'answered_wrong';

export interface RoundState {
  moduleId: ModuleId;
  questions: Question[];
  currentQuestionIndex: number;
  answers: AnswerRecord[];
  currentScore: number;
  currentCombo: number;
  maxCombo: number;
  questionsPerRound: number;
  answerState: AnswerState;
}

export interface AnswerRecord {
  questionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  comboAtTime: number;
}

export interface RoundResult {
  moduleId: ModuleId;
  totalScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  maxCombo: number;
  xpEarned: number;
  leveledUp: boolean;
  newLevel: number | null;
  answers: AnswerRecord[];
  convictionGain: number;
}

export interface GameState {
  scene: GameScene;
  round: RoundState | null;
  lastResult: RoundResult | null;
}

export type GameAction =
  | { type: 'NAVIGATE'; payload: GameScene }
  | { type: 'START_ROUND'; payload: { moduleId: ModuleId; questions: Question[] } }
  | { type: 'SUBMIT_ANSWER'; payload: { isCorrect: boolean; points: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_ROUND'; payload: RoundResult };
