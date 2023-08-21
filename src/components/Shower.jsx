import { useRef } from "react";
import PropTypes from "prop-types";
import { animated, useSpring } from "@react-spring/web";

import { Letter } from "./Letter";
import { StyledShower } from "./Shower.styles";

const AnimatedLetter = ({ letter }) => {
  const leftRef = useRef(`calc((100% - 1rem) * ${Math.random()})`);

  const springs = useSpring({
    from: { top: "0%" },
    to: { top: "100%" },
    config: { duration: 4000 },
  });

  return (
    <animated.div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: leftRef.current,
        ...springs,
      }}
    >
      <Letter letter={letter} />
    </animated.div>
  );
};

AnimatedLetter.propTypes = {
  letter: PropTypes.string.isRequired,
};

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
