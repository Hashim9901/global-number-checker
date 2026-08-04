import React from "react";

const STACK = [
  ["Frontend", "React.js, Vite, CSS, React Router"],
  ["Backend", "Convex — hosted functions + database, no server to run yourself"],
  ["API", "Numverify (validation, via a Convex action), REST Countries / FlagCDN (optional)"],
  ["Deployment", "Vercel (frontend), Convex Cloud (backend)"],
];

const FUTURE = [
  "QR code generation for contact sharing",
  "Save favorite numbers",
  "Copy formatted number to clipboard",
  "Export search history to CSV",
  "Multi-language support",
  "Voice input for phone numbers",
  "Analytics dashboard",
];

export default function About() {
  return (
    <section className="page-section">
      <h2 className="gnc-display">About this project</h2>
      <p className="muted">
        Global Number Checker validates phone numbers from any country and surfaces their
        country, carrier, line type, and international format — a compact showcase of API
        integration, form validation, and clean UI/UX in React.
      </p>

      <h3 className="gnc-display sub-heading">Tech stack</h3>
      <div className="stack-list">
        {STACK.map(([k, v]) => (
          <div className="stack-row" key={k}>
            <div className="stack-key">{k}</div>
            <div className="stack-val muted">{v}</div>
          </div>
        ))}
      </div>

      <h3 className="gnc-display sub-heading">Future improvements</h3>
      <ul className="future-list muted">
        {FUTURE.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </section>
  );
}
