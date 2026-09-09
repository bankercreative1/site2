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

## The component library

Ten reusable sections live in `components/`. Each one is a real block lifted
from a real page, so it is already styled and already correct. Building a page
means choosing from this list and changing the words. That is the whole job.

`components/gallery.html` renders all ten with labels. Open it before you start
so you can see the shapes rather than guess from names.

### The catalogue

Usage counts are how many places the block appears on the current 54-page site,
which is a good proxy for how safe and how "house" a choice is.

| component | used | shape | copy slots |
|---|---|---|---|
| `cta-band` | 21 | Full-width band, centred heading over one button. The standard closer. | heading, button label, link |
| `text-two-column` | 18 | Two columns of body copy under a heading. | heading, 2 text blocks |
| `section-text-cta` | 13 | Heading, a paragraph, then a button. A closer that needs a sentence first. | heading, paragraph, button label, link |
| `card-grid` | 10 | Heading over three priced cards, each with its own subhead and copy, one button underneath. | section heading, 3 x (card title, price, description), button |
| `text-with-checklist` | 9 | Two columns: heading and copy on the left, a three-item checklist on the right. | heading, paragraph, 3 list items |
| `heading-checklist` | 5 | Heading beside a three-item checklist, no body copy. Tighter than the above. | heading, 3 list items |
| `heading-pair` | 3 | A heading with a second, smaller heading under it. Page opener. | 2 headings |
| `heading-text` | 2 | A heading with a paragraph under it. | heading, paragraph |
| `three-column-text` | 2 | Two stacked headings over three columns of copy. | 2 headings, 3 text blocks |
| `heading-only` | 2 | A single heading on a background. Thin page opener. | heading |
| `price-columns` | 1 | Three price cards side by side: label, name, price, description. | 3 x (label, name, price, description) |
| `features-optional` | 1 | Two boxes with red headers: what is included, and paid add-ons. | 2 x (label, title, list) |
| `fine-print` | 1 | An intro heading, then repeated subsections of heading plus detail. | intro, then heading + text per subsection |
| `faq` | 1 | Collapsible question list. Click or Enter opens one answer at a time. | heading, then question + answer per item |

## The rule when something does not fit

**Never stop and ask. Build the page.**

A wireframe written by a person will always contain something the catalogue
does not match exactly. That is normal and it is not a blocker. Pick the
closest component and keep going.

You may:

- change any words
- add or remove repeated items in a list, an FAQ, or a set of subsections
- use the same component more than once on a page
- leave a slot empty if the wireframe has nothing for it

You may not:

- write new CSS
- rename or remove `fl-node-*` classes
- hand-write markup for a shape that is not in the catalogue

Adding list items is safe and has been tested: a three-item checklist extended
to five rendered all five identically, same size, colour and icon. Copy an
existing item and change its words. The same applies to FAQ entries and
fine-print subsections.

If a wireframe section genuinely has no reasonable match, use the nearest
component anyway and add a line to a **Compromises** list at the bottom of your
final message. Do not stop the build to raise it.

The verifier is what catches real breakage, not your caution. Build first,
verify, then report.

### How to build a page

Copy `components/<name>.html` into your page in the order the wireframe calls
for, then change the words. Do not touch anything else in the markup.

The page must have this structure. All three parts are load-bearing:

```html
<body class="fl-framework-base fl-preset-default fl-full-width fl-builder">
  <div class="fl-page">
    <div id="fl-main-content" class="fl-page-content">
      <div class="fl-builder-content fl-builder-content-primary">
        <!-- components go here, one after another -->
      </div>
    </div>
  </div>
</body>
```

Note the nesting order: `.fl-page` is **outside** `#fl-main-content`, not
inside. Getting it backwards does not throw an error, it just renders wrong.

The wrappers, and what each one costs if you omit it:

- **`.fl-builder-content`** — every rule in the stylesheet is written
  `.fl-builder-content .fl-node-X ...`. Without this ancestor almost nothing
  matches. Measured cost of omitting it: 132 wrong styles across the ten
  components.
- **`.fl-page`** — some responsive rules only reach the element through a
  `.fl-page` ancestor, and without it they lose on specificity to the desktop
  rule. Desktop looks fine and **mobile breaks**, which is the worst way for a
  bug to behave. Measured cost: 6 wrong styles at 390px, 0 at 1440px.
- **`fl-full-width` on `<body>`** — without it the theme falls back to a boxed
  layout and every full-width row renders 980px wide instead of spanning the
  1440px viewport. This one is worth dwelling on: it is glaringly obvious once
  you know to look, and it went unnoticed in the component gallery for hours
  because the gate only compared paint properties and screenshots of boxed
  content look plausible. Width is now checked.

### Stylesheets a new page must load

In this order. The order is not cosmetic.

```html
<link rel="stylesheet" href="/assets/css/self-hosted-fonts.css">
<link rel="stylesheet" href="/assets/css/design-system.css">
<link rel="stylesheet" href="/assets/css/all.min.css">
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/components-base.css">   <!-- see note -->
<link rel="stylesheet" href="/assets/css/229cc1f30727981437e43d0161196a1a-layout-bundle.css">
<link rel="stylesheet" href="/assets/css/jquery.magnificpopup.min.css">
<link rel="stylesheet" href="/assets/css/base.min.css">
<link rel="stylesheet" href="/assets/css/skin-6a8f33605af89.css">
<link rel="stylesheet" href="/assets/css/animate.min.css">
<link rel="stylesheet" href="/assets/css/site-custom.css">      <!-- see note -->
<link rel="stylesheet" href="/assets/css/components.css">
<link rel="stylesheet" href="/assets/css/type-scale.css">
```

Two files do the component work and a new page needs **both**:

- `components-base.css` is the page-builder module framework: buttons, rows,
  columns, spacing. It must load **before** `skin-*.css`, in the slot an
  existing page's `NNNN-layout.css` occupies. Load it later and it overrides the
  skin's responsive rules, which breaks mobile only. Measured: 6 wrong styles at
  390px if misplaced.
- `components.css` carries the per-component styling and loads near the end.

`site-custom.css` is the third one a new page needs, and it is the least
obvious. The site's typography is not in any linked stylesheet: it lives in an
inline `<style>` block repeated on all 54 existing pages, and it is what
assigns `circe-rounded` to h1-h3 and `circe` to h4 and paragraphs. A page that
links every stylesheet above but omits this renders in Helvetica and Montserrat
and looks obviously wrong. That block is extracted to `site-custom.css` so new
pages can link it in one line.

Existing pages still carry their inline copy and were deliberately left alone.
That means a change to this CSS currently has to be made in 54 places. Switching
those pages over to the linked file is a worthwhile cleanup and has not been
done.

Do **not** add an existing page's `NNNN-layout.css` to a new page. Those are
generated per page and carry another page's node styling.

### The node hashes

Components are keyed on class names like `fl-node-t4ncwfyvr7l6`. They look like
noise and they are the entire styling mechanism. Never rename or remove one.

**Using the same component twice on one page is safe.** Tested: two copies of
`cta-band`, both rendered identically. CSS classes are not ids and repeat
happily. Change the words in each copy independently.

### Verifying your page

From `~/Claude Code/site-migration-skills/bmg-static-site-build/`:

```
node scripts/verify-components.mjs --site ~/"Claude Code/siteflyer-static" --page /your-new-page/
```

This compares every component on your page, property by property, against the
same component on the page it came from. A pass means your page renders it
exactly as the original does.

```
RESULT: PASS — every component paints identically outside its source page.
```

Anything else is a real problem. The usual cause is a missing wrapper or a
stylesheet in the wrong order, not a missing rule. **Check the ancestors and the
load order before you conclude something is absent** — that mistake has been
made four times on this site.

Run it at mobile too, because wrapper bugs hide at desktop width:

```
node scripts/verify-components.mjs --site ~/"Claude Code/siteflyer-static" --page /your-new-page/ --width 390 --height 844
```

"Tier B" differences are reported but do not fail. They are container-dependent
geometry, usually sub-pixel. Ignore them unless something looks visibly wrong.

### A worked example

Wireframe: *page title, then a short pitch, then three benefits, then a closer
with a button.*

| wireframe line | component |
|---|---|
| page title | `heading-pair` |
| short pitch | `heading-text` |
| three benefits | `text-with-checklist` |
| closer with button | `section-text-cta` |

Copy those four files in that order into the wrapper structure above, change the
words, run the verifier at both widths. Nothing else.

That page exists: `components/example-page.html`. It was built from these
instructions and nothing else, then verified at 1440, 992, 767 and 390px with
zero differences. Open it next to the gallery, or copy it as a starting point.

If you follow this section and your page fails, the instructions are wrong and
should be fixed rather than worked around. That has already happened twice: the
first version of this section omitted `site-custom.css` and had the wrapper
nesting backwards, and a page built from it rendered in the wrong typeface at
980px wide.

If a wireframe asks for a shape the catalogue does not have, use the nearest
component and note the compromise. Do not improvise CSS and do not stop.

## Things that will break if you touch them

- **`fl-node-*` class names.** Renaming or removing one unstyles that element.
- **The `.fl-page` and `.fl-builder-content` wrappers.** Removing either
  unstyles whole components. `.fl-page` breaks mobile only, so it looks fine
  on your screen and is broken on a phone.
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
