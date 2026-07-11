import { useCallback, useEffect, useRef, useState } from "react";
import log from "loglevel";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const isSpeechRecognitionSupported = Boolean(SpeechRecognition);

export const SpeechRecognitionStatus = Object.freeze({
  Idle: "idle",
  Starting: "starting",
  Listening: "listening",
  Reconnecting: "reconnecting",
});

const FATAL_ERRORS = new Set([
  "not-allowed",
  "audio-capture",
  "service-not-allowed",
]);

export const SPEECH_RECOGNITION_ERROR_MESSAGES = {
  unsupported:
    "Speech recognition is not supported in this browser. Try Chrome or Edge.",
  "not-allowed":
    "Microphone access was denied. Allow microphone access and try again.",
  "audio-capture":
    "No microphone was found. Connect a microphone and try again.",
  "service-not-allowed":
    "Speech recognition is not allowed in this context. Use HTTPS or localhost.",
  "start-failed": "Could not start speech recognition. Try again.",
};

export const getSpeechRecognitionErrorMessage = (error) =>
  SPEECH_RECOGNITION_ERROR_MESSAGES[error] ??
  "Speech recognition failed. Try again.";

const MAX_SPEECH_ALTERNATIVES = 5;

const normalizeSpokenWord = (transcript) => {
  const [firstToken] = transcript.trim().toLowerCase().split(/\s+/);
  if (!firstToken) {
    return "";
  }
  return firstToken.replace(/[^a-z]/g, "");
};

const getWordCandidatesFromResult = (result) => {
  const candidates = [];
  const seen = new Set();

  for (let i = 0; i < result.length; i++) {
    const word = normalizeSpokenWord(result[i].transcript);
    if (word && !seen.has(word)) {
      seen.add(word);
      candidates.push(word);
    }
  }

  return candidates;
};

export const useSpeechRecognition = (onWord) => {
  const recognitionRef = useRef();
  const runningRef = useRef(false);
  const onWordRef = useRef();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(SpeechRecognitionStatus.Idle);
  const [isActive, setIsActive] = useState(false);

  const beginRecognition = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }

    setStatus(SpeechRecognitionStatus.Starting);
    try {
      recognitionRef.current.start();
    } catch (err) {
      log.error("[start]", err);
      runningRef.current = false;
      setIsActive(false);
      setStatus(SpeechRecognitionStatus.Idle);
      setError("start-failed");
    }
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    setIsActive(false);
    setStatus(SpeechRecognitionStatus.Idle);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const start = useCallback(() => {
    if (!SpeechRecognition) {
      setError("unsupported");
      return;
    }

    setError(null);
    runningRef.current = true;
    setIsActive(true);
    beginRecognition();
  }, [beginRecognition]);

  useEffect(() => {
    onWordRef.current = onWord;
  }, [onWord]);

  useEffect(() => {
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-GB";
    recognition.interimResults = false;
    recognition.maxAlternatives = MAX_SPEECH_ALTERNATIVES;

    recognition.onstart = (event) => {
      log.debug("[onStart]", event);
      setStatus(SpeechRecognitionStatus.Listening);
    };

    recognition.onend = (event) => {
      log.debug("[onEnd]", event);
      if (runningRef.current && recognitionRef.current) {
        setStatus(SpeechRecognitionStatus.Reconnecting);
        beginRecognition();
      } else {
        setStatus(SpeechRecognitionStatus.Idle);
      }
    };

    recognition.onresult = (event) => {
      log.debug("[onResult]", event);
      const result = event.results[event.resultIndex];
      const candidates = getWordCandidatesFromResult(result);
      if (candidates.length > 0 && onWordRef.current) {
        onWordRef.current(candidates);
      }
    };

    recognition.onnomatch = (event) => {
      log.debug("[onNoMatch]", event);
    };

    recognition.onerror = (event) => {
      log.error("[onError]", event);
      if (FATAL_ERRORS.has(event.error)) {
        runningRef.current = false;
        setIsActive(false);
        setStatus(SpeechRecognitionStatus.Idle);
        setError(event.error);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      runningRef.current = false;
      recognition.stop();
      recognitionRef.current = undefined;
    };
  }, [beginRecognition]);

  useEffect(() => () => stop(), [stop]);

  const isListening = status === SpeechRecognitionStatus.Listening;

  return {
    start,
    stop,
    isSupported: isSpeechRecognitionSupported,
    error,
    errorMessage: error ? getSpeechRecognitionErrorMessage(error) : null,
    status,
    isListening,
    isStarting: status === SpeechRecognitionStatus.Starting,
    isReconnecting: status === SpeechRecognitionStatus.Reconnecting,
    isActive,
  };
};
