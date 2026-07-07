export type Direction = "up" | "down" | "left" | "right";

export type GameStatus = "playing" | "won" | "lost";

export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
}

export interface PersistedState {
  tiles: Tile[];
  score: number;
  status: GameStatus;
  hasWon: boolean;
}

export interface MoveResult {
  tiles: Tile[];
  removed: Tile[];
  moved: boolean;
  gained: number;
  reached2048: boolean;
}
