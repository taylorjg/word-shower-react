import PropTypes from "prop-types";

import { StyledButtons } from "./Buttons.styles";

export const Buttons = ({ running, onStart, onStop }) => {
  return (
    <StyledButtons>
      {running ? (
        <button onClick={onStop}>Stop</button>
      ) : (
        <button onClick={onStart}>Start</button>
      )}
    </StyledButtons>
  );
};

Buttons.propTypes = {
  running: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};
