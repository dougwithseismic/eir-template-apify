# Development Guide

## Quick Start

### 1. Initial Setup

```bash
# Install dependencies
pnpm install

# Build shared packages
pnpm run build
```

### 2. Create Your First Actor

```bash
# Generate a new actor from template
pnpm run create:actor my-first-scraper

# Navigate to the actor
cd apps/my-first-scraper

# Start development
pnpm run start:dev
```

## Development Workflow

### Working on an Actor

```bash
# Start development mode (hot reload)
cd apps/your-actor
pnpm run start:dev

# Build for production
pnpm run build

# Run production build
pnpm run start:prod

# Format code
pnpm run format

# Lint
pnpm run lint
```

### Testing Locally

Create a test input file (e.g., `test-input.json`):

```json
{
  "startUrls": [
    {
      "url": "https://example.com"
    }
  ],
  "maxRequestsPerCrawl": 10
}
```

Run the test:

```bash
pnpm run test:actor your-actor ./test-input.json
```

### Using Shared Utilities

Add the shared package to your actor:

```bash
cd apps/your-actor
pnpm add @apify-template/shared@workspace:*
```

Import and use:

```typescript
import { createLogger, validateUrl, ValidationError } from '@apify-template/shared';
import type { BaseActorInput } from '@apify-template/shared';

const logger = createLogger('MyActor');

interface MyActorInput extends BaseActorInput {
  customField: string;
}

// Validate input
try {
  const input = await Actor.getInput<MyActorInput>();
  validateUrl(input.startUrls[0].url);
  logger.info('Input validated successfully');
} catch (error) {
  if (error instanceof ValidationError) {
    logger.error('Validation failed', error);
    throw error;
  }
}
```

## Documentation

### Running Documentation Site

```bash
# Start docs in development mode
pnpm run dev:docs

# Or using filter
pnpm --filter docs dev
```

Visit `http://localhost:3000` to see your documentation.

### Adding Documentation for Your Actor

Create a new MDX file in `apps/docs/content/your-actor.mdx`:

```mdx
---
title: Your Actor Name
---

# Your Actor Name

## Overview

Brief description of what your actor does.

## Features

- Feature 1
- Feature 2
- Feature 3

## Input Schema

\`\`\`json
{
  "startUrl": "https://example.com",
  "maxPages": 100
}
\`\`\`

## Output Example

\`\`\`json
{
  "url": "https://example.com",
  "title": "Example Page",
  "data": {...}
}
\`\`\`

## Usage

### Via Apify Console

1. Go to Apify Console
2. Find your actor
3. Configure input
4. Run

### Via API

\`\`\`javascript
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({
  token: 'YOUR_TOKEN'
});

const run = await client.actor('your-username/your-actor').call({
  startUrl: 'https://example.com'
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
\`\`\`
```

## Deployment

### Prerequisites

```bash
# Install Apify CLI globally
npm install -g apify-cli

# Login to Apify
apify login
```

### Deploy an Actor

```bash
# Deploy from root
pnpm run deploy your-actor

# Or from actor directory
cd apps/your-actor
apify push
```

## Monorepo Commands

### Build Everything

```bash
pnpm run build
```

### Run All Apps in Dev Mode

```bash
pnpm run dev
```

### Lint All Code

```bash
pnpm run lint
```

### Format All Code

```bash
pnpm run format
```

### Type Check Everything

```bash
pnpm run check-types
```

## Troubleshooting

### Playwright Browser Issues

If you get browser installation errors:

```bash
cd apps/your-actor
npx crawlee install-playwright-browsers
```

### TypeScript Errors After Adding Shared Package

Make sure to build the shared package first:

```bash
pnpm --filter @apify-template/shared run build
```

### Storage Directory Issues

The local storage directory is automatically created when you run an actor. If you need to clean it:

```bash
cd apps/your-actor
rm -rf storage/
```

### Port Already in Use

If port 3000 is in use by another process:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm --filter docs dev
```

## Best Practices

### Actor Development

1. **Always validate input** - Use validators from `@apify-template/shared`
2. **Log appropriately** - Use the structured logger for better debugging
3. **Handle errors gracefully** - Catch and log errors with context
4. **Test locally first** - Use `pnpm run test:actor` before deploying
5. **Document your actor** - Update the docs site with usage examples

### Code Organization

```
apps/your-actor/
├── .actor/
│   ├── actor.json           # Actor metadata
│   └── INPUT_SCHEMA.json    # Input validation schema
├── src/
│   ├── main.ts              # Entry point
│   ├── routes.ts            # Request handlers
│   └── utils/               # Actor-specific utilities
├── Dockerfile
└── package.json
```

### Performance Tips

1. Use `maxRequestsPerCrawl` to limit crawling
2. Implement proper request queuing
3. Use proxy rotation for better success rates
4. Monitor memory usage in logs
5. Clean up resources in `finally` blocks

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-new-actor

# Add your changes
git add .
git commit -m "Add my-new-actor"

# Push to remote
git push origin feature/my-new-actor
```

## Resources

- [Apify Documentation](https://docs.apify.com)
- [Crawlee Documentation](https://crawlee.dev)
- [Playwright Documentation](https://playwright.dev)
- [Turborepo Documentation](https://turborepo.org)
