# Cristeph Logistics — Web App

Customer-facing website, shipment tracking and customer/admin dashboards for Cristeph Logistics.
Talks to [`logistics-api`](https://github.com/Cristeph/logistics-api).

Built with React 19, React Router 7, Vite and Tailwind CSS 4.

## Branches

| Branch   | Purpose                                                        |
|----------|----------------------------------------------------------------|
| `dev`    | All development. Branch features off `dev`, open PRs into `dev`. |
| `deploy` | Production. Only updated by merging `dev` → `deploy` via PR; Netlify builds from this branch. |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:5173
```

`/api/*` is proxied to `VITE_API_PROXY` in development (and rewritten by `public/_redirects` on
Netlify), so the browser always talks to the API on the same origin. That is what lets the API use
an `httpOnly` session cookie instead of keeping tokens in `localStorage`.

To work fully offline, run the API against an in-memory database with demo data
(`npm run dev:memory` in `logistics-api`) and set `VITE_API_PROXY=http://localhost:8080`.

## Environment

| Variable                   | Notes |
|----------------------------|-------|
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack **public** key (`pk_...`). Set it in Netlify → Site settings → Environment variables. Without it, the Pay button explains that online payments aren't configured. |
| `VITE_API_PROXY`           | Dev only: where the dev server forwards `/api`. |

## Scripts

| Script            | What it does                          |
|-------------------|---------------------------------------|
| `npm run dev`     | Vite dev server with HMR              |
| `npm run build`   | Production build into `build/`        |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | ESLint                                |
| `npm test`        | Unit tests (Vitest)                   |

## Structure

```
src/
  components/ui/        design-system primitives (Button, Field, Modal, Table, Badge…)
  components/layout/    public header/footer, dashboard shell, route guards
  components/home/      landing-page sections
  components/tracking/  progress steps, timeline, Leaflet map (lazy-loaded)
  context/              auth session + toasts/confirm dialogs
  hooks/                useAsync (cancellable data loading), list params in the URL, …
  lib/                  API client, validators, formatting, Paystack, geocoding
  pages/                public pages, customer dashboard, admin dashboard
```

Security headers (CSP, HSTS, frame protection) are set in `public/_headers`.
