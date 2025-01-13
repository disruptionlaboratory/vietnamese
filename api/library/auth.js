const md5 = require("md5");
const uuid = require("uuid");

const hash = (password) => md5(`${process.env.HASH_SEED} ${password}`);

const generateUuid = () => {
  return uuid.v4();
};

module.exports = {
  hash,
  uuid: generateUuid,
};
