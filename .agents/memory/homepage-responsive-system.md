---
name: Homepage responsive system
description: The responsive design principle to follow when changing homepage layout or typography.
---

Homepage changes must use shared fluid scales, bounded content widths, and only the existing structural mobile/tablet breakpoints. Do not add a separate correction for every viewport where a symptom appears.

**Why:** Independent viewport patches caused fixes at one width to break hierarchy, spacing, or button layout at larger widths. The user explicitly requires a coherent responsive system.

**How to apply:** Define relationships such as hero larger than H2 and H2 larger than H3 as shared tokens or formulas, test representative widths plus breakpoint boundaries (including 1280px desktop), and inspect wide screens before reporting completion. A line-count requirement must hold across the desktop range, not only at 1440px.