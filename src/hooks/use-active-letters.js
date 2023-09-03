import { useCallback, useRef, useState } from "react";

import { getRandomLetter } from "@app/helpers/scrabble";

const SPEECH_RECOGNITION_DELAY = 2000;

export const useActiveLetters = (settings, onAddLetter) => {
  const [activeLetters, setActiveLetters] = useState([]);
  const stopPendingRef = useRef(false);
  const intervalIdRef = useRef(false);
  const nextIdRef = useRef(0);
  const onAddLetterRef = useRef();

  onAddLetterRef.current = onAddLetter;

  const getNextId = () => {
    return nextIdRef.current++;
  };

  const reset = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = false;
    }

    setActiveLetters([]);
    stopPendingRef.current = false;
  };

  const onLetterRemoved = useCallback((id) => {
    const removeLetter = (id) => {
      console.log("[removeLetter]", { id });
      setActiveLetters((currentActiveLetters) =>
        currentActiveLetters.filter((item) => item.id !== id)
      );
    };

    // If we are currently stopping...
    if (stopPendingRef.current) {
      // ...then just remove the letter immediately...
      removeLetter(id);
    } else {
      // ...otherwise, even though the letter is no longer visible,
      // we want to let it live on for a bit longer to account for
      // the fact that the speech recognition seems to be a bit laggy.
      setTimeout(removeLetter, SPEECH_RECOGNITION_DELAY, id);
    }
  }, []);

  const start = useCallback(() => {
    reset();
    intervalIdRef.current = setInterval(() => {
      if (!stopPendingRef.current) {
        setActiveLetters((currentActiveLetters) => {
          const newLetterWrapper = {
            id: getNextId(),
            letter: getRandomLetter(),
          };
          onAddLetterRef.current?.(newLetterWrapper);
          return [...currentActiveLetters, newLetterWrapper];
        });
      }
    }, settings.newLetterRate);
  }, [settings]);

  const stop = useCallback(() => {
    if (intervalIdRef.current) {
      stopPendingRef.current = true;
    }
  }, []);

  return {
    activeLetters,
    onLetterRemoved,
    startActiveLetters: start,
    stopActiveLetters: stop,
  };
};
