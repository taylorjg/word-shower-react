import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faGear } from "@fortawesome/free-solid-svg-icons";

import { StyledHeader, StyledIcon, StyledWord } from "./Header.styles";

export const Header = ({ word }) => {
  return (
    <StyledHeader>
      <StyledIcon>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </StyledIcon>
      <StyledWord>{word ? word : null}</StyledWord>
      <StyledIcon>
        <FontAwesomeIcon icon={faGear} />
      </StyledIcon>
    </StyledHeader>
  );
};

Header.propTypes = {
  word: PropTypes.string,
};
