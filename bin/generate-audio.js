const axios = require("axios");
const fs = require("fs");
const path = require("path");

const audioDir = "../app/src/resources/audio";

const items = require("../app/src/resources/shapes.json");
// const items = require("../resources/body-parts.json");
// const items = require("../resources/colours.json");

const output = [];

const generate = async () => {
  for (const item of items) {
    const { value: prompt, key } = item;
    try {
      const response = await axios.post("http://127.0.0.1:3007/generate", {
        prompt,
      });
      const audioData = response.data.audio;
      const decodedAudioBuffer = Buffer.from(audioData, "base64");
      const fileName = `${key.replace(/\s/g, "-")}-${prompt.replace(/\s/g, "-")}.mp3`;
      const filePath = path.join(audioDir, fileName);
      fs.writeFileSync(filePath, decodedAudioBuffer);

      output.push({
        ...item,
        audio: fileName,
      });
    } catch (error) {
      console.error(error);
    }
  }

  console.log(JSON.stringify(output));
};

generate();
