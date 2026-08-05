import React from "react";
import { flagEmoji } from "../utils/countries";

function Field({ label, value }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      <div className="field-value">{value}</div>
    </div>
  );
}

export default function ResultCard({ result, isFavorite, onToggleFavorite }) {
  if (!result) return null;

  if (!result.valid) {
    return (
      <section className="result-section gnc-fade-in">
        <div className="result-card invalid">
          <div className="result-status error">✖ Invalid Number</div>
          <div className="gnc-mono result-original">{result.original}</div>
          <div className="result-reason">{result.reason}</div>
        </div>
      </section>
    );
  }

  const { country, lineType, carrier, region, intl, e164 } = result;

  return (
    <section className="result-section gnc-fade-in">
      <div className="result-card valid">
        <div className="result-header">
          <div>
            <div className="result-status success">✔ Valid Number</div>
            <div className="gnc-mono result-e164">{e164}</div>
          </div>
          <div className="result-header-right">
            <div className="result-flag">{flagEmoji(country.iso2)}</div>
            <button
              className={"fav-btn" + (isFavorite ? " active" : "")}
              onClick={onToggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
              title={isFavorite ? "Remove from favorites" : "Save to favorites"}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        </div>

        <div className="result-body">
          <Field label="Country" value={`${country.name} ${flagEmoji(country.iso2)}`} />
          <Field label="Country Code" value={<span className="gnc-mono">+{country.dial}</span>} />
          <Field label="Location" value={region} />
          <Field label="Carrier" value={carrier} />
          <Field label="Line Type" value={lineType} />
          <Field label="International Format" value={<span className="gnc-mono">{intl}</span>} />
        </div>

        <div className="result-note">
          Data provided by the Numverify API.
        </div>
      </div>
    </section>
  );
}
