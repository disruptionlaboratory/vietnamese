import React, { createContext, useState, useContext } from "react";

export const MenuContext = createContext();

export const MenuStateProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: menuOpen,
        openMenu: () => {
          setMenuOpen(true);
        },
        closeMenu: () => {
          setMenuOpen(false);
        },
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const useMenuState = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenuState must be used within a MenuStateProvider");
  }
  return context;
};

export default useMenuState;
