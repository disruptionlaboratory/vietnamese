import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import fridgeAudio from "../resources/audio/Fridge-Tủ-lạnh.mp3";
import ovenAudio from "../resources/audio/Oven-Lò-nướng.mp3";
import stoveAudio from "../resources/audio/Stove-Bếp-gas.mp3";
import refrigeratorAudio from "../resources/audio/Refrigerator-Tủ-lạnh.mp3";
import microwaveAudio from "../resources/audio/Microwave-Lò-vi-sóng.mp3";
import toasterAudio from "../resources/audio/Toaster-Lò-toast.mp3";
import blenderAudio from "../resources/audio/Blender-Máy-xay-sinh-tố.mp3";
import kettleAudio from "../resources/audio/Kettle-Nồi-điện-đun-nước.mp3";
import coffeemakerAudio from "../resources/audio/Coffee-maker-Máy-pha-cà-phê.mp3";
import dishwasherAudio from "../resources/audio/Dishwasher-Máy-rửa-bát.mp3";

  
const Kitchen = () => {
  const [preloading, setPreloading] = useState(true);
  const { theme, setTheme } = useThemeState();

  useEffect(() => {
    setTimeout(() => {
      setPreloading(false);
    }, Number(process.env.REACT_APP_PRELOADING_DELAY));
  }, []);
  
    return (
    <>
      <Header />
      <Sidebar />
      {preloading && (
        <div className={`${theme} container preloading`}>
          <Logo fillColor={getFillColor(theme)} />
        </div>
      )}
      {!preloading && (
        <div className={`${theme} container main`}>
          <h1>Kitchen</h1>
          <div className="resources">

            <div className="row">
                <div className="column key">
                <h2>Fridge</h2>
                </div>
                <div className="column value">
                <h2>Tủ lạnh</h2>
                </div>
                <audio controls>
                    <source src={fridgeAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Oven</h2>
                </div>
                <div className="column value">
                <h2>Lò nướng</h2>
                </div>
                <audio controls>
                    <source src={ovenAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Stove</h2>
                </div>
                <div className="column value">
                <h2>Bếp gas</h2>
                </div>
                <audio controls>
                    <source src={stoveAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Refrigerator</h2>
                </div>
                <div className="column value">
                <h2>Tủ lạnh</h2>
                </div>
                <audio controls>
                    <source src={refrigeratorAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Microwave</h2>
                </div>
                <div className="column value">
                <h2>Lò vi sóng</h2>
                </div>
                <audio controls>
                    <source src={microwaveAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Toaster</h2>
                </div>
                <div className="column value">
                <h2>Lò toast</h2>
                </div>
                <audio controls>
                    <source src={toasterAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Blender</h2>
                </div>
                <div className="column value">
                <h2>Máy xay sinh tố</h2>
                </div>
                <audio controls>
                    <source src={blenderAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Kettle</h2>
                </div>
                <div className="column value">
                <h2>Nồi điện đun nước</h2>
                </div>
                <audio controls>
                    <source src={kettleAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Coffee maker</h2>
                </div>
                <div className="column value">
                <h2>Máy pha cà phê</h2>
                </div>
                <audio controls>
                    <source src={coffeemakerAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Dishwasher</h2>
                </div>
                <div className="column value">
                <h2>Máy rửa bát</h2>
                </div>
                <audio controls>
                    <source src={dishwasherAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Kitchen;