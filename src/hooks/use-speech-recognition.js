import { useCallback, useRef } from "react";
import log from "loglevel";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = (onWord) => {
  const recognitionRef = useRef();
  const runningRef = useRef(false);
  const onWordRef = useRef();

  const start = useCallback(() => {
    const onStart = (event) => {
      log.debug("[onStart]", event);
    };

    const onEnd = (event) => {
      log.debug("[onEnd]", event);
      if (recognitionRef.current && runningRef.current) {
        recognitionRef.current.start();
      }
    };

    const onResult = (event) => {
      log.debug("[onResult]", event);
      const result = event.results[event.resultIndex][0];
      const words = result.transcript
        .trim()
        .split(/\s/)
        .map((s) => s.trim())
        .map((s) => s.toLowerCase());
      const word = words[0];
      if (word && onWordRef.current) {
        onWordRef.current(word);
      }
    };

    const onNoMatch = (event) => {
      log.debug("[onNoMatch]", event);
    };

    const onError = (event) => {
      log.error("[onError]", event);
    };

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-GB";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = onStart;
      recognition.onend = onEnd;
      recognition.onresult = onResult;
      recognition.onnomatch = onNoMatch;
      recognition.onerror = onError;

      recognitionRef.current = recognition;
    }

    runningRef.current = true;
    recognitionRef.current.start();
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  if (runningRef.current && recognitionRef.current) {
    onWordRef.current = onWord;
  }

  return {
    start,
    stop,
  };
};
