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
      <StyledLetterBackground x={0} y={0} width={100} height={100} rx={20} />
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
