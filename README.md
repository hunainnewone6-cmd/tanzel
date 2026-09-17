# Tanzeel Quran — Online Qur'an Teacher Portfolio

A premium, single-page website for a professional online Qur'an teacher, built for an international audience (UK, Germany, Canada, Indonesia, Japan and beyond).

## Design language

| Role            | Colour          | Value    |
| --------------- | --------------- | -------- |
| Primary         | Dark Brown      | `#2B1A12`|
| Secondary       | Light Brown     | `#A67C52`|
| Background      | Warm Off-white  | `#F7F2E8`|
| Accent          | Soft Gold       | `#C6A15B`|

Typography: **Cormorant Garamond** (display serif) · **Inter** (body / UI) · **Amiri** (Arabic calligraphy).

## Structure

```
├── index.html          → all sections of the site
├── css/style.css       → full design system, components & responsive rules
├── js/main.js          → interactions (nav, slider, FAQ, pricing toggle, form, …)
├── assets/favicon.svg  → browser tab icon (8-pointed Islamic star)
└── README.md
```

## Running locally

Just open `index.html` in any modern browser — no build tools or servers are required.

For development it is still nicer to serve over HTTP (optional):

```
python -m http.server 8000
# or
npx serve .
```

## Customising the site

1. **Teacher name & brand** — search `index.html` for `Qari Hamza Rahman` and `Tanzeel Quran` and replace with the real details (title tag, hero, about, footer, form success text).
2. **Your photo** — the About section currently uses an elegant SVG arch illustration. To use a real portrait, replace the contents of `<div class="about-media">` with an `<img>` (or swap the SVG inside `.arch-frame`). A 4:5 portrait looks best.
3. **Contact details** — update the WhatsApp number (`wa.me/447700900123`), email (`salam@tanzeelquran.com`) in the contact section, footer and the floating button.
4. **Pricing** — the monthly prices live in `data-monthly` attributes on `.price-num` (e.g. `data-monthly="88"`). Quarterly prices are calculated automatically as 3 × monthly × 0.9 (10% saving).
5. **Testimonials & courses** — edit the slides inside `#slider-track` and the cards in `#courses`. Each course card's "Request this course" button pre-fills the booking form's course dropdown.
6. **Social links** — the placeholder `href="#"` icons live in the footer `.socials` list.

## Wiring the booking form to your inbox

The form currently demonstrates validation and a success message in the browser. To receive submissions:

- **Static hosting** — point the form `action` at a form backend (Formspree, Basin, Netlify Forms, …) and set `method="post"` already present; remove the `e.preventDefault()` success toggle in `js/main.js` (or keep it — most backends redirect).
- **Email JS** — include a service key and replace the submit handler in `js/main.js`.

## Deploying

### Vercel (recommended)

This is a fully static site — no build step is required. Vercel auto-detects it as **"Other" / static** using the included `vercel.json`.

```bash
# 1. Install the Vercel CLI
npm i -g vercel

# 2. Log in once
vercel login

# 3. Create a project from this folder
vercel --prod
```

Or import this repository at <https://vercel.com/import> and Vercel will detect:

| Setting                    | Value                                |
| -------------------------- | ------------------------------------ |
| Framework preset           | Other (static)                       |
| Build command              | *(none — blank)*                     |
| Output directory           | `.` (project root)                   |
| Install command            | *(none — no dependencies)*           |

### Other static hosts

Also works as-is on **Netlify**, **GitHub Pages** or any static host — just upload the folder.