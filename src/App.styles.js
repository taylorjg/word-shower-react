import { styled } from "styled-components";

export const StyledApp = styled.div`
  width: 400px;
  max-width: 100vw;
  margin: 0 auto;
  height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const StyledGrid = styled.div`
  height: 100%;
  display: grid;
  gap: 0.25rem;
  grid-template-areas:
    "a a"
    "b c"
    "d e";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 2fr 1fr;
`;
