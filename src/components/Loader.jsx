import React from "react";

export default function Loader({ size = 16 }) {
  return (
    <svg className="spinner" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="50"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
