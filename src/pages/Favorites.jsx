import React from "react";

export default function Favorites({ favorites, onRemove, loading }) {
  return (
    <section className="page-section">
      <div className="section-header">
        <h2 className="gnc-display">Favorites</h2>
      </div>

      {loading ? (
        <div className="empty-state">Loading…</div>
      ) : favorites.length === 0 ? (
        <div className="empty-state">
          No favorites yet. Tap the star (☆) on a valid result to save it here.
        </div>
      ) : (
        <div className="table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Country</th>
                <th>Carrier</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((f) => (
                <tr key={f._id}>
                  <td className="gnc-mono">{f.intl}</td>
                  <td>{f.country}</td>
                  <td>{f.carrier}</td>
                  <td>{f.lineType}</td>
                  <td>
                    <button className="link-btn danger" onClick={() => onRemove(f.e164)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="muted small">
        Favorites are stored in Convex, keyed to this browser.
      </div>
    </section>
  );
}
