import { useCallback, useState } from "react";
import { Buttons, FoundWords, Header, Score, Shower } from "@app/components";

import { useSpeechRecognition } from "@app/hooks/use-speech-recognition";

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  const [lastWord, setLastWord] = useState();

  const onWord = useCallback((word) => {
    console.log("[onWord]", word);
    setLastWord(word);
  }, []);

  const { start: startSpeechRecognition, stop: stopSpeechRecognition } =
    useSpeechRecognition(onWord);

  const onStart = () => {
    startSpeechRecognition();
  };

  const onStop = () => {
    stopSpeechRecognition();
    setLastWord();
  };

  return (
    <StyledApp>
      <StyledGrid>
        <Header word={lastWord} />
        <Shower />
        <FoundWords />
        <Score />
        <Buttons onStart={onStart} onStop={onStop} />
      </StyledGrid>
    </StyledApp>
  );
};
