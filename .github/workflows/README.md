# Workflows

## `ci.yml`
Runs on push/PR to `main` or `develop`:
- Lint, type-check, test, build

## `deploy-actor.yml`
Auto-deploys actor to Apify when `apps/actor/**` changes on `main`.

Requires `APIFY_TOKEN` secret in repo settings.
