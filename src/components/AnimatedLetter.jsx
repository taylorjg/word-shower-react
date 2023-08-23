import { memo } from "react";
import PropTypes from "prop-types";

import { Letter } from "./Letter";
import { StyledAnimatedLetter } from "./AnimatedLetter.styles";
import { getLetterSize } from "./Letter.styles";

const size = "large";
const letterSize = getLetterSize(size);

const AnimatedLetter = ({ letter }) => {
  const left = `calc((100% - ${letterSize}) * ${Math.random()})`;
  const letterFallSpeed = 4000;

  return (
    <StyledAnimatedLetter $left={left} $letterFallSpeed={letterFallSpeed}>
      <Letter letter={letter} size={size} />
    </StyledAnimatedLetter>
  );
};

AnimatedLetter.propTypes = {
  letter: PropTypes.string.isRequired,
};

export const MemoizedAnimatedLetter = memo(AnimatedLetter);
