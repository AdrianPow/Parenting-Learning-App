# Cribsheet Companion

A personal, mobile-first interactive learning app for absorbing the key evidence and takeaways from Emily Oster's *Cribsheet* without reading the whole book.

**Personal study tool — not for public distribution.**

## What's inside

A single self-contained page (`index.html`) — no build step, no dependencies, works offline. Open it in any browser.

- **Learn** — all 21 chapters organized into four collapsible parts. Five flagship decisions (breastfeeding, sleep position/SIDS, vaccines, childcare, sleep training) are built out as full modules with the underlying study data visualized; the rest are rich summaries with stat tiles, mini-charts, and each chapter's bottom-line takeaways. Progress is tracked in localStorage.
- **Quiz** — "Myth or Data?": 12 common parenting claims to judge against the evidence, with explanations and links into the modules.
- **Data** — an evidence dashboard ranking every major claim by strength (strong → refuted), plus an interactive sleep-schedule explorer for ages 0–36 months.
- **Decide** — Oster's decision framework (data + preferences + opportunity cost) as an interactive weigher for sleep training, breastfeeding, and childcare.

Light and dark themes, guess-the-number interactions in each full module, and an interactive day-care quality checklist based on the NICHD study criteria.

## Running it

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# visit http://localhost:8000
```
