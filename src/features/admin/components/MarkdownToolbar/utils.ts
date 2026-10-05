import type { MarkdownEdit } from "./types";

/** Applies a markdown edit to the textarea's current selection */
export function applyEdit(
  textarea: HTMLTextAreaElement,
  edit: MarkdownEdit,
  onChange: (value: string) => void,
) {
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  let next: string;
  let selStart: number;
  let selEnd: number;

  if (edit.kind === "wrap") {
    const selected = value.slice(start, end) || edit.placeholder;
    next =
      value.slice(0, start) +
      edit.before +
      selected +
      edit.after +
      value.slice(end);
    selStart = start + edit.before.length;
    selEnd = selStart + selected.length;
  } else {
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    next = value.slice(0, lineStart) + edit.prefix + value.slice(lineStart);
    selStart = start + edit.prefix.length;
    selEnd = end + edit.prefix.length;
  }

  onChange(next);
  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(selStart, selEnd);
  });
}
