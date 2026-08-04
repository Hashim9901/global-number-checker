import { useMutation, useQuery } from "convex/react";
import { anyApi } from "convex/server";
const api = anyApi;
import { useSessionId } from "./useSessionId";

export function useHistory() {
  const sessionId = useSessionId();
  const raw = useQuery(api.history.list, { sessionId });
  const addMutation = useMutation(api.history.add);
  const clearMutation = useMutation(api.history.clear);

  const history = raw ?? [];
  const loading = raw === undefined;

  function addEntry(result) {
    addMutation({
      sessionId,
      number: result.original,
      country: result.valid ? result.country.name : "—",
      valid: result.valid,
    });
  }

  function clearHistory() {
    clearMutation({ sessionId });
  }

  return { history, addEntry, clearHistory, loading };
}

