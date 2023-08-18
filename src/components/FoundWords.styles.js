import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledFoundWords = styled(StyledPanel)`
  grid-area: c;
  overflow: scroll;
`;

export const StyledFoundWord = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.1rem;
  margin-bottom: 0.25rem;
`;
