import PropTypes from "prop-types";

import { StyledFoundWords, StyledFoundWord } from "./FoundWords.styles";

export const FoundWords = ({ foundWords }) => {
  return (
    <StyledFoundWords>
      {foundWords.map((foundWord, index) => (
        <StyledFoundWord key={index}>{foundWord}</StyledFoundWord>
      ))}
    </StyledFoundWords>
  );
};

FoundWords.propTypes = {
  foundWords: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
