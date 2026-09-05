# Game Dev Teaching Tool

A zero-install, browser-based tool for teaching total beginners how to build a
small game step by step. Built for a library / student-consultant teaching
context: no accounts, no backend, nothing to install beyond a browser — just
open the page, read the instructions, edit the code, and click Run.

It's a static site: React + TypeScript for the UI, CodeMirror 6 for the code
editor, and [Kaplay](https://kaplayjs.com/) as the in-browser game runtime.
Each run executes inside a sandboxed `<iframe>` with no network access, so
Kaplay itself is bundled into the page at build time instead of loaded from a
CDN (useful on unreliable library wifi).

## How to run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/`
folder (works from any path, no server-side routing needed) and `npm run
preview` serves that build locally.

## Current state (Phase 1)

- Full app scaffold: three-column layout (instructions / editor / live
  preview), step navigation, Run / Reset-to-working-code controls, and
  per-step code persisted to `localStorage` so a refresh doesn't lose
  in-progress edits.
- **Step 1 - "Draw a sprite"** is fully working: real beginner-friendly
  instructions, starter code that draws Kaplay's built-in "bean" character
  sprite, and a live preview that actually runs it.
- **Steps 2-5** ("Move it with arrow keys", "Add something to collide with",
  "Add a score", "Win or lose") are stubs for now — they exist and are
  selectable in the step navigation, but their instructions just say
  `TODO: coming in Phase 2.` and their code is empty/placeholder.

## What Phase 2 adds

Real instructions, starter code, and solution code for steps 2 through 5:
moving a sprite with arrow keys, adding an obstacle/collectible to collide
with, keeping score, and a win/lose condition — turning the stub steps into
the same fully-working experience as Step 1.
