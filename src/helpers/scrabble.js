const countsToLetters = new Map([
  [1, "jkqxz"],
  [2, "bcfhmpvwy"],
  [3, "g"],
  [4, "dlsu"],
  [6, "nrt"],
  [8, "o"],
  [9, "ai"],
  [12, "e"],
]);

const valuesToLetters = new Map([
  [1, "aeioulnstr"],
  [2, "dg"],
  [3, "bcmp"],
  [4, "fhvwy"],
  [5, "k"],
  [8, "jx"],
  [10, "qz"],
]);

const lettersToValues = new Map(
  Array.from(valuesToLetters.entries()).flatMap(([count, lettersString]) =>
    Array.from(lettersString).map((letter) => [letter, count])
  )
);

const getFullSetOfScrabbleLetters = () => {
  return Array.from(countsToLetters.entries()).flatMap(([count, letters]) =>
    Array.from(letters).flatMap((letter) => Array(count).fill(letter))
  );
};

export const fullSetOfScrabbleLetters = getFullSetOfScrabbleLetters();

const randomElement = (xs) => {
  const randomIndex = Math.floor(Math.random() * xs.length);
  return xs[randomIndex];
};

export const getRandomLetter = () => {
  return randomElement(fullSetOfScrabbleLetters);
};

export const getScrabbleScore = (word) => {
  return Array.from(word).reduce(
    (acc, letter) => acc + lookupLetterValue(letter),
    0
  );
};

export const lookupLetterValue = (letter) => lettersToValues.get(letter) ?? 0;
