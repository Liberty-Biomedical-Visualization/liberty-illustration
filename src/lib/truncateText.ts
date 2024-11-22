/**
 * Returns a string containing full words from `text` up to the
 * `characterLimit`.
 *
 * Appends `" …"` to the end of the string if the length of `text` exceeds the
 * `characterLimit`.
 *
 * Returns `"…"` if the length of the first word of `text` exceeds the
 * `characterLimit`.
 */
export default function truncateText(text: string, characterLimit: number) {
  const words = text.split(" ");
  const firstWord = words[0];

  if (firstWord && firstWord.length > characterLimit) {
    return "…";
  }

  let truncatedText = firstWord ?? "";
  const remainingWords = words.slice(1);

  for (const word of remainingWords) {
    const newTruncatedText = truncatedText + ` ${word}`;

    if (newTruncatedText.length > characterLimit) {
      truncatedText += " …";
      break;
    }

    truncatedText = newTruncatedText;
  }

  return truncatedText;
}
