import { useCallback, useRef, useState } from "react";
import log from "loglevel";

import { getRandomLetter } from "@app/helpers/scrabble";

const SPEECH_RECOGNITION_DELAY = 2000;

export const useActiveLetters = (settings, onAddLetter) => {
  const [activeLetters, setActiveLetters] = useState([]);
  const stopPendingRef = useRef(false);
  const pausedRef = useRef(false);
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
    pausedRef.current = false;
  };

  const onLetterRemoved = useCallback((id) => {
    const removeLetter = (id) => {
      log.debug("[onLetterRemoved]", { id });
      setActiveLetters((currentActiveLetters) => {
        const ids = currentActiveLetters.map(({ id }) => id).join(",");
        log.debug("[onLetterRemoved]", { ids });
        return currentActiveLetters.filter((item) => item.id !== id);
      });
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

  const intervalCallback = useCallback(() => {
    if (!stopPendingRef.current && !pausedRef.current) {
      setActiveLetters((currentActiveLetters) => {
        const newLetterWrapper = {
          id: getNextId(),
          letter: getRandomLetter(),
        };
        onAddLetterRef.current?.(newLetterWrapper);
        return [...currentActiveLetters, newLetterWrapper];
      });
    }
  }, []);

  const intervalCallbackRef = useRef();
  intervalCallbackRef.current = intervalCallback;

  const start = useCallback(() => {
    reset();
    intervalIdRef.current = setInterval(() => {
      intervalCallbackRef.current();
    }, settings.newLetterRate);
  }, [settings]);

  const stop = useCallback(() => {
    if (intervalIdRef.current) {
      stopPendingRef.current = true;
    }
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  return {
    activeLetters,
    onLetterRemoved,
    startActiveLetters: start,
    stopActiveLetters: stop,
    pauseActiveLetters: pause,
    resumeActiveLetters: resume,
  };
};
