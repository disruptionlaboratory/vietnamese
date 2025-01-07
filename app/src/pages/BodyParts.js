import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";

import armAudio from "../resources/audio/Arm-Cánh-tay.mp3";
import earAudio from "../resources/audio/Ear-Tai.mp3";
import eyeAudio from "../resources/audio/Eye-Mắt.mp3";
import handAudio from "../resources/audio/Hand-Tay.mp3";
import headAudio from "../resources/audio/Head-Đầu.mp3";
import noseAudio from "../resources/audio/Nose-Mũi.mp3";
import mouthAudio from "../resources/audio/Mouth-Miệng.mp3";
import legAudio from "../resources/audio/Leg-Chân.mp3";
import kneeAudio from "../resources/audio/Knee-Đầu-gối.mp3";
import heartAudio from "../resources/audio/Heart-Tim.mp3";

const BodyParts = () => {
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
          <h1>Body Parts</h1>
          <div className="resources">
            <div className="row">
              <div className="column key">
                <h2>Head</h2>
              </div>
              <div className="column value">
                <h2>Đầu</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={headAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Eye</h2>
              </div>
              <div className="column value">
                <h2>Mắt</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={eyeAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Ear</h2>
              </div>
              <div className="column value">
                <h2>Tai</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={earAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Nose</h2>
              </div>
              <div className="column value">
                <h2>Mũi</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={noseAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Mouth</h2>
              </div>
              <div className="column value">
                <h2>Miệng</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={mouthAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Hand</h2>
              </div>
              <div className="column value">
                <h2>Tay</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={handAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Arm</h2>
              </div>
              <div className="column value">
                <h2>Cánh tay</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={armAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Leg</h2>
              </div>
              <div className="column value">
                <h2>Chân</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={legAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Knee</h2>
              </div>
              <div className="column value">
                <h2>Đầu gối</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={kneeAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Heart</h2>
              </div>
              <div className="column value">
                <h2>Tim</h2>
              </div>
              <div className="column">
                <audio controls>
                  <source src={heartAudio} type="audio/mpeg" />
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

export default BodyParts;
