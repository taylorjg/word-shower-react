import { styled } from "styled-components";

export const StyledPanel = styled.div`
  color: ${(props) => props.theme.colour};
  background-color: ${(props) => props.theme.backgroundColour};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.outerBorderRadius};
  padding: ${(props) => props.theme.padding};
`;
