---
name: Static preview restarts
description: Workflow restart constraint for this static website’s embedded Replit Preview.
---

Do not restart the static-site workflow after ordinary HTML or CSS edits. The server reads files on each request, so those changes do not require a process restart.

**Why:** Restarting the workflow caused the user’s embedded Preview pane to report that it could not reach the app even though port 5000 and the development domain continued returning successful responses.

**How to apply:** Keep the current workflow running during copy and styling work. Restart only when the server command, workflow configuration, or server implementation itself changes.