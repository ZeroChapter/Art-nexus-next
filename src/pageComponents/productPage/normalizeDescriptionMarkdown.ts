/** Сжимает пробелы из старых описаний, не перенося текст после двоеточия. */
export function normalizeDescriptionMarkdown(source: string): string {
  return source
    .split("\n")
    .map((line) => line.replace(/[ \t]{2,}/g, " ").trimEnd())
    .join("\n");
}
