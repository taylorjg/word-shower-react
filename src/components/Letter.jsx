import PropTypes from "prop-types";

import {
  StyledSvg,
  StyledLetterBackground,
  StyledLetter,
  StyledValue,
} from "./Letter.styles";

export const Letter = ({ letter, value }) => {
  return (
    <StyledSvg viewBox="0 0 100 100">
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" />
        </filter>
      </defs>

      <StyledLetterBackground
        x={3}
        y={3}
        width={94}
        height={94}
        rx={20}
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
  value: PropTypes.number.isRequired,
};
