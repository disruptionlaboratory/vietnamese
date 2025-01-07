import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import bedAudio from "../resources/audio/Bed-Giường.mp3";
import closetAudio from "../resources/audio/Closet-Tủ-quần-áo.mp3";
import dresserAudio from "../resources/audio/Dresser-Bàn-trang-sức.mp3";
import mirrorAudio from "../resources/audio/Mirror-Gương.mp3";
import nightstandAudio from "../resources/audio/Nightstand-Bàn-đêm.mp3";
import shelfAudio from "../resources/audio/Shelf-Kệ-sách.mp3";
import wardrobeAudio from "../resources/audio/Wardrobe-Tủ-quần-áo-hạng-sang.mp3";
import blanketAudio from "../resources/audio/Blanket-Dây-quấn.mp3";
import pillowAudio from "../resources/audio/Pillow-Gối.mp3";
import sheetAudio from "../resources/audio/Sheet-Chăn.mp3";

  
const Bedroom = () => {
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
          <h1>Bedroom</h1>
          <div className="resources">

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
                <h2>Closet</h2>
                </div>
                <div className="column value">
                <h2>Tủ quần áo</h2>
                </div>
                <audio controls>
                    <source src={closetAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Dresser</h2>
                </div>
                <div className="column value">
                <h2>Bàn trang sức</h2>
                </div>
                <audio controls>
                    <source src={dresserAudio} type="audio/mpeg" />
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
            <div className="row">
                <div className="column key">
                <h2>Nightstand</h2>
                </div>
                <div className="column value">
                <h2>Bàn đêm</h2>
                </div>
                <audio controls>
                    <source src={nightstandAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Shelf</h2>
                </div>
                <div className="column value">
                <h2>Kệ sách</h2>
                </div>
                <audio controls>
                    <source src={shelfAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Wardrobe</h2>
                </div>
                <div className="column value">
                <h2>Tủ quần áo hạng sang</h2>
                </div>
                <audio controls>
                    <source src={wardrobeAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Blanket</h2>
                </div>
                <div className="column value">
                <h2>Dây quấn</h2>
                </div>
                <audio controls>
                    <source src={blanketAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Pillow</h2>
                </div>
                <div className="column value">
                <h2>Gối</h2>
                </div>
                <audio controls>
                    <source src={pillowAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className="row">
                <div className="column key">
                <h2>Sheet</h2>
                </div>
                <div className="column value">
                <h2>Chăn</h2>
                </div>
                <audio controls>
                    <source src={sheetAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Bedroom;