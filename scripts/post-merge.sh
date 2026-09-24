#!/bin/bash
set -e

# This is a dependency-free static site, so merged tasks require no install,
# migration, or build step.
python3 --version >/dev/null