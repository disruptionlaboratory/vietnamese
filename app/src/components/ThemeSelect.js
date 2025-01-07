import React, { useState } from "react";
import { Light, Dark } from "./Icon";
import useThemeState from "../contexts/ThemeContext";
import { getFillColor } from "../library/theme";

const ThemeSelect = ({ initialValue = "", onChange }) => {
  const [selected, setSelected] = useState(initialValue);
  const { theme } = useThemeState();

  return (
    <div className={`${theme} form-controls`}>
      <div className="modes">
        <button
          className={selected === "light-theme" ? "mode-selected" : ""}
          onClick={() => {
            setSelected("light-theme");
            onChange("light-theme");
          }}
        >
          <Light
            fillColor={
              selected === "light-theme" ? "deeppink" : getFillColor(theme)
            }
            className=""
          />
          Light
        </button>
        <button
          className={selected === "dark-theme" ? "mode-selected" : ""}
          onClick={() => {
            setSelected("dark-theme");
            onChange("dark-theme");
          }}
        >
          <Dark
            fillColor={
              selected === "dark-theme" ? "deeppink" : getFillColor(theme)
            }
            className=""
          />
          Dark
        </button>
      </div>
    </div>
  );
};

export default ThemeSelect;
