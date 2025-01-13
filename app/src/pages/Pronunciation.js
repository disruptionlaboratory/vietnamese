import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
import AudioCapture from "../components/AudioCapture";
import axios from "axios";
import distance from "jaro-winkler";
import { Left, Play, Right } from "../components/Icon";

const Pronunciation = () => {
  const [preloading, setPreloading] = useState(true);
  const { theme, setTheme } = useThemeState();
  const [score, setScore] = useState("");
  const [words, setWords] = useState([]);
  const [word, setWord] = useState(null);
  const [track, setTrack] = useState(null);
  const audioPlayer = useRef(null);
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [originalAudio, setOriginalAudio] = useState(null);
  const [yourAudio, setYourAudio] = useState(null);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
    f: "grammar",
    v: "noun",
    o: "like",
  });
  const [directionOfTravel, setDirectionOfTravel] = useState("Forwards");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8787/api/words/paginate?offset=${pagination.offset}&limit=${pagination.limit}&f=${pagination.f}&v=${pagination.v}&o=${pagination.o}`,
      )
      .then((response) => {
        console.log(response.data);
        if (directionOfTravel === "Backwards") {
          const word = response.data.rows[response.data.rows.length - 1];
          setTrack(`data:audio/mpeg;base64,${word.audio}`);
          setWord(word);
          setScore("");
          setTranscript("");
        } else {
          const word = response.data.rows[0];
          setWord(word);
          setTrack(`data:audio/mpeg;base64,${word.audio}`);
          setScore("");
          setTranscript("");
        }
        setData(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8787/api/words/paginate?offset=${pagination.offset}&limit=${pagination.limit}&f=${pagination.f}&v=${pagination.v}&o=${pagination.o}`,
      )
      .then((response) => {
        if (directionOfTravel === "Backwards") {
          const word = response.data.rows[response.data.rows.length - 1];
          setWord(word);
          setTrack(`data:audio/mpeg;base64,${word.audio}`);
          setScore("");
          setTranscript("");
        } else {
          const word = response.data.rows[0];
          setWord(word);
          setTrack(`data:audio/mpeg;base64,${word.audio}`);
          setScore("");
          setTranscript("");
        }
        setData(response.data);
      });
  }, [pagination]);

  useEffect(() => {
    setTimeout(() => {
      setPreloading(false);
    }, Number(process.env.REACT_APP_PRELOADING_DELAY));
  }, []);

  console.log("Rendering");

  return (
    <>
      {/*<Header />*/}
      {/*<Sidebar />*/}
      {preloading && (
        <div className={`${theme} container preloading`}>
          <Logo fillColor={getFillColor(theme)} />
        </div>
      )}
      {!preloading && (
        <div className={`${theme} container main pronunciation`}>
          <div className="card">
            {/*<h1>Listening and Speaking</h1>*/}
            <h2 className="translation">{word?.translation}</h2>
            <div className="row card-row">
              <p className="phonetic">{word.phonetic}</p>
              <p className="grammar">{word.grammar}</p>
            </div>
            <p className="term">{word?.term}</p>
            <p className="definition">{word.definition}</p>
            <br />
            <button
              className="button-play"
              onClick={() => {
                const originalAudio = new Audio(
                  `data:audio/mpeg;base64,${word.audio}`,
                );
                setOriginalAudio(originalAudio);
                originalAudio.play();
              }}
            >
              {/*<Play />*/}
              Play "{word?.translation}"
            </button>
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

                    console.log(response.data);

                    const { transcript } = response.data;
                    const removeChars = (chars) => (term) => {
                      if (!term) {
                        return term;
                      }

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
                      format(
                        distance(strip(word.translation), strip(transcript)),
                      ),
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
              <>
                {/*<p>Listen to your version</p>*/}
                <button
                  className="button-play"
                  onClick={() => {
                    const yourAudio = new Audio(
                      window.URL.createObjectURL(recording),
                    );
                    setYourAudio(yourAudio);
                    yourAudio.play();
                  }}
                >
                  {/*<Play />*/}
                  Listen to your version
                </button>
              </>
            )}
            <div className="row navigation-controls">
              <button
                className="button"
                onClick={() => {
                  if (data && data.rows) {
                    setScore("");
                    setTranscript("");

                    const idx = data.rows.findIndex(
                      (row) => row.id === word.id,
                    );
                    const length = data.rows.length;
                    console.log(`idx: ${idx}`);
                    console.log(`${idx} / ${length - 1}`);
                    if (idx > 0) {
                      // we can keep cycling through current data
                      setWord(data.rows[idx - 1]);
                    } else {
                      console.log("We need to fetch previous pagination....");

                      const prevOffset =
                        pagination.offset > 0
                          ? pagination.offset - pagination.limit
                          : 0;

                      setDirectionOfTravel("Backwards");

                      setPagination({
                        ...pagination,
                        offset: prevOffset,
                      });
                    }
                  }
                }}
              >
                <Left />
              </button>
              <button
                className="button"
                onClick={() => {
                  if (data && data.rows) {
                    setScore("");
                    setTranscript("");

                    const idx = data.rows.findIndex(
                      (row) => row.id === word.id,
                    );
                    const length = data.rows.length;
                    console.log(`idx: ${idx}`);
                    console.log(`${idx} / ${length - 1}`);
                    if (idx < length - 1) {
                      // we can keep cycling through current data
                      setWord(data.rows[idx + 1]);
                    } else {
                      console.log("We need to fetch next pagination");

                      const nextOffset =
                        pagination.offset + pagination.limit <= data.count
                          ? pagination.offset + pagination.limit
                          : pagination.offset;

                      setDirectionOfTravel("Forwards");

                      setPagination({
                        ...pagination,
                        offset: nextOffset,
                      });
                    }
                  }
                }}
              >
                <Right />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pronunciation;
