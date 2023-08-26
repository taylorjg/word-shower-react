import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledHeader = styled(StyledPanel)`
  grid-area: a;
  display: grid;
  grid-template-columns: auto 1fr auto;
  font-size: ${(props) => props.theme.fontSize5};
`;

export const StyledIcon = styled.div`
  font-size: ${(props) => props.theme.fontSize5};
  cursor: pointer;
`;

export const StyledMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize3};
`;
