export const GameState = Object.freeze({
  Stopped: "Stopped",
  Running: "Running",
  Stopping: "Stopping",
});

export const DEFAULT_SETTINGS = {
  newLetterRate: 500,
  letterFallSpeed: 5000,
  strictMode: false,
  enableConfetti: false,
};
