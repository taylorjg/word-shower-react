import { useCallback, useRef } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = (onWord) => {
  const recognitionRef = useRef();
  const runningRef = useRef(false);

  const start = useCallback(() => {
    const onStart = (event) => {
      console.log("[onStart]", event);
    };

    const onEnd = (event) => {
      console.log("[onEnd]", event);
      if (recognitionRef.current && runningRef.current) {
        recognitionRef.current.start();
      }
    };

    const onResult = (event) => {
      console.log("[onResult]", event);
      const result = event.results[event.resultIndex][0];
      const words = result.transcript
        .trim()
        .split(/\s/)
        .map((s) => s.trim())
        .map((s) => s.toLowerCase());
      const word = words[0];
      onWord(word);
    };

    const onNoMatch = (event) => {
      console.log("[onNoMatch]", event);
    };

    const onError = (event) => {
      console.log("[onError]", event);
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
  }, [onWord]);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return {
    start,
    stop,
  };
};
