import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledInstructionsPane = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 0.5rem;
`;

export const StyledPaneHead = styled(StyledPanel)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  position: relative;
`;

export const StyledPaneBody = styled(StyledPanel)`
  font-size: x-large;
  position: relative;
`;

export const StyledCloseIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
`;

export const StyledVersion = styled.div`
  font-size: medium;
  font-style: italic;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`;
