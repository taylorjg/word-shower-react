import PropTypes from "prop-types";
import { animated, useSpring } from "@react-spring/web";

import { Letter } from "./Letter";
import { StyledShower } from "./Shower.styles";

export const Shower = ({ activeLetters }) => {
  // const activeLettersString = activeLetters.join("");
  // return <StyledShower>{activeLettersString}</StyledShower>;

  const springs = useSpring({
    from: { y: "0%" },
    to: { y: "100%" },
    config: { duration: 4000 },
  });

  return (
    <StyledShower>
      <animated.div
        style={{
          width: "100%",
          height: "100%",
          ...springs,
        }}
      >
        <Letter letter="d" />
      </animated.div>
    </StyledShower>
  );
};

Shower.propTypes = {
  activeLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
};
