import React, { useMemo, useState } from "react";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "valid", label: "Valid only" },
  { id: "invalid", label: "Invalid only" },
];

export default function HistoryTable({ history, onClear, loading }) {
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const rows = useMemo(() => {
    let r = history;
    if (filter === "valid") r = r.filter((h) => h.valid);
    if (filter === "invalid") r = r.filter((h) => !h.valid);

    if (sortKey) {
      r = [...r].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av === bv) return 0;
        const cmp = av > bv ? 1 : -1;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return r;
  }, [history, filter, sortKey, sortDir]);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function arrow(key) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ▲" : " ▼";
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h2 className="gnc-display">Search History</h2>
        {history.length > 0 && (
          <button className="link-btn danger" onClick={onClear}>Clear</button>
        )}
      </div>

      {history.length > 0 && (
        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={"filter-chip" + (filter === f.id ? " active" : "")}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="empty-state">Loading…</div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          No searches yet. Numbers you check will show up here.
        </div>
      ) : rows.length === 0 ? (
        <div className="empty-state">No results match this filter.</div>
      ) : (
        <div className="table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => toggleSort("number")}>
                  Number{arrow("number")}
                </th>
                <th className="sortable" onClick={() => toggleSort("country")}>
                  Country{arrow("country")}
                </th>
                <th className="sortable" onClick={() => toggleSort("valid")}>
                  Valid{arrow("valid")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((h) => (
                <tr key={h._id}>
                  <td className="gnc-mono">{h.number}</td>
                  <td>{h.country}</td>
                  <td>{h.valid ? <span className="ok">✔</span> : <span className="bad">✖</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="muted small">
        History is stored in Convex, keyed to this browser.
      </div>
    </section>
  );
}
