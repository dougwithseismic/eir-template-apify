# Scripts

Helper scripts for managing Apify actors in this monorepo.

## Available Scripts

### `create-actor.js`
Creates a new Apify actor from the template.

```bash
pnpm run create:actor <actor-name>
```

**Example:**
```bash
pnpm run create:actor my-scraper
```

This will:
- Copy the template actor to `apps/<actor-name>`
- Update package.json with the new actor name
- Create `.actor/actor.json` with metadata
- Generate `INPUT_SCHEMA.json` with default schema

### `deploy-actor.js`
Deploys an actor to the Apify platform.

```bash
pnpm run deploy <actor-name>
```

**Prerequisites:**
- Apify CLI installed: `npm install -g apify-cli`
- Logged in: `apify login`

**Example:**
```bash
pnpm run deploy my-scraper
```

### `test-actor.js`
Tests an actor locally with custom or default input.

```bash
pnpm run test:actor <actor-name> [input-file]
```

**Examples:**
```bash
# Test with default input from INPUT_SCHEMA.json
pnpm run test:actor my-scraper

# Test with custom input
pnpm run test:actor my-scraper ./test-input.json
```

### `list-actors.js`
Lists all actors in the monorepo with their metadata.

```bash
pnpm run list:actors
```

## Development Workflow

1. **Create a new actor:**
   ```bash
   pnpm run create:actor my-new-actor
   cd apps/my-new-actor
   pnpm install
   ```

2. **Develop locally:**
   ```bash
   pnpm run start:dev
   ```

3. **Test with custom input:**
   ```bash
   pnpm run test:actor my-new-actor ./test-inputs/sample.json
   ```

4. **Deploy to Apify:**
   ```bash
   pnpm run deploy my-new-actor
   ```
