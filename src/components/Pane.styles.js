import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledPane = styled.div`
  color: ${(props) => props.theme.colour};
  background-color: ${(props) => props.theme.backgroundColour};
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: ${(props) => props.theme.padding};
  padding: ${(props) => props.theme.padding};
`;

export const StyledPaneHead = styled(StyledPanel)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize4};
  position: relative;
`;

export const StyledPaneBody = styled.div`
  font-size: large;
`;

export const StyledCloseIcon = styled.div`
  position: absolute;
  right: ${(props) => props.theme.padding};
  cursor: pointer;
`;
