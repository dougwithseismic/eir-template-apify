# Quick Reference

## Common Commands

### Actor Management

| Command | Description |
|---------|-------------|
| `pnpm run create:actor <name>` | Create new actor from template |
| `pnpm run list:actors` | List all actors in monorepo |
| `pnpm run test:actor <name>` | Test actor with default input |
| `pnpm run test:actor <name> <file>` | Test actor with custom input |
| `pnpm run deploy <name>` | Deploy actor to Apify |

### Development

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm run dev` | Start all apps in dev mode |
| `pnpm run build` | Build all apps and packages |
| `pnpm run lint` | Lint all code |
| `pnpm run format` | Format all code with Prettier |
| `pnpm run check-types` | Run TypeScript type checking |

### Documentation

| Command | Description |
|---------|-------------|
| `pnpm run dev:docs` | Start docs site (port 3000) |
| `pnpm --filter docs build` | Build docs for production |
| `pnpm --filter docs start` | Start production docs server |

### Actor-Specific (from actor directory)

| Command | Description |
|---------|-------------|
| `pnpm run start:dev` | Run actor in development mode |
| `pnpm run start:prod` | Run actor production build |
| `pnpm run build` | Build actor TypeScript |
| `apify push` | Deploy to Apify platform |

## Project Structure

```
apify-template/
├── apps/
│   ├── actor/          ← Template actor
│   ├── docs/           ← Documentation site
│   └── [your-actors]/  ← Your custom actors
├── packages/
│   └── shared/         ← Shared utilities
│       ├── src/
│       │   ├── utils/
│       │   │   ├── logger.ts     ← Logger utility
│       │   │   └── validators.ts ← Input validators
│       │   └── types/
│       │       └── index.ts      ← Common types
│       └── package.json
└── scripts/            ← Helper scripts
    ├── create-actor.js
    ├── deploy-actor.js
    ├── test-actor.js
    └── list-actors.js
```

## Shared Package Usage

### Install in an Actor

```bash
cd apps/your-actor
pnpm add @apify-template/shared@workspace:*
```

### Logger

```typescript
import { createLogger } from '@apify-template/shared';

const logger = createLogger('MyActor');

logger.info('Starting crawl', { url: 'https://example.com' });
logger.debug('Debug info', { data: {...} });
logger.warning('Warning message');
logger.error('Error occurred', error);
```

### Validators

```typescript
import {
  validateUrl,
  validateUrls,
  validatePositiveInteger,
  validateEnum,
  ValidationError
} from '@apify-template/shared';

try {
  validateUrl(input.url, 'Start URL');
  validatePositiveInteger(input.maxPages, 'Max Pages');
  validateEnum(input.format, ['json', 'csv'], 'Format');
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  }
}
```

### Types

```typescript
import type { BaseActorInput, ScrapedData } from '@apify-template/shared';

interface MyInput extends BaseActorInput {
  customField: string;
}

const result: ScrapedData = {
  url: 'https://example.com',
  timestamp: new Date().toISOString(),
  title: 'Example',
  // ... other fields
};
```

## Actor Input Schema

Location: `apps/your-actor/.actor/INPUT_SCHEMA.json`

```json
{
  "title": "Actor Input",
  "type": "object",
  "schemaVersion": 1,
  "properties": {
    "startUrls": {
      "title": "Start URLs",
      "type": "array",
      "description": "URLs to start crawling",
      "editor": "requestListSources"
    },
    "maxRequestsPerCrawl": {
      "title": "Max Requests",
      "type": "integer",
      "description": "Maximum number of pages",
      "minimum": 1,
      "default": 100
    }
  },
  "required": ["startUrls"]
}
```

## Actor Metadata

Location: `apps/your-actor/.actor/actor.json`

```json
{
  "actorSpecification": 1,
  "name": "your-actor-name",
  "title": "Your Actor Title",
  "description": "What your actor does",
  "version": "1.0.0",
  "storages": {
    "dataset": {
      "actorSpecification": 1,
      "title": "Results",
      "description": "Scraped data"
    }
  }
}
```

## Environment Variables

### Local Development

Create `apps/your-actor/.env`:

```bash
APIFY_LOCAL_STORAGE_DIR=./storage
APIFY_TOKEN=your_token_here
```

### Apify Platform

Environment variables are managed in the Apify Console.

## Debugging

### Enable Debug Logs

```bash
# In your actor
LOG_LEVEL=debug pnpm run start:dev
```

### VSCode Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Actor",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["run", "start:dev"],
      "cwd": "${workspaceFolder}/apps/your-actor",
      "console": "integratedTerminal"
    }
  ]
}
```

## Common Issues

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm run dev:docs
```

### Playwright Browsers Not Installed

```bash
cd apps/your-actor
npx crawlee install-playwright-browsers
```

### TypeScript Build Errors

```bash
# Clean and rebuild
rm -rf dist/
pnpm run build
```

### Apify CLI Not Found

```bash
npm install -g apify-cli
apify login
```

## File Patterns to Ignore

Add to `.gitignore`:
- `storage/` - Local Apify storage
- `apify_storage/` - Alternative storage dir
- `dist/` - Build output
- `.env` - Environment variables
- `*.log` - Log files

## Useful Apify CLI Commands

```bash
# Login
apify login

# Initialize actor
apify init

# Push actor
apify push

# Run actor locally
apify run

# Pull actor from platform
apify pull

# List your actors
apify actors
```

## Performance Tips

1. **Limit concurrency**: Set `maxConcurrency` in crawler config
2. **Use proxies**: Enable proxy rotation for better success rate
3. **Respect rate limits**: Add delays between requests
4. **Monitor memory**: Check logs for memory usage
5. **Clean up resources**: Use try/finally blocks

## Resources

- [Documentation](./DEVELOPMENT.md) - Full development guide
- [Scripts](./scripts/README.md) - Helper scripts documentation
- [Shared Package](./packages/shared/README.md) - Shared utilities guide
- [Apify Docs](https://docs.apify.com) - Official Apify documentation
- [Crawlee Docs](https://crawlee.dev) - Web scraping framework
