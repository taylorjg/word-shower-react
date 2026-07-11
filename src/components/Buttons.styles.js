import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledButtons = styled(StyledPanel)`
  padding: 0.1rem;
  grid-area: e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 0.25rem;

  & button {
    color: ${(props) => props.theme.colour};
    background-color: ${(props) => props.theme.backgroundColour};
    width: 100%;
    flex: 1;
    min-height: 0;
    border: ${(props) => props.theme.border};
    border-radius: ${(props) => props.theme.innerBorderRadius};
    font-size: ${(props) => props.theme.fontSize4};
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export const StyledSpeechRecognitionError = styled.p`
  margin: 0;
  padding: 0.25rem 0.5rem;
  font-size: ${(props) => props.theme.fontSize2};
  color: #b00020;
  text-align: center;
  line-height: 1.3;
`;

export const StyledStopping = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize4};
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSize3};
  }
`;
