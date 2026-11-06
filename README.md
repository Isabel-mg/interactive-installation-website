# ___'s room — ATC 2026 interactive installation

A mobile web journal for an interactive installation. Visitors scan a QR code at the
entrance, name the room, find hidden words on objects at six stations, read a journal
entry at each one and choose how to react. Their choices decide which of three endings
they unlock, which they then read and watch on the desk computer.

The site works in **English and Korean** (EN / 한 button). Nothing is sent to a server:
names and answers stay on the visitor's own phone.

## Links

| What | Link |
|---|---|
| **Visitor phone page** (QR code opens this) | https://isabel-mg.github.io/interactive-installation-website/visitor/ |
| **Desk computer** | https://isabel-mg.github.io/interactive-installation-website/visitor/#/mac |
| Dev phone page (has a **dev** button to skip ahead / reset) | https://isabel-mg.github.io/interactive-installation-website/ |
| Dev desk computer | https://isabel-mg.github.io/interactive-installation-website/#/mac |
| QR code to print | [`qr/visitor-qr.png`](qr/visitor-qr.png) |

![QR code for the visitor page](qr/visitor-qr.png)

Print the QR code at least 3 × 3 cm (about 10 × 10 cm for the entrance) and keep the
white border around it.

## How a visit works

1. **Scan** the QR code at the entrance and turn the sound on.
2. **Name the room** on the first page. It becomes "*name*'s room".
3. **Open the six journals** in any order. Each one is locked by a word hidden on an
   object at its station. "Feeling lost?" gives a hint.
4. **Read** the journal as it types itself out, then **choose a reaction**
   (it cannot be changed).
5. When all six are read and answered, **folder 7** opens and shows a final word.
6. At the **desk computer**, open *Journal*, type that word, read the ending,
   then open *Video Player* and watch the animation.
7. Press **Finish and reset** on the desk computer for the next visitor. It also resets
   by itself after 90 seconds without use.

## Passkeys and passcodes

> **Spoiler.** This repository is public, so anyone who finds it can read these.
> Share this page with the team, not with visitors.

<details>
<summary>Show the passkeys and passcodes</summary>

**Station passkeys** (typed on the phone; capital letters and extra spaces don't matter)

| # | Station | Passkey |
|---|---|---|
| 1 | Bedroom · 침실 | `BOXED` |
| 2 | Nightstand · 협탁 | `CHILL OUT` |
| 3 | The Painting · 그림 | `FUN` |
| 4 | Bookshelf · 책장 | `FIRST PLACE` |
| 5 | Graduation Gown · 졸업 가운 | `RESOLVED` |
| 6 | Mirror · 거울 | `BELONG` |

**Ending passcodes** (folder 7 shows one; typed on the desk computer)

| Score | Ending | Passcode |
|---|---|---|
| 0–4 | Ending 1 — Blind Ignorance · 맹목적 무지 | `ERASED` |
| 5–8 | Ending 2 — Acceptance · 수용 | `RESIGN` |
| 9–12 | Ending 3 — Whistleblower · 내부 고발자 | `LEAP OF FAITH` |
| — | Secret "?" ending (switched off for now) | `UNLISTED` |

**Scoring:** each answer adds Deny 0 · Mixed 1 · Accept 2 points, across six stations
(0–12). The background music also gets darker as the visitor progresses.

</details>

## Setting up at the venue

- **Desk computer:** open the desk computer link in a full-screen browser window
  (F11 on Windows, Ctrl+Cmd+F on Mac) with the volume on. Click once on the page so the
  browser allows sound.
- **Internet:** the phones and the desk computer need internet to load the site.
  Fonts load from Google Fonts.
- **Testing:** use the dev links. The **dev** button (bottom left) shows every passkey,
  the current score and music tension, jumps straight to any ending's word, and resets
  progress. To start over on the visitor page, open it in a private / incognito tab.
- **iPhone:** web sound is muted when the silent switch is on.

## What is still unfinished

- Ending videos for **Acceptance**, **Whistleblower** and the secret ending
  (they still use a placeholder YouTube video). Ending 1 has its animation.
- Narrator lines after each answer, the landing intro and the secret ending text are
  still placeholders, in both languages.
- Passcodes are marked as not final in the code.

## Editing the content

Changes pushed to `main` go live automatically in about a minute
([build status](https://github.com/Isabel-mg/interactive-installation-website/actions)).
Both the visitor and dev pages are built from the same code.

| What | File |
|---|---|
| Stations: journal text, passkeys, hints, answers | `src/content/stations.ts` |
| Endings: text, passcodes, videos, scoring, secret ending switch | `src/content/endings.ts` |
| Narrator lines | `src/content/narrator.ts` |
| Music tension rules | `src/content/tension.ts` |
| Sounds | `src/sound.ts` and `public/sfx/` |
| Ending videos | `public/videos/` (MP4, plays muted while the ending song loops) |
| Desk computer | `src/mac/MacApp.tsx` |
| Buttons and labels (English / Korean) | `src/i18n.ts` |
| Page title and description | `.figma/make/site.json` |

Every text has an `en` and a `ko` version. `{name}` is replaced with the visitor's name.

Sounds, images and videos are stored with **Git LFS**. Clone with Git LFS installed,
or the media files will be small placeholder files.

## Running it on your computer

Needs [Node.js](https://nodejs.org/) 22 or later.

```bash
npx pnpm@10.34.3 install
npx pnpm@10.34.3 dev
```

Then open http://localhost:8443 (phone) and http://localhost:8443/#/mac (desk computer).

Built with React, Vite and Tailwind CSS, first made in Figma Make.

---

2026 ATC TAco TEAM
