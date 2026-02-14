export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'competition' | 'technology' | 'financial' | 'regulatory' | 'management';
  severity: 'moderate' | 'severe' | 'existential';
  prompt: string;
  followUpQuestions: string[];
  counterArguments: CounterArgument[];
}

export interface CounterArgument {
  point: string;
  evidence: string;
}
