---
name: Cloudflare Worker asset rewriting
description: Constraints for rewriting static HTML through a Worker while loading shared HTML partials from the asset binding.
---

Static pages must use Worker-first asset routing when runtime HTML rewriting is required. With Cloudflare's default HTML handling, an HTML asset's canonical binding pathname is extensionless even when its source file ends in `.html`.

**Why:** Matching static assets bypass the Worker unless Worker-first routing is enabled, and binding fetches do not follow the automatic redirect from an `.html` pathname to its canonical extensionless pathname.

**How to apply:** Enable Worker-first asset routing for response transforms. Fetch shared HTML partials through a full URL using the canonical extensionless pathname, verify a 200 response, and preserve the original response when the partial cannot be loaded.