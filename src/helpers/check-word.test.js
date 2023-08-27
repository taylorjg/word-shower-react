import { checkWord } from "./check-word";

const makeActiveLetters = (letters) => {
  return Array.from(letters).map((letter, id) => ({
    id,
    letter,
  }));
};

describe("checkWord tests", () => {
  describe("strictMode false", () => {
    const strictMode = false;

    it("valid word", () => {
      const activeLetterWrappers = makeActiveLetters("akbicsd");
      expect(checkWord("kiss", activeLetterWrappers, strictMode)).toBe(true);
    });

    it("invalid word ('z' not in list of active letters)", () => {
      const activeLetterWrappers = makeActiveLetters("akbicsd");
      expect(checkWord("kizz", activeLetterWrappers, strictMode)).toBe(false);
    });
  });

  describe("strictMode true", () => {
    const strictMode = true;

    it("valid word", () => {
      const activeLetterWrappers = makeActiveLetters("akbicsdse");
      expect(checkWord("kiss", activeLetterWrappers, strictMode)).toBe(true);
    });

    it("invalid word ('z' not in list of active letters)", () => {
      const activeLetterWrappers = makeActiveLetters("akbicsd");
      expect(checkWord("KIZZ", activeLetterWrappers, strictMode)).toBe(false);
    });

    it("invalid word (second 's' missing from list of active letters)", () => {
      const activeLetterWrappers = makeActiveLetters("akbicsd");
      expect(checkWord("kiss", activeLetterWrappers, strictMode)).toBe(false);
    });
  });
});
