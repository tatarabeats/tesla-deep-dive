/** Scene types for scroll-driven storytelling */

export type SceneType =
  | 'text-only'      // Text on dark bg, no image — "breathing" scene
  | 'image-hero'     // Full-bleed image with overlaid text + optional stat
  | 'chapter-title'  // Chapter intro — threat name + ominous stat
  | 'multi'          // Multi-card grid
  | 'epilogue';      // Final scene

export interface StoryScene {
  id: string;
  type: SceneType;
  /** Chapter number (1-6), null for intro/epilogue */
  chapter: number | null;
  /** Image path relative to public/ */
  imageUrl: string | null;
  /** Main display text */
  text: string;
  /** Secondary line */
  subText?: string;
  /** Big hero number/stat */
  stat?: string;
  /** Context for the stat */
  statLabel?: string;
  /** Accent color */
  accentColor: string;
  /** Elon quote */
  elonQuote?: string;
  /** Company badge */
  badge?: string;
  /** For multi scenes */
  multiItems?: {
    imageUrl: string;
    label: string;
    stat: string;
  }[];
}
