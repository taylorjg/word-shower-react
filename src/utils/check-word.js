export const checkWord = (word, activeLetterWrappers, strictMode) => {
  const activeLetters = activeLetterWrappers.map(({ letter }) => letter);
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
