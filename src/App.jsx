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

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  const [running, setRunning] = useState(false);
  const [lastWordAdded, setLastWordAdded] = useState();

  console.log("lastWordAdded:", lastWordAdded);

  const onWord = useCallback((word) => {
    console.log("[onWord]", word);
    setLastWordAdded(word);
  }, []);

  const { start: startSpeechRecognition, stop: stopSpeechRecognition } =
    useSpeechRecognition(onWord);

  const onStart = () => {
    setRunning(true);
    startSpeechRecognition();
  };

  const onStop = () => {
    setRunning(false);
    stopSpeechRecognition();
    setLastWordAdded();
  };

  return (
    <StyledApp>
      <StyledGrid>
        <Header message={running ? <Listening /> : null} />
        <Shower />
        <FoundWords />
        <Score />
        <Buttons running={running} onStart={onStart} onStop={onStop} />
      </StyledGrid>
    </StyledApp>
  );
};
