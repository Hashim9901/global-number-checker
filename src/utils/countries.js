// Reference table used for client-side validation, formatting, and
// country/carrier detection. In production this is exactly the kind
// of data the Numverify API returns live — this table is a local
// stand-in so the app works fully without a backend.

export const COUNTRIES = [
  { iso2: "PK", name: "Pakistan", dial: "92", len: 10, mobileLead: ["3"], region: "South Asia" },
  { iso2: "IN", name: "India", dial: "91", len: 10, mobileLead: ["6", "7", "8", "9"], region: "South Asia" },
  { iso2: "US", name: "United States", dial: "1", len: 10, mobileLead: null, region: "North America" },
  { iso2: "GB", name: "United Kingdom", dial: "44", len: 10, mobileLead: ["7"], region: "Europe" },
  { iso2: "AE", name: "United Arab Emirates", dial: "971", len: 9, mobileLead: ["5"], region: "Middle East" },
  { iso2: "SA", name: "Saudi Arabia", dial: "966", len: 9, mobileLead: ["5"], region: "Middle East" },
  { iso2: "CN", name: "China", dial: "86", len: 11, mobileLead: ["1"], region: "East Asia" },
  { iso2: "DE", name: "Germany", dial: "49", len: 11, mobileLead: ["1"], region: "Europe" },
  { iso2: "FR", name: "France", dial: "33", len: 9, mobileLead: ["6", "7"], region: "Europe" },
  { iso2: "AU", name: "Australia", dial: "61", len: 9, mobileLead: ["4"], region: "Oceania" },
  { iso2: "BR", name: "Brazil", dial: "55", len: 11, mobileLead: null, region: "South America" },
  { iso2: "NG", name: "Nigeria", dial: "234", len: 10, mobileLead: ["7", "8", "9"], region: "Africa" },
  { iso2: "BD", name: "Bangladesh", dial: "880", len: 10, mobileLead: ["1"], region: "South Asia" },
  { iso2: "TR", name: "Turkey", dial: "90", len: 10, mobileLead: ["5"], region: "Europe" },
  { iso2: "ZA", name: "South Africa", dial: "27", len: 9, mobileLead: ["6", "7", "8"], region: "Africa" },
  { iso2: "JP", name: "Japan", dial: "81", len: 10, mobileLead: ["7", "8", "9"], region: "East Asia" },
  { iso2: "ID", name: "Indonesia", dial: "62", len: 10, mobileLead: ["8"], region: "Southeast Asia" },
  { iso2: "EG", name: "Egypt", dial: "20", len: 10, mobileLead: ["1"], region: "Africa" },
].sort((a, b) => b.dial.length - a.dial.length); // longest dial code first when matching prefixes

export const POPULAR_ISO2 = ["US", "GB", "PK", "IN", "AE"];

// Demo-only carrier + region table for Pakistan. Numverify (or any live
// provider) would replace this entirely for every country.
export function pkCarrierLookup(national) {
  const p = parseInt(national.slice(0, 3), 10);
  if ((p >= 300 && p <= 309) || (p >= 320 && p <= 329)) return { carrier: "Jazz", region: "Punjab" };
  if (p >= 310 && p <= 319) return { carrier: "Zong", region: "Punjab / Islamabad" };
  if (p >= 330 && p <= 339) return { carrier: "Ufone", region: "Punjab" };
  if (p >= 340 && p <= 349) return { carrier: "Telenor", region: "Sindh" };
  return { carrier: "Unknown", region: "Pakistan" };
}

export function flagEmoji(iso2) {
  return iso2
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}
