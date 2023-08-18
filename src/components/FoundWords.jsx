import PropTypes from "prop-types";

import { lookupLetterValue } from "@app/helpers/scrabble";

import { Letter } from "./Letter";

import { StyledFoundWords, StyledFoundWord } from "./FoundWords.styles";

export const FoundWords = ({ foundWords }) => {
  return (
    <StyledFoundWords>
      {foundWords.map((foundWord, foundWordIndex) => {
        const letters = Array.from(foundWord);
        return (
          <StyledFoundWord key={foundWordIndex}>
            {letters.map((letter, letterIndex) => {
              const value = lookupLetterValue(letter);
              return <Letter key={letterIndex} letter={letter} value={value} />;
            })}
          </StyledFoundWord>
        );
      })}
    </StyledFoundWords>
  );
};

FoundWords.propTypes = {
  foundWords: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
