export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'estimation';

export type ModuleId =
  | 'sec_filing'
  | 'earnings_call'
  | 'worst_case'
  | 'competitor'
  | 'segment';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  moduleId: ModuleId;
  type: QuestionType;
  difficulty: Difficulty;
  questionText: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: boolean;
  estimationRange?: {
    min: number;
    max: number;
    correctMin: number;
    correctMax: number;
    unit: string;
    displayFormat: 'currency' | 'percent' | 'number';
  };
  explanation: string;
  source?: string;
  tags: string[];
}

export interface Module {
  id: ModuleId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  questionCount: number;
}
