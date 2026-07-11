import PropTypes from "prop-types";

import { Pane } from "./Pane";
import {
  StyledSettings,
  StyledSetting,
  StyledSettingLabelAndValue,
  StyledSettingExplanation,
  StyledCheckboxSettingRow,
  StyledRangeInput,
  StyledCheckboxInput,
} from "./SettingsPane.styles";

const toSliderFillPercent = (value, min, max) =>
  `${((value - min) / (max - min)) * 100}%`;

export const SettingsPane = ({ onClose, settings, onChangeSettings }) => {
  const onChangeNewLetterRate = (e) => {
    const newLetterRate = Number(e.target.value);
    onChangeSettings({ ...settings, newLetterRate });
  };

  const onChangeLetterFallSpeed = (e) => {
    const letterFallSpeed = Number(e.target.value);
    onChangeSettings({ ...settings, letterFallSpeed });
  };

  const onChangeStrictMode = (e) => {
    const strictMode = Boolean(e.target.checked);
    onChangeSettings({ ...settings, strictMode });
  };

  const onChangeEnableConfetti = (e) => {
    const enableConfetti = Boolean(e.target.checked);
    onChangeSettings({ ...settings, enableConfetti });
  };

  return (
    <Pane title="Settings" onClose={onClose}>
      <StyledSettings>
        <StyledSetting>
          <StyledSettingLabelAndValue>
            <label htmlFor="new-letter-rate">New Letter Rate</label>
            <div>{settings.newLetterRate.toLocaleString()}ms</div>
          </StyledSettingLabelAndValue>
          <StyledRangeInput
            id="new-letter-rate"
            min="100"
            max="5000"
            step="100"
            value={settings.newLetterRate}
            onChange={onChangeNewLetterRate}
            style={{
              "--slider-fill-percent": toSliderFillPercent(
                settings.newLetterRate,
                100,
                5000
              ),
            }}
          />
          <StyledSettingExplanation>
            Controls the rate at which new letters are added
          </StyledSettingExplanation>
        </StyledSetting>
        <StyledSetting>
          <StyledSettingLabelAndValue>
            <label htmlFor="letter-fall-speed">Letter Fall Speed</label>
            <div>{settings.letterFallSpeed.toLocaleString()}ms</div>
          </StyledSettingLabelAndValue>
          <StyledRangeInput
            id="letter-fall-speed"
            min="1000"
            max="10000"
            step="100"
            value={settings.letterFallSpeed}
            onChange={onChangeLetterFallSpeed}
            style={{
              "--slider-fill-percent": toSliderFillPercent(
                settings.letterFallSpeed,
                1000,
                10000
              ),
            }}
          />
          <StyledSettingExplanation>
            Controls the speed at which letters falls down the screen
          </StyledSettingExplanation>
        </StyledSetting>
        <StyledSetting>
          <StyledCheckboxSettingRow>
            <label htmlFor="strict-mode">Strict Mode</label>
            <StyledCheckboxInput
              id="strict-mode"
              checked={settings.strictMode}
              onChange={onChangeStrictMode}
            />
          </StyledCheckboxSettingRow>
          <StyledSettingExplanation>
            In strict mode, for the word &quot;KISS&quot; to be valid, the
            letter &quot;S&quot; must appear twice in the list of active letters
          </StyledSettingExplanation>
        </StyledSetting>
        <StyledSetting>
          <StyledCheckboxSettingRow>
            <label htmlFor="enable-confetti">Enable Confetti</label>
            <StyledCheckboxInput
              id="enable-confetti"
              checked={settings.enableConfetti}
              onChange={onChangeEnableConfetti}
            />
          </StyledCheckboxSettingRow>
          <StyledSettingExplanation>
            When enabled, show an animated confetti explosion each time a word
            is found
          </StyledSettingExplanation>
        </StyledSetting>
      </StyledSettings>
    </Pane>
  );
};

SettingsPane.propTypes = {
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    newLetterRate: PropTypes.number.isRequired,
    letterFallSpeed: PropTypes.number.isRequired,
    strictMode: PropTypes.bool.isRequired,
    enableConfetti: PropTypes.bool.isRequired,
  }).isRequired,
  onChangeSettings: PropTypes.func.isRequired,
};
