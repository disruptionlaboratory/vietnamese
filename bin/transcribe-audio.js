const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const transcribeAudio = async () => {
  return new Promise(async (resolve, reject) => {
    // const buffer = await fs.readFile("./Hello-Xin-chào.mp3");
    const buffer = await fs.readFile("./How-are-you-Bạn-thế-nào.mp3");
    // const buffer = await fs.readFile("./audio.webm");
    // const buffer = await fs.readFile("./audio.wav");
    const base64String = buffer.toString("base64");

    try {
      const response = await axios.post(
        "http://127.0.0.1:3008/transcribe",
        {
          audio: base64String,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
          },
        },
      );
      resolve(response.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }

    // resolve(response.data);
  });
};

transcribeAudio().then((result) => {
  console.log(result);
});
