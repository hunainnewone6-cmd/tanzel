# Tanzel Quran Academy — Frontend

Single-page marketing site for one-to-one online Qur'an tuition. Plain static HTML/CSS/JS — no framework, no build step, no bundler, no test framework. Deployed to Vercel.

## Architecture

```
index.html        All markup (750 lines). One <main> with anchored sections.
css/style.css     All styles (2500 lines). Custom properties in :root.
js/main.js        All interactivity (~300 lines), vanilla JS, no deps.
assets/favicon.svg
src/image1.jpeg   "Read Your Quran" hero image
src/shot_about.png
src/shot_top.png
vercel.json       Vercel config (no build/install command, cleanUrls)
```

- **No framework.** Vanilla HTML/CSS/JS. `js/main.js` is loaded once at the end of `index.html` and wires up interactivity with plain DOM APIs (`querySelector`, event listeners, `IntersectionObserver` for scroll-reveal).
- **No preprocessor / bundler.** `css/style.css` is hand-written. Design tokens live as CSS custom properties in `:root` (`--serif`, `--sans`, `--arabic`, `--gold`, `--brown-900`, `--cream`, etc.).
- **No tests.** There is no test runner. "Verification" = serve the folder and check the page in a browser.

### Section anchors (nav order)
`#home` (hero) → `#about` → `#cert` → `#approach` (why) → `#courses` → `#method` → `#reviews` (slider) → `#pricing` → `#faq` → `#contact`.

### Key CSS components
- **Pricing cards**: `.plan` / `.plan-featured` (Standard = the "Most popular" card, `.plan-flag`). Price number is in `<span class="price-num" data-monthly="N">`; the quarterly price is computed in JS from `data-monthly`, so **update `data-monthly` when changing a monthly price** — don't hand-edit the displayed £ text only.
- **About media**: an inline SVG arch (`.arch-frame` / `.arch-art`) with absolutely-positioned text layers `.arch-arabic` (Bismillah) and `.arch-caption` (name + role), plus a floating `.about-badge` ("8+ years").

## Commands

| Task | Command (PowerShell) |
|---|---|
| Run locally | `npm start` → `npx serve .` (no build). Or `npm run dev` (`python -m http.server 8000`). |
| No build step | Nothing to build; Vercel serves the folder. `vercel.json` has `buildCommand: null`. |
| No test runner | There is none. Manually serve and open in a browser. |

> Note: the `dev` script uses `python -m http.server` which is not available on this machine — prefer `npm start` (`npx serve`).

## Design decisions

- **Brand identity preserved.** Tanzel's existing palette (warm cream/brown/gold), serif (Cormorant Garamond) + Inter + Amiri (Arabic), and the arch motif are kept. Changes are refinements, not a redesign.
- **UNSLOP skill** (`unslop@heydamir`, installed globally as a Claude Code plugin) was used as a quality guide: quiet chrome, one accent, consistent spacing, legible type. The pricing and About sections were checked against its 9-pass criteria.
- **About image text overflow** — root cause: `.arch-arabic` and `.arch-caption` were positioned at `left:0; right:0` (full frame width) but the SVG arch's opening is far narrower than the frame at those heights, so the text crossed the arch's curved gold border. Fixed by centering the Bismillah (`left:50%; transform:translateX(-50%); width:44%`) and insetting the caption (`left:20%; right:20%`), and bumping the small caption text from 0.6rem to 0.68rem for readability.

## Completed changes (2026-11-27)

### Pricing cards (index.html)
| Plan | Monthly | `data-monthly` | Weekly lessons | Duration |
|---|---|---|---|---|
| Foundation | £35 (was £40) | 35 | 3 / week | 30 min (was 45) |
| Standard | £45 (was £55) | 45 | 4 / week | 30 min (was 50) |
| Intensive | £65 (was £70) | 65 | 5 / week | 30 min (was 45–60) |

Quarterly display (auto-computed, 30% off): £74 / £95 / £137. "Most popular" badge on Standard kept intact.

### About section (css/style.css)
- `.arch-arabic` and `.arch-caption` repositioned to stay inside the arch; caption sub-text made larger.

### Repository hygiene
- **Removed 244 accidentally-tracked Edge browser profile files** (15 MB of Crashpad, Cache, Code Cache, Extensions, etc.) from git tracking. They remain on disk locally; no user data deleted.
- **Updated `.gitignore`** with new rules:
  - `src/edgeprofile/`
  - `*.pma`, `*.pma-*`
  - `*.swp`, `*.swo`, `.scratch/`

## Free-trial buttons
All three "Start with a free trial" buttons link to `#contact` (in-page anchor, scrolls to the booking form). Preserved unchanged.

## Known issues / notes
- No test suite; changes verified by serving and inspecting in-browser at 1440px / 768px / 375px.

## Next steps
1. Push to the `main` branch and trigger the Vercel deploy **only with owner approval** (no push or deploy was done in this change — branch `claude/wonderful-bhabha-76afe3` pushed to remote).
2. If desired, generate an "unslop story" morphing video for the About/pricing sections via the UNSLOP skill.