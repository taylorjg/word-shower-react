export const checkWord = (word, activeLetters, strictMode) => {
  return strictMode
    ? checkWordStrict(word, activeLetters)
    : checkWordLenient(word, activeLetters);
};

const checkWordStrict = (/* word, activeLetters */) => {
  // TODO: implement strict check re repeated letters
};

const checkWordLenient = (word, activeLetters) => {
  const letters = Array.from(word);
  return letters.every((letter) => activeLetters.includes(letter));
};
