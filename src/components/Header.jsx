import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faGear } from "@fortawesome/free-solid-svg-icons";

import { StyledHeader } from "./Header.styles";

export const Header = () => {
  return (
    <StyledHeader>
      <FontAwesomeIcon icon={faCircleQuestion} />
      <FontAwesomeIcon icon={faGear} />
    </StyledHeader>
  );
};
