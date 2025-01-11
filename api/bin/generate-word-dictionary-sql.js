const words = require("./word-dictionary-with-translations-and-phonetic-spellings.json");

words.map((word) => {
  const sql = `INSERT INTO \`words\` (\`slug\`, \`term\`, \`translation\`, \`definition\`, \`grammar\`, \`phonetic\`, \`created\`, \`updated\`) VALUES ("${word.slug}", "${word.term}", "${word.translation.substring(0, 45).replace(/"/g, "")}", "${word.definition.substring(0, 255)}", "${word.grammar}", "${word.phonetic.substring(0, 45).replace(/"/g, "")}", NOW(), NOW());`;
  console.log(sql);
});
