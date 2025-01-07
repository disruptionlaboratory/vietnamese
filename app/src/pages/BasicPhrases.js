import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import helloAudio from "../resources/audio/Hello-Xin-chào.mp3";
import goodbyeAudio from "../resources/audio/Goodbye-Tạm-biệt.mp3";
import thankyouAudio from "../resources/audio/Thank-you-Cảm-ơn.mp3";
import yesAudio from "../resources/audio/Yes-Vâng.mp3";
import noAudio from "../resources/audio/No-Không.mp3";
import excusemeAudio from "../resources/audio/Excuse-me-Xin-lỗi.mp3";
import sorryAudio from "../resources/audio/Sorry-Xin-lỗi.mp3";
import howareyouAudio from "../resources/audio/How-are-you-Bạn-thế-nào.mp3";

const BasicPhrases = () => {
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
          <h1>Basic Phrases</h1>
          <div className="resources">
            <div className="row">
              <div className="column key">
                <h2>Hello</h2>
              </div>
              <div className="column value">
                <h2>Xin chào</h2>
              </div>
              <audio controls>
                <source src={helloAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Goodbye</h2>
              </div>
              <div className="column value">
                <h2>Tạm biệt</h2>
              </div>
              <audio controls>
                <source src={goodbyeAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Thank you</h2>
              </div>
              <div className="column value">
                <h2>Cảm ơn</h2>
              </div>
              <audio controls>
                <source src={thankyouAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Yes</h2>
              </div>
              <div className="column value">
                <h2>Vâng</h2>
              </div>
              <audio controls>
                <source src={yesAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="row">
              <div className="column key">
                <h2>No</h2>
              </div>
              <div className="column value">
                <h2>Không</h2>
              </div>
              <audio controls>
                <source src={noAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Excuse me</h2>
              </div>
              <div className="column value">
                <h2>Xin lỗi</h2>
              </div>
              <audio controls>
                <source src={excusemeAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="row">
              <div className="column key">
                <h2>Sorry</h2>
              </div>
              <div className="column value">
                <h2>Xin lỗi</h2>
              </div>
              <audio controls>
                <source src={sorryAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="row">
              <div className="column key">
                <h2>How are you?</h2>
              </div>
              <div className="column value">
                <h2>Bạn thế nào?</h2>
              </div>
              <audio controls>
                <source src={howareyouAudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicPhrases;
