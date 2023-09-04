import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faGear } from "@fortawesome/free-solid-svg-icons";

import {
  StyledHeader,
  StyledIconWrapper,
  StyledIcon,
  StyledMessage,
} from "./Header.styles";

export const Header = ({
  message,
  onOpenInstructionsPane,
  onOpenSettingsPane,
}) => {
  return (
    <StyledHeader>
      <StyledIconWrapper>
        <StyledIcon>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            onClick={onOpenInstructionsPane}
          />
        </StyledIcon>
      </StyledIconWrapper>
      <StyledMessage>{message}</StyledMessage>
      <StyledIconWrapper>
        <StyledIcon>
          <FontAwesomeIcon icon={faGear} onClick={onOpenSettingsPane} />
        </StyledIcon>
      </StyledIconWrapper>
    </StyledHeader>
  );
};

Header.propTypes = {
  message: PropTypes.node,
  onOpenInstructionsPane: PropTypes.func.isRequired,
  onOpenSettingsPane: PropTypes.func.isRequired,
};
