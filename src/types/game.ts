export type GameScene = 'home' | 'explore' | 'profile';

export interface GameState {
  scene: GameScene;
}

export type GameAction =
  | { type: 'NAVIGATE'; payload: GameScene }
  | { type: 'EXPLORE_NODE'; payload: string }
  | { type: 'GO_BACK' }
  | { type: 'GO_TO_ROOT' }
  | { type: 'TOGGLE_BOOKMARK'; payload: string };
