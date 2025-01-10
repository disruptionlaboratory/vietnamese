const path = require("path");
const fs = require("fs");

const data = fs.readFileSync("word-dictionary.txt", "utf8");

const dictionaryArray = data.split("\n").map((line) => {
  const items = line.split("|").map((item) => {
    return item.trim();
  });

  const term = items[0];
  const grammar = items[1];
  const slug = `en-vi-${term}-${grammar}`.replace(/\s/g, "-");

  return {
    slug,
    term,
    grammar,
    definition: items[2],
  };
});

console.log(JSON.stringify(dictionaryArray));
