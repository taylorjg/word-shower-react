import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledButtons = styled(StyledPanel)`
  padding: 0.1rem;
  grid-area: e;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    color: ${(props) => props.theme.colour};
    background-color: ${(props) => props.theme.backgroundColour};
    width: 100%;
    height: 100%;
    border: ${(props) => props.theme.border};
    border-radius: ${(props) => props.theme.innerBorderRadius};
    font-size: ${(props) => props.theme.fontSize4};
    cursor: pointer;
  }
`;
