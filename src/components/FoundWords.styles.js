import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledFoundWords = styled(StyledPanel)`
  grid-area: c;
  overflow-y: scroll;
`;

export const StyledFoundWord = styled.div`
  font-size: x-large;
`;
