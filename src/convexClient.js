import { ConvexReactClient } from "convex/react";

// Set by `npx convex dev` in .env.local, or manually in .env — see README.
export const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
