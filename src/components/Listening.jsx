import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import { SpeechRecognitionStatus } from "@app/hooks/use-speech-recognition";
import { getScrabbleScore } from "@app/helpers/scrabble";

import {
  StyledListening,
  StyledUpper,
  StyledLower,
  StyledDot,
  StyledStatusError,
  StyledInterimWord,
} from "./Listening.styles";

const STATUS_LABELS = {
  [SpeechRecognitionStatus.Starting]: "Starting...",
  [SpeechRecognitionStatus.Listening]: "Listening...",
  [SpeechRecognitionStatus.Reconnecting]: "Reconnecting...",
  [SpeechRecognitionStatus.Idle]: "Waiting for mic...",
};

export const Listening = ({
  status,
  errorMessage,
  word,
  isWordValid,
  isInterim,
}) => {
  const wordScore =
    word && isWordValid && !isInterim ? `(+${getScrabbleScore(word)})` : "";
  const statusLabel =
    STATUS_LABELS[status] ?? STATUS_LABELS[SpeechRecognitionStatus.Idle];

  return (
    <StyledListening>
      <StyledUpper>
        {errorMessage ? (
          <StyledStatusError>{errorMessage}</StyledStatusError>
        ) : (
          <>
            <span>{statusLabel}</span>
            <StyledDot $status={status} />
          </>
        )}
      </StyledUpper>
      <StyledLower>
        {word ? (
          isInterim ? (
            <StyledInterimWord>
              <FontAwesomeIcon icon={faComment} />
              &nbsp;&quot;{word}&quot;…
            </StyledInterimWord>
          ) : (
            <>
              <FontAwesomeIcon icon={faComment} />
              &nbsp;&quot;{word}&quot;&nbsp;
              {wordScore && <>{wordScore}&nbsp;</>}
              <FontAwesomeIcon
                icon={isWordValid ? faCheck : faXmark}
                color={isWordValid ? "green" : "red"}
              />
            </>
          )
        ) : (
          <>&nbsp;</>
        )}
      </StyledLower>
    </StyledListening>
  );
};

Listening.propTypes = {
  status: PropTypes.oneOf(Object.values(SpeechRecognitionStatus)).isRequired,
  errorMessage: PropTypes.string,
  word: PropTypes.string,
  isWordValid: PropTypes.bool,
  isInterim: PropTypes.bool,
};
