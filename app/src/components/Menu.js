import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMenuState from "./../contexts/MenuContext";
import useThemeState from "../contexts/ThemeContext";
import { Close } from "./Icon";
import { getFillColor } from "../library/theme";

const Menu = () => {
  const { isMenuOpen, closeMenu } = useMenuState();
  const [classTerm, setClassTerm] = useState("closeMenu");
  const navigate = useNavigate();
  const { theme } = useThemeState();

  useEffect(() => {
    if (isMenuOpen) {
      setClassTerm("openMenu");
    } else {
      setClassTerm("closeMenu");
    }
  }, [isMenuOpen]);

  if (!isMenuOpen) {
    return null;
  }

  return (
    <>
      <div className={`${theme} menu-overlay $[classTerm}`}></div>
      <div className={`${theme} menu-container ${classTerm}`}>
        <div className="menu-container-section">
          <button
            onClick={() => {
              setClassTerm("closeMenu");
              setTimeout(() => {
                closeMenu();
              }, 500);
            }}
          >
            <Close fillColor={getFillColor(theme)} />
          </button>
        </div>
        <div className="menu-container-section"></div>
      </div>
    </>
  );
};

export default Menu;
