---
name: Cloudflare publish verification
description: Distinguish GitHub updates from completed Cloudflare publication.
---

Do not report a Siteflyer GitHub push as a completed Cloudflare publication until the production pages actually serve the new content.

**Why:** GitHub accepted pushes while Cloudflare's build failed before deployment: a committed npm lockfile resolved packages through a Replit-only mirror that Cloudflare cannot reach. GitHub and Cloudflare are separate publication stages, and a successful push alone does not prove the build or deployment worked.

**How to apply:** This static site needs no root npm manifests; keep any Replit-generated root package files out of Git. After pushing, wait for the Workers Builds check to succeed, then compare the relevant production URLs with the intended page changes. Report GitHub success and Cloudflare status separately.