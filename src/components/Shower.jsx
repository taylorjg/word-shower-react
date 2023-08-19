import PropTypes from "prop-types";

import { StyledShower } from "./Shower.styles";

export const Shower = ({ activeLetters }) => {
  return <StyledShower>{activeLetters}</StyledShower>;
};

Shower.propTypes = {
  activeLetters: PropTypes.string.isRequired,
};
