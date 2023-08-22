import { useRef } from "react";
import PropTypes from "prop-types";
import { useSpring } from "@react-spring/web";

import { Letter } from "./Letter";
import { StyledAnimatedLetter } from "./AnimatedLetter.styles";
import { getLetterSize } from "./Letter.styles";

export const AnimatedLetter = ({ letter }) => {
  const size = "large";
  const letterSize = getLetterSize("large");
  const leftRef = useRef(`calc((100% - ${letterSize}) * ${Math.random()})`);

  const springs = useSpring({
    from: { top: "0%" },
    to: { top: "100%" },
    config: { duration: 4000 },
  });

  return (
    <StyledAnimatedLetter style={{ left: leftRef.current, ...springs }}>
      <Letter letter={letter} size={size} />
    </StyledAnimatedLetter>
  );
};

AnimatedLetter.propTypes = {
  letter: PropTypes.string.isRequired,
};
