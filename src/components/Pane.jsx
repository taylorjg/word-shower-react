import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import {
  StyledPane,
  StyledPaneHead,
  StyledPaneBody,
  StyledCloseIcon,
} from "./Pane.styles";

export const Pane = ({ title, onClose, children }) => {
  return (
    <StyledPane>
      <StyledPaneHead>
        <span>{title}</span>
        <StyledCloseIcon>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={onClose} />
        </StyledCloseIcon>
      </StyledPaneHead>
      <StyledPaneBody>{children}</StyledPaneBody>
    </StyledPane>
  );
};

Pane.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
