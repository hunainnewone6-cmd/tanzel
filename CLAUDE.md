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

## Pull Request #1 — CHANGE 02 integration

| Field | Value |
|---|---|
| **PR URL** | https://github.com/hunainnewone6-cmd/tanzel/pull/1 |
| **PR Number** | #1 |
| **Source branch** | `claude/wonderful-bhabha-76afe3` |
| **Target branch** | `main` |
| **Merge status** | **MERGED** (2026-11-27T11:41:06Z) |
| **Merge commit** | `8efc6b94f02f614d0185e5bdfd06d96f70abcb8c` |
| **Merge strategy** | Clean merge (no conflicts, fast-forward compatible) |
| **Merged by** | `hunainnewone6-cmd` |

### Checks & tests performed
| Check | Result |
|---|---|
| Vercel build | SUCCESS (preview deployed) |
| Vercel Preview Comments | SUCCESS |
| Manual browser test (1440px) | All pricing cards render, About text contained |
| Manual browser test (768px) | Responsive, no overflow |
| Manual browser test (375px) | Responsive, no horizontal scroll |
| Browser console | No errors/warnings |
| Stale reference grep | No old pricing (£40/£55/£70) or durations (45/50/45-60 min) found |
| `src/edgeprofile/` tracking | 0 files tracked on main |
| `.gitignore` rules | Applied and effective |

### Commits on main
1. `9888e32` — `refactor: update pricing, fix About arch overflow, clean tracked browser profile`
2. `036c6d5` — `docs: update CLAUDE.md with verified state (edgeprofile removed, gitignore updated)`
3. `8efc6b9` — `Merge pull request #1`

## Phase 03 — Production Readiness Audit (2026-11-27)

### Repository state
- Branch: `main` @ `8efc6b9` (includes both CHANGE 02 commits `9888e32`, `036c6d5`).
- Working tree clean; `src/edgeprofile/` fully untracked; `.gitignore` in place.
- No API keys or secrets in tracked files. No unnecessary external dependencies.

### Technical audit
| Check | Result |
|---|---|
| No build step | `vercel.json` — `buildCommand: null`, `installCommand: null`, `cleanUrls: true` — correct for static site |
| `package.json` | No runtime dependencies; `dev` script uses `python -m http.server` (unavailable on Windows — use `npm start` instead). No production impact |
| Fonts | Google Fonts (Cormorant Garamond, Inter, Amiri) via `<link>` with `display=swap` and `preconnect`. No local font files |
| External resources | Google Fonts only. No analytics, no ad scripts, no third-party JS |
| Image assets | `src/image1.jpeg` (hero) — only image. No broken paths |
| Accessibility | Skip link, `aria-label`s on nav/regions, `aria-expanded` on accordion/FAQ, semantic headings |
| SEO | `<title>` and `meta description` present. **Missing:** `og:image`, `og:url`, `twitter:card` — recommend adding |
| Console | No errors or warnings on production URL |

### Cross-device verification (local, 1440/1024/768/430/375 px)
| Viewport | Pricing | About overflow | Horizontal scroll |
|---|---|---|---|
| 1440px | Equal card heights ✓ | Contained ✓ | None ✓ |
| 1024px | Equal card heights ✓ | Contained ✓ | None ✓ |
| 768px | Stacked (1-col) | Contained ✓ | None ✓ |
| 430px | Stacked (1-col) | Contained ✓ | None ✓ |
| 375px | Stacked (1-col) | Contained ✓ | None ✓ |

Quarterly toggle: `35×3×0.7=74`, `45×3×0.7=95`, `65×3×0.7=137` — **correct**.

### Production site status
`tanzelq.vercel.app` is still serving **pre-CHANGE 02** code (old prices £40/£55/£70, old durations 45/50/45–60 min). A deploy is required to update production.

### Vercel deployment configuration
- Project: `tanzel_q` (linked to `hunainnewone6-cmd/tanzel` repo on GitHub)
- Production branch: `main`
- Build command: none (static)
- Environment variables: none required
- Latest production deployment: pre-CHANGE 02 commit
- Preview deployment: CHANGE 02 commit — build **SUCCESS**
- Vercel CLI auth token is expired — run `npx vercel login` before deploying

### Remaining recommendations
1. **Deploy to production** — awaiting owner approval (Vercel CLI login required first).
2. **Add SEO metadata** — `og:image`, `og:url`, `twitter:card` in `<head>`.
3. **Fix `package.json` dev script** — replace `python -m http.server` with a working local dev command (e.g. `npx serve .`).
4. **No code changes required for production readiness** — current `main` is deploy-ready.

## Known issues / notes
- No test suite; changes verified by serving and inspecting in-browser at 1440px / 768px / 375px.

## Next steps
1. **Vercel production deploy** — **awaiting explicit owner approval** (PR preview deployed successfully, no auto-deploy configured).
2. If desired, generate an "unslop story" morphing video for the About/pricing sections via the UNSLOP skill.