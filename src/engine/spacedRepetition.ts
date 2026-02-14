import type { QuestionMemory } from '../types/user';

export function updateQuestionMemory(
  memory: QuestionMemory | undefined,
  questionId: string,
  isCorrect: boolean
): QuestionMemory {
  const now = Date.now();

  if (!memory) {
    return {
      questionId,
      timesShown: 1,
      timesCorrect: isCorrect ? 1 : 0,
      lastShown: now,
      easeFactor: isCorrect ? 2.5 : 1.8,
      interval: isCorrect ? 3 : 0.5,
      nextReviewDate: now + (isCorrect ? 3 : 0.5) * 86400000,
    };
  }

  let { easeFactor, interval } = memory;

  if (isCorrect) {
    if (memory.timesCorrect === 0) {
      interval = 1;
    } else if (memory.timesCorrect === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    easeFactor = Math.max(1.3, easeFactor + 0.1);
  } else {
    interval = 0.5;
    easeFactor = Math.max(1.3, easeFactor - 0.3);
  }

  return {
    questionId,
    timesShown: memory.timesShown + 1,
    timesCorrect: memory.timesCorrect + (isCorrect ? 1 : 0),
    lastShown: now,
    easeFactor,
    interval,
    nextReviewDate: now + interval * 86400000,
  };
}
