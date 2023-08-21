import { styled } from "styled-components";

const getSize = (size) => {
  switch (size) {
    default:
    case "small":
      return "1rem";
    case "large":
      return "2rem";
  }
};

export const StyledSvg = styled.svg`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
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
