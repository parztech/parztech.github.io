// Armenian → Latin transliteration so post URLs stay readable and shareable
const ARMENIAN_TO_LATIN: Record<string, string> = {
  ա: "a",
  բ: "b",
  գ: "g",
  դ: "d",
  ե: "e",
  զ: "z",
  է: "e",
  ը: "y",
  թ: "t",
  ժ: "zh",
  ի: "i",
  լ: "l",
  խ: "kh",
  ծ: "ts",
  կ: "k",
  հ: "h",
  ձ: "dz",
  ղ: "gh",
  ճ: "ch",
  մ: "m",
  յ: "y",
  ն: "n",
  շ: "sh",
  ո: "o",
  չ: "ch",
  պ: "p",
  ջ: "j",
  ռ: "r",
  ս: "s",
  վ: "v",
  տ: "t",
  ր: "r",
  ց: "ts",
  ւ: "v",
  փ: "p",
  ք: "k",
  օ: "o",
  ֆ: "f",
  և: "ev",
};

const MAX_SLUG_LENGTH = 80;

/**
 * Turns any text into a URL slug. With `whileTyping`, a trailing hyphen is kept
 * so the slug field doesn't swallow "-" as the user types it.
 */
export function slugify(input: string, { whileTyping = false } = {}) {
  const slug = input
    .toLowerCase()
    .replace(/ու/g, "u")
    .replace(/./gu, (ch) => ARMENIAN_TO_LATIN[ch] ?? ch)
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/^-+/, "");
  return whileTyping ? slug : slug.replace(/-+$/, "");
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
