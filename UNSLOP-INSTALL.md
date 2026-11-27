# UNSLOP — Installation Record

Installed: 2026-11-27 (this machine, Windows 11, Claude Code 2.1.309)

## Skill
- **Name:** `unslop`
- **Official repo:** https://github.com/heydamir/unslop (Damir Sokolovsky, `@heydamir`)
- **What it does:** Turns vibecoded / AI-looking UI into a designed interface. Works on React, Next.js, Tailwind, Vue, Svelte, HTML/CSS — dashboards, apps, landing pages, and even a live site from a link.

## Installation method
- Installed as a **Claude Code plugin** via the official command (single step, current version):
  ```powershell
  claude plugin install unslop --marketplace heydamir/unslop
  ```
- This auto-added the marketplace `heydamir` (source: GitHub `heydamir/unslop`) and installed the plugin. No manual skill files were downloaded or placed.

## Installation scope
- **Scope: user** (global). Available in *every* project, independent of the current directory.
- (Per-project: `--scope local`; team-shared: `--scope project`.)

## Version / location
- **Plugin id:** `unslop@heydamir`
- **Version / commit:** `620163eedb35` (full: `620163eedb3529d9cd23a3994ed8d287d06f760d`)
- **Install path:** `C:\Users\Hunain\.claude\plugins\cache\heydamir\unslop\620163eedb35`
- **Skill file:** `...\cache\heydamir\unslop\620163eedb35\skills\unslop\SKILL.md`
- **Config state:** registered in `~/.claude/plugins/installed_plugins.json` and `known_marketplaces.json`

## Verification results
- `claude plugin list` → `unslop@heydamir` — **✔ enabled**, scope: user.
- Pre-existing `ecc@ecc` plugin untouched (no conflict).
- No prior unslop copy existed in `~/.claude/skills` or the plugins cache, so nothing was overwritten.
- SKILL.md present and readable; reference files (`signs.md`, `tokens.md`, `visuals.md`, `rtl.md`, `effects.md`, `refs.md`) and helper scripts (`snapshot.mjs`, `story.mjs`, `story-path.mjs`) all installed.

## How to invoke `/unslop`
- Start a **fresh Claude Code session** (plugins load at session start; `/reload-plugins` if your CLI offers it). Then run:
  ```
  /unslop
  ```
- The skill also auto-triggers when you ask to "unslop / polish / redesign a screen".

### Using it on an existing website
- **From code (repo open):** point Claude at the screen's files and run `/unslop`.
- **Only a link to a live site, no code:** the skill saves the page with
  ```
  node <skill folder>/scripts/snapshot.mjs <url> unslop/original.html
  ```
  (add `--dark`/`--light` to match the theme), then redesigns a copy and hands back the file.
- **Only a screenshot:** it first rebuilds the screen as one static HTML file, then unslops that.

### Workflow (from SKILL.md)
1. Look at the screen → 2. Audit for "slop" signs → 3. Judge how much to change (heavy / light / none) → 4. Write a 5-line "direction" (Product, Character, World, Moments, Signature) and confirm → 5. Fix in 9 ordered passes: Spacing, Color, Icons, Copy, Type, Layout, Details, Visuals, Motion → 6. Re-check against the audit → 7. Report. Optional: build a short "story" morphing video.

## Update
```powershell
claude plugin marketplace update heydamir   # refresh the marketplace
claude plugin install unslop --marketplace heydamir   # reinstall to latest
```

## Uninstall (safe)
```powershell
claude plugin remove unslop@heydamir        # remove the plugin
claude plugin marketplace remove heydamir   # optional: remove the marketplace
```
This only removes the unslop entries from `~/.claude/plugins`; it does not touch other skills.
