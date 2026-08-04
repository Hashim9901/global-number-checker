// This is the single place that knows how to validate a phone number.
//
// By default it validates locally with the heuristic table below — no
// setup required. Set VITE_USE_CONVEX_VALIDATION=true (and configure
// NUMVERIFY_API_KEY in your Convex dashboard) to instead call the
// convex/numverify.ts action, which hits the real Numverify API from
// Convex's servers so your key never reaches the browser.

import { COUNTRIES, pkCarrierLookup } from "../utils/countries";
import { normalizeInput, formatInternational } from "../utils/formatNumber";
import { convex } from "../convexClient";
import { anyApi } from "convex/server";
const api = anyApi;

const USE_CONVEX_VALIDATION = import.meta.env.VITE_USE_CONVEX_VALIDATION === "true";

export async function checkNumber(raw) {
  if (USE_CONVEX_VALIDATION) {
    return convex.action(api.numverify.validate, { number: raw });
  }
  return checkNumberLocal(raw);
}

function checkNumberLocal(raw) {
  const s = normalizeInput(raw);
  const original = raw.trim();

  // Simulate the latency of a real API call so the loading state feels right.
  return new Promise((resolve) => {
    setTimeout(() => resolve(validate(s, original)), 500);
  });
}

function validate(s, original) {
  if (!s.startsWith("+") || s.length < 6) {
    return { valid: false, original, reason: "Enter a number in international format, e.g. +923001234567" };
  }

  const digits = s.slice(1);
  if (!/^\d+$/.test(digits)) {
    return { valid: false, original, reason: "Phone numbers can only contain digits after the + sign." };
  }

  const country = COUNTRIES.find((c) => digits.startsWith(c.dial));
  if (!country) {
    return { valid: false, original, reason: "Country code not recognized." };
  }

  const national = digits.slice(country.dial.length);

  if (national.length !== country.len) {
    return {
      valid: false,
      original,
      reason: `${country.name} numbers should have ${country.len} digits after +${country.dial} (got ${national.length}).`,
    };
  }

  let lineType = "Mobile";
  if (country.mobileLead) {
    lineType = country.mobileLead.includes(national[0]) ? "Mobile" : "Landline";
  } else {
    lineType = "Mobile / Landline (not distinguishable)";
  }

  let carrier = "Not available in demo";
  let region = country.region;
  if (country.iso2 === "PK" && lineType === "Mobile") {
    const info = pkCarrierLookup(national);
    carrier = info.carrier;
    region = info.region;
  }

  return {
    valid: true,
    original,
    country,
    lineType,
    carrier,
    region,
    intl: formatInternational(country.dial, national),
    e164: `+${digits}`,
  };
}
