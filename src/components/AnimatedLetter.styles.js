import { styled, keyframes } from "styled-components";

const fall = keyframes`
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
`;

export const StyledAnimatedLetter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: ${(props) => props.$left};
  animation-duration: ${(props) => `${props.$letterFallSpeed}ms`};
  animation-name: ${fall};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
`;
