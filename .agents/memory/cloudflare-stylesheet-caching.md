---
name: Cloudflare stylesheet caching
description: Preview versus live style mismatches caused by immutable CSS asset URLs.
---

When a live page's HTML and current CSS match the local preview but a returning visitor sees old colors, check browser caching before assuming the deployment omitted the stylesheet.

**Why:** The preview sends `no-store` for all assets, while the live Cloudflare site was observed returning `Cache-Control: public, max-age=31536000, immutable` for unversioned CSS URLs. A browser that saved an older version can continue using it after a deployment, even though a fresh request elsewhere retrieves the new CSS.

**How to apply:** Compare fresh production and local CSS bytes and inspect response headers. For a durable fix, change the referenced stylesheet URL when its content changes (versioned query or filename), rather than relying on a hard refresh or replacing the asset at an immutable URL.