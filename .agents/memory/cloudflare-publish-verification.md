---
name: Cloudflare publish verification
description: Distinguish GitHub updates from completed Cloudflare publication.
---

Do not report a Siteflyer GitHub push as a completed Cloudflare publication until the production pages actually serve the new content.

**Why:** A successful update to GitHub's main branch did not update the Cloudflare-served pages during subsequent checks, despite the repository's README describing automatic deployment. GitHub and Cloudflare are separate publication stages, and the repository alone cannot prove the external deployment configuration works.

**How to apply:** After pushing, compare the relevant production URLs with the intended page changes. If they remain stale, check Cloudflare's deployment status or obtain authorized Cloudflare deployment access; report GitHub success and Cloudflare status separately.