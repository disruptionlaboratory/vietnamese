import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import pencilAudio from "../resources/audio/Pencil-Bút-chì.mp3";
import bookAudio from "../resources/audio/Book-Sách.mp3";
import deskAudio from "../resources/audio/Desk-Bàn-học.mp3";
import chairAudio from "../resources/audio/Chair-Chăn-học.mp3";
import rulerAudio from "../resources/audio/Ruler-Thước-kẻ.mp3";
import eraserAudio from "../resources/audio/Eraser-Chổi-phấn.mp3";
import sharpenerAudio from "../resources/audio/Sharpener-Máy-nhọn-bút-chì.mp3";
import lunchboxAudio from "../resources/audio/Lunchbox-Hộp-bento.mp3";

  
const School = () => {
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
          <h1>School</h1>
          <div className="resources">

            <div className="row">
                <div className="column key">
                <h2>Pencil</h2>
                </div>
                <div className="column value">
                <h2>Bút chì</h2>
                </div>
                <audio controls>
                    <source src={pencilAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Book</h2>
                </div>
                <div className="column value">
                <h2>Sách</h2>
                </div>
                <audio controls>
                    <source src={bookAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Desk</h2>
                </div>
                <div className="column value">
                <h2>Bàn học</h2>
                </div>
                <audio controls>
                    <source src={deskAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Chair</h2>
                </div>
                <div className="column value">
                <h2>Chăn học</h2>
                </div>
                <audio controls>
                    <source src={chairAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Ruler</h2>
                </div>
                <div className="column value">
                <h2>Thước kẻ</h2>
                </div>
                <audio controls>
                    <source src={rulerAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Eraser</h2>
                </div>
                <div className="column value">
                <h2>Chổi phấn</h2>
                </div>
                <audio controls>
                    <source src={eraserAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Sharpener</h2>
                </div>
                <div className="column value">
                <h2>Máy nhọn bút chì</h2>
                </div>
                <audio controls>
                    <source src={sharpenerAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Lunchbox</h2>
                </div>
                <div className="column value">
                <h2>Hộp bento</h2>
                </div>
                <audio controls>
                    <source src={lunchboxAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            </div>
        </div>
      )}
    </>
  );
};

export default School;