import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import ReactSlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import { useActiveLetters } from "@app/hooks/use-active-letters";
import { useAnalytics } from "@app/hooks/use-analytics";
import { useConfetti, ConfettiType } from "@app/hooks/use-confetti";
import { useSpeechRecognition } from "@app/hooks/use-speech-recognition";

import { checkWord } from "@app/helpers/check-word";
import { getScrabbleScore, lookupLetterValue } from "@app/helpers/scrabble";

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

import { initGame, makeGameActions } from "@app/phaser";

import { GameState, DEFAULT_SETTINGS } from "@app/constants";

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  const [gameState, setGameState] = useState(GameState.Stopped);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [isInstructionsPaneOpen, setIsInstructionsPaneOpen] = useState(false);
  const [isSettingsPaneOpen, setIsSettingsPaneOpen] = useState(false);
  const lastCandidateWordRef = useRef();
  const lastWordAddedRef = useRef();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const startTimeRef = useRef();
  const gameActionsRef = useRef();
  const { playConfetti } = useConfetti();

  const onAddLetter = useCallback((letterWrapper) => {
    const { id, letter } = letterWrapper;
    const value = lookupLetterValue(letter);
    gameActionsRef.current?.addLetter(id, letter, value);
  }, []);

  const {
    activeLetters,
    onLetterRemoved,
    startActiveLetters,
    stopActiveLetters,
  } = useActiveLetters(settings, onAddLetter);

  const isSmallDevice = useMediaQuery("only screen and (max-width: 600px)");

  const onWord = useCallback(
    (word) => {
      const lastWordAdded = lastWordAddedRef.current;
      // console.log("[onWord]", {
      //   word,
      //   lastWordAdded,
      //   activeLetters: activeLetters.map(({ letter }) => letter).join(""),
      // });
      if (word.length >= 4 && word !== lastWordAdded) {
        lastCandidateWordRef.current = word;
        if (checkWord(word, activeLetters, settings.strictMode)) {
          setFoundWords((currentFoundWords) => [word, ...currentFoundWords]);
          lastWordAddedRef.current = word;
          const wordScore = getScrabbleScore(word);
          setScore((currentScore) => currentScore + wordScore);
          if (settings.enableConfetti) {
            const confettiType =
              wordScore >= 10 ? ConfettiType.Stars : ConfettiType.Confetti;
            setTimeout(playConfetti, 250, confettiType);
          }
        }
      }
    },
    [activeLetters, settings, playConfetti]
  );

  const { start: startSpeechRecognition, stop: stopSpeechRecognition } =
    useSpeechRecognition(onWord);

  const { sendAnalyticsClickEvent } = useAnalytics();

  const onStart = () => {
    if (!gameActionsRef.current) {
      const game = initGame(settings.letterFallSpeed);
      gameActionsRef.current = makeGameActions(game, onLetterRemoved);
    }
    reset();
    gameActionsRef.current.start(settings.letterFallSpeed);
    setGameState(GameState.Running);
    startSpeechRecognition();
    startActiveLetters();
    startTimeRef.current = performance.now();
    sendAnalyticsClickEvent("start_game", {
      new_letter_rate: settings.newLetterRate,
      letter_fall_speed: settings.letterFallSpeed,
      strict_mode: settings.strictMode,
    });
  };

  const onStop = () => {
    gameActionsRef.current.setLetterFallSpeed(settings.letterFallSpeed / 2);
    setGameState(GameState.Stopping);
    stopSpeechRecognition();
    stopActiveLetters();
    const numWords = new Set(foundWords).size;
    const startTime = startTimeRef.current;
    const endTime = performance.now();
    const gameLength = Math.floor(endTime - startTime);
    sendAnalyticsClickEvent("stop_game", {
      score,
      num_words: numWords,
      game_length: gameLength,
    });
  };

  useEffect(() => {
    if (gameState === GameState.Stopping) {
      if (activeLetters.length === 0) {
        setGameState(GameState.Stopped);
      }
    }
  }, [gameState, activeLetters]);

  useEffect(() => {
    if (gameActionsRef.current) {
      gameActionsRef.current.setLetterFallSpeed(settings.letterFallSpeed);
    }
  }, [settings.letterFallSpeed]);

  const reset = () => {
    setFoundWords([]);
    lastWordAddedRef.current = undefined;
    lastCandidateWordRef.current = undefined;
    setScore(0);
  };

  const openInstructionsPane = () => {
    setIsInstructionsPaneOpen(true);
    sendAnalyticsClickEvent("open_pane", { pane: "instructions" });
  };

  const closeInstructionsPane = () => {
    setIsInstructionsPaneOpen(false);
    sendAnalyticsClickEvent("close_pane", { pane: "instructions" });
  };

  const openSettingsPane = () => {
    setIsSettingsPaneOpen(true);
    sendAnalyticsClickEvent("open_pane", { pane: "settings" });
  };

  const closeSettingsPane = () => {
    setIsSettingsPaneOpen(false);
    sendAnalyticsClickEvent("close_pane", { pane: "settings" });
  };

  const paneWidth = isSmallDevice ? "100%" : "480px";

  return (
    <StyledApp>
      <StyledGrid>
        <Header
          message={
            gameState === GameState.Running ? (
              <Listening
                word={lastCandidateWordRef.current}
                isWordValid={
                  lastCandidateWordRef.current === lastWordAddedRef.current
                }
              />
            ) : null
          }
          onOpenInstructionsPane={openInstructionsPane}
          onOpenSettingsPane={openSettingsPane}
        />
        <Shower />
        <FoundWords foundWords={foundWords} />
        <Score score={score} />
        <Buttons gameState={gameState} onStart={onStart} onStop={onStop} />
      </StyledGrid>

      <ReactSlidingPane
        isOpen={isInstructionsPaneOpen}
        onRequestClose={closeInstructionsPane}
        from="left"
        width={paneWidth}
        hideHeader={true}
      >
        <InstructionsPane onClose={closeInstructionsPane} />
      </ReactSlidingPane>

      <ReactSlidingPane
        isOpen={isSettingsPaneOpen}
        onRequestClose={closeSettingsPane}
        from="left"
        width={paneWidth}
        hideHeader={true}
      >
        <SettingsPane
          onClose={closeSettingsPane}
          settings={settings}
          onChangeSettings={setSettings}
        />
      </ReactSlidingPane>
    </StyledApp>
  );
};
