# Session Notes — Resume Here

## What was done in previous sessions

### 1. Project setup
- Cloned `sgtnacl/hexaching` into local machine
- Ran `npm install`
- Confirmed GitHub Actions auto-deploys to GitHub Pages on push to `main`

### 2. Added Wai Guang & Quotations sections (commit `1ef381b`)
- Extracted all 64 hexagrams' **Wai Guang** (external correspondences) and **Quotations** (world literature) sections from `pages/hatcher.pdf` using a Node.js script and `pdf-parse`
- Saved extracted data to `app/lib/hatcher_extras.json`
- Updated `app/lib/readings.ts` to load and expose `waiGuang` and `quotations` on `HexagramReading`
- Added two new cards at the bottom of the reading page in `app/hexaching-app.tsx`:
  - **Wai Guang — Outside Illustrations** (bulleted list)
  - **Quotations — Illustrations from World Literature** (blockquotes)

### 3. Added expandable Tarot write-up in Wai Guang section (commit `601adf5`)
- Fetched Bradford Hatcher's tarot card descriptions for all 64 hexagram-mapped cards from `https://castiching.com/bradford-hatcher/tarot`
- Saved to `app/lib/tarot_writeups.json`
- Updated `readings.ts` to expose `tarotWriteup: { cardName, writeup } | null` on `HexagramReading`
- The **Tarot** line in the Wai Guang card is now a "▼ read more" toggle that expands the full Bradford Hatcher write-up inline

### 4. Added expandable Qabalah write-up in Wai Guang section (commit `759eb7d`)
- Generated `app/lib/qabalah_writeups.json` — standard Golden Dawn Qabalah correspondences for all 78 tarot cards (Major Arcana: Tree of Life path, Hebrew letter, connecting Sephiroth, intelligence; court cards: elemental dignity + Sephiroth; numbered minors: Sephira + suit world)
- Generation script saved at `scripts/generate_qabalah.mjs`
- Updated `readings.ts` to expose `qabalachWriteup: { writeup } | null` on `HexagramReading`
- The **Qabalah** line in the Wai Guang card is now a "▼ read more" toggle (separate from and independent of the Tarot toggle)

### 5. UI and copy cleanup (commits `39bd143`, `bf376c8`, `5a851d0`, `bd4ece7`)
- Simplified header description to: "Enter six line values from bottom to top using 6, 7, 8, or 9 to reveal your hexagram."
- Removed the "traditional bottom-to-top line order" explanation box
- Moving lines section and relating hexagram are now hidden entirely when no moving lines are cast (all 7s and 8s)

## Current state
- All changes pushed to `main`; live at `https://sgtnacl.github.io/hexaching/`
- `pages/hatcher.pdf` is present locally but **not committed** to the repo (4.3 MB)
- `pages/hatcher_extras.json` also not committed (duplicate of `app/lib/hatcher_extras.json`)
- Latest commit: `bd4ece7`

## How to resume on another PC

```bash
git clone https://github.com/sgtnacl/hexaching
cd hexaching
npm install
npm run dev   # dev server at http://localhost:3000
```

Then open this file (`SESSION.md`) to catch up, and re-open in Claude Code:
```bash
claude
```
