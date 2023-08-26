import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledScore = styled(StyledPanel)`
  grid-area: d;
  font-size: ${(props) => props.theme.fontSize4};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.padding};
`;
