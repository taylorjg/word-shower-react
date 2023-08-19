import PropTypes from "prop-types";

import { StyledShower } from "./Shower.styles";

export const Shower = ({ activeLetters }) => {
  const activeLettersString = activeLetters.join("");
  return <StyledShower>{activeLettersString}</StyledShower>;
};

Shower.propTypes = {
  activeLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
};
