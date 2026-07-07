export const GRID_SIZE = 4;

export const WIN_VALUE = 2048;

export const STORAGE_KEYS = {
  best: "chaos2048:best",
  state: "chaos2048:state",
} as const;

/** Matches the slide duration used for tile movement animations. */
export const ANIMATION_DURATION = 130;

/** Minimum distance (px) a touch must travel to register as a swipe. */
export const SWIPE_THRESHOLD = 24;
