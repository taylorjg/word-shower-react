import PropTypes from "prop-types";

import { lookupLetterValue } from "@app/helpers/scrabble";

import {
  StyledSvg,
  StyledLetterBackground,
  StyledLetter,
  StyledValue,
} from "./Letter.styles";

export const Letter = ({ letter, size }) => {
  const value = lookupLetterValue(letter);

  return (
    <StyledSvg viewBox="0 0 100 100" size={size}>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="1" />
        </filter>
      </defs>

      <StyledLetterBackground
        x={4}
        y={4}
        width={92}
        height={92}
        rx={12}
        filter="url(#shadow)"
      />
      <StyledLetter x={50} y={50}>
        {letter.toUpperCase()}
      </StyledLetter>
      <StyledValue x={80} y={80}>
        {value}
      </StyledValue>
    </StyledSvg>
  );
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "large"]).isRequired,
};
