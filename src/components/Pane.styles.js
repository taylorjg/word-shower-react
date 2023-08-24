import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledPane = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 0.5rem;
  padding: 0.5rem;
`;

export const StyledPaneHead = styled(StyledPanel)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  position: relative;
`;

export const StyledPaneBody = styled.div`
  font-size: large;
`;

export const StyledCloseIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
`;
