const generateKeyValueListOfPopularWordsBySubject = (subject) => {
  return `Provide JSON response to the following prompt using the fields "key" and "value". Here is an example:  {"key": "Mother","value": "Mẹ"}  Generate a list of popular words based on the subject and provide translations in Vietnamese.  Key will be the English term and value will be the translated term.  The subject: ${subject}.  No postamble or preamble required, nor markdown.`;
};

const generateKeyValuePhoneticListOfPopularWordsBySubject = (subject) => {
  return `Provide JSON response to the following prompt using the fields "key" and "value" and "phonetic". Here is an example:  {"key": "Mother","value": "Mẹ","phonetic": "/mə/"}  Generate a list of popular words based on the subject and provide translations in Vietnamese.  You will also provide the phonetic spelling of the Vietnamese word.  "key" will be the English term, "value" will be the translated term, "phonetic" will be the phonetic pronunciation of the Vietnamese word.  The subject: ${subject}.  No postamble or preamble required, nor markdown.`;
};

const generateStudioGhibliStyleIllustration = (scene) => {
  return `${scene} in the style of Ghibli Studio animation from the 80s`;
};

const generateFlatStyleIllustration = (scene) => {
  return `${scene} in the style of flat illustration`;
};

const generateChaayaPrabhatStyleIllustration = (scene) => {
  return `${scene} in the style of the children's book "There's a hole in my Galaxy" illustrated by Chaaya Prabhat`;
};

const generateCollageStyleIllustration = (scene) => {
  return `${scene} in the style of collage`;
};

const generateTranslation = ({ term, language, grammar }) => {
  return `Without any preamble, postamble or markdown, please provide the ${language} translation for ${term}, the ${grammar}.`;
};

const generatePhoneticSpelling = ({ translation, language }) => {
  return `Without any preamble, postamble or markdown, please provide the phonetic spelling in format of International Phonetic Alphabet (IPA) for ${translation}, the ${language} word.  For example: Lan Tron becomes /län ˈtrɔn/`;
};

module.exports = {
  generateKeyValueListOfPopularWordsBySubject,
  generateKeyValuePhoneticListOfPopularWordsBySubject,
  generateStudioGhibliStyleIllustration,
  generateFlatStyleIllustration,
  generateChaayaPrabhatStyleIllustration,
  generateCollageStyleIllustration,
  generateTranslation,
  generatePhoneticSpelling,
};
