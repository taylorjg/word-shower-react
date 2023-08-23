import { useRef } from "react";
import PropTypes from "prop-types";

import { Letter } from "./Letter";
import { StyledAnimatedLetter } from "./AnimatedLetter.styles";
import { getLetterSize } from "./Letter.styles";

export const AnimatedLetter = ({ letter }) => {
  const size = "large";
  const letterSize = getLetterSize("large");
  const leftRef = useRef(`calc((100% - ${letterSize}) * ${Math.random()})`);
  const letterFallSpeed = 4000;

  return (
    <StyledAnimatedLetter
      $left={leftRef.current}
      $letterFallSpeed={letterFallSpeed}
    >
      <Letter letter={letter} size={size} />
    </StyledAnimatedLetter>
  );
};

AnimatedLetter.propTypes = {
  letter: PropTypes.string.isRequired,
};
