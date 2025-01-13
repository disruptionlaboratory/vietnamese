const words = require("./word-dictionary-with-translations-and-phonetic-spellings.json");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

let counter = 3;

const getFilename = (counter) => {
  const padding =
    counter >= 1000 ? "" : counter >= 100 ? "0" : counter >= 10 ? "00" : "000";
  return `${padding}${counter}.audio.sql`;
};

const process = async () => {
  for (const word of words) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8787/api/audios/generate",
        {
          prompt: word.translation,
        },
      );
      const audioData = response.data.audio;

      const sql = `UPDATE \`words\` SET \`audio\` = "${audioData}" WHERE \`slug\` = "${word.slug}";`;

      const filename = getFilename(counter);
      const filePath = path.join("./../db", filename);
      fs.writeFileSync(filePath, sql);
    } catch (error) {
      console.error(error);
    }

    counter += 1;
  }
};

process().then(() => {
  console.log("Done!");
});
