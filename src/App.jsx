import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ReactSlidingPane } from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import log from "loglevel";

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

import { initGame } from "@app/phaser";

import {
  GameState,
  DEFAULT_SETTINGS,
  STOPPING_FALL_SPEED_MULTIPLIER,
} from "@app/constants";

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  const [gameState, setGameState] = useState(GameState.Stopped);
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [isInstructionsPaneOpen, setIsInstructionsPaneOpen] = useState(false);
  const [isSettingsPaneOpen, setIsSettingsPaneOpen] = useState(false);
  const [listeningDisplay, setListeningDisplay] = useState(null);
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

  const onActiveLettersEmpty = useCallback(() => {
    setGameState((currentGameState) => {
      if (currentGameState === GameState.Stopping) {
        gameActionsRef.current?.stop();
        return GameState.Stopped;
      }
      return currentGameState;
    });
  }, []);

  const {
    activeLetters,
    onLetterRemoved,
    startActiveLetters,
    stopActiveLetters,
    pauseActiveLetters,
    resumeActiveLetters,
  } = useActiveLetters(settings, onAddLetter, onActiveLettersEmpty);

  const pauseGameIfRunning = useCallback(() => {
    setGameState((currentGameState) => {
      if (currentGameState === GameState.Running) {
        gameActionsRef.current?.pause();
        pauseActiveLetters();
        return GameState.Paused;
      }
      return currentGameState;
    });
  }, [pauseActiveLetters]);

  const resumeGameIfPaused = useCallback(() => {
    setGameState((currentGameState) => {
      if (currentGameState === GameState.Paused) {
        gameActionsRef.current?.resume(settings);
        resumeActiveLetters();
        return GameState.Running;
      }
      return currentGameState;
    });
  }, [resumeActiveLetters, settings]);

  const isSmallDevice = useMediaQuery("only screen and (max-width: 600px)");

  const onWord = useCallback(
    (word) => {
      const lastWordAdded = lastWordAddedRef.current;
      log.debug("[onWord]", {
        word,
        lastWordAdded,
        activeLetters: activeLetters.map(({ letter }) => letter).join(""),
      });
      if (word.length >= 4 && word !== lastWordAdded) {
        const isWordValid = checkWord(word, activeLetters, settings.strictMode);
        setListeningDisplay({ word, isWordValid });
        if (isWordValid) {
          setFoundWords((currentFoundWords) => [word, ...currentFoundWords]);
          lastWordAddedRef.current = word;
          const wordScore = getScrabbleScore(word);
          log.debug("[onWord]", { word, wordScore });
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

  const reset = useCallback(() => {
    setFoundWords([]);
    lastWordAddedRef.current = undefined;
    setListeningDisplay(null);
    setScore(0);
  }, []);

  const onStart = useCallback(() => {
    if (!gameActionsRef.current) {
      gameActionsRef.current = initGame(settings, onLetterRemoved);
    }
    reset();
    gameActionsRef.current.start(settings);
    setGameState(GameState.Running);
    startSpeechRecognition();
    startActiveLetters();
    startTimeRef.current = performance.now();
    sendAnalyticsClickEvent("start_game", {
      new_letter_rate: settings.newLetterRate,
      letter_fall_speed: settings.letterFallSpeed,
      strict_mode: settings.strictMode,
    });
  }, [
    onLetterRemoved,
    reset,
    sendAnalyticsClickEvent,
    settings,
    startActiveLetters,
    startSpeechRecognition,
  ]);

  const onStop = useCallback(() => {
    gameActionsRef.current.setLetterFallSpeed(
      settings.letterFallSpeed / STOPPING_FALL_SPEED_MULTIPLIER
    );
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
    if (activeLetters.length === 0) {
      gameActionsRef.current?.stop();
      setGameState(GameState.Stopped);
    } else {
      setGameState(GameState.Stopping);
    }
  }, [
    activeLetters.length,
    foundWords,
    score,
    sendAnalyticsClickEvent,
    settings.letterFallSpeed,
    stopActiveLetters,
    stopSpeechRecognition,
  ]);

  useEffect(() => {
    gameActionsRef.current?.setNewLetterRate(settings.newLetterRate);
  }, [settings.newLetterRate]);

  useEffect(() => {
    gameActionsRef.current?.setLetterFallSpeed(settings.letterFallSpeed);
  }, [settings.letterFallSpeed]);

  const openInstructionsPane = () => {
    pauseGameIfRunning();
    setIsInstructionsPaneOpen(true);
    sendAnalyticsClickEvent("open_pane", { pane: "instructions" });
  };

  const closeInstructionsPane = () => {
    setIsInstructionsPaneOpen(false);
    sendAnalyticsClickEvent("close_pane", { pane: "instructions" });
    if (!isSettingsPaneOpen) {
      resumeGameIfPaused();
    }
  };

  const openSettingsPane = () => {
    pauseGameIfRunning();
    setIsSettingsPaneOpen(true);
    sendAnalyticsClickEvent("open_pane", { pane: "settings" });
  };

  const closeSettingsPane = () => {
    setIsSettingsPaneOpen(false);
    sendAnalyticsClickEvent("close_pane", { pane: "settings" });
    if (!isInstructionsPaneOpen) {
      resumeGameIfPaused();
    }
  };

  const paneWidth = isSmallDevice ? "100%" : "480px";

  return (
    <StyledApp>
      <StyledGrid>
        <Header
          message={
            gameState === GameState.Running ? (
              <Listening
                word={listeningDisplay?.word}
                isWordValid={listeningDisplay?.isWordValid}
              />
            ) : null
          }
          onOpenInstructionsPane={openInstructionsPane}
          onOpenSettingsPane={openSettingsPane}
        />
        <Shower />
        <FoundWords foundWords={foundWords} />
        <Score score={score} foundWords={foundWords} />
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
