import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MenuStateProvider } from "./contexts/MenuContext";
import { ThemeStateProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import School from "./pages/School";
import BodyParts from "./pages/BodyParts";
import Colours from "./pages/Colours";
import Shapes from "./pages/Shapes";
import Menu from "./components/Menu";
import Bedroom from "./pages/Bedroom";
import Kitchen from "./pages/Kitchen";
import House from "./pages/House";
import BasicPhrases from "./pages/BasicPhrases";

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
            <Route path="/basic-phrases" element={<BasicPhrases />}></Route>
            <Route path="/school" element={<School />}></Route>
            <Route path="/body-parts" element={<BodyParts />}></Route>
            <Route path="/colours" element={<Colours />}></Route>
            <Route path="/shapes" element={<Shapes />}></Route>
            <Route path="/bedroom" element={<Bedroom />}></Route>
            <Route path="/kitchen" element={<Kitchen />}></Route>
            <Route path="/house" element={<House />}></Route>
          </Routes>
          <Menu />
        </BrowserRouter>
      </MenuStateProvider>
    </ThemeStateProvider>
  );
}

export default App;
