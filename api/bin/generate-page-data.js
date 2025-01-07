const axios = require("axios");
const path = require("path");
const fs = require("fs");
const items = require("../../app/src/resources/shapes.json");

const resourcesDir = "../../app/src/resources";
const audioDir = "../../app/src/resources/audio";

function queryOllama(prompt, model = "llama3.1", context = "") {
  return axios
    .post("http://127.0.0.1:11434/api/generate", {
      model: model,
      stream: false,
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

  // const template = `Provide JSON response to the following prompt using the fields "key" and "value" and "phonetic". Here is an example:  {"key": "Mother","value": "Mẹ","phonetic": "/mə/"}  Generate a list of popular words based on the subject and provide translations in Vietnamese.  You will also provide the phonetic spelling of the Vietnamese word.  Key will be the English term and value will be the translated term.  The subject: ${prompt}.  No postamble or preamble required, nor markdown.`;
  const template = `Provide JSON response to the following prompt using the fields "key" and "value". Here is an example:  {"key": "Mother","value": "Mẹ"}  Generate a list of popular words based on the subject and provide translations in Vietnamese.  Key will be the English term and value will be the translated term.  The subject: ${prompt}.  No postamble or preamble required, nor markdown.`;

  const content = await queryOllama(template, model);
  try {
    const items = JSON.parse(content);
    const output = [];
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
        // console.error(error);
      }
    }

    const filePath = path.join(resourcesDir, jsonOutputFile);
    fs.writeFileSync(filePath, JSON.stringify(output));

    console.log(output);
    // console.log(items);
  } catch (e) {
    console.log(e);
  }

  // console.log(content);
  // console.log("Processing Page Data...");
};

generatePageData().then(() => {
  // console.log("Done processing");
});
