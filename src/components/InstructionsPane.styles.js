import { styled } from "styled-components";

export const StyledList = styled.ul`
  font-size: ${(props) => props.theme.fontSize3};
`;

export const StyledListItem = styled.li`
  margin-bottom: 1rem;
`;

export const StyledVersion = styled.div`
  font-size: ${(props) => props.theme.fontSize2};
  font-style: italic;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`;
