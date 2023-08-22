import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import {
  StyledPane,
  StyledPaneHead,
  StyledPaneBody,
  StyledCloseIcon,
  StyledSettings,
  StyledSetting,
  StyledSettingLabelAndValue,
  StyledSettingExplanation,
} from "./SettingsPane.styles";

export const SettingsPane = ({ onClose }) => {
  const [newLetterRate, setNewLetterRate] = useState(500);
  const [letterFallSpeed, setLetterFallSpeed] = useState(4000);
  const [strictMode, setStrictMode] = useState(true);

  return (
    <StyledPane>
      <StyledPaneHead>
        <span>Settings</span>
        <StyledCloseIcon>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={onClose} />
        </StyledCloseIcon>
      </StyledPaneHead>
      <StyledPaneBody>
        <StyledSettings>
          <StyledSetting>
            <StyledSettingLabelAndValue>
              <label htmlFor="new-letter-rate">New Letter Rate</label>
              <div>{newLetterRate.toLocaleString()}ms</div>
            </StyledSettingLabelAndValue>
            <input
              style={{ width: "100%" }}
              type="range"
              id="new-letter-rate"
              min="100"
              max="5000"
              step="100"
              value={newLetterRate}
              onChange={(e) => setNewLetterRate(Number(e.target.value))}
            />
            <StyledSettingExplanation>
              Controls the rate at which new letters are added
            </StyledSettingExplanation>
          </StyledSetting>

          <StyledSetting>
            <StyledSettingLabelAndValue>
              <label htmlFor="letter-fall-speed">Letter Fall Speed</label>
              <div>{letterFallSpeed.toLocaleString()}ms</div>
            </StyledSettingLabelAndValue>
            <input
              style={{ width: "100%" }}
              type="range"
              id="letter-fall-speed"
              min="1000"
              max="10000"
              step="100"
              value={letterFallSpeed}
              onChange={(e) => setLetterFallSpeed(Number(e.target.value))}
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
              checked={strictMode}
              onChange={(e) => setStrictMode(e.target.checked)}
            />
            <StyledSettingExplanation>
              In strict mode, for the word &quot;KISS&quot; to be valid, the
              letter &quot;S&quot; must appear twice in the list of active
              letters
            </StyledSettingExplanation>
          </StyledSetting>
        </StyledSettings>
      </StyledPaneBody>
    </StyledPane>
  );
};

SettingsPane.propTypes = {
  onClose: PropTypes.func.isRequired,
};
