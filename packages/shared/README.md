# @apify-template/shared

Shared utilities and types for Apify actors in this monorepo.

## Installation

This package is automatically linked in the monorepo. To use it in an actor:

```bash
cd apps/your-actor
pnpm add @apify-template/shared@workspace:*
```

## Features

### Logger

Enhanced logging with context support:

```typescript
import { createLogger } from '@apify-template/shared';

const logger = createLogger('MyActor');

logger.info('Starting crawl', { url: 'https://example.com' });
logger.debug('Debug info', { details: 'some data' });
logger.warning('Warning message');
logger.error('Error occurred', error, { context: 'additional info' });
```

### Validators

Common validation utilities for actor inputs:

```typescript
import {
  validateUrl,
  validateUrls,
  validatePositiveInteger,
  validateEnum,
  validateRequired,
  ValidationError
} from '@apify-template/shared';

try {
  validateUrl(url, 'Start URL');
  validatePositiveInteger(maxPages, 'Max Pages');
  validateEnum(outputFormat, ['json', 'csv', 'xml'], 'Output Format');
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  }
}
```

### Types

Common TypeScript types:

```typescript
import type {
  BaseActorInput,
  ScrapedData,
  ActorContext
} from '@apify-template/shared';

interface MyActorInput extends BaseActorInput {
  customField: string;
}
```

## Development

Build the package:
```bash
pnpm run build
```

Watch mode:
```bash
pnpm run dev
```

Lint:
```bash
pnpm run lint
```
