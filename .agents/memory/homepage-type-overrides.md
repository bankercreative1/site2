---
name: Homepage type overrides
description: How to safely change responsive homepage typography when imported global type rules use ID-level important declarations.
---

Responsive homepage typography must be verified using the browser's computed styles at the exact target viewport. Class-only overrides are not sufficient when global type rules use `#fl-main-content` selectors with `!important`.

**Why:** Visual screenshots continued to show oversized hero text even though later class-based rules looked correct in the stylesheet. The browser's matched-rule data showed that the ID-level global rules still won.

**How to apply:** Match or exceed the existing ID-level specificity, then confirm the computed font sizes, element widths, and a fresh target-viewport screenshot before reporting that the layout is fixed.