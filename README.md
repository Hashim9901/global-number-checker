# Global Number Checker

Validate phone numbers from any country and see whether they're valid, along with
country, carrier, line type, and international format.

## Features

- Home page with hero, search box, and popular-country shortcuts
- Auto-detects the country as you type an international number
- Validation result card (country, code, location, carrier, line type, international format)
- **Favorites/Bookmarks** — star a valid result to save it, view/remove them on the Favorites page
- **Search History** — every check is logged, with **sorting** (click a column header) and
  **filtering** (All / Valid only / Invalid only) on the History page
- **Dark mode**
- Fully responsive (desktop / tablet / mobile)
- Backed by **Convex** — hosted database + serverless functions, no server for you to run

## Backend: Convex (not a custom server)

This project used to ship with a small Express server. It's been replaced with
[Convex](https://convex.dev), which hosts the database and functions for you —
there's no server process to deploy or keep running.

- `convex/schema.ts` — defines the `history` and `favorites` tables
- `convex/history.ts` — query/mutations for search history
- `convex/favorites.ts` — query/mutations for favorites
- `convex/numverify.ts` — an **action** that calls the real Numverify API from
  Convex's servers, so your API key never reaches the browser (opt-in, see below)

There's no login — each browser gets a random id (`src/hooks/useSessionId.js`,
stored in `localStorage`) so its history and favorites are its own bucket in
Convex. Swap that for a real user id if you add authentication later.

### Setup

```bash
npm install
npx convex dev
```

The first run of `npx convex dev` will:
- prompt you to log in / create a free Convex account
- create a new Convex deployment for this project
- write `VITE_CONVEX_URL` into `.env.local` automatically
- (optionally) generate `convex/_generated/` with typed function references —
  the app itself calls Convex via `anyApi` from the `convex` package, so it
  builds and runs even before you've run this, but you do need a real
  deployment (and `VITE_CONVEX_URL` pointing at it) for data to actually save.

Leave that command running in a terminal (it keeps your functions in sync), and
in another terminal run the frontend as usual:

```bash
npm run dev
```

### Live carrier data (optional)

By default, phone validation itself runs **locally** in the browser using a
small dial-code/length table (`src/utils/countries.js`) — carrier and location
are realistic only for Pakistan, and clearly labeled "Not available in demo"
elsewhere.

To get real data for every country via Numverify:
1. In the [Convex dashboard](https://dashboard.convex.dev), open your deployment →
   Settings → Environment Variables, and add `NUMVERIFY_API_KEY`.
2. In `.env.local`, set `VITE_USE_CONVEX_VALIDATION=true`.
3. Restart `npm run dev`. Checks now call `convex/numverify.ts`, which hits
   Numverify from Convex's servers and returns the result.

## Project structure

```
convex/
├── schema.ts          history + favorites tables
├── history.ts          query/mutations for search history
├── favorites.ts        query/mutations for favorites
└── numverify.ts         action: secure server-side Numverify call

src/
├── assets/
├── components/         Navbar, Hero, SearchBox, ResultCard, HistoryTable, Footer, Loader, ThemeToggle
├── pages/               Home, History, Favorites, About
├── services/            numverify.js — local validator, or calls the Convex action
├── utils/                countries.js, formatNumber.js
├── hooks/                useTheme.js, useHistory.js, useFavorites.js, useSessionId.js
├── convexClient.js
├── App.jsx
├── main.jsx
└── index.css
```

## Tech stack

- **Frontend:** React, Vite, plain CSS, React Router
- **Backend:** Convex (database + functions, hosted)
- **API:** Numverify (validation, via a Convex action)

## Deployment

- **Frontend:** deploy to [Vercel](https://vercel.com) — `npm run build`, output in `dist/`.
  Set `VITE_CONVEX_URL` (and `VITE_USE_CONVEX_VALIDATION` if used) as environment variables
  in your Vercel project settings.
- **Backend:** `npx convex deploy` pushes your `convex/` functions to production. No
  separate host needed.

## Future improvements

- Pagination on History/Favorites once lists grow large
- QR code generation for contact sharing
- Copy formatted number to clipboard
- Export search history to CSV
- Multi-language support
- Voice input for phone numbers
- Analytics dashboard
- Real authentication (replace the anonymous session id)
