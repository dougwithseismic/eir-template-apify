# Site Configuration

This directory contains global configuration files that are shared across all apps in the monorepo.

## Files

### `site.config.ts`

Main site configuration including:
- Site metadata (name, description, URL)
- Author profiles with social links
- Site-wide social links
- Contact information

## Usage

Import the config in any app:

```typescript
import { siteConfig, getAuthor, getAllAuthors } from '@/config/site.config';

// Get all authors
const authors = getAllAuthors();

// Get specific author
const author = getAuthor('john-doe');

// Get authors by expertise
const scrapers = getAuthorsByExpertise('web scraping');
```

## Adding New Authors

Add authors to the `authors` object in `site.config.ts`:

```typescript
"author-id": {
  id: "author-id",
  name: "Author Name",
  title: "Job Title",
  bio: "Brief bio...",
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
```

## TypeScript Types

All configuration is fully typed. Available types:
- `SiteConfig` - Main configuration object
- `Author` - Author profile
- `SocialLinks` - Social media links

## Future Configuration

This directory can be extended with additional config files:
- `features.config.ts` - Feature flags
- `integrations.config.ts` - Third-party integrations
- `theme.config.ts` - Theming and branding
