const lightTheme = {
  primaryColor: "#333232",
  // secondaryColor: "#e1e0e0",
  secondaryColor: "#fff",
  tertiaryColor: "deeppink",
};

const darkTheme = {
  // primaryColor: "#e1e0e0",
  primaryColor: "#fff",
  secondaryColor: "#333232",
  tertiaryColor: "deeppink",
};

export const getFillColor = (theme) => {
  return theme === "light-theme"
    ? lightTheme.primaryColor
    : darkTheme.primaryColor;
};

export const getSelectedFillColor = (theme) => {
  return theme === "light-theme"
    ? lightTheme.tertiaryColor
    : darkTheme.tertiaryColor;
};
