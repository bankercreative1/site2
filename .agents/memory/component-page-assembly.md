---
name: Component page assembly
description: Verification rule for composing static pages from Beaver Builder component fragments.
---

Keep inserted modules inside the exact source component wrapper chain, and verify the rendered page after every structural insertion.

**Why:** Balanced opening and closing tag counts can still hide modules inserted between components or in the wrong row. Repeated node classes make broad text-based insertion targets unsafe.

**How to apply:** Copy complete component blocks, target edits with unique surrounding markup, reject fabricated node IDs, check per-component balance, and review full-page desktop and phone captures before delivery.