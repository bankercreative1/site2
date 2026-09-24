# Read STYLE-GUIDE.md before making any change

This repository is a static HTML copy of a WordPress site built with Beaver
Builder. No build step, no framework. The markup is machine-generated on
purpose and the `fl-node-*` class names are the entire styling mechanism.

## Build pages from the component library

There are ten ready-made sections in `components/`. Building a page means
choosing from them and changing the words.

- `components/gallery.html` shows all ten with labels. Look at it first.
- `components/example-page.html` is a working page built from the guide.
  Copy it as a starting point.
- The catalogue, the required page structure, the stylesheet list and the
  worked example are in **`STYLE-GUIDE.md`**, section "The component library".

**Never stop to ask because a shape is missing.** A wireframe will always have
something the catalogue does not match exactly. Use the closest component, keep
building, and list what you compromised at the end.

You may change words, add or remove repeated list items, reuse a component, and
leave slots empty. You may not write new CSS or rename `fl-node-*` classes.

## Verify before you report done

From `~/Claude Code/site-migration-skills/bmg-static-site-build/`:

```
node scripts/verify-components.mjs --site <repo> --page /your-page/
node scripts/verify-components.mjs --site <repo> --page /your-page/ --width 390 --height 844
```

Both must print `RESULT: PASS`. Anything else means the page is wrong.

If a component renders wrong, the cause is almost never a missing CSS rule.
Check the wrapper chain and the stylesheet order first. That mistake has been
made six times on this site.

## Never

- Rename or remove `fl-node-*` classes.
- Reformat, prettify or re-indent any file.
- Remove `application/ld+json` blocks or the inline script near `</head>`.
- Rewrite a page you were not asked to change.

# Running on Replit

This project is a static website with no build step or dependencies.

- Run command: `python3 -m http.server 5000 --bind 0.0.0.0`
- The server exposes the repository root exactly as imported.
- Production `/video/*` requests are handled by Cloudflare and are expected to return 404 in the Replit preview.


## Checking links and assets

After editing the site, run:

```sh
python3 scripts/check_site_links.py
```

The check scans every HTML file in the repository and verifies local page links,
stylesheets, scripts, fonts, images, and other referenced files. It also follows
asset references and imports in CSS. External URLs, page fragments, and
production-only `/video/*` URLs are intentionally excluded.

Do not modify the HTML, CSS, or asset files as part of the Replit run setup.
