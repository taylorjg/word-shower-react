import { styled, keyframes } from "styled-components";

export const StyledListening = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledUpper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
`;

export const StyledLower = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize1};
  font-style: italic;
`;

const pulse = keyframes`
  0% {
    scale: 1.0;
    opacity: 0.75;
  }
  50% {
    scale: 1.25;
    opacity: 1.0;
  }
  100% {
    scale: 1.0;
    opacity: 0.75;
  }
`;

export const StyledDot = styled.span`
  color: red;
  &:after {
    content: "\u2b24";
  }
  animation-name: ${pulse};
  animation-duration: 1500ms;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;
