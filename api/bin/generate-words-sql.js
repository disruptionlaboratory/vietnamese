const path = require("path");
const fs = require("fs");
const { stripAwayUnhelpfulChars, lowerFirstCharacter } = require("./utils");

const generateWordsSql = async () => {
  const args = process.argv.slice(2);
  const dataFile = args[0];
  const pageName = args[1];
  const title = args[2];
  const pagesDir = "../../app/src/pages/";
  const resourcesDir = "../../app/src/resources/";

  const items = require(`${resourcesDir}${dataFile}`);

  items.map((item) => {
    const audioFile =
      lowerFirstCharacter(stripAwayUnhelpfulChars(item.key)) + "Audio";

    const sqlCode = `INSERT INTO \`words\` (\`term\`, \`translation\`,\`created\`, \`updated\`) VALUES ("${item.key}", "${item.value}", NOW(), NOW());`;
    console.log(sqlCode);
  });

  items.map((item) => {
    const audioFile =
      lowerFirstCharacter(stripAwayUnhelpfulChars(item.key)) + "Audio";
  });
};

generateWordsSql().then((result) => {});
