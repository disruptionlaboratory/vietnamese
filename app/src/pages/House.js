import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import chairAudio from "../resources/audio/Chair-Ghế.mp3";
import tableAudio from "../resources/audio/Table-Bàn.mp3";
import bedAudio from "../resources/audio/Bed-Giường.mp3";
import deskAudio from "../resources/audio/Desk-Bàn-làm-việc.mp3";
import couchAudio from "../resources/audio/Couch-Canh.mp3";
import tVAudio from "../resources/audio/TV-Ti-vi.mp3";
import radioAudio from "../resources/audio/Radio-Đài-phát-thanh.mp3";
import lampAudio from "../resources/audio/Lamp-Đèn.mp3";
import bookshelfAudio from "../resources/audio/Bookshelf-Bàn-sách.mp3";
import mirrorAudio from "../resources/audio/Mirror-Gương.mp3";

  
const House = () => {
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
          <h1>House</h1>
          <div className="resources">

            <div className="row">
                <div className="column key">
                <h2>Chair</h2>
                </div>
                <div className="column value">
                <h2>Ghế</h2>
                </div>
                <audio controls>
                    <source src={chairAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Table</h2>
                </div>
                <div className="column value">
                <h2>Bàn</h2>
                </div>
                <audio controls>
                    <source src={tableAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Bed</h2>
                </div>
                <div className="column value">
                <h2>Giường</h2>
                </div>
                <audio controls>
                    <source src={bedAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Desk</h2>
                </div>
                <div className="column value">
                <h2>Bàn làm việc</h2>
                </div>
                <audio controls>
                    <source src={deskAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Couch</h2>
                </div>
                <div className="column value">
                <h2>Canh</h2>
                </div>
                <audio controls>
                    <source src={couchAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>TV</h2>
                </div>
                <div className="column value">
                <h2>Ti vi</h2>
                </div>
                <audio controls>
                    <source src={tVAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Radio</h2>
                </div>
                <div className="column value">
                <h2>Đài phát thanh</h2>
                </div>
                <audio controls>
                    <source src={radioAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Lamp</h2>
                </div>
                <div className="column value">
                <h2>Đèn</h2>
                </div>
                <audio controls>
                    <source src={lampAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Bookshelf</h2>
                </div>
                <div className="column value">
                <h2>Bàn sách</h2>
                </div>
                <audio controls>
                    <source src={bookshelfAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Mirror</h2>
                </div>
                <div className="column value">
                <h2>Gương</h2>
                </div>
                <audio controls>
                    <source src={mirrorAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            </div>
        </div>
      )}
    </>
  );
};

export default House;