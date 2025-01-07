const stripAwayUnhelpfulChars = (term) => {
  return term.replace(/\s/g, "-").replace(/\?/g, "");
};

const lowerFirstCharacter = (term) => {
  return term.substring(0, 1).toLowerCase() + term.substring(1);
};

const upperFirstCharacterLowerEverythingElse = (term) => {
  return term.substring(0, 1).toUpperCase() + term.toLowerCase().substring(1);
};

module.exports = {
  stripAwayUnhelpfulChars,
  upperFirstCharacterLowerEverythingElse,
  lowerFirstCharacter,
};
