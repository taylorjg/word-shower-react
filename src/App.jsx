import { Buttons, FoundWords, Header, Score, Shower } from "@app/components";

import { StyledApp, StyledGrid } from "./App.styles";

export const App = () => {
  return (
    <StyledApp>
      <StyledGrid>
        <Header />
        <Shower />
        <FoundWords />
        <Score />
        <Buttons />
      </StyledGrid>
    </StyledApp>
  );
};
