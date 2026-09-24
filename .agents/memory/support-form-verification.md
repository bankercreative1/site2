---
name: Support form verification
description: Limits of automated submission checks for the external support form.
---

Do not treat loading or client-side validation of the embedded support form as proof that a support request was delivered.

**Why:** An automated browser was able to load and fill the external form, but its attempt to submit was stopped by a human-verification challenge. No success confirmation or downstream delivery was observed.

**How to apply:** Verify the embed loads, its fields work, and the vendor script responds, then report final submission as unverified until a real user completes the challenge and sees the success state. Never bypass the challenge or claim a test ticket was created without evidence.