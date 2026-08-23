import PropTypes from "prop-types";

import { getScrabbleScore } from "@app/helpers/scrabble";

import { Letter } from "./Letter";

import {
  StyledFoundWords,
  StyledFoundWord,
  StyledFoundWordLetters,
  StyledFoundWordScore,
} from "./FoundWords.styles";

export const FoundWords = ({ foundWords }) => {
  return (
    <StyledFoundWords>
      {foundWords.map((foundWord, foundWordIndex) => {
        const letters = Array.from(foundWord);
        const wordScore = getScrabbleScore(foundWord);
        return (
          <StyledFoundWord key={foundWordIndex}>
            <StyledFoundWordLetters>
              {letters.map((letter, letterIndex) => (
                <Letter key={letterIndex} letter={letter} size="small" />
              ))}
            </StyledFoundWordLetters>
            <StyledFoundWordScore aria-label={`Score: ${wordScore}`}>
              +{wordScore}
            </StyledFoundWordScore>
          </StyledFoundWord>
        );
      })}
    </StyledFoundWords>
  );
};

FoundWords.propTypes = {
  foundWords: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
