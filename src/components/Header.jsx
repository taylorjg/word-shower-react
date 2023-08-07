import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faGear } from "@fortawesome/free-solid-svg-icons";

import { StyledHeader, StyledIcon, StyledMessage } from "./Header.styles";

export const Header = ({
  message,
  onOpenInstructionsPane,
  onOpenSettingsPane,
}) => {
  return (
    <StyledHeader>
      <StyledIcon>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          onClick={onOpenInstructionsPane}
        />
      </StyledIcon>
      <StyledMessage>{message}</StyledMessage>
      <StyledIcon>
        <FontAwesomeIcon icon={faGear} onClick={onOpenSettingsPane} />
      </StyledIcon>
    </StyledHeader>
  );
};

Header.propTypes = {
  message: PropTypes.node,
  onOpenInstructionsPane: PropTypes.func.isRequired,
  onOpenSettingsPane: PropTypes.func.isRequired,
};
