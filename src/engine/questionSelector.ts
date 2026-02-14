import type { Question, ModuleId } from '../types/quiz';
import type { QuestionMemory } from '../types/user';

function weightedSample<T>(
  items: { item: T; weight: number }[],
  count: number
): T[] {
  const pool = [...items];
  const result: T[] = [];

  for (let i = 0; i < count && pool.length > 0; i++) {
    const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
    let rand = Math.random() * totalWeight;
    let selectedIndex = 0;

    for (let j = 0; j < pool.length; j++) {
      rand -= pool[j].weight;
      if (rand <= 0) {
        selectedIndex = j;
        break;
      }
    }

    result.push(pool[selectedIndex].item);
    pool.splice(selectedIndex, 1);
  }

  return result;
}

export function selectQuestionsForRound(
  allQuestions: Question[],
  moduleId: ModuleId | 'daily',
  questionHistory: Record<string, QuestionMemory>,
  count: number
): Question[] {
  let pool: Question[];

  if (moduleId === 'daily') {
    pool = [...allQuestions];
  } else {
    pool = allQuestions.filter(q => q.moduleId === moduleId);
  }

  if (pool.length <= count) {
    return pool;
  }

  const weighted = pool.map(q => {
    const memory = questionHistory[q.id];
    let weight = 1.0;

    if (!memory) {
      weight = 3.0;
    } else if (Date.now() >= memory.nextReviewDate) {
      weight = 5.0;
    } else {
      const accuracy = memory.timesCorrect / memory.timesShown;
      weight = accuracy < 0.5 ? 4.0 : 0.5;
    }

    return { item: q, weight };
  });

  return weightedSample(weighted, count);
}
