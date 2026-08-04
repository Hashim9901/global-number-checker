import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-icon-wrap">
        <span className="ring" />
        <span className="ring d1" />
        <span className="ring d2" />
        <div className="hero-icon">📞</div>
      </div>
      <h1 className="gnc-display hero-title">Know exactly whose line that is.</h1>
      <p className="hero-sub">
        Paste any phone number, from any country, and instantly see if it's valid — along
        with its carrier, line type, and international format.
      </p>
    </section>
  );
}
