import { useCallback, useState } from "react";
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
  const [lastWordAdded, setLastWordAdded] = useState();
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [isInstructionsPaneOpen, setIsInstructionsPaneOpen] = useState(false);
  const [isSettingsPaneOpen, setIsSettingsPaneOpen] = useState(false);

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
