import PropTypes from "prop-types";

import { AnimatedLetter } from "./AnimatedLetter";
import { StyledShower } from "./Shower.styles";

export const Shower = ({ letterWrappers }) => {
  return (
    <StyledShower>
      {letterWrappers.map(({ id, letter }) => {
        return <AnimatedLetter key={id} letter={letter} />;
      })}
    </StyledShower>
  );
};

Shower.propTypes = {
  letterWrappers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      letter: PropTypes.string.isRequired,
    })
  ).isRequired,
};
