import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledHeader = styled(StyledPanel)`
  grid-area: a;
  display: grid;
  grid-template-columns: auto 1fr auto;
  font-size: xx-large;
`;

export const StyledIcon = styled.div`
  font-size: xx-large;
`;

export const StyledMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
`;
