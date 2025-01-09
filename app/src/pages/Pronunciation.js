import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import AudioCapture from "../components/AudioCapture";
import axios from "axios";
import distance from "jaro-winkler";

const Pronunciation = () => {
  const [preloading, setPreloading] = useState(true);
  const { theme, setTheme } = useThemeState();
  const [score, setScore] = useState("");

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
        <div className={`${theme} container main pronunciation`}>
          <h1>Pronunciation Test</h1>
          {score && <h2>{score}% Match</h2>}
          <h2>Xin chào</h2>
          <AudioCapture
            onRecorded={async (recording) => {
              function blobToStringBase64(blob) {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (
                      reader.result === null ||
                      typeof reader.result !== "string"
                    ) {
                      reject("Error reading the Blob data");
                    } else {
                      resolve(reader.result);
                    }
                  };
                  reader.readAsDataURL(blob);
                });
              }

              const blob = new Blob([recording], { type: "audio/mp3" });

              blobToStringBase64(blob).then(async (base64EncodedString) => {
                base64EncodedString = base64EncodedString.replace(
                  "data:audio/mp3;base64,",
                  "",
                );

                try {
                  const response = await axios.post(
                    "http://127.0.0.1:3008/transcribe",
                    {
                      audio: base64EncodedString,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "Accept-Type": "application/json",
                      },
                    },
                  );
                  const { transcript } = response.data;
                  const removeChars = (chars) => (term) => {
                    term = term.trim();
                    chars.map((char) => {
                      term = term.replace(new RegExp(char, "g"), "");
                    });
                    console.log(`term: ${term}`);
                    return term;
                  };
                  const format = (number) => {
                    return (number * 100).toFixed(2);
                  };
                  const strip = removeChars(["!", ","]);
                  setScore(
                    format(distance(strip("Xin chào"), strip(transcript))),
                  );
                } catch (error) {
                  console.log(error);
                }
              });
            }}
          />
        </div>
      )}
    </>
  );
};

export default Pronunciation;
