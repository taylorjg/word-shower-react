import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import { getScrabbleScore } from "@app/helpers/scrabble";

import {
  StyledListening,
  StyledUpper,
  StyledLower,
  StyledDot,
} from "./Listening.styles";

export const Listening = ({ word, isWordValid }) => {
  const wordScore = word && isWordValid ? `(+${getScrabbleScore(word)})` : "";

  return (
    <StyledListening>
      <StyledUpper>
        <span>Listening...</span>
        <StyledDot />
      </StyledUpper>
      <StyledLower>
        {word ? (
          <>
            <FontAwesomeIcon icon={faComment} />
            &nbsp;&quot;{word}&quot;&nbsp;
            {wordScore && <>{wordScore}&nbsp;</>}
            <FontAwesomeIcon
              icon={isWordValid ? faCheck : faXmark}
              color={isWordValid ? "green" : "red"}
            />
          </>
        ) : (
          <>&nbsp;</>
        )}
      </StyledLower>
    </StyledListening>
  );
};

Listening.propTypes = {
  word: PropTypes.string,
  isWordValid: PropTypes.bool,
};
