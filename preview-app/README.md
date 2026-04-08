# design-md preview hub

Small **Vite + React** app that lists every brand folder under the repository’s **`design-md/`** tree that contains `preview.html`, and opens the static **light** / **dark** HTML design-token catalogs in a full-page **iframe**.

This is **not** the product app (`../web/`). It exists only to browse and compare `design-md` samples in one local UI.

---

## What it does

| Capability | Details |
|------------|---------|
| **Discovery** | At build/dev config time, `vite.config.ts` scans `../design-md/*/preview.html` and injects the list as `__DESIGN_MD_ENTRIES__` (slug + humanized label). |
| **Index** (`/`) | Searchable grid of all brands; each row links to **Light** and **Dark** previews. |
| **Viewer** (`/view/:slug`) | Toolbar (back, theme toggle) + iframe pointing at `preview.html` or `preview-dark.html` for that folder. |
| **Static assets in dev** | A Vite middleware serves files from `../design-md` at URL prefix **`/design-md/…`** (path-safe; no `..` escapes). |
| **Production build** | `npm run build` copies the entire **`../design-md`** tree into **`dist/design-md`**, so `npm run preview` serves previews without the dev middleware. |

---

## Scripts

```bash
cd preview-app
npm install
npm run dev      # default: http://localhost:5173
npm run build    # TypeScript check + Vite build (+ copy design-md → dist)
npm run preview  # serve dist/ (includes design-md copies)
```

---

## Repository context

- **`design-md/<brand>/`** — `DESIGN.md`, `preview.html`, `preview-dark.html` (source of what this app previews).
- **`web/`** — real application; implement product UI there, not here.

Implementation follows **`../react-best-practices`** where practical (e.g. route-level `lazy` + `Suspense`, `useDeferredValue` on the index filter, module-level index data).

---

## Requirements

- Run commands from **`preview-app/`** so `../design-md` resolves correctly.
- Adding a new brand with `preview.html` under `design-md/` shows up after restart / rebuild (the list is fixed at config load time).
