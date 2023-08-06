import { useState } from "react";
import PropTypes from "prop-types";

import { StyledButtons } from "./Buttons.styles";

export const Buttons = ({ onStart, onStop }) => {
  const [running, setRunning] = useState(false);

  const onStartClick = () => {
    setRunning(true);
    onStart();
  };

  const onStopClick = () => {
    setRunning(false);
    onStop();
  };

  return (
    <StyledButtons>
      {running ? (
        <button onClick={onStopClick}>Stop</button>
      ) : (
        <button onClick={onStartClick}>Start</button>
      )}
    </StyledButtons>
  );
};

Buttons.propTypes = {
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};
