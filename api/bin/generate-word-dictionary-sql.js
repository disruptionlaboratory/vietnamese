const words = require("./word-dictionary-with-translations-and-phonetic-spellings.json");

words.map((word) => {
  // console.log(word);

  const sql = `INSERT INTO \`words\` (\`slug\`, \`term\`, \`translation\`, \`definition\`, \`grammar\`, \`phonetic\`, \`created\`, \`updated\`) VALUES ("${word.slug}", "${word.term}", "${word.translation}", "${word.definition}", "${word.grammar}", "${word.phonetic}", NOW(), NOW());`;
  console.log(sql);
});
