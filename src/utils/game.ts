import type { Direction, MoveResult, Tile } from "@/types";
import { GRID_SIZE, WIN_VALUE } from "@/constants";

type Vector = { row: number; col: number };
type Cell = { row: number; col: number };

let tileId = 0;

export function nextTileId(): number {
  tileId += 1;
  return tileId;
}

function createGrid(size = GRID_SIZE): (Tile | null)[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null as Tile | null),
  );
}

function buildGrid(tiles: Tile[], size = GRID_SIZE): (Tile | null)[][] {
  const grid = createGrid(size);
  for (const tile of tiles) grid[tile.row][tile.col] = tile;
  return grid;
}

function withinBounds(row: number, col: number, size = GRID_SIZE): boolean {
  return row >= 0 && col >= 0 && row < size && col < size;
}

function getVector(direction: Direction): Vector {
  switch (direction) {
    case "up":
      return { row: -1, col: 0 };
    case "down":
      return { row: 1, col: 0 };
    case "left":
      return { row: 0, col: -1 };
    case "right":
      return { row: 0, col: 1 };
  }
}

function buildTraversals(vector: Vector, size = GRID_SIZE): Cell[] {
  const rows: number[] = [];
  const cols: number[] = [];
  for (let i = 0; i < size; i += 1) {
    rows.push(i);
    cols.push(i);
  }
  if (vector.row === 1) rows.reverse();
  if (vector.col === 1) cols.reverse();

  const cells: Cell[] = [];
  for (const row of rows) {
    for (const col of cols) {
      cells.push({ row, col });
    }
  }
  return cells;
}

function findFarthest(
  grid: (Tile | null)[][],
  cell: Cell,
  vector: Vector,
): { farthest: Cell; next: Cell | null } {
  let { row, col } = cell;
  let previous: Cell;
  do {
    previous = { row, col };
    row += vector.row;
    col += vector.col;
  } while (withinBounds(row, col, grid.length) && grid[row][col] === null);

  return {
    farthest: previous,
    next: withinBounds(row, col, grid.length) ? { row, col } : null,
  };
}

export function getAvailableCells(tiles: Tile[], size = GRID_SIZE): Cell[] {
  const grid = buildGrid(tiles, size);
  const cells: Cell[] = [];
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      if (grid[r][c] === null) cells.push({ row: r, col: c });
    }
  }
  return cells;
}

export function spawnTile(tiles: Tile[], size = GRID_SIZE): Tile | null {
  const cells = getAvailableCells(tiles, size);
  if (cells.length === 0) return null;
  const { row, col } = cells[Math.floor(Math.random() * cells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  return { id: nextTileId(), value, row, col, isNew: true };
}

export function startTiles(size = GRID_SIZE): Tile[] {
  const first = spawnTile([], size);
  if (!first) return [];
  const second = spawnTile([first], size);
  return second ? [first, second] : [first];
}

/**
 * Applies a move in the given direction and returns the resulting board along
 * with the transient tiles that merged away (used to animate the slide).
 */
export function moveTiles(tiles: Tile[], direction: Direction): MoveResult {
  const size = GRID_SIZE;
  const grid = buildGrid(tiles, size);
  const vector = getVector(direction);
  const traversals = buildTraversals(vector, size);
  const mergedIds = new Set<number>();
  const removed: Tile[] = [];
  let moved = false;
  let gained = 0;
  let reached2048 = false;

  for (const { row, col } of traversals) {
    const tile = grid[row][col];
    if (!tile) continue;

    const { farthest, next } = findFarthest(grid, { row, col }, vector);
    const nextTile = next ? grid[next.row][next.col] : null;

    if (nextTile && nextTile.value === tile.value && !mergedIds.has(nextTile.id)) {
      const merged: Tile = {
        id: nextTile.id,
        value: nextTile.value * 2,
        row: nextTile.row,
        col: nextTile.col,
        isMerged: true,
      };
      grid[nextTile.row][nextTile.col] = merged;
      grid[row][col] = null;
      removed.push({ id: tile.id, value: tile.value, row: nextTile.row, col: nextTile.col });
      mergedIds.add(nextTile.id);
      gained += merged.value;
      moved = true;
      if (merged.value === WIN_VALUE) reached2048 = true;
    } else if (farthest.row !== row || farthest.col !== col) {
      const movedTile: Tile = {
        id: tile.id,
        value: tile.value,
        row: farthest.row,
        col: farthest.col,
      };
      grid[farthest.row][farthest.col] = movedTile;
      grid[row][col] = null;
      moved = true;
    }
  }

  const result: Tile[] = [];
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      const tile = grid[r][c];
      if (tile) result.push(tile);
    }
  }

  return { tiles: result, removed, moved, gained, reached2048 };
}

export function movesAvailable(tiles: Tile[], size = GRID_SIZE): boolean {
  if (getAvailableCells(tiles, size).length > 0) return true;

  const grid = buildGrid(tiles, size);
  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      const value = grid[r][c]?.value;
      if (value === undefined) continue;
      const right = c + 1 < size ? grid[r][c + 1]?.value : undefined;
      const down = r + 1 < size ? grid[r + 1][c]?.value : undefined;
      if (right === value || down === value) return true;
    }
  }
  return false;
}
