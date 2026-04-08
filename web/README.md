# Web (product app)

This directory is the **real application** for this repository: implement pages, layouts, and components here.

## Skills (read before building)

| Goal | Location |
|------|----------|
| **Visual & UX spec** — colors, type, components, motion | [`../design-md/<brand>/DESIGN.md`](../design-md/) |
| **React engineering** — performance, fetching, bundles, rendering | [`../react-best-practices/SKILL.md`](../react-best-practices/SKILL.md) and [`../react-best-practices/rules/`](../react-best-practices/rules/) |

Workflow: choose (or blend) a `design-md` system for **what** the UI should look like, then implement it with patterns from **react-best-practices** for **how** the code is structured.

## Scripts

```bash
cd web
npm install
npm run dev
```

- **`npm run build`** — production bundle to `dist/`
- **`npm run preview`** — serve the production build locally

## Dashboard

Apple-style **analytics dashboard** (ECharts + draggable grid) lives at **`/dashboard`**:

- Mock charts: table, pie, line, scatter, radar, parallel, map, lines, sunburst, candlestick, gauge, themeRiver, pictorialBar.
- Map / logistics charts load **`public/geo/world.json`** (~1 MB, same-origin). It must be **valid, complete GeoJSON** (no leading metadata lines or “truncated” tails); replace the file if the map stays on “Loading…”.
- **Edit layout** / **Save layout** — drag and resize via header handle; layout persisted in `localStorage` (`web-apple-dashboard-layouts-v1`).
- **Light / Dark** — toolbar toggle; preference in `localStorage` (`web-apple-theme`).
- **Detail** — click a tile body (view mode) to open `/dashboard/chart/:id` with a large view.

## Related

- **[`../preview-app/`](../preview-app/)** — dev server that lists every `design-md` HTML preview (light/dark) in one UI.
