import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body,
  html,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    background-color: bisque
  }
`;

export const theme = {
  fontSize1: "small",
  fontSize2: "medium",
  fontSize3: "large",
  fontSize4: "x-large",
  fontSize5: "xx-large",
  outerBorderRadius: "0.5rem",
  innerBorderRadius: "0.25rem",
  border: "0.15rem solid transparent",
  colour: "bisque",
  backgroundColour: "chocolate",
  padding: "0.5rem",
};
