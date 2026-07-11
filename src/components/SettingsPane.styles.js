import { styled } from "styled-components";

export const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

export const StyledSetting = styled.div`
  margin-top: 1rem;
`;

export const StyledSettingLabelAndValue = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.theme.fontSize3};
`;

export const StyledSettingExplanation = styled.div`
  font-size: ${(props) => props.theme.fontSize1};
  font-style: italic;
  margin-top: 0.5rem;
`;

export const StyledCheckboxSettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${(props) => props.theme.fontSize3};

  label {
    cursor: pointer;
  }
`;

export const StyledRangeInput = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 1.25rem;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-container {
    background: transparent;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 0.35rem;
    border-radius: 0.2rem;
    border: none;
    background: linear-gradient(
      to right,
      ${(props) => props.theme.accentColour} 0%,
      ${(props) => props.theme.accentColour} var(--slider-fill-percent, 0%),
      ${(props) => props.theme.sliderTrackColour} var(--slider-fill-percent, 0%),
      ${(props) => props.theme.sliderTrackColour} 100%
    );
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    margin-top: -0.325rem;
    border-radius: 50%;
    background: ${(props) => props.theme.accentColour};
    border: 2px solid ${(props) => props.theme.colour};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    background: ${(props) => props.theme.accentColour};
    border: 2px solid ${(props) => props.theme.colour};
  }

  &::-moz-range-track {
    height: 0.35rem;
    border-radius: 0.2rem;
    border: none;
    background: ${(props) => props.theme.sliderTrackColour};
  }

  &::-moz-range-progress {
    height: 0.35rem;
    border-radius: 0.2rem;
    border: none;
    background: ${(props) => props.theme.accentColour};
  }

  &::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 2px solid ${(props) => props.theme.colour};
    border-radius: 50%;
    background: ${(props) => props.theme.accentColour};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    outline: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.accentColour};
    outline-offset: 2px;
  }
`;

export const StyledCheckboxInput = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  margin: 0;
  border: 2px solid ${(props) => props.theme.colour};
  border-radius: ${(props) => props.theme.innerBorderRadius};
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 0.75rem;
  cursor: pointer;
  flex-shrink: 0;

  &:checked {
    background-color: ${(props) => props.theme.accentColour};
    border-color: ${(props) => props.theme.accentColour};
    background-image: ${(props) => {
      const checkmark = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${props.theme.checkboxCheckmarkColour}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
      );
      return `url("data:image/svg+xml,${checkmark}")`;
    }};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.accentColour};
    outline-offset: 2px;
  }
`;
