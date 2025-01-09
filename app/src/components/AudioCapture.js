import React, { useState, useRef, useEffect } from "react";
import { Mp3Encoder } from "@breezystack/lamejs";

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
        // Using webm for recording as it's cross-browser compatible but converting to MP3 as that's what the API expects
        const blob = new Blob(recordedChunks.current, { type: "audio/webm" });
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        async function loadWebm() {
          const arrayBuffer = await blob.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          return audioBuffer;
        }
        async function convertToMp3(audioBuffer) {
          const encoder = new Mp3Encoder(
            audioBuffer.numberOfChannels,
            audioBuffer.sampleRate,
            128,
          );
          let mp3Data = [];
          let samples = [];
          for (
            let channel = 0;
            channel < audioBuffer.numberOfChannels;
            channel++
          ) {
            const channelData = audioBuffer.getChannelData(channel);
            samples.push(new Float32Array(channelData.length));
            for (let i = 0; i < channelData.length; i++) {
              samples[channel][i] = channelData[i];
            }
          }
          const frameSize = 1152;
          let mp3buffer = new Uint8Array(
            encoder.encodeBuffer(
              new Int16Array(frameSize * audioBuffer.numberOfChannels),
            ),
          );
          for (let i = 0; i < Math.floor(samples[0].length / frameSize); i++) {
            const leftChannel = samples[0].slice(
              i * frameSize,
              (i + 1) * frameSize,
            );
            const rightChannel =
              samples.length > 1
                ? samples[1].slice(i * frameSize, (i + 1) * frameSize)
                : new Float32Array(frameSize);
            let inputBuffer = new Int16Array(
              leftChannel.length * audioBuffer.numberOfChannels,
            );
            for (let j = 0; j < leftChannel.length; j++) {
              inputBuffer[j * audioBuffer.numberOfChannels] = Math.max(
                -32768,
                Math.min(32767, leftChannel[j] * 32767),
              );
              if (rightChannel) {
                inputBuffer[j * audioBuffer.numberOfChannels + 1] = Math.max(
                  -32768,
                  Math.min(32767, rightChannel[j] * 32767),
                );
              }
            }
            let encodedData = encoder.encodeBuffer(inputBuffer);
            mp3Data.push(new Uint8Array(encodedData));
          }
          let finalEncodedData = encoder.flush();
          if (finalEncodedData) {
            mp3Data.push(finalEncodedData);
          }
          const combinedMp3Data = new Uint8Array(
            mp3Data.reduce((acc, curr) => acc + curr.length, 0),
          );
          let offset = 0;
          for (let i = 0; i < mp3Data.length; i++) {
            combinedMp3Data.set(new Uint8Array(mp3Data[i]), offset);
            offset += mp3Data[i].length;
          }
          const audioContext = new AudioContext();
          const source = audioContext.createBufferSource();
          const gainNode = audioContext.createGain();
          // return new Blob([combinedMp3Data], { type: "audio/mp3" });

          const file = new File([combinedMp3Data], "combined Mp3 Data.mp3", {
            type: "audio/mp3",
          });
          const base64EncodedString = btoa(file.text);

          console.log(base64EncodedString);

          return new Blob([combinedMp3Data], { type: "audio/mp3" });
        }
        loadWebm().then((audioBuffer) => {
          convertToMp3(audioBuffer).then((mp3Blob) => {
            // const objectUrl = URL.createObjectURL(mp3Blob);

            setRecordedAudio(URL.createObjectURL(mp3Blob));
            recordedChunks.current = [];
            // We should think about sending to API too..
            // const base64EncodedString = btoa(objectUrl);
            //
            // console.log(base64EncodedString);
          });
        });
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
