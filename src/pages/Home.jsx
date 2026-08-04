import React, { useMemo, useState } from "react";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import ResultCard from "../components/ResultCard";
import { detectCountry } from "../utils/formatNumber";
import { checkNumber } from "../services/numverify";

export default function Home({ onResult, isFavorite, onAddFavorite, onRemoveFavorite }) {
  const [value, setValue] = useState("+923001234567");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const detected = useMemo(() => detectCountry(value), [value]);

  async function handleCheck() {
    if (!value.trim()) return;
    setLoading(true);
    try {
      const r = await checkNumber(value);
      setResult(r);
      onResult(r);
    } finally {
      setLoading(false);
    }
  }

  function handleToggleFavorite() {
    if (!result?.valid) return;
    if (isFavorite(result.e164)) {
      onRemoveFavorite(result.e164);
    } else {
      onAddFavorite(result);
    }
  }

  return (
    <>
      <Hero />
      <SearchBox
        value={value}
        onChange={setValue}
        onCheck={handleCheck}
        loading={loading}
        detected={detected}
      />
      <ResultCard
        result={result}
        isFavorite={result?.valid && isFavorite(result.e164)}
        onToggleFavorite={handleToggleFavorite}
      />
      <div style={{ height: 48 }} />
    </>
  );
}
