---
name: Contact booking embed
description: Why the contact booking frame does not use the vendor resize script.
---

Keep the contact booking iframe independently visible and scrollable rather than relying on the vendor's resize script unless a later browser check proves that script restores visibility.

**Why:** The supplied resize script set the booking iframe to `visibility:hidden`, zero opacity, and off-screen absolute positioning, and left it that way during preview checks. The same booking URL rendered correctly when the script was omitted.

**How to apply:** Provide an explicit iframe height and allow internal scrolling so booking fields remain accessible across viewport sizes. Verify the embedded frame on the contact page itself, not just by opening its URL separately.