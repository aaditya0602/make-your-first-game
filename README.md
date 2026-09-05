# Make Your First Game

A zero-install, browser-based tutorial that takes someone who has never
programmed from a blank screen to a small, playable game in about 20 minutes.
Built for a library / student-consultant teaching context: no accounts, no
backend, nothing to install beyond a browser — just open the page, read the
instructions, edit the code, and click Run.

**Who it's for:** complete beginners. No prior programming knowledge is
assumed anywhere in the five steps; every new idea is explained in plain
English before it's used.

**Live site:** https://aaditya0602.github.io/make-your-first-game/

It's a static site: React + TypeScript for the UI, CodeMirror 6 for the code
editor, and [Kaplay](https://kaplayjs.com/) as the in-browser game runtime.
Each run executes inside a sandboxed `<iframe>` with no network access, so
Kaplay itself is bundled into the page at build time instead of loaded from a
CDN (useful on unreliable library wifi). GitHub Actions builds and deploys
`dist/` to GitHub Pages on every push to `main`.

## How to run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static `dist/`
folder (works from any path, no server-side routing needed) and `npm run
preview` serves that build locally.

## The five steps

1. **Draw a sprite** — put a character on screen and move it around by hand-
   editing numbers.
2. **Move it with arrow keys** — give the character a name and make the
   arrow keys move it.
3. **Add something to collide with** — add an object the character can bump
   into, and make it disappear on contact.
4. **Add a score** — track and display a number that goes up when the
   character collects something.
5. **Win or lose** — collect every coin to win, touch a hazard to lose.

Each step's finished code is exactly the next step's starting code, so a
learner's own work carries forward continuously across all five steps. That
chain is checked automatically at runtime in `src/steps.ts` (it throws loudly
if a step's solution code and the next step's starter code ever drift apart).

Every step includes a "Show me the answer" control that loads the finished
code for that step, for a beginner who gets stuck, plus "Reset to working
code" to undo any edits, and a Step N of 5 progress indicator in the header.
