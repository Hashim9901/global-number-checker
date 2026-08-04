import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const TABS = [
  { to: "/", label: "Home" },
  { to: "/history", label: "History" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <span>📡</span>
          <span className="gnc-display logo-text">Global Number Checker</span>
        </div>

        <nav className="nav-tabs">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === "/"}
              className={({ isActive }) => "nav-tab" + (isActive ? " active" : "")}
            >
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-right">
          <select
            className="nav-select"
            onChange={(e) => navigate(e.target.value)}
            value={location.pathname}
          >
            {TABS.map((t) => (
              <option key={t.to} value={t.to}>{t.label}</option>
            ))}
          </select>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
