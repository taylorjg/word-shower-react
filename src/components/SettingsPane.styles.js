import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledPane = styled.div`
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

export const StyledPaneBody = styled.div`
  font-size: x-large;
`;

export const StyledCloseIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
`;
