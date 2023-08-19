import { useCallback, useRef, useState } from "react";

import { getRandomLetter } from "@app/helpers/scrabble";

const ADD_LETTER_INTERVAL = 500;
const REMOVE_LETTER_INTERVAL = 8000;
const MIN_CALL_COUNT = REMOVE_LETTER_INTERVAL / ADD_LETTER_INTERVAL;

export const useActiveLetters = () => {
  const [activeLetters, setActiveLetters] = useState([]);
  const callCountRef = useRef(0);
  const stopPendingRef = useRef(false);
  const intervalIdRef = useRef(false);

  const start = useCallback(() => {
    callCountRef.current = 0;
    stopPendingRef.current = false;
    intervalIdRef.current = setInterval(() => {
      callCountRef.current += 1;
      setActiveLetters((currentActiveLetters) => {
        if (stopPendingRef.current) {
          const [, ...remainingLetters] = currentActiveLetters;
          if (remainingLetters.length === 0) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = false;
          }
          return remainingLetters;
        } else {
          const nextLetter = getRandomLetter();
          if (callCountRef.current >= MIN_CALL_COUNT) {
            const [, ...remainingLetters] = currentActiveLetters;
            return [...remainingLetters, nextLetter];
          } else {
            return [...currentActiveLetters, nextLetter];
          }
        }
      });
    }, ADD_LETTER_INTERVAL);
  }, []);

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
