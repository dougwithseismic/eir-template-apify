# Configuration Guide

This project uses a centralized configuration system for managing site-wide data like authors, metadata, and settings.

## Directory Structure

```
/config/                 # Root-level configuration
  ├── site.config.ts     # Main site configuration
  └── README.md          # Config documentation

/apps/docs/
  ├── app/
  │   ├── authors/       # Authors page using config
  │   └── ...
  ├── components/
  │   └── AuthorGrid.tsx # Component using config
  └── tsconfig.json      # Includes @config/* path alias
```

## Site Configuration (`/config/site.config.ts`)

The main configuration file contains:

### 1. Site Metadata
```typescript
{
  name: "Apify Actor Template",
  description: "Production-ready Apify actor template...",
  url: "https://your-domain.com"
}
```

### 2. Authors
```typescript
authors: {
  "author-id": {
    id: "author-id",
    name: "Full Name",
    title: "Job Title",
    bio: "Brief biography...",
    avatar: "/avatars/author-id.jpg",
    website: "https://website.com",
    location: "City, Country",
    company: "Company Name",
    expertise: ["Skill 1", "Skill 2"],
    social: {
      twitter: "https://twitter.com/handle",
      linkedin: "https://linkedin.com/in/profile",
      github: "https://github.com/username",
      email: "email@example.com"
    }
  }
}
```

### 3. Site-wide Social Links
```typescript
social: {
  twitter: "https://twitter.com/yourproject",
  github: "https://github.com/yourusername/repo",
  linkedin: "https://linkedin.com/company/yourcompany"
}
```

### 4. Contact Information
```typescript
contact: {
  email: "contact@example.com"
}
```

## Usage in Apps

### Import Configuration

```typescript
import { siteConfig, getAuthor, getAllAuthors } from '@config/site.config';
```

### Get All Authors

```typescript
const authors = getAllAuthors();
// Returns: Author[]
```

### Get Specific Author

```typescript
const author = getAuthor('john-doe');
// Returns: Author | undefined
```

### Get Authors by Expertise

```typescript
const scrapers = getAuthorsByExpertise('web scraping');
// Returns: Author[]
```

### Access Site Metadata

```typescript
const siteName = siteConfig.name;
const siteDescription = siteConfig.description;
const siteUrl = siteConfig.url;
```

## TypeScript Types

All configuration is fully typed for IntelliSense and type safety:

```typescript
import type {
  SiteConfig,
  Author,
  SocialLinks
} from '@config/site.config';

// Use types in your components
function MyComponent({ author }: { author: Author }) {
  // ...
}
```

## Adding New Authors

1. Open `/config/site.config.ts`
2. Add a new entry to the `authors` object:

```typescript
"new-author-id": {
  id: "new-author-id",
  name: "New Author",
  title: "Position",
  bio: "Author bio...",
  avatar: "/avatars/new-author.jpg",  // Optional
  website: "https://website.com",      // Optional
  location: "City, Country",           // Optional
  company: "Company",                  // Optional
  expertise: ["Skill 1", "Skill 2"],   // Optional
  social: {                            // Optional
    twitter: "https://twitter.com/...",
    linkedin: "https://linkedin.com/in/...",
    github: "https://github.com/...",
    email: "email@example.com"
  }
}
```

3. The author will automatically appear on the `/authors` page

## Examples

### Example 1: Display Author Card

```tsx
import { getAuthor } from '@config/site.config';

export function AuthorBio({ authorId }: { authorId: string }) {
  const author = getAuthor(authorId);

  if (!author) return null;

  return (
    <div>
      <h3>{author.name}</h3>
      <p>{author.title}</p>
      <p>{author.bio}</p>
    </div>
  );
}
```

### Example 2: List Experts

```tsx
import { getAuthorsByExpertise } from '@config/site.config';

export function ExpertsList({ skill }: { skill: string }) {
  const experts = getAuthorsByExpertise(skill);

  return (
    <ul>
      {experts.map(expert => (
        <li key={expert.id}>{expert.name}</li>
      ))}
    </ul>
  );
}
```

### Example 3: Site Header

```tsx
import { siteConfig } from '@config/site.config';

export function SiteHeader() {
  return (
    <header>
      <h1>{siteConfig.name}</h1>
      <p>{siteConfig.description}</p>
      <nav>
        {siteConfig.social?.github && (
          <a href={siteConfig.social.github}>GitHub</a>
        )}
        {siteConfig.social?.twitter && (
          <a href={siteConfig.social.twitter}>Twitter</a>
        )}
      </nav>
    </header>
  );
}
```

## Path Aliases

The docs app is configured with path aliases in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./*"],           // App-level imports
    "@config/*": ["../../config/*"]  // Config imports
  }
}
```

This allows clean imports:
```typescript
import { siteConfig } from '@config/site.config';  // ✓ Clean
// vs
import { siteConfig } from '../../config/site.config';  // ✗ Messy
```

## Extending Configuration

You can add more configuration files to `/config/`:

```
/config/
  ├── site.config.ts      # Site metadata and authors
  ├── features.config.ts  # Feature flags
  ├── integrations.config.ts  # Third-party services
  └── theme.config.ts     # Theming and branding
```

Example feature flags:

```typescript
// /config/features.config.ts
export const features = {
  enableComments: true,
  enableAnalytics: false,
  enableSearch: true
};
```

## Best Practices

1. **Keep config in `/config` directory** - Shared across all apps
2. **Use TypeScript types** - Full type safety and IntelliSense
3. **Use helper functions** - `getAuthor()`, `getAllAuthors()`, etc.
4. **Update avatar paths** - Store avatars in `/public/avatars/`
5. **Keep data synchronized** - Update config when team changes
6. **Version control** - Commit config changes with code

## Production Checklist

Before deploying:

- [ ] Update site URL in `siteConfig.url`
- [ ] Update social links
- [ ] Update contact email
- [ ] Add real author data
- [ ] Update avatar images
- [ ] Remove placeholder data
- [ ] Test all config imports
- [ ] Verify TypeScript types compile

## Related Files

- `/config/site.config.ts` - Main configuration
- `/config/README.md` - Config documentation
- `/apps/docs/app/authors/page.mdx` - Authors page
- `/apps/docs/components/AuthorGrid.tsx` - Author grid component
- `CONFIGURATION.md` - This file
