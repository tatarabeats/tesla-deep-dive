/** Scene types for scroll-driven storytelling */

export type SceneType = 'cold-open' | 'root' | 'threat' | 'solution' | 'multi' | 'epilogue';

export interface StoryScene {
  id: string;
  type: SceneType;
  /** Chapter number (1-6), null for intro/epilogue */
  chapter: number | null;
  /** Image path relative to public/ */
  imageUrl: string | null;
  /** Main display text (short, 1-2 lines) */
  text: string;
  /** Secondary text below main */
  subText?: string;
  /** Big hero number/stat */
  stat?: string;
  /** Small context for the stat */
  statLabel?: string;
  /** Accent color for chapter theming */
  accentColor: string;
  /** Elon quote for epilogue */
  elonQuote?: string;
  /** For multi-solution scenes: array of sub-items */
  multiItems?: {
    imageUrl: string;
    label: string;
    stat: string;
  }[];
}
