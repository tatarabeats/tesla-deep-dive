import { secFilingQuestions } from './sec-filing';
import { earningsCallQuestions } from './earnings-call';
import { scenarioQuizQuestions } from './scenario-quiz';
import { competitorQuestions } from './competitor';
import { segmentQuestions } from './segment';

export const allQuestions = [
  ...secFilingQuestions,
  ...earningsCallQuestions,
  ...scenarioQuizQuestions,
  ...competitorQuestions,
  ...segmentQuestions,
];
