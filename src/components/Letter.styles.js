import { styled } from "styled-components";

export const getLetterSize = (size) => {
  switch (size) {
    default:
    case "small":
      return "1rem";
    case "large":
      return "3rem";
  }
};

export const StyledSvg = styled.svg`
  width: ${({ size }) => getLetterSize(size)};
  height: ${({ size }) => getLetterSize(size)};
`;

export const StyledLetterBackground = styled.rect`
  fill: bisque;
`;

export const StyledLetter = styled.text`
  fill: black;
  font-family: arial;
  font-size: 4rem;
  text-anchor: middle;
  dominant-baseline: central;
`;

export const StyledValue = styled.text`
  fill: black;
  font-family: arial;
  font-size: 1.5rem;
  text-anchor: middle;
  dominant-baseline: central;
`;
