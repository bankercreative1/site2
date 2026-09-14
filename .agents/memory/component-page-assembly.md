---
name: Component page assembly
description: Verification rule for composing static pages from Beaver Builder component fragments.
---

Keep inserted modules inside the exact source component wrapper chain. When a landing page must match the homepage, start from the complete homepage document shell and remove whole rows instead of transplanting homepage fragments into a generic shell.

**Why:** Balanced opening and closing tag counts can still hide modules inserted between components or in the wrong row. Homepage rows also depend on page-scoped builder wrappers, generated stylesheets, and body classes; copying only row markup can render badly despite valid HTML.

**How to apply:** Copy complete component blocks, target edits with unique surrounding markup, reject fabricated node IDs, check row depth and per-component balance, and review desktop and phone renders before delivery.