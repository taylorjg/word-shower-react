import { useCallback, useState } from "react";

import { useSpeechRecognition } from "@app/hooks/use-speech-recognition";

import {
  Buttons,
  FoundWords,
  Header,
  Listening,
  Score,
  Shower,
} from "@app/components";

import { getScrabbleScore } from "@app/helpers/scrabble";

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  const [running, setRunning] = useState(false);
  const [lastWordAdded, setLastWordAdded] = useState();
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);

  console.log("lastWordAdded:", lastWordAdded);

  const onWord = useCallback((word) => {
    console.log("[onWord]", word);
    if (word.length >= 4) {
      setFoundWords((currentFoundWords) => [...currentFoundWords, word]);
      setLastWordAdded(word);
      const wordScore = getScrabbleScore(word);
      setScore((currentScore) => currentScore + wordScore);
    }
  }, []);

  const { start: startSpeechRecognition, stop: stopSpeechRecognition } =
    useSpeechRecognition(onWord);

  const onStart = () => {
    reset();
    setRunning(true);
    startSpeechRecognition();
  };

  const onStop = () => {
    setRunning(false);
    stopSpeechRecognition();
    setLastWordAdded();
  };

  const reset = () => {
    setFoundWords([]);
    setLastWordAdded();
    setScore(0);
  };

  return (
    <StyledApp>
      <StyledGrid>
        <Header message={running ? <Listening /> : null} />
        <Shower />
        <FoundWords foundWords={foundWords} />
        <Score score={score} />
        <Buttons running={running} onStart={onStart} onStop={onStop} />
      </StyledGrid>
    </StyledApp>
  );
};
