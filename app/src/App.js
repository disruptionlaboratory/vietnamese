import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MenuStateProvider } from "./contexts/MenuContext";
import { ThemeStateProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import BodyParts from "./pages/BodyParts";
import Colours from "./pages/Colours";
import Menu from "./components/Menu";

import "./styles.css";

function App() {
  useEffect(() => {
    document.body.classList.add("light-theme");
  }, []);

  return (
    <ThemeStateProvider>
      <MenuStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/body-parts" element={<BodyParts />}></Route>
            <Route path="/colours" element={<Colours />}></Route>
          </Routes>
          <Menu />
        </BrowserRouter>
      </MenuStateProvider>
    </ThemeStateProvider>
  );
}

export default App;
