export const GameState = Object.freeze({
  Stopped: "Stopped",
  Running: "Running",
  Paused: "Paused",
  Stopping: "Stopping",
});

export const DEFAULT_SETTINGS = {
  newLetterRate: 500,
  letterFallSpeed: 5000,
  strictMode: false,
  enableConfetti: true,
};

// Fall speed multiplier applied when the player hits stop.
export const STOPPING_FALL_SPEED_MULTIPLIER = 4;
