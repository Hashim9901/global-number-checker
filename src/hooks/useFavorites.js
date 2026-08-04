import { useMutation, useQuery } from "convex/react";
import { anyApi } from "convex/server";
const api = anyApi;
import { useSessionId } from "./useSessionId";

export function useFavorites() {
  const sessionId = useSessionId();
  const raw = useQuery(api.favorites.list, { sessionId });
  const addMutation = useMutation(api.favorites.add);
  const removeMutation = useMutation(api.favorites.remove);

  const favorites = raw ?? [];
  const loading = raw === undefined;

  function addFavorite(result) {
    if (!result?.valid) return;
    addMutation({
      sessionId,
      e164: result.e164,
      country: result.country.name,
      dial: result.country.dial,
      region: result.region,
      carrier: result.carrier,
      lineType: result.lineType,
      intl: result.intl,
    });
  }

  function removeFavorite(e164) {
    removeMutation({ sessionId, e164 });
  }

  function isFavorite(e164) {
    return favorites.some((f) => f.e164 === e164);
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, loading };
}
