import { styled } from "styled-components";

export const StyledApp = styled.div`
  width: 600px;
  padding: 4rem 0;
  max-width: 100vw;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: ${(props) => props.theme.padding};
  }
`;

export const StyledGrid = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  gap: 0.25rem;
  overflow: hidden;
  grid-template-areas:
    "a a"
    "b c"
    "d e";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 2fr 1fr;
`;

export const StyledConfettiCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;
