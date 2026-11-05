# Plan: Installation Journal Website (6 stations, narrator, passkeys)

## Context
Mobile-first web journal reached by QR code at an interactive installation. Visitors enter a name, find 5 stations in any order (each has a hidden passkey word on a physical object), read a typewriter-style archive log, then answer via the narrator (Deny / Mixed / Accept). Choices score points that decide which ending plays at Station 6, which unlocks only after all 5 are done. A hidden "?" ending exists. Project is an empty Vite + React 19 + Tailwind v4 scaffold (`src/App.tsx` is blank, `src/index.css` only imports Tailwind).

## Reference read (from your 4 images)
- **MEK.txt / princess.online**: 1-bit dithered/halftone imagery, thin ruled grid with hairline dividers, tiny tab nav, small underlined links, dense but calm "old web journal" layout, "*" bullet entries, dotted-rule section headers.
- **Palettes**: blush `#FFEBED`/`#E8B6B9`, teal `#9BBCB7`, amethyst `#27153D`, warm black `#23160E`. Adopt as-is; add only a darker teal for text-on-blush contrast if needed.
- Stance (honoring brief literally): **retro dithered journal, mystery**. Paper = blush ground, ink = warm black, amethyst for the night/locked states, teal for "unlocked", rose for accents. Grain via SVG-noise overlay + CSS dither/halftone patterns; no gradients.

## Design decisions
- **Fonts (Google, via `@import` at top of `src/index.css`)**: display = *UnifrakturCook* or *Pirata One* style gothic is too loud; use **"IM Fell English"/"IM Fell DW Pica"** for journal body (old print feel) and **"Pirata One"** (or "Jacquard 12" pixel-blackletter, closest to princess/MEK vibe) for headings; **"DM Mono"** for labels, passkey input, progress. Final pairing: Jacquard 12 (display) + IM Fell DW Pica (body) + DM Mono (labels).
- **Tokens** in `src/index.css` via Tailwind v4 `@theme` (`--color-paper`, `--color-blush`, `--color-teal`, `--color-amethyst`, `--color-ink`) so no raw hex scattered.
- **Mobile first**: single column max-w ~440px centered on desktop; the desk view shows a phone-width "page" on an amethyst ground.

## Architecture (all under `src/`, extends existing `App.tsx`)
- `App.tsx` — provider + simple state-based view switch (no router needed; 1 screen at a time: `landing | home | station:N | ending | secret`). Mounts `ProgressBar`, `Narrator`, `DevPanel`.
- `content/stations.ts` — **the single file you edit later**: for each station `{ id, title, passkey, hint, logParagraphs[], narratorPrompt, choices points }`. Clearly marked `// TODO(CONTENT):` notes everywhere text goes.
- `content/narrator.ts` — all bot lines keyed by event (`welcome`, `nameSaved`, `wrongPasskey`, `unlocked`, `hintOpened`, `reachedBottom`, `choiceMade[deny|mixed|accept]`, `allFive`, `idle`), with `{name}` placeholder. `// TODO(CONTENT)` notes.
- `content/endings.ts` — 3 endings (denial / mixed / acceptance) + hidden ending text, placeholders.
- `state/useJournal.ts` — context + hook, persisted to `localStorage`: `name`, `unlocked[]`, `choices{stationId: deny|mixed|accept}`, `secretFound`, `narratorLog`. Score: Deny=0, Mixed=1, Accept=2 per station (0-10 total). **Thresholds** in one constant: 0-3 Denial, 4-6 Mixed, 7-10 Acceptance (editable).
- Components: `Landing` (welcome + name entry + "enter the archive"), `Home` (station list/grid + "?" hidden slot + Station 6), `StationGate` (passkey input, shake on wrong, "need a hint?" click-to-reveal), `LogReader` (typewriter text, scroll-to-bottom detection), `Narrator` (chat bubble), `ProgressBar` (6 tiny pips + "?"), `Ending`, `DevPanel`.

## Behaviors
1. **Landing**: grain page, title with `{name}` after saved ("{Name}'s Journal"-style site title in header). Narrator pops ~1.5s after load, greets, asks for name; name input also on page. On save, narrator addresses them by name.
2. **Home**: Stations 1–5 as ruled index entries (locked = amethyst dither, unlocked = teal stamp). Station 6 shows "sealed" until 5 unlocked. A small "?" tile is the hidden ending.
3. **Station gate**: passkey input (case-insensitive, trimmed). Wrong → shake + narrator remark (throttled so it doesn't spam). "Can't find the word?" button reveals that station's hint only on click. Right → unlock animation, narrator brief remark.
4. **Log reader**: fast typewriter (~12ms/char, tap to skip), blinking caret. An `IntersectionObserver` sentinel at the bottom fires "reachedBottom" only after typing finished AND sentinel visible → narrator opens with 3 buttons (Deny / Mixed reaction / Accept). Choice saved once per station (can't re-answer), narrator reacts, then returns to Home.
5. **Narrator**: bottom-right small round launcher; panel ~min(320px, 85vw), minimizable, unread dot when it has something new while hidden. Auto-opens only on key moments (welcome, bottom-of-log choices, all-five complete); otherwise it just shows an unread dot. Typing-indicator delay before each line (600–1200ms) for natural timing; queue so lines never overlap.
6. **Progress bar**: fixed top, ~6px tall pips (5 stations + station 6 + tiny "?" glyph), filled as unlocked; non-interactive.
7. **Station 6**: unlocks automatically (no passkey) when all 5 are unlocked **and** answered; shows the ending chosen by score.
8. **Hidden ending ("?")**: placeholder trigger — tap the "?" 5 times (assumption; can change). Shows a secret log with placeholder text.
9. **Sound**: no audio now; add a `sound.ts` stub with `play('type'|'unlock'|'wrong'|'choice')` no-ops and call sites already wired, so audio can be dropped in later.
10. **Dev panel (temporary)**: collapsible tab showing the **passkey list** for all stations + Reset button (clears localStorage), clearly commented "REMOVE BEFORE LAUNCH".

## Placeholder passkeys (also shown in the dev panel)
Station 1: `ECHO` · Station 2: `LANTERN` · Station 3: `MOTH` · Station 4: `THREAD` · Station 5: `HOLLOW`. Station 6: none (auto-unlocks). Hints are placeholder strings like "Look near the …" — all editable in `content/stations.ts`.

## Assumptions (tell me if any are wrong)
- Single-device, no backend; progress stored in localStorage.
- Station 6 requires all 5 unlocked and all 5 narrator choices made.
- Score thresholds as above; Mixed is the middle band.
- Hidden ending trigger is a placeholder (5 taps on "?").

## Verification
Run the dev server preview at ~390px width: enter name → try wrong/right passkey on a station → read log to bottom → pick choice → repeat ×5 → confirm Station 6 ending matches score (test all 3 paths using Reset) → hide/show narrator → check "?" ending → verify progress pips and persistence on reload.
