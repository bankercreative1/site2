---
name: Imported hero spacing
description: How inherited responsive padding can silently collapse homepage hero content at wide viewport sizes.
---

When a controlled hero content box has the expected outer width but its children still shrink as the viewport grows, inspect the parent’s computed horizontal padding before changing child widths or breakpoints.

**Why:** Imported responsive padding consumed most of the copy box’s usable width on large screens. Child `width: 100%` rules were already winning, but they correctly resolved against the much smaller padded content area, causing a large apparent left gutter and collapsing the dual-button layout.

**How to apply:** Compare the parent border-box width with child bounds at wide viewports, inspect matched rules and computed padding, and reset the parent’s horizontal padding at matching ID-level specificity when the hero owns its internal spacing.