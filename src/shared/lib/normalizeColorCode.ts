export function normalizeColorCode(code: string | undefined | null): string {
  return (code ?? "").trim().toLowerCase();
}
