# siteflyer.com — the website itself

This folder IS the live site. Every page, stylesheet, image and component that
siteflyer.com serves.

## Where the editing happens

**Not here.** Replit is where pages get edited. This folder is a working copy,
used for inspecting and verifying the live site.

Open this folder in Claude Code when you want to:

- find out why something on the site is broken
- check whether a change actually reached siteflyer.com
- audit accessibility, page weight, SEO, or what is publicly exposed
- change deploy configuration (`wrangler.jsonc`, `src/worker.js`, `.assetsignore`)

## How publishing works

    Replit  --push-->  GitHub  --auto-->  Cloudflare  -->  siteflyer.com

Pushing to GitHub `main` is the only publishing step. Cloudflare watches the
repository, builds on its own, and the change is live in a few minutes. Do not
use Replit's Publish button and do not add a Cloudflare API key to Replit;
Replit's Publish targets Replit hosting, which is not where this site lives.

## Before changing anything here

Read `STYLE-GUIDE.md`. The short version: build pages from the components in
`components/`, never write new CSS, and never rename an `fl-node-*` class.

## The two sibling folders

- `../siteflyer-migration` — how a WordPress site gets moved to static. The
  playbook. Open it when migrating the NEXT client, not to change this site.
- `../site-migration-skills` — the reusable tooling and test scripts, including
  the component verifier and the pixel-diff harness. Open it to improve the
  process itself.
