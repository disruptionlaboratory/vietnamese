import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import AudioCapture from "../components/AudioCapture";
import axios from "axios";
import distance from "jaro-winkler";
import { getAudioData } from "../library/audio";

const Pronunciation = () => {
  const [preloading, setPreloading] = useState(true);
  const { theme, setTheme } = useThemeState();
  const [score, setScore] = useState("");

  const [words, setWords] = useState([]);
  const [word, setWord] = useState(null);

  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setPreloading(false);
    }, Number(process.env.REACT_APP_PRELOADING_DELAY));
  }, []);

  useEffect(() => {
    setWords([
      { key: "Hello", value: "Xin chào", audio: "Hello-Xin-chào.mp3" },
      { key: "Goodbye", value: "Tạm biệt", audio: "Goodbye-Tạm-biệt.mp3" },
      { key: "Thank you", value: "Cảm ơn", audio: "Thank-you-Cảm-ơn.mp3" },
      { key: "Yes", value: "Vâng", audio: "Yes-Vâng.mp3" },
      { key: "No", value: "Không", audio: "No-Không.mp3" },
      { key: "Excuse me", value: "Xin lỗi", audio: "Excuse-me-Xin-lỗi.mp3" },
      { key: "Sorry", value: "Xin lỗi", audio: "Sorry-Xin-lỗi.mp3" },
      {
        key: "How are you?",
        value: "Bạn thế nào?",
        audio: "How-are-you?-Bạn-thế-nào?.mp3",
      },
    ]);
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const randomKey = Math.floor(Math.random() * words.length);
      setWord(words[randomKey]);
    }
  }, [words]);

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
          <h2>
            {word.value} <span className="en">({word.key})</span>
          </h2>
          <br />
          {word && (
            <audio controls>
              <source src={getAudioData(word.audio)} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <br />
          <AudioCapture
            onStartRecording={() => {
              setScore("");
            }}
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

              setRecording(blob);

              blobToStringBase64(blob).then(async (base64EncodedString) => {
                base64EncodedString = base64EncodedString.replace(
                  "data:audio/mp3;base64,",
                  "",
                );

                try {
                  const response = await axios.post(
                    // "http://127.0.0.1:8383/transcribe",
                    "http://127.0.0.1:8787/api/transcriptions/transcribe",
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
                  const strip = removeChars(["!", ",", "\\."]);
                  setTranscript(strip(transcript));
                  setScore(
                    format(distance(strip(word.value), strip(transcript))),
                  );
                } catch (error) {
                  console.log(error);
                }
              });
            }}
          />
          <br />
          {score && <h2>{score}% Match</h2>}
          <p>{transcript}</p>
          <br />
          {score && (
            <audio controls>
              <source src={URL.createObjectURL(recording)} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}
    </>
  );
};

export default Pronunciation;
