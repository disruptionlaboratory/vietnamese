const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { stripAwayUnhelpfulChars } = require("./utils");
const { generateKeyValueListOfPopularWordsBySubject } = require("./prompts");

const resourcesDir = "../../app/src/resources";
const audioDir = "../../app/src/resources/audio";

function queryLlm(prompt, model = "llama3.1", context = "") {
  return axios
    .post("http://127.0.0.1:8787/api/contents/generate", {
      model: model,
      system: "You are a helpful bot",
      prompt: context + prompt,
    })
    .then((response) => response.data.response)
    .catch((error) => {
      console.error("API call failed:", error.message);
      process.exit(1);
    });
}

const generatePageData = async () => {
  const args = process.argv.slice(2);
  const jsonOutputFile = args[0];
  const prompt = args[1];
  const model = "llama3.2-vision:11b";
  const template = generateKeyValueListOfPopularWordsBySubject(prompt);
  const content = await queryLlm(template, model);
  try {
    const items = JSON.parse(content);
    const output = [];
    for (const item of items) {
      const { value: prompt, key } = item;
      try {
        const response = await axios.post(
          "http://127.0.0.1:8787/api/audios/generate",
          {
            prompt,
          },
        );
        const audioData = response.data.audio;
        const decodedAudioBuffer = Buffer.from(audioData, "base64");
        const fileName = stripAwayUnhelpfulChars(`${key}-${prompt}`) + ".mp3";
        const filePath = path.join(audioDir, fileName);
        fs.writeFileSync(filePath, decodedAudioBuffer);
        output.push({
          ...item,
          audio: fileName,
        });
      } catch (error) {}
    }

    const filePath = path.join(resourcesDir, jsonOutputFile);
    fs.writeFileSync(filePath, JSON.stringify(output));
    console.log(output);
    // console.log(items);
  } catch (e) {
    console.log(e);
  }
};

generatePageData().then(() => {});
