import { memo, useRef } from "react";
import PropTypes from "prop-types";

import { Letter } from "./Letter";
import { StyledAnimatedLetter } from "./AnimatedLetter.styles";
import { getLetterSize } from "./Letter.styles";

const size = "large";
const letterSize = getLetterSize(size);

const AnimatedLetter = ({ letter, letterFallSpeed }) => {
  const leftRef = useRef(`calc((100% - ${letterSize}) * ${Math.random()})`);

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
  letterFallSpeed: PropTypes.number.isRequired,
};

export const MemoizedAnimatedLetter = memo(AnimatedLetter);
