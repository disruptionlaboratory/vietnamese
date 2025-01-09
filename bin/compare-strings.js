const distance = require("jaro-winkler");

const removeChars = (chars) => (term) => {
  term = term.trim();
  chars.map((char) => {
    // term = term.replace(/\char/g, "");
    term = term.replace(new RegExp(char, "g"), "");
  });
  console.log(`term: ${term}`);
  return term;
};

const strip = removeChars(["!", ","]);

const format = (number) => {
  return (number * 100).toFixed(2);
};

console.log(format(distance(strip("Sin Chao"), strip("Xin Chao"))));
console.log(format(distance(strip("Xin chào"), strip(" Xin chào!"))));
