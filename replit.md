# Read STYLE-GUIDE.md before making any change

This repository is a static HTML copy of a WordPress site. It has no build step
and no framework, and its markup is machine-generated on purpose.

**The single most important rule: to add a new section, copy an existing block's
markup including its `fl-node-*` classes and change the words. Do not write new
CSS and do not invent a type scale.** There is a measured one in
`assets/css/design-system.css` and it is there to be read, not built against.

Do not reformat, prettify or re-indent any file. Do not rename `fl-node-*`
classes. Do not remove `application/ld+json` blocks or the inline script near
`</head>`.

Full rules, including the type scale, colours, fonts and accessibility
requirements, are in `STYLE-GUIDE.md`.
