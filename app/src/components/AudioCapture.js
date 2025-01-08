import React, { useState, useRef, useEffect } from "react";

const AudioCapture = () => {
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  useEffect(() => {
    let mediaStream;

    const constraints = {
      audio: true,
      video: false,
    };

    const handleSuccess = (localStream) => {
      setStream(localStream);
      mediaStream = localStream;
    };

    const handleError = (err) => {
      console.error("Error accessing microphone:", err);
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (stream && isRecording && !mediaRecorderRef.current) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "audio/webm" });
        setRecordedAudio(URL.createObjectURL(blob));
        recordedChunks.current = [];
        // You can do something with the blob here, like upload it or play it back
        console.log("Recording stopped:", blob);
      };
      mediaRecorderRef.current.start();
    }

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null;
      }
    };
  }, [stream, isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={!stream || isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!stream || !isRecording}>
        Stop Recording
      </button>
      {recordedAudio && (
        <audio controls src={recordedAudio}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioCapture;
