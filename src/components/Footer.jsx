import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      Global Number Checker — validation logic runs client-side by default; point{" "}
      <code>VITE_API_BASE_URL</code> at the included Express server for live Numverify data.
    </footer>
  );
}
