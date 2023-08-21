import { useCallback, useRef, useState } from "react";
import ReactSlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import { useActiveLetters } from "@app/hooks/use-active-letters";
import { useSpeechRecognition } from "@app/hooks/use-speech-recognition";

import { checkWord } from "@app/utils/check-word";

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
  const [strictMode] = useState(false);
  const { activeLetters, startActiveLetters, stopActiveLetters } =
    useActiveLetters();

  const onWord = useCallback(
    (word) => {
      const lastWordAdded = lastWordAddedRef.current;
      console.log("[onWord]", {
        word,
        lastWordAdded,
        activeLetters: activeLetters.map(({ letter }) => letter).join(""),
      });
      if (word.length >= 4 && word !== lastWordAdded) {
        if (checkWord(word, activeLetters, strictMode)) {
          setFoundWords((currentFoundWords) => [word, ...currentFoundWords]);
          lastWordAddedRef.current = word;
          const wordScore = getScrabbleScore(word);
          setScore((currentScore) => currentScore + wordScore);
        }
      }
    },
    [activeLetters, strictMode]
  );

  const { start: startSpeechRecognition, stop: stopSpeechRecognition } =
    useSpeechRecognition(onWord);

  const onStart = () => {
    reset();
    setRunning(true);
    startSpeechRecognition();
    startActiveLetters();
  };

  const onStop = () => {
    setRunning(false);
    stopSpeechRecognition();
    stopActiveLetters();
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
        <Shower letterWrappers={activeLetters} />
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
