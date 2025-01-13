import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = ({ audio }) => {
  console.log("AudioPlayer rendering");

  const [track, setTrack] = useState(`data:audio/mpeg;base64,${audio}`);

  const audioPlayer = useRef(null);

  useEffect(() => {});

  console.log(audio?.substring(0, 200));

  return (
    <audio ref={audioPlayer} src={track} controls>
      {/*<source src={`data:audio/mpeg;base64,${audio}`} type="audio/mpeg" />*/}
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
