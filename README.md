# Synaptro.AI — static site (plain HTML / CSS / JavaScript)

This folder is the entire website with **zero dependencies and no build step**:

```
index.html                  Home
services/                   Services overview (+ two landing pages inside)
ai-demos/                   "What We Build" — 8 interactive AI product demos
pricing/  blog/  about/  contact/
blog/<slug>/                One folder per article (9 articles)
404.html                    Not-found page (GitHub Pages serves it automatically)
css/styles.css              The whole design system (light + dark theme)
css/demos.css               AI demos page: cards, modal, demo UI components
js/main.js                  Theme toggle, mobile menu, mega menu, FAQ accordion,
                            count-up stats, scroll reveals, contact form (Formspree)
js/demos.js                 AI demo simulations (mock data at the top of the file,
                            one render/run definition per demo — no backend)
assets/                     Logo + team photo
CNAME, robots.txt, sitemap.xml, llms.txt, og-image.png, favicon.ico
```

## Preview locally

Pages use root-absolute links (`/css/...`), so serve the folder instead of
double-clicking files:

```
cd static-site
python -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages, same as before)

```
npx gh-pages -d static-site
```

The CNAME file keeps the synaptro.in domain working.

## Editing

- Text/content: edit the HTML files directly — what you see is what ships.
- Colors/spacing: everything is driven by the CSS variables at the top of
  `css/styles.css` (`:root` = light theme, `.dark` = dark theme).
- Contact form: posts to Formspree form `maewllyl` (set in `js/main.js`).
- The navbar/footer are repeated in every page — if you change them, change
  them everywhere (search & replace works well).
