import { useCallback, useState } from "react";
import { Buttons, FoundWords, Header, Score, Shower } from "@app/components";

import { useSpeechRecognition } from "@app/hooks/use-speech-recognition";

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  const [running, setRunning] = useState(false);
  const [lastWordAdded, setLastWordAdded] = useState();

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
        <Header word={lastWordAdded} />
        <Shower />
        <FoundWords />
        <Score />
        <Buttons running={running} onStart={onStart} onStop={onStop} />
      </StyledGrid>
    </StyledApp>
  );
};
