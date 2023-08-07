import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import packageJson from "../../package.json";

import {
  StyledInstructionsPane,
  StyledPaneHead,
  StyledPaneBody,
  StyledCloseIcon,
  StyledVersion,
} from "./InstructionsPane.styles";

export const InstructionsPane = ({ onClose }) => {
  return (
    <StyledInstructionsPane>
      <StyledPaneHead>
        <span>Instructions</span>
        <StyledCloseIcon>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={onClose} />
        </StyledCloseIcon>
      </StyledPaneHead>
      <StyledPaneBody>
        <div>TODO</div>
        <StyledVersion>version: {packageJson.version}</StyledVersion>
      </StyledPaneBody>
    </StyledInstructionsPane>
  );
};

InstructionsPane.propTypes = {
  onClose: PropTypes.func.isRequired,
};
