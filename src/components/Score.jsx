import PropTypes from "prop-types";

import { StyledScore } from "./Score.styles";

export const Score = ({ score }) => {
  return (
    <StyledScore>
      <div>Score:</div>
      <div>{score}</div>
    </StyledScore>
  );
};

Score.propTypes = {
  score: PropTypes.number.isRequired,
};
