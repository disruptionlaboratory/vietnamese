import React, { useContext, useEffect, useState } from "react";

import useMenuState from "./../contexts/MenuContext";
import useThemeState from "../contexts/ThemeContext";
import { Menu as MenuIcon } from "./../components/Icon";
import Logo from "./Logo";
import { getFillColor } from "../library/theme";

const Header = () => {
  const { openMenu } = useMenuState();

  const { theme, setTheme } = useThemeState();

  return (
    <div className={`${theme} container header`}>
      <div className="header-section">
        {/*<Logo fillColor={getFillColor(theme)} className="logo" />*/}
      </div>

      <div className="header-section">
        <button onClick={openMenu} className="header-section-button">
          <MenuIcon fillColor={getFillColor(theme)} />
        </button>
      </div>
    </div>
  );
};

export default Header;
