import {
  resolveWordRecognition,
  WordRecognitionOutcome,
} from "./word-recognition";

describe("resolveWordRecognition", () => {
  it("ignores consecutive identical recognition", () => {
    expect(
      resolveWordRecognition({
        word: "kiss",
        isWordValid: true,
        foundWords: new Set(["kiss"]),
        lastRecognisedWord: "kiss",
      })
    ).toEqual({ outcome: WordRecognitionOutcome.IgnoredConsecutive });
  });

  it("rejects a valid word that was already found", () => {
    expect(
      resolveWordRecognition({
        word: "kiss",
        isWordValid: true,
        foundWords: new Set(["kiss"]),
        lastRecognisedWord: "pear",
      })
    ).toEqual({
      outcome: WordRecognitionOutcome.RejectedDuplicate,
      word: "kiss",
    });
  });

  it("accepts a new valid word", () => {
    expect(
      resolveWordRecognition({
        word: "pear",
        isWordValid: true,
        foundWords: new Set(["kiss"]),
        lastRecognisedWord: "kiss",
      })
    ).toEqual({ outcome: WordRecognitionOutcome.Accepted, word: "pear" });
  });

  it("rejects an invalid word", () => {
    expect(
      resolveWordRecognition({
        word: "zzzz",
        isWordValid: false,
        foundWords: new Set(),
        lastRecognisedWord: undefined,
      })
    ).toEqual({
      outcome: WordRecognitionOutcome.RejectedInvalid,
      word: "zzzz",
    });
  });
});
