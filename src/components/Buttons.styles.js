import { styled } from "styled-components";

import { StyledPanel } from "./Common.styles";

export const StyledButtons = styled(StyledPanel)`
  padding: 0.1rem;
  grid-area: e;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-radius: 0.25rem;
    font-size: x-large;
  }
`;
