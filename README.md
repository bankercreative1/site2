# siteflyer.com, static

The SiteFlyer website as plain HTML and CSS. No database, no plugins, no PHP.

## How this gets edited

Open the project in Replit and edit with AI. Every page is one HTML file and the
file is exactly what the browser shows, so there is no build step and nothing to
compile. Change the words, save, push.

**One rule: edit in one place at a time.** Whoever is editing pushes to this repo
when they are done, and anyone starting work pulls first. Two people editing in
different places without syncing is the only way to lose work here.

## How it goes live

Cloudflare Pages watches the `main` branch. Every push redeploys automatically,
usually within a minute. There is nothing to run.

## Layout

- `index.html` and one folder per page, matching the old WordPress URLs exactly
- `assets/css/` stylesheets, `assets/img/` images, `assets/webfonts/` fonts
- `_redirects` forwarding and 404 rules, `_headers` caching rules
- `sitemap.xml`, `robots.txt`, `404.html`

## Things to know before changing something

- **Fonts are self-hosted** in `assets/webfonts/`. Nunito for headings, Zilla Slab
  for the orange serif headings, Montserrat for body. Do not add a Google Fonts or
  Adobe link; the whole point is that nothing loads from a third-party server.
- **The accent colour is `#d63011`.** It was `#f16950`, which failed WCAG contrast
  on white. Do not lighten it back without re-checking contrast.
- **The two videos are not in this repo.** They are too large for Git and live on
  file storage instead. The pages point at those URLs.
- **Schema (JSON-LD) is in the `<head>` of each page** and matches what WordPress
  produced. Do not delete a `<script type="application/ld+json">` block; that is
  structured data, not tracking.
- **Class names like `fl-node-a56eckzs10tg` are machine-generated** by the old page
  builder. They look meaningless because they are, but the CSS depends on them.
  Leave them alone unless you are changing both the HTML and the CSS together.
