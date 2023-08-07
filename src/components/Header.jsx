import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faGear } from "@fortawesome/free-solid-svg-icons";

import { StyledHeader, StyledIcon, StyledMessage } from "./Header.styles";

export const Header = ({ message }) => {
  return (
    <StyledHeader>
      <StyledIcon>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </StyledIcon>
      <StyledMessage>{message}</StyledMessage>
      <StyledIcon>
        <FontAwesomeIcon icon={faGear} />
      </StyledIcon>
    </StyledHeader>
  );
};

Header.propTypes = {
  message: PropTypes.string,
};
