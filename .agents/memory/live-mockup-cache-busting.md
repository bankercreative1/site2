---
name: Live mockup cache busting
description: Prevent stale embedded canvas previews after isolated mockup refinements.
---

When an isolated mockup is visibly updated but the canvas still shows an older render, update the live iframe URL with a revision query while preserving its live state and suggested actions.

**Why:** The sandbox preview and the canvas iframe can retain different cached document or asset states, making a valid component look unchanged in Design mode.

**How to apply:** Verify the direct preview at the target viewport, then update the canvas shape URL with a new query revision and re-present/focus that same live shape.