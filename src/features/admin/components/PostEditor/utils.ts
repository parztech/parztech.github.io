import { WORDS_PER_MINUTE } from "./constants";

export function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

export function estimateReadingMinutes(words: number) {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
