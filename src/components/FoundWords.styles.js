import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledFoundWords = styled(StyledPanel)`
  grid-area: c;
  overflow: scroll;
`;

export const StyledFoundWord = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const StyledFoundWordLetters = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.1rem;
  min-width: 0;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    row-gap: 0.1rem;

    svg {
      width: 0.85rem;
      height: 0.85rem;
    }
  }
`;

export const StyledFoundWordScore = styled.span`
  font-size: ${(props) => props.theme.fontSize1};
  font-style: italic;
  flex-shrink: 0;
  margin-left: 0.5rem;

  @media only screen and (max-width: 600px) {
    align-self: flex-end;
    margin-left: 0;
    margin-top: 0.125rem;
  }
`;
