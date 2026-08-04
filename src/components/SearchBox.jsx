import React, { useRef } from "react";
import { COUNTRIES, POPULAR_ISO2, flagEmoji } from "../utils/countries";
import Loader from "./Loader";

function CountryChip({ c, onPick }) {
  return (
    <button className="chip" onClick={() => onPick(c)}>
      <span>{flagEmoji(c.iso2)}</span>
      <span className="gnc-mono">+{c.dial}</span>
      <span className="chip-name">{c.name}</span>
    </button>
  );
}

export default function SearchBox({ value, onChange, onCheck, loading, detected }) {
  const inputRef = useRef(null);

  return (
    <section className="search-section">
      <div className="search-card">
        <div className="search-row">
          <div className="input-wrap">
            <input
              ref={inputRef}
              className="phone-input gnc-mono"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onCheck()}
              placeholder="+923001234567"
            />
            {detected && (
              <span className="detected-badge">
                {flagEmoji(detected.iso2)} {detected.name}
              </span>
            )}
          </div>
          <button className="check-btn" onClick={onCheck} disabled={loading}>
            {loading ? (
              <>
                <Loader /> Checking…
              </>
            ) : (
              "Check Number"
            )}
          </button>
        </div>

        <div className="chips">
          {POPULAR_ISO2.map((iso2) => {
            const c = COUNTRIES.find((x) => x.iso2 === iso2);
            return (
              <CountryChip
                key={iso2}
                c={c}
                onPick={(c) => {
                  onChange(`+${c.dial}`);
                  inputRef.current?.focus();
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
