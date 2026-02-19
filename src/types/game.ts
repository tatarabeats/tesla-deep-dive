export type GameScene = 'home' | 'profile';

export interface GameState {
  scene: GameScene;
}

export type GameAction =
  | { type: 'NAVIGATE'; payload: GameScene };
