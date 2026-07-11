import { checkWord, resolveWordFromCandidates } from "./check-word";

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

  describe("resolveWordFromCandidates", () => {
    it("prefers a homophone that matches active letters", () => {
      const activeLetterWrappers = makeActiveLetters("pearls");
      expect(
        resolveWordFromCandidates(["pair", "pear"], activeLetterWrappers, false)
      ).toEqual({ word: "pear", isWordValid: true });
    });

    it("returns the top guess as invalid when no candidate matches", () => {
      const activeLetterWrappers = makeActiveLetters("zzzzzz");
      expect(
        resolveWordFromCandidates(["pair", "pare"], activeLetterWrappers, false)
      ).toEqual({ word: "pair", isWordValid: false });
    });

    it("returns null when no candidate meets the minimum length", () => {
      const activeLetterWrappers = makeActiveLetters("pearls");
      expect(
        resolveWordFromCandidates(["go", "be"], activeLetterWrappers, false)
      ).toBeNull();
    });
  });
});
