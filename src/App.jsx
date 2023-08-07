import { useCallback, useRef, useState } from "react";
import ReactSlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import { useSpeechRecognition } from "@app/hooks/use-speech-recognition";

import {
  Buttons,
  FoundWords,
  Header,
  InstructionsPane,
  Listening,
  Score,
  SettingsPane,
  Shower,
} from "@app/components";

import { getScrabbleScore } from "@app/helpers/scrabble";

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  const [running, setRunning] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [isInstructionsPaneOpen, setIsInstructionsPaneOpen] = useState(false);
  const [isSettingsPaneOpen, setIsSettingsPaneOpen] = useState(false);
  const lastWordAddedRef = useRef();

  const onWord = useCallback((word) => {
    const lastWordAdded = lastWordAddedRef.current;
    console.log("[onWord]", { word, lastWordAdded });
    if (word.length >= 4 && word !== lastWordAdded) {
      setFoundWords((currentFoundWords) => [word, ...currentFoundWords]);
      lastWordAddedRef.current = word;
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
  };

  const reset = () => {
    setFoundWords([]);
    lastWordAddedRef.current = undefined;
    setScore(0);
  };

  const openInstructionsPane = () => {
    setIsInstructionsPaneOpen(true);
  };

  const closeInstructionsPane = () => {
    setIsInstructionsPaneOpen(false);
  };

  const openSettingsPane = () => {
    setIsSettingsPaneOpen(true);
  };

  const closeSettingsPane = () => {
    setIsSettingsPaneOpen(false);
  };

  return (
    <StyledApp>
      <StyledGrid>
        <Header
          message={running ? <Listening /> : null}
          onOpenInstructionsPane={openInstructionsPane}
          onOpenSettingsPane={openSettingsPane}
        />
        <Shower />
        <FoundWords foundWords={foundWords} />
        <Score score={score} />
        <Buttons running={running} onStart={onStart} onStop={onStop} />
      </StyledGrid>

      <ReactSlidingPane
        isOpen={isInstructionsPaneOpen}
        onRequestClose={closeInstructionsPane}
        from="left"
        width="100%"
        hideHeader={true}
      >
        <InstructionsPane onClose={closeInstructionsPane} />
      </ReactSlidingPane>

      <ReactSlidingPane
        isOpen={isSettingsPaneOpen}
        onRequestClose={closeSettingsPane}
        from="left"
        width="100%"
        hideHeader={true}
      >
        <SettingsPane onClose={closeSettingsPane} />
      </ReactSlidingPane>
    </StyledApp>
  );
};
