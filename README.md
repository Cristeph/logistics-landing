# Cristeph Logistics — Web App

Customer-facing landing site, shipment tracking and customer/admin dashboards for Cristeph Logistics.
Talks to [`logistics-api`](https://github.com/Cristeph/logistics-api).

## Branches

| Branch   | Purpose                                                        |
|----------|----------------------------------------------------------------|
| `dev`    | All development. Branch features off `dev`, open PRs into `dev`. |
| `deploy` | Production. Only updated by merging `dev` → `deploy` via PR; the host builds from this branch. |

## Getting started

```bash
npm install
cp .env.example .env   # optional, see below
npm run dev            # http://localhost:5173
```

During development `/api/*` is proxied to `VITE_API_PROXY` (defaults to the hosted API).
In production the same path is rewritten by `public/_redirects` (Netlify).

## Scripts

| Script            | What it does                          |
|-------------------|---------------------------------------|
| `npm run dev`     | Vite dev server with HMR              |
| `npm run build`   | Production build into `build/`        |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | ESLint                                |
| `npm test`        | Unit tests (Vitest)                   |
