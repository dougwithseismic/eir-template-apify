# Components

Reusable React components for the documentation site.

## Available Components

### AuthorGrid

Displays all authors from the site configuration in a responsive grid layout.

**Usage:**
```tsx
import { AuthorGrid } from '@/components/AuthorGrid';

<AuthorGrid />
```

The component automatically pulls author data from `@config/site.config.ts`.

## Creating New Components

When creating components that need site-wide data:

1. Import from the config directory:
```tsx
import { siteConfig, getAuthor } from '@config/site.config';
```

2. Use the provided helper functions:
```tsx
// Get all authors
const authors = getAllAuthors();

// Get specific author
const author = getAuthor('john-doe');

// Get authors by expertise
const experts = getAuthorsByExpertise('web scraping');
```

3. Leverage TypeScript types:
```tsx
import type { Author, SocialLinks } from '@config/site.config';
```

## Styling

Components use CSS-in-JS with Next.js styled-jsx for scoped styling and dark mode support.

Example:
```tsx
<style jsx>{`
  .component {
    /* styles */
  }

  @media (prefers-color-scheme: dark) {
    .component {
      /* dark mode styles */
    }
  }
`}</style>
```
