# agent-generated-webpage

This repository holds **agent-oriented skills** used to design and implement web pages consistently: one skill encodes **visual and UX design language** from real products; the other encodes **React and Next.js engineering practices**. Together they guide how we specify look-and-feel and how we ship performant, maintainable UI in code.

---

## `design-md/` — design specification skill

The **`design-md`** directory is the **design reference skill** for future site work. Each subfolder is a **brand-inspired design system** (not an official handoff from those companies) distilled into structured documentation and previews.

Typical contents per brand folder:

| Asset | Role |
|--------|------|
| **`DESIGN.md`** | Full design system notes: visual theme, color roles, typography, spacing, components, motion, and other tokens—written so agents can reproduce the **look, rhythm, and constraints** of that language. |
| **`preview.html` / `preview-dark.html`** | Standalone token and component catalogs (light/dark) to sanity-check tokens and hierarchy. |
| **`README.md`** | Short index and how to use that folder’s `DESIGN.md` with AI tooling. |

When we build or refresh pages, we treat **`design-md` as the canonical design spec skill**: pick (or blend) a target folder’s `DESIGN.md` and previews so implementation stays aligned with the chosen design language.

---

## `react-best-practices/` — React & Next.js implementation skill

The **`react-best-practices`** directory is the **full-stack React usage skill**—a structured rule set (from Vercel Engineering) for **writing, reviewing, and refactoring** React and Next.js, with emphasis on **performance, data fetching, bundles, rendering, and advanced patterns**.

Highlights:

- **`SKILL.md`** — When to apply the skill, category map, and quick reference to named rules.
- **`rules/`** — One markdown file per rule (async waterfalls, bundle size, server/client behavior, re-renders, rendering, JS micro-optimizations, advanced patterns).
- **`AGENTS.md`** — Compiled, agent-ready output (regenerated from `rules/` via the project’s build step).
- **`metadata.json`** — Version and document metadata.

Use this skill during implementation so we **avoid common pitfalls** (waterfalls, unnecessary re-renders, poor splitting, fragile effects, and similar issues) and keep pages **fast and idiomatic** for React/Next.js.

---

## How we use both skills together

1. **Design** — Start from the relevant **`design-md/.../DESIGN.md`** (and previews) so layout, typography, color, and component tone match the intended system.
2. **Engineering** — Follow **`react-best-practices`** (`SKILL.md` + `rules/` or built **`AGENTS.md`**) so the same UI is built with **sound React/Next.js patterns** and performance in mind.

Subsequent site and page work in this project is expected to be **guided end-to-end by these two skills**: **`design-md` for what it should look and feel like**, **`react-best-practices` for how it should be built in React**.

---

## Product app (`web/`)

The **`web/`** directory is the **real Vite + React + TypeScript application** where pages and components are implemented. It is separate from **`preview-app/`** (which only aggregates static `design-md` HTML previews).

```bash
cd web
npm install
npm run dev
```

See **`web/README.md`** for how it ties **`design-md`** and **`react-best-practices`** into the daily workflow.

---

## Local preview hub (`preview-app/`)

A small **Vite + React** app lists every brand under `design-md/` that has `preview.html`, and opens **light** / **dark** samples in a full-page iframe. Use it to browse all design token catalogs on one local server.

```bash
cd preview-app
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`). **`npm run build`** copies `design-md/` into `dist/design-md` so **`npm run preview`** can serve the same UI without the dev middleware.

---

## Repository layout (summary)

```
agent-generated-webpage/
├── design-md/              # Per-brand design specs + HTML previews
├── preview-app/            # Vite + React index + iframe viewer for all design-md samples
├── web/                    # Product app (Vite + React + TS) — implement the real site here
├── react-best-practices/   # React/Next.js rules, SKILL.md, build tooling
└── README.md               # This file
```

For maintenance of the React rule set (build, validate, add rules), see **`react-best-practices/README.md`**.
