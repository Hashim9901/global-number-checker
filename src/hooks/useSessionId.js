import { useState } from "react";

const KEY = "gnc-session-id";

function makeId() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

// No login system here — each browser gets a random id (persisted in
// localStorage) so its history/favorites are its own bucket in Convex.
// Replace this with a real user id if you add Authentication.
export function useSessionId() {
  const [sessionId] = useState(() => {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = makeId();
      localStorage.setItem(KEY, id);
    }
    return id;
  });
  return sessionId;
}
