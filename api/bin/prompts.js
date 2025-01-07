const generateKeyValueListOfPopularWordsBySubject = (subject) => {
  return `Provide JSON response to the following prompt using the fields "key" and "value". Here is an example:  {"key": "Mother","value": "Mẹ"}  Generate a list of popular words based on the subject and provide translations in Vietnamese.  Key will be the English term and value will be the translated term.  The subject: ${subject}.  No postamble or preamble required, nor markdown.`;
};

const generateKeyValuePhoneticListOfPopularWordsBySubject = (subject) => {
  return `Provide JSON response to the following prompt using the fields "key" and "value" and "phonetic". Here is an example:  {"key": "Mother","value": "Mẹ","phonetic": "/mə/"}  Generate a list of popular words based on the subject and provide translations in Vietnamese.  You will also provide the phonetic spelling of the Vietnamese word.  "key" will be the English term, "value" will be the translated term, "phonetic" will be the phonetic pronunciation of the Vietnamese word.  The subject: ${subject}.  No postamble or preamble required, nor markdown.`;
};

module.exports = {
  generateKeyValueListOfPopularWordsBySubject,
  generateKeyValuePhoneticListOfPopularWordsBySubject,
};
