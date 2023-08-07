import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import {
  StyledPane,
  StyledPaneHead,
  StyledPaneBody,
  StyledCloseIcon,
} from "./InstructionsPane.styles";

export const SettingsPane = ({ onClose }) => {
  return (
    <StyledPane>
      <StyledPaneHead>
        <span>Settings</span>
        <StyledCloseIcon>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={onClose} />
        </StyledCloseIcon>
      </StyledPaneHead>
      <StyledPaneBody>
        <div>TODO</div>
      </StyledPaneBody>
    </StyledPane>
  );
};

SettingsPane.propTypes = {
  onClose: PropTypes.func.isRequired,
};
