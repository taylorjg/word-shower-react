import PropTypes from "prop-types";

import { Pane } from "./Pane";
import {
  StyledSettings,
  StyledSetting,
  StyledSettingLabelAndValue,
  StyledSettingExplanation,
} from "./SettingsPane.styles";

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

  return (
    <Pane title="Settings" onClose={onClose}>
      <StyledSettings>
        <StyledSetting>
          <StyledSettingLabelAndValue>
            <label htmlFor="new-letter-rate">New Letter Rate</label>
            <div>{settings.newLetterRate.toLocaleString()}ms</div>
          </StyledSettingLabelAndValue>
          <input
            style={{ width: "100%" }}
            type="range"
            id="new-letter-rate"
            min="100"
            max="5000"
            step="100"
            value={settings.newLetterRate}
            onChange={onChangeNewLetterRate}
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
          <input
            style={{ width: "100%" }}
            type="range"
            id="letter-fall-speed"
            min="1000"
            max="10000"
            step="100"
            value={settings.letterFallSpeed}
            onChange={onChangeLetterFallSpeed}
          />
          <StyledSettingExplanation>
            Controls the speed at which letters falls down the screen
          </StyledSettingExplanation>
        </StyledSetting>
        <StyledSetting>
          <label htmlFor="strict-mode">Strict Mode</label>
          <input
            type="checkbox"
            id="strict-mode"
            checked={settings.strictMode}
            onChange={onChangeStrictMode}
          />
          <StyledSettingExplanation>
            In strict mode, for the word &quot;KISS&quot; to be valid, the
            letter &quot;S&quot; must appear twice in the list of active letters
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
  }).isRequired,
  onChangeSettings: PropTypes.func.isRequired,
};
