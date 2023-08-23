export const checkWord = (word, activeLetterWrappers, strictMode) => {
  const activeLetters = activeLetterWrappers.map(({ letter }) => letter);
  return strictMode
    ? checkWordStrict(word, activeLetters)
    : checkWordLenient(word, activeLetters);
};

const makeLetterCountMap = (letters) => {
  const map = new Map();
  for (const letter of letters) {
    const oldCount = map.get(letter) ?? 0;
    const newCount = oldCount + 1;
    map.set(letter, newCount);
  }
  return map;
};

const checkWordStrict = (word, activeLetters) => {
  const wordLetters = Array.from(word);
  const wordLetterCounts = makeLetterCountMap(wordLetters);
  const activeLetterCounts = makeLetterCountMap(activeLetters);
  for (const [wordLetter, wordLetterCount] of wordLetterCounts) {
    const activeLetterCount = activeLetterCounts.get(wordLetter) ?? 0;
    if (wordLetterCount > activeLetterCount) return false;
  }
  return true;
};

const checkWordLenient = (word, activeLetters) => {
  const letters = Array.from(word);
  return letters.every((letter) => activeLetters.includes(letter));
};
