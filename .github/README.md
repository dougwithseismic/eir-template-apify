# GitHub Configuration

CI/CD for the Apify monorepo.

## Workflows

### `ci.yml` - CI Pipeline
Runs on push/PR to `main` and `develop`:
- Lint, type-check, test, build

### `deploy-actor.yml` - Deploy Apify Actor
Deploys actor to Apify when `apps/actor/**` changes on `main`.

**Required Secret:** `APIFY_TOKEN` (get from Apify console)

## Dependabot

Auto-updates dependencies weekly.

## Setup

Add `APIFY_TOKEN` secret:
1. Go to repository Settings → Secrets and variables → Actions
2. Add new repository secret: `APIFY_TOKEN`
3. Get token from https://console.apify.com/account/integrations

## Run Locally

```bash
pnpm lint
pnpm check-types
pnpm test
pnpm build
```
