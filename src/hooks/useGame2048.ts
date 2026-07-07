import { useCallback, useEffect, useRef, useState } from "react";
import type { Direction, GameStatus, PersistedState, Tile } from "@/types";
import { moveTiles, movesAvailable, spawnTile, startTiles } from "@/utils/game";
import { loadBest, loadState, saveBest, saveState } from "@/utils/storage";
import { ANIMATION_DURATION } from "@/constants";

export interface Game2048Api {
  tiles: Tile[];
  score: number;
  best: number;
  status: GameStatus;
  canUndo: boolean;
  move: (direction: Direction) => void;
  undo: () => void;
  restart: () => void;
  keepPlaying: () => void;
}

interface InitialState {
  tiles: Tile[];
  score: number;
  status: GameStatus;
  hasWon: boolean;
}

function loadInitialState(): InitialState {
  const saved = loadState();
  if (saved && saved.tiles.length > 0) {
    return {
      tiles: saved.tiles,
      score: saved.score,
      status: saved.status,
      hasWon: saved.hasWon,
    };
  }
  return { tiles: startTiles(), score: 0, status: "playing", hasWon: false };
}

/**
 * Clears animation flags (isNew, isMerged) from tiles to prevent
 * re-triggering animations after the animation duration completes.
 * This prevents tiles from getting stuck in animated states.
 */
function clearAnimationFlags(tiles: Tile[]): Tile[] {
  return tiles.map(({ isNew: _isNew, isMerged: _isMerged, ...tile }) => tile);
}

export function useGame2048(): Game2048Api {
  const initialRef = useRef<InitialState | null>(null);
  if (initialRef.current === null) initialRef.current = loadInitialState();
  const initial = initialRef.current;

  const [tiles, setTiles] = useState<Tile[]>(initial.tiles);
  const [score, setScore] = useState(initial.score);
  const [best, setBest] = useState(loadBest);
  const [status, setStatus] = useState<GameStatus>(initial.status);
  const [canUndo, setCanUndo] = useState(false);

  const tilesRef = useRef<Tile[]>(initial.tiles);
  const scoreRef = useRef(initial.score);
  const bestRef = useRef(loadBest());
  const statusRef = useRef<GameStatus>(initial.status);
  const hasWonRef = useRef(initial.hasWon);

  const tilesHistory = useRef<Tile[][]>([]);
  const scoreHistory = useRef<number[]>([]);
  const statusHistory = useRef<GameStatus[]>([]);
  const hasWonHistory = useRef<boolean[]>([]);
  const timer = useRef<number | null>(null);

  const persist = useCallback(
    (nextTiles: Tile[], nextScore: number, nextStatus: GameStatus, nextHasWon: boolean) => {
      const state: PersistedState = {
        tiles: nextTiles,
        score: nextScore,
        status: nextStatus,
        hasWon: nextHasWon,
      };
      saveState(state);
    },
    [],
  );

  const move = useCallback(
    (direction: Direction) => {
      if (statusRef.current !== "playing") return;

      const current = tilesRef.current;
      const result = moveTiles(current, direction);
      if (!result.moved) return;

      tilesHistory.current.push(current);
      scoreHistory.current.push(scoreRef.current);
      statusHistory.current.push(statusRef.current);
      hasWonHistory.current.push(hasWonRef.current);

      const spawned = spawnTile(result.tiles);
      const nextTiles = spawned ? [...result.tiles, spawned] : result.tiles;

      const nextScore = scoreRef.current + result.gained;
      let nextStatus: GameStatus = statusRef.current;
      let nextHasWon = hasWonRef.current;

      if (result.reached2048 && !hasWonRef.current) {
        nextStatus = "won";
        nextHasWon = true;
      } else if (!movesAvailable(nextTiles)) {
        nextStatus = "lost";
      }

      const nextBest = Math.max(bestRef.current, nextScore);

      tilesRef.current = nextTiles;
      scoreRef.current = nextScore;
      bestRef.current = nextBest;
      statusRef.current = nextStatus;
      hasWonRef.current = nextHasWon;

      setTiles([...nextTiles, ...result.removed]);
      setScore(nextScore);
      setBest(nextBest);
      setStatus(nextStatus);
      setCanUndo(true);

      saveBest(nextBest);
      persist(nextTiles, nextScore, nextStatus, nextHasWon);

      // Clear any existing timer before setting a new one to prevent
      // stale timeouts from interfering with animations
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        // Clear animation flags to prevent re-triggering animations
        setTiles(clearAnimationFlags(nextTiles));
      }, ANIMATION_DURATION);
    },
    [persist],
  );

  const undo = useCallback(() => {
    if (tilesHistory.current.length === 0) return;

    const prevTiles = tilesHistory.current.pop()!;
    const prevScore = scoreHistory.current.pop()!;
    const prevStatus = statusHistory.current.pop()!;
    const prevHasWon = hasWonHistory.current.pop()!;

    if (timer.current) window.clearTimeout(timer.current);

    tilesRef.current = prevTiles;
    scoreRef.current = prevScore;
    statusRef.current = prevStatus;
    hasWonRef.current = prevHasWon;

    setTiles(prevTiles);
    setScore(prevScore);
    setStatus(prevStatus);
    setCanUndo(tilesHistory.current.length > 0);
    persist(prevTiles, prevScore, prevStatus, prevHasWon);
  }, [persist]);

  const restart = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);

    const fresh = startTiles();
    tilesRef.current = fresh;
    scoreRef.current = 0;
    statusRef.current = "playing";
    hasWonRef.current = false;
    tilesHistory.current = [];
    scoreHistory.current = [];
    statusHistory.current = [];
    hasWonHistory.current = [];

    setTiles(fresh);
    setScore(0);
    setStatus("playing");
    setCanUndo(false);
    persist(fresh, 0, "playing", false);
  }, [persist]);

  const keepPlaying = useCallback(() => {
    statusRef.current = "playing";
    setStatus("playing");
    persist(tilesRef.current, scoreRef.current, "playing", hasWonRef.current);
  }, [persist]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return { tiles, score, best, status, canUndo, move, undo, restart, keepPlaying };
}
