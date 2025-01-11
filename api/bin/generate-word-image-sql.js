const words = require("./word-dictionary-with-translations-and-phonetic-spellings.json");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
// const { generateFlatStyleIllustration } = require("./prompts");

let counter = 3734;

const getFilename = (counter) => {
  const padding =
    counter >= 1000 ? "" : counter >= 100 ? "0" : counter >= 10 ? "00" : "000";
  return `${padding}${counter}.image.sql`;
};

const process = async () => {
  for (const word of words) {
    if (word.grammar === "noun") {
      try {
        const response = await axios.post("http://127.0.0.1:3006/generate", {
          width: 512,
          height: 512,
          model: "Yntec/mistoonAnime2",
          prompt: `Create an illustration for the word "${word.term}", a noun, in the style of flat illustration`,
        });
        const imageData = response.data.image;

        const sql = `UPDATE \`words\`
                     SET \`image\` = "${imageData}"
                     WHERE \`slug\` = "${word.slug}";`;

        const filename = getFilename(counter);
        const filePath = path.join("./../db", filename);
        fs.writeFileSync(filePath, sql);
      } catch (error) {
        console.error(error);
      }
      counter += 1;
    }
  }
};

process().then(() => {
  console.log("Done!");
});
