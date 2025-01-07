import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bookmark,
  Broadcast,
  Calendar,
  Contacts,
  Dashboard,
  Resources,
  Settings,
  Share,
  Variable,
} from "./Icon";
import useThemeState from "../contexts/ThemeContext";
import { getFillColor, getSelectedFillColor } from "../library/theme";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useThemeState();

  return (
    <div className={`${theme} container sidebar`}>
      <div className="sidebar-section">
        <button
          className={location.pathname === "/" ? "link-selected" : ""}
          onClick={() => {
            navigate("/");
          }}
        >
          Dashboard
          {/*<Dashboard*/}
          {/*  fillColor={*/}
          {/*    location.pathname === "/"*/}
          {/*      ? getSelectedFillColor(theme)*/}
          {/*      : getFillColor(theme)*/}
          {/*  }*/}
          {/*/>*/}
        </button>
        <button
          className={location.pathname === "/colours" ? "link-selected" : ""}
          onClick={() => {
            navigate("/colours");
          }}
        >
          Colours
        </button>
        <button
          className={location.pathname === "/body-parts" ? "link-selected" : ""}
          onClick={() => {
            navigate("/body-parts");
          }}
        >
          Body Parts
        </button>

        <button
          className={location.pathname === "/shapes" ? "link-selected" : ""}
          onClick={() => {
            navigate("/shapes");
          }}
        >
          Shapes
        </button>

        <button
          className={location.pathname === "/school" ? "link-selected" : ""}
          onClick={() => {
            navigate("/school");
          }}
        >
          School
        </button>
        <button
          className={location.pathname === "/bedroom" ? "link-selected" : ""}
          onClick={() => {
            navigate("/bedroom");
          }}
        >
          Bedroom
        </button>
        <button
          className={location.pathname === "/kitchen" ? "link-selected" : ""}
          onClick={() => {
            navigate("/kitchen");
          }}
        >
          Kitchen
        </button>
        <button
          className={location.pathname === "/house" ? "link-selected" : ""}
          onClick={() => {
            navigate("/house");
          }}
        >
          House
        </button>
      </div>
      <div className="sidebar-section">
        <button
          className={location.pathname === "/settings" ? "link-selected" : ""}
          onClick={() => {
            navigate("/settings");
          }}
        >
          <Settings
            fillColor={
              location.pathname === "/settings"
                ? getSelectedFillColor(theme)
                : getFillColor(theme)
            }
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
