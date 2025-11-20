# @repo/vitest-config

Shared Vitest configuration for the monorepo.

## Usage

### For Node.js projects (like the actor app)

1. Install vitest in your project:

```bash
pnpm add -D vitest @repo/vitest-config
```

2. Create a `vitest.config.ts` in your project root:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/node';

export default mergeConfig(
  baseConfig,
  defineConfig({
    // Add your project-specific configuration here
  })
);
```

3. Add test scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### For other environments

Use `@repo/vitest-config/base` and configure as needed.

## Available Configs

- `@repo/vitest-config/base` - Base configuration for all projects
- `@repo/vitest-config/node` - Configuration for Node.js projects
