import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import type { GameState, GameAction, RoundResult } from '../types/game';
import type { UserProfile } from '../types/user';
import type { ModuleId } from '../types/quiz';
import { loadUserProgress, saveUserProgress } from '../utils/storage';
import { selectQuestionsForRound } from '../engine/questionSelector';
import { calculateScore } from '../engine/scoringEngine';
import { applyXP, scoreToXP, updateDailyStreak, calculateConvictionGain } from '../engine/progressionEngine';
import { updateQuestionMemory } from '../engine/spacedRepetition';
import { allQuestions } from '../data/questions';
import { QUESTIONS_PER_ROUND } from '../utils/constants';

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, scene: action.payload, round: null };

    case 'START_ROUND': {
      const { questions, moduleId } = action.payload;
      return {
        ...state,
        scene: 'round_active',
        round: {
          moduleId,
          questions,
          currentQuestionIndex: 0,
          answers: [],
          currentScore: 0,
          currentCombo: 0,
          maxCombo: 0,
          questionsPerRound: questions.length,
          answerState: 'waiting',
        },
        lastResult: null,
      };
    }

    case 'SUBMIT_ANSWER': {
      if (!state.round || state.round.answerState !== 'waiting') return state;
      const { isCorrect, points } = action.payload;
      const newCombo = isCorrect ? state.round.currentCombo + 1 : 0;

      return {
        ...state,
        round: {
          ...state.round,
          answers: [
            ...state.round.answers,
            {
              questionId: state.round.questions[state.round.currentQuestionIndex].id,
              isCorrect,
              pointsEarned: points,
              comboAtTime: newCombo,
            },
          ],
          currentScore: state.round.currentScore + points,
          currentCombo: newCombo,
          maxCombo: Math.max(state.round.maxCombo, newCombo),
          answerState: isCorrect ? 'answered_correct' : 'answered_wrong',
        },
      };
    }

    case 'NEXT_QUESTION': {
      if (!state.round) return state;
      const nextIndex = state.round.currentQuestionIndex + 1;
      if (nextIndex >= state.round.questions.length) {
        return state;
      }
      return {
        ...state,
        round: {
          ...state.round,
          currentQuestionIndex: nextIndex,
          answerState: 'waiting',
        },
      };
    }

    case 'FINISH_ROUND':
      return {
        ...state,
        scene: 'round_result',
        round: null,
        lastResult: action.payload,
      };

    default:
      return state;
  }
}

const initialGameState: GameState = {
  scene: 'home',
  round: null,
  lastResult: null,
};

interface GameContextType {
  gameState: GameState;
  userProfile: UserProfile;
  dispatch: React.Dispatch<GameAction>;
  startRound: (moduleId: ModuleId, isDailyChallenge?: boolean) => void;
  submitAnswer: (selectedIndex: number | boolean) => void;
  nextQuestion: () => void;
  finishRound: () => void;
  navigate: (scene: GameState['scene']) => void;
  updateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [userProfile, setUserProfile] = useReducer(
    (_prev: UserProfile, next: UserProfile) => next,
    null as unknown as UserProfile,
    () => loadUserProgress()
  );

  useEffect(() => {
    saveUserProgress(userProfile);
  }, [userProfile]);

  const navigate = useCallback((scene: GameState['scene']) => {
    dispatch({ type: 'NAVIGATE', payload: scene });
  }, []);

  const updateProfile = useCallback((updater: (prev: UserProfile) => UserProfile) => {
    setUserProfile(updater(userProfile));
  }, [userProfile]);

  const startRound = useCallback((moduleId: ModuleId, isDailyChallenge = false) => {
    const count = QUESTIONS_PER_ROUND;
    const questions = selectQuestionsForRound(
      allQuestions,
      isDailyChallenge ? 'daily' : moduleId,
      userProfile.questionHistory,
      count
    );

    if (questions.length === 0) return;

    dispatch({
      type: 'START_ROUND',
      payload: { moduleId, questions },
    });
  }, [userProfile]);

  const submitAnswer = useCallback((selected: number | boolean) => {
    if (!gameState.round || gameState.round.answerState !== 'waiting') return;

    const question = gameState.round.questions[gameState.round.currentQuestionIndex];

    let isCorrect = false;
    if (question.type === 'true_false') {
      isCorrect = selected === question.correctAnswer;
    } else {
      isCorrect = selected === question.correctIndex;
    }

    const scoreResult = calculateScore({
      isCorrect,
      difficulty: question.difficulty,
      currentCombo: gameState.round.currentCombo,
    });

    dispatch({
      type: 'SUBMIT_ANSWER',
      payload: {
        isCorrect,
        points: scoreResult.totalPoints,
      },
    });

    const newHistory = { ...userProfile.questionHistory };
    newHistory[question.id] = updateQuestionMemory(
      newHistory[question.id],
      question.id,
      isCorrect
    );
    setUserProfile({ ...userProfile, questionHistory: newHistory });
  }, [gameState.round, userProfile]);

  const nextQuestion = useCallback(() => {
    if (!gameState.round) return;

    if (gameState.round.currentQuestionIndex >= gameState.round.questions.length - 1) {
      finishRound();
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  }, [gameState.round]);

  const finishRound = useCallback(() => {
    if (!gameState.round) return;

    const round = gameState.round;
    const correctAnswers = round.answers.filter(a => a.isCorrect).length;
    const totalScore = round.currentScore;
    const xpEarned = scoreToXP(totalScore);
    const accuracy = round.answers.length > 0
      ? Math.round((correctAnswers / round.answers.length) * 100)
      : 0;
    const convictionGain = calculateConvictionGain(accuracy, round.answers.length);

    const progression = applyXP(userProfile, xpEarned);
    const streak = updateDailyStreak(userProfile);
    const today = new Date().toISOString().slice(0, 10);

    const modStats = { ...userProfile.moduleStats };
    const mod = modStats[round.moduleId];
    modStats[round.moduleId] = {
      questionsAnswered: mod.questionsAnswered + round.answers.length,
      correctAnswers: mod.correctAnswers + correctAnswers,
      bestScore: Math.max(mod.bestScore, totalScore),
      timesPlayed: mod.timesPlayed + 1,
    };

    const result: RoundResult = {
      moduleId: round.moduleId,
      totalScore,
      questionsAnswered: round.answers.length,
      correctAnswers,
      accuracy,
      maxCombo: round.maxCombo,
      xpEarned,
      leveledUp: progression.leveledUp,
      newLevel: progression.leveledUp ? progression.newLevel : null,
      answers: round.answers,
      convictionGain,
    };

    setUserProfile({
      ...userProfile,
      totalXP: progression.newTotalXP,
      level: progression.newLevel,
      currentLevelXP: progression.newCurrentLevelXP,
      xpToNextLevel: progression.newXpToNextLevel,
      currentStreak: streak.newStreak,
      longestStreak: streak.newLongestStreak,
      lastPlayedDate: today,
      totalQuestionsAnswered: userProfile.totalQuestionsAnswered + round.answers.length,
      totalCorrect: userProfile.totalCorrect + correctAnswers,
      totalRoundsPlayed: userProfile.totalRoundsPlayed + 1,
      bestRoundScore: Math.max(userProfile.bestRoundScore, totalScore),
      bestCombo: Math.max(userProfile.bestCombo, round.maxCombo),
      moduleStats: modStats,
      convictionScore: Math.min(100, userProfile.convictionScore + convictionGain),
    });

    dispatch({ type: 'FINISH_ROUND', payload: result });
  }, [gameState.round, userProfile]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        userProfile,
        dispatch,
        startRound,
        submitAnswer,
        nextQuestion,
        finishRound,
        navigate,
        updateProfile,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
