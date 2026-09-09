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

**Do not write new CSS and do not invent a type scale.** If a wireframe needs a
shape the catalogue does not have, say so rather than improvising.

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
