# Parenting Library

A small library of interactive, mobile-first web apps — each one distills a
parenting book into something you can actually use: visualized, quizzed, and
searchable. **Personal study tools, not for public distribution.**

## Structure

- **`index.html`** — the library home / hub. Lists all five book apps with
  per-book progress, and is the front door of the site.
- **`cribsheet.html`** — *Cribsheet* (Emily Oster) — the evidence
- **`contented-baby.html`** — *The New Contented Little Baby Book* (Gina Ford) — the routines
- **`parenting-relationship.html`** — *The Book You Wish Your Parents Had Read* (Philippa Perry) — the connection
- **`whole-brain.html`** — *The Whole-Brain Child* (Siegel & Bryson) — the brain
- **`baby-sleep-science.html`** — *How Babies Sleep* (Helen Ball) — the biology
- **`chrome.js`** — shared chrome injected into every page: the single source of
  truth for the book list, the light/dark theme toggle (persisted across all
  apps), and the floating 📚 library switcher.

Each app is otherwise self-contained (its own colour theme and components) and
tracks its own reading progress in `localStorage`. The apps deliberately
disagree with each other on some topics — the Baby Sleep app's "Debates" tab
maps where the five authors diverge.

## Running it

Serve the folder (relative links between pages need a server):

```sh
python3 -m http.server 8000
# visit http://localhost:8000
```

Deployment to GitHub Pages is automated by `.github/workflows/pages.yml` on
every push to `main`.
