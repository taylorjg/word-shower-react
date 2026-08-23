import { useEffect, useCallback, useRef } from "react";
import { confetti } from "tsparticles-confetti";

export const ConfettiType = Object.freeze({
  Confetti: "Confetti",
  Stars: "Stars",
});

const makeConfettiOptions = (confettiType) => {
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

const syncCanvasSize = (canvas, container) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
};

export const useConfetti = (canvasRef) => {
  const playConfettiRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const container = canvas.parentElement;
    if (!container) {
      return;
    }

    let cancelled = false;

    const resizeCanvas = () => {
      syncCanvasSize(canvas, container);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    confetti.create(canvas).then((scopedConfetti) => {
      if (cancelled) {
        return;
      }

      playConfettiRef.current = scopedConfetti;

      scopedConfetti({ count: 0 }).then((container) => {
        if (container) {
          container.fpsLimit = 60;
        }
      });
    });

    return () => {
      cancelled = true;
      playConfettiRef.current = null;
      resizeObserver.disconnect();
    };
  }, [canvasRef]);

  const playConfetti = useCallback((confettiType) => {
    const scopedConfetti = playConfettiRef.current;
    if (!scopedConfetti) {
      return;
    }

    scopedConfetti(makeConfettiOptions(confettiType));
  }, []);

  return {
    playConfetti,
  };
};
