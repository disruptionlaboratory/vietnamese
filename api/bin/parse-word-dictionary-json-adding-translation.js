const words = require("./word-dictionary.json");
const { generateTranslation } = require("./prompts");
const { post } = require("axios");

function queryOllama(prompt, model = "llama3.1", context = "") {
  return post("http://127.0.0.1:11434/api/generate", {
    model: model,
    stream: false,
    prompt: context + prompt,
  });
}

// const model = "llama3.1:latest";
const model = "llama3.2-vision:11b";

const augmentedWords = [];

const process = async () => {
  for (const word of words) {
    try {
      const result = await queryOllama(
        generateTranslation({
          term: word.term,
          grammar: word.grammar,
          language: "Vietnamese (vi)",
        }),
      );
      const translation = result.data.response;
      augmentedWords.push({
        ...word,
        translation,
      });
    } catch (error) {
      console.log(error);

      console.log(JSON.stringify(augmentedWords));
      break;
    }
  }
};

process().then(() => {
  console.log(JSON.stringify(augmentedWords));
});
