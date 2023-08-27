import { styled } from "styled-components";

export const StyledListening = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledUpper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.5rem;
`;

export const StyledLower = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize1};
  font-style: italic;
`;

export const StyledDot = styled.span`
  color: red;
  &:after {
    content: "\u2b24";
  }
`;
