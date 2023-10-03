import PropTypes from "prop-types";

import { StyledScores, StyledScore } from "./Score.styles";

export const Score = ({ score, foundWords }) => {
  return (
    <StyledScores>
      <StyledScore>Score:&nbsp;{score}</StyledScore>
      <StyledScore>Words:&nbsp;{foundWords.length}</StyledScore>
    </StyledScores>
  );
};

Score.propTypes = {
  score: PropTypes.number.isRequired,
  foundWords: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
