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
