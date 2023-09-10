/* global confetti */

import { useEffect, useCallback } from "react";

export const ConfettiType = Object.freeze({
  Confetti: "Confetti",
  Stars: "Stars",
});

export const useConfetti = () => {
  useEffect(() => {
    const onConfettiLoaded = (container) => {
      if (container) {
        container.fpsLimit = 60;
      }
    };

    // pre-warm the confetti engine
    confetti({ count: 0 }).then(onConfettiLoaded);
  }, []);

  const playConfetti = useCallback((confettiType) => {
    const makeConfettiOptions = () => {
      const commonConfettiOptions = {
        count: 200,
      };

      switch (confettiType) {
        default:
        case ConfettiType.Confetti:
          return {
            ...commonConfettiOptions,
            scalar: 1.5,
          };
        case ConfettiType.Stars:
          return {
            ...commonConfettiOptions,
            shapes: ["star"],
            colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
          };
      }
    };

    const confettiOptions = makeConfettiOptions();
    confetti(confettiOptions);
  }, []);

  return {
    playConfetti,
  };
};
