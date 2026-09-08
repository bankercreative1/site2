# SiteFlyer style guide

**Read this before changing anything.** It is short on purpose.

## What this site is

A static HTML copy of a WordPress site built with Beaver Builder. There is no
build step, no framework, and no database. Every page is one HTML file and the
file is exactly what the browser shows.

The markup looks machine-generated because it is. Class names like
`fl-node-a56eckzs10tg` are meaningless to read and **completely load-bearing** —
the stylesheet targets them directly. There are 1,268 of them across 9,111 CSS
rules.

## The one rule that matters most

**To add a new section, copy an existing one. Never write new CSS.**

Find a page that already has the shape you want. Copy that block's markup
including its `fl-node-*` classes. Change the words. The existing stylesheet
will style your new block identically, because it is literally the same
component.

Writing new CSS is how you end up with a page that does not look like the site.
It has happened, it took hours to undo, and the tokens in
`assets/css/design-system.css` exist to be *read*, not to be built against.

## The design system, as measured

Measured from computed styles on **all 54 pages** at 1440px and 390px, not a
sample. Counts are how many elements use each value, so you can see what is the
system and what is a one-off. Declared as CSS variables in
`assets/css/design-system.css`.

| role | desktop | mobile | family / weight | how dominant |
|---|---|---|---|---|
| h1 | 60 / 78 | 25 / 33 | circe-rounded 800 | 40 of 53 pages |
| h2 | 44 / 48 | 24 / 26 | circe-rounded 800 | 111 of 148 |
| h3 | 35 / 42 | 18 / 22 | circe-rounded 800 | 203 of 252 |
| h4 | 22 / 26 | 16 / 19 | circe 500 | 352 of 377 |
| `.alt-heading` | 35 / 42 | 18 / 22 | circe-slab-c 100, accent | 102 of 113 |
| body | 18 / 25 | 15 / 22 | circe 100 | 199 of 330 |
| button | 22 / 18 | 16 / 19 | circe 400 | |
| nav | 14 / 18 | 14 / 17 | circe 700 | |

**The scale is enforced, not just documented.** `assets/css/type-scale.css`
loads last and normalises every heading in `#fl-main-content` to the values
above at all three Beaver Builder breakpoints (992px and 767px). Before it
existed, h1 rendered at 60, 40, 38, 37, 36 and 28px depending on the page, and
the /locations/ pages did not shrink on mobile at all.

After it: h1 is 60/78 on all 53 pages, h2 is 44/48 on all 148, h3 is 35/42 on
all 252, h4 is 22/26 on all 377. One heading level, one size, everywhere.

The footer keeps its own smaller sizes (12px copyright, 15px contact block).
That is deliberate; the scale is scoped to main content.

Colours: ink `rgb(58,58,58)`, navy `#32466f`, accent `#d63011`, surface
`rgb(247,247,247)`.

Containers: 1300px dominant, 1100px and 800px for narrower content.

Composition is **centred**. Fixed-width rows are centred in the viewport,
headings and CTAs are centred within them. Dense detail that needs scanning may
be left-aligned inside a centred container.

## Fonts

Self-hosted in `assets/webfonts/`, declared in `assets/css/self-hosted-fonts.css`.

The CSS still asks for `circe`, `circe-rounded` and `circe-slab-c` because the
whole site does. Those names are **aliased** to self-hosted Google fonts: Nunito
for the first two, Zilla Slab for the third. To change a typeface, edit that one
file and nothing else.

**Never add a Google Fonts or Adobe Fonts link.** Adobe's licence forbids
self-hosting, and the previous setup meant the fonts silently never loaded for
any visitor for an unknown length of time. Everything ships with the site now.

## The accent colour

`#d63011`. It was `#f16950`, which measured 3.05:1 on white and failed WCAG AA
for normal text. The current value is the lightest one with the same hue that
clears 4.5:1 on both white and the grey section background.

Do not lighten it back without re-measuring. On the navy footer, links use white
with an underline rather than the accent, because the accent is only 1.91:1
there.

## Things that will break if you touch them

- **`fl-node-*` class names.** Renaming or removing one unstyles that element.
- **`<script type="application/ld+json">` blocks.** That is structured data for
  search engines, not tracking. Deleting one loses schema.
- **The inline `<script>` near `</head>`.** It restores behaviours the page
  builder's JavaScript used to provide: the sticky header, accordions, the video
  overlay, and the mobile nav. Deleting it makes those controls dead.
- **Reformatting or prettifying HTML.** It produces an enormous diff and risks
  changing layout. Leave the formatting alone.

## Accessibility rules

- Every interactive control needs `aria-expanded` reflecting its state, and must
  work with Enter and Space as well as click.
- `aria-expanded` on an element with no supporting role is itself a violation.
  A clickable `<div>` needs `role="button"` and `tabindex="0"`.
- Panel text stays in the HTML even when collapsed. Never move copy into
  JavaScript.
- Contrast failures on this site are worse on mobile than desktop. Check both.
- Automated tools do not test `:hover` or `:focus`. Check those by hand.

## What we may claim

"N automated WCAG 2.2 AA violations, measured, plus a documented manual pass."

Never "WCAG compliant" or "ADA compliant". Automated tools catch roughly 30-40%
of issues, and the FTC fined a vendor $1M in April 2025 for making that claim.

## Video

The two videos are too large for the repository. They live in Cloudflare R2 and
are served by the Worker at `/video/*`, same origin as the site. Every `<video>`
must keep `preload="none"`, or the page sends the whole file to every visitor
before anyone presses play.
