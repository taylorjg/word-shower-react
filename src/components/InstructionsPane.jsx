import PropTypes from "prop-types";
import packageJson from "../../package.json";

import { Pane } from "./Pane";
import {
  StyledVersion,
  StyledList,
  StyledListItem,
} from "./InstructionsPane.styles";

export const InstructionsPane = ({ onClose }) => {
  return (
    <Pane title="Instructions" onClose={onClose}>
      <StyledList>
        <StyledListItem>
          Click the Start button to make letters fall down the screen and enable
          speech recognition
        </StyledListItem>
        <StyledListItem>
          When you spot a word with at least 4 letters, shout it out
        </StyledListItem>
        <StyledListItem>
          If the word is recognised and the letters in the word are still
          active, then the word will be added to the list of found words
        </StyledListItem>
        <StyledListItem>
          Letters are still active when they are visible on the screen and for a
          short time afterwards to account for delays associated with the speech
          recognition
        </StyledListItem>
        <StyledListItem>
          Each found word will increase your score by the Scrabble value of the
          word
        </StyledListItem>
        <StyledListItem>
          Click the Stop button when you have had enough
        </StyledListItem>
      </StyledList>
      <StyledVersion>version: {packageJson.version}</StyledVersion>
    </Pane>
  );
};

InstructionsPane.propTypes = {
  onClose: PropTypes.func.isRequired,
};
