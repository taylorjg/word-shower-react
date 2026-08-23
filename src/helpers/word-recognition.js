export const WordRecognitionOutcome = Object.freeze({
  Accepted: "accepted",
  RejectedInvalid: "rejected-invalid",
  RejectedDuplicate: "rejected-duplicate",
  IgnoredConsecutive: "ignored-consecutive",
});

export const resolveWordRecognition = ({
  word,
  isWordValid,
  foundWords,
  lastRecognisedWord,
}) => {
  if (word === lastRecognisedWord) {
    return { outcome: WordRecognitionOutcome.IgnoredConsecutive };
  }

  if (isWordValid && foundWords.has(word)) {
    return { outcome: WordRecognitionOutcome.RejectedDuplicate, word };
  }

  if (isWordValid) {
    return { outcome: WordRecognitionOutcome.Accepted, word };
  }

  return { outcome: WordRecognitionOutcome.RejectedInvalid, word };
};
