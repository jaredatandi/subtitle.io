import useThemeHelper from 'helpers/theme/ThemeHelper';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

const ThemeToggleSwitch = () => {
  const { handleThemeToggle } = useThemeHelper();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const checked = theme === 'dark';

  return (
    <>
      <div className="switch">
        <label className="toggle-control">
          <input
            type="checkbox"
            onChange={handleThemeToggle}
            checked={checked}
          />
          <span className="control" />
        </label>
      </div>
    </>
  );
};

export default ThemeToggleSwitch;
