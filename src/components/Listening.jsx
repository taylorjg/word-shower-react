import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import {
  StyledListening,
  StyledUpper,
  StyledLower,
  StyledDot,
} from "./Listening.styles";

export const Listening = ({ word, isWordValid }) => {
  return (
    <StyledListening>
      <StyledUpper>
        <span>Listening...</span>
        <StyledDot />
      </StyledUpper>
      <StyledLower>
        {word ? (
          <>
            &quot;{word}&quot;&nbsp;
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
