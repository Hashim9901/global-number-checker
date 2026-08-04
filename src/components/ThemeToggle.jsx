import React from "react";

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button onClick={onToggle} aria-label="Toggle dark mode" className="theme-toggle">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
