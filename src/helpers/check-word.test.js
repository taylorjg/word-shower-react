import { checkWord } from "./check-word";

describe("checkWord tests", () => {
  describe("strictMode false", () => {
    it("valid word", () => {
      const activeLetterWrappers = [
        { id: 0, letter: "A" },
        { id: 1, letter: "K" },
        { id: 2, letter: "B" },
        { id: 3, letter: "I" },
        { id: 4, letter: "C" },
        { id: 5, letter: "S" },
        { id: 6, letter: "D" },
      ];
      expect(checkWord("KISS", activeLetterWrappers, false)).toBe(true);
    });

    it("invalid word (Z not in list of active letters)", () => {
      const activeLetterWrappers = [
        { id: 0, letter: "A" },
        { id: 1, letter: "K" },
        { id: 2, letter: "B" },
        { id: 3, letter: "I" },
        { id: 4, letter: "C" },
        { id: 5, letter: "S" },
        { id: 6, letter: "D" },
      ];
      expect(checkWord("KIZZ", activeLetterWrappers, false)).toBe(false);
    });
  });

  describe("strictMode true", () => {
    it("valid word", () => {
      const activeLetterWrappers = [
        { id: 0, letter: "A" },
        { id: 1, letter: "K" },
        { id: 2, letter: "B" },
        { id: 3, letter: "I" },
        { id: 4, letter: "C" },
        { id: 5, letter: "S" },
        { id: 6, letter: "D" },
        { id: 7, letter: "S" },
        { id: 8, letter: "E" },
      ];
      expect(checkWord("KISS", activeLetterWrappers, true)).toBe(true);
    });

    it("invalid word (second S missing from list of active letters)", () => {
      const activeLetterWrappers = [
        { id: 0, letter: "A" },
        { id: 1, letter: "K" },
        { id: 2, letter: "B" },
        { id: 3, letter: "I" },
        { id: 4, letter: "C" },
        { id: 5, letter: "S" },
        { id: 6, letter: "D" },
      ];
      expect(checkWord("KISS", activeLetterWrappers, true)).toBe(false);
    });
  });
});
