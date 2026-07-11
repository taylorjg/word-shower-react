import { styled, keyframes, css } from "styled-components";

import { SpeechRecognitionStatus } from "@app/hooks/use-speech-recognition";

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

export const StyledStatusError = styled.span`
  color: #b00020;
  font-size: ${(props) => props.theme.fontSize1};
  text-align: center;
  line-height: 1.3;
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

const dotStyles = {
  [SpeechRecognitionStatus.Starting]: css`
    color: #888;
    animation: none;
  `,
  [SpeechRecognitionStatus.Listening]: css`
    color: red;
    animation-name: ${pulse};
    animation-duration: 1500ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  `,
  [SpeechRecognitionStatus.Reconnecting]: css`
    color: #e6a700;
    animation-name: ${pulse};
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  `,
  [SpeechRecognitionStatus.Idle]: css`
    color: #888;
    animation: none;
  `,
};

export const StyledDot = styled.span`
  &:after {
    content: "\u2b24";
  }

  ${(props) => dotStyles[props.$status] ?? dotStyles[SpeechRecognitionStatus.Idle]}
`;
