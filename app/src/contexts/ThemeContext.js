import React, { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeStateProvider = ({ children }) => {
  const [theme, setTheme] = useState("light-theme");
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeState = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeState must be used within a ThemeStateProvider");
  }
  return context;
};

export default useThemeState;
