import { useCallback, useRef, useState } from "react";

import { getRandomLetter } from "@app/helpers/scrabble";

const SPEECH_RECOGNITION_DELAY = 2000;

export const useActiveLetters = (settings) => {
  const [activeLetters, setActiveLetters] = useState([]);
  const callCountRef = useRef(0);
  const stopPendingRef = useRef(false);
  const intervalIdRef = useRef(false);
  const nextIdRef = useRef(0);

  const getNextId = () => {
    return nextIdRef.current++;
  };

  const reset = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = false;
    }

    setActiveLetters([]);
    callCountRef.current = 0;
    stopPendingRef.current = false;
  };

  const start = useCallback(() => {
    reset();
    const minCallCount = Math.floor(
      (settings.letterFallSpeed + SPEECH_RECOGNITION_DELAY) /
        settings.newLetterRate
    );
    intervalIdRef.current = setInterval(() => {
      callCountRef.current += 1;
      setActiveLetters((currentActiveLetters) => {
        if (stopPendingRef.current) {
          const [, ...remainingLetterWrappers] = currentActiveLetters;
          if (remainingLetterWrappers.length === 0) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = false;
          }
          return remainingLetterWrappers;
        } else {
          const newLetterWrapper = {
            id: getNextId(),
            letter: getRandomLetter(),
          };
          if (callCountRef.current >= minCallCount) {
            const [, ...remainingLetterWrappers] = currentActiveLetters;
            return [...remainingLetterWrappers, newLetterWrapper];
          } else {
            return [...currentActiveLetters, newLetterWrapper];
          }
        }
      });
    }, settings.newLetterRate);
  }, [settings]);

  const stop = useCallback(() => {
    if (intervalIdRef.current) {
      stopPendingRef.current = true;
    }
  }, []);

  return {
    activeLetters,
    startActiveLetters: start,
    stopActiveLetters: stop,
  };
};
