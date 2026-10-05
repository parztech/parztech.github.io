const WORDS_PER_MINUTE = 200;

export function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingMinutesForWords(words: number) {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Shared by the published post and the editor so both show the same estimate */
export function getReadingMinutes(text: string) {
  return readingMinutesForWords(countWords(text));
}
