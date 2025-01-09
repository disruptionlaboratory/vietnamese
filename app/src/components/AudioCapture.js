import React, { useState, useRef, useEffect } from "react";
import { WaveFile } from "wavefile";
import * as lamejs from "@breezystack/lamejs";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

const convertWavToMp3 = (wavBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const arrayBuffer = this.result;

      // Create a WAV decoder
      const wavDecoder = lamejs.WavHeader.readHeader(new DataView(arrayBuffer));

      // Get the WAV audio data as an array of samples
      const wavSamples = new Int16Array(
        arrayBuffer,
        wavDecoder.dataOffset,
        wavDecoder.dataLen / 2,
      );

      // Create an MP3 encoder
      const mp3Encoder = new lamejs.Mp3Encoder(
        wavDecoder.channels,
        wavDecoder.sampleRate,
        128,
      );

      // Encode the WAV samples to MP3
      const mp3Buffer = mp3Encoder.encodeBuffer(wavSamples);

      // Finalize the MP3 encoding
      const mp3Data = mp3Encoder.flush();

      // Combine the MP3 header and data into a new ArrayBuffer
      const mp3BufferWithHeader = new Uint8Array(
        mp3Buffer.length + mp3Data.length,
      );
      mp3BufferWithHeader.set(mp3Buffer, 0);
      mp3BufferWithHeader.set(mp3Data, mp3Buffer.length);

      // Create a Blob from the ArrayBuffer
      const mp3Blob = new Blob([mp3BufferWithHeader], { type: "audio/mp3" });

      resolve(mp3Blob);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    // Read the input blob as an ArrayBuffer
    reader.readAsArrayBuffer(wavBlob);
  });
};

const AudioCapture = () => {
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  useEffect(() => {
    const doConnect = async () => {
      await register(await connect());
    };

    doConnect().then(() => {
      console.log("Done!");
    });
  }, []);

  // useEffect(() => {
  //   let mediaStream;
  //
  //   const constraints = {
  //     audio: true,
  //     video: false,
  //   };
  //
  //   const handleSuccess = (localStream) => {
  //     setStream(localStream);
  //     mediaStream = localStream;
  //   };
  //
  //   const handleError = (err) => {
  //     console.error("Error accessing microphone:", err);
  //   };
  //
  //   navigator.mediaDevices
  //     .getUserMedia(constraints)
  //     .then(handleSuccess)
  //     .catch(handleError);
  //
  //   return () => {
  //     if (mediaStream) {
  //       mediaStream.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   if (stream && isRecording && !mediaRecorderRef.current) {
  //     mediaRecorderRef.current = new MediaRecorder(stream);
  //     mediaRecorderRef.current.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         recordedChunks.current.push(event.data);
  //       }
  //     };
  //     mediaRecorderRef.current.onstop = () => {
  //       // const blob = new Blob(recordedChunks.current, { type: "audio/webm" });
  //       // const blob = new Blob(recordedChunks.current, { type: "audio/mpeg" });
  //       const blob = new Blob(recordedChunks.current, { type: "audio/wav" });
  //
  //       convertWavToMp3(blob).then((mp3Blob) => {
  //         setRecordedAudio(URL.createObjectURL(mp3Blob));
  //         recordedChunks.current = [];
  //         // You can do something with the blob here, like upload it or play it back
  //         console.log("Recording stopped:", mp3Blob);
  //       });
  //
  //       // setRecordedAudio(URL.createObjectURL(blob));
  //       // recordedChunks.current = [];
  //       // // You can do something with the blob here, like upload it or play it back
  //       // console.log("Recording stopped:", blob);
  //     };
  //     mediaRecorderRef.current.start();
  //   }
  //
  //   return () => {
  //     if (mediaRecorderRef.current) {
  //       mediaRecorderRef.current.stop();
  //       mediaRecorderRef.current = null;
  //     }
  //   };
  // }, [stream, isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);

    return navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
        },
      })
      .then((stream) => {
        setRecordedChunks([]);

        let audioBlobs = [];
        let capturedStream = stream;

        // Use the extended MediaRecorder library
        let mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/wav",
        });

        // Add audio blobs while recording
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioBlobs.push(event.data);
        });

        mediaRecorder.start();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    return new Promise((resolve) => {
      if (!mediaRecorder) {
        resolve(null);
        return;
      }

      mediaRecorder.addEventListener("stop", () => {
        const mimeType = mediaRecorder.mimeType;
        const audioBlob = new Blob(audioBlobs, { type: mimeType });

        if (capturedStream) {
          capturedStream.getTracks().forEach((track) => track.stop());
        }

        resolve(audioBlob);
      });

      mediaRecorder.stop();
    });
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
