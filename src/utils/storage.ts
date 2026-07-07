import type { PersistedState } from "@/types";
import { STORAGE_KEYS } from "@/constants";

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode / quota) — ignore */
  }
}

export function loadBest(): number {
  const raw = safeGet(STORAGE_KEYS.best);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function saveBest(value: number): void {
  safeSet(STORAGE_KEYS.best, String(value));
}

export function loadState(): PersistedState | null {
  const raw = safeGet(STORAGE_KEYS.state);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed || !Array.isArray(parsed.tiles)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): void {
  safeSet(STORAGE_KEYS.state, JSON.stringify(state));
}
