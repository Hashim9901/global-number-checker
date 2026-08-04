import React from "react";
import HistoryTable from "../components/HistoryTable";

export default function History({ history, onClear, loading }) {
  return <HistoryTable history={history} onClear={onClear} loading={loading} />;
}
