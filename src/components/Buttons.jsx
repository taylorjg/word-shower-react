import PropTypes from "prop-types";

import { GameState } from "@app/constants";

import { StyledButtons, StyledStopping } from "./Buttons.styles";

export const Buttons = ({ gameState, onStart, onStop }) => {
  return (
    <StyledButtons>
      {(gameState === GameState.Running || gameState === GameState.Paused) && (
        <button onClick={onStop}>Stop</button>
      )}
      {gameState === GameState.Stopped && (
        <button onClick={onStart}>Start</button>
      )}
      {gameState === GameState.Stopping && (
        <StyledStopping>Stopping...</StyledStopping>
      )}
    </StyledButtons>
  );
};

Buttons.propTypes = {
  gameState: PropTypes.oneOf(Object.keys(GameState)).isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};
