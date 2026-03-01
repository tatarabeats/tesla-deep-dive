/** Cinematic scene types for Apple-style scroll-driven storytelling */

export type CinematicSceneType =
  | "hero-statement" // Text only, black bg, huge type (Prologue/Epilogue)
  | "chapter-gate" // Full-screen image, chapter number zoom, Ken Burns
  | "sticky-sequence" // Screen fixed, scroll drives image crossfade + text
  | "full-bleed-stat" // Full-screen image + giant number center
  | "side-by-side" // Left: image fixed, Right: scroll content. Mobile: stack
  | "bridge" // Chapter transition (speech bubble)
  | "climax" // Success celebration (ch1-success etc.)
  | "epilogue"; // Final scene

/** A single "beat" within a sticky-sequence */
export interface Beat {
  imageUrl?: string;
  text: string;
  subText?: string;
  stat?: string;
  statLabel?: string;
  /** Speech bubble overlay */
  speechBubble?: {
    text: string;
    speaker?: string;
    speakerName?: string;
    emphasis?: "hero" | "quiet";
  };
}

/** Side-by-side panel item */
export interface SidePanel {
  text: string;
  subText?: string;
  stat?: string;
  statLabel?: string;
  badge?: string;
}

export interface CinematicScene {
  id: string;
  type: CinematicSceneType;
  chapter: number | null;
  accentColor: string;

  // Hero Statement / Chapter Gate
  text?: string;
  subText?: string;

  // Image
  imageUrl?: string;

  // Stats
  stat?: string;
  statLabel?: string;

  // Chapter Gate
  chapterNum?: string; // "危機 01"

  // Badge
  badge?: string;

  // Sticky Sequence beats
  beats?: Beat[];
  /** Scroll height multiplier for sticky (default 300vh per beat) */
  scrollHeight?: string;

  // Side by Side
  sideImage?: string;
  sidePanels?: SidePanel[];

  // Bridge speech bubble
  speechBubble?: {
    text: string;
    speaker?: string;
    speakerName?: string;
    emphasis?: "hero" | "quiet";
  };

  // Epilogue
  elonQuote?: string;
  elonQuoteJp?: string;

  // Text color override
  textColor?: string;

  // Glitch text (prologue)
  glitchHighlight?: string;
}
