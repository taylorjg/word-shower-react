import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledScores = styled(StyledPanel)`
  grid-area: d;
  font-size: ${(props) => props.theme.fontSize4};
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSize3};
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.padding};
`;

export const StyledScore = styled.div`
  display: flex;
  gap: 0.25rem;
`;
