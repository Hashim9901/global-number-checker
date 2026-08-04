import { COUNTRIES } from "./countries";

// Strip spaces/dashes/parens, turn a leading "00" into "+".
export function normalizeInput(raw) {
  let s = raw.trim().replace(/[\s\-().]/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  return s;
}

// Best-effort live detection as the user types (used for the inline
// flag badge in the search box).
export function detectCountry(raw) {
  const s = normalizeInput(raw);
  if (!s.startsWith("+")) return null;
  const digits = s.slice(1);
  for (const c of COUNTRIES) {
    if (digits.startsWith(c.dial)) return c;
  }
  return null;
}

// +92 300 1234567 style grouping.
export function formatInternational(dial, national) {
  return `+${dial} ${national.slice(0, 3)} ${national.slice(3)}`.trim();
}
