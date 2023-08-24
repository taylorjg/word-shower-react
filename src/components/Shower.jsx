import PropTypes from "prop-types";

import { MemoizedAnimatedLetter } from "./AnimatedLetter";
import { StyledShower } from "./Shower.styles";

export const Shower = ({ letterWrappers, letterFallSpeed }) => {
  return (
    <StyledShower>
      {letterWrappers.map(({ id, letter }) => {
        return (
          <MemoizedAnimatedLetter
            key={id}
            letter={letter}
            letterFallSpeed={letterFallSpeed}
          />
        );
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
  letterFallSpeed: PropTypes.number.isRequired,
};
