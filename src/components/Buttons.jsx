import PropTypes from "prop-types";

import { GameState } from "@app/constants";

import {
  StyledButtons,
  StyledSpeechRecognitionError,
  StyledStopping,
} from "./Buttons.styles";

export const Buttons = ({
  gameState,
  onStart,
  onStop,
  startDisabled,
  speechRecognitionError,
}) => {
  return (
    <StyledButtons>
      {(gameState === GameState.Running || gameState === GameState.Paused) && (
        <button onClick={onStop}>Stop</button>
      )}
      {gameState === GameState.Stopped && (
        <button onClick={onStart} disabled={startDisabled}>
          Start
        </button>
      )}
      {gameState === GameState.Stopping && (
        <StyledStopping>Stopping...</StyledStopping>
      )}
      {speechRecognitionError && (
        <StyledSpeechRecognitionError>
          {speechRecognitionError}
        </StyledSpeechRecognitionError>
      )}
    </StyledButtons>
  );
};

Buttons.propTypes = {
  gameState: PropTypes.oneOf(Object.keys(GameState)).isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  startDisabled: PropTypes.bool,
  speechRecognitionError: PropTypes.string,
};
