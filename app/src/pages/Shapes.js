import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import circleAudio from "../resources/audio/Circle-Hình-tròn.mp3";
import squareAudio from "../resources/audio/Square-Hình-vuông.mp3";
import triangleAudio from "../resources/audio/Triangle-Hình-tam-giác.mp3";
import rectangleAudio from "../resources/audio/Rectangle-Hình-chữ-nhật.mp3";
import ovalAudio from "../resources/audio/Oval-Hình-oval.mp3";
import starAudio from "../resources/audio/Star-Hình-sao.mp3";
import heartAudio from "../resources/audio/Heart-Tim.mp3";
import diamondAudio from "../resources/audio/Diamond-Hình-kim-cương.mp3";
import pentagonAudio from "../resources/audio/Pentagon-Hình-ngũ-giác.mp3";
import octagonAudio from "../resources/audio/Octagon-Hình-bát-giác.mp3";
import hexagonAudio from "../resources/audio/Hexagon-Hình-lục-giác.mp3";

const Shapes = () => {
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
          <h1>Shapes</h1>
          <div className="resources">
            <div className="row">
              <div className="column key">
                <h2>Circle</h2>
              </div>
              <div className="column value">
                <h2>Hình tròn</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={circleAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Square</h2>
              </div>
              <div className="column value">
                <h2>Hình vuông</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={squareAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Triangle</h2>
              </div>
              <div className="column value">
                <h2>Hình tam giác</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={triangleAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Rectangle</h2>
              </div>
              <div className="column value">
                <h2>Hình chữ nhật</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={rectangleAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Oval</h2>
              </div>
              <div className="column value">
                <h2>Hình oval</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={ovalAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Star</h2>
              </div>
              <div className="column value">
                <h2>Hình sao</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={starAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Heart</h2>
              </div>
              <div className="column value">
                <h2>Hình tim</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={heartAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Diamond</h2>
              </div>
              <div className="column value">
                <h2>Hình kim cương</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={diamondAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Pentagon</h2>
              </div>
              <div className="column value">
                <h2>Hình ngũ giác</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={pentagonAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Hexagon</h2>
              </div>
              <div className="column value">
                <h2>Hình lục giác</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={hexagonAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Octagon</h2>
              </div>
              <div className="column value">
                <h2>Hình bát giác</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={octagonAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shapes;
