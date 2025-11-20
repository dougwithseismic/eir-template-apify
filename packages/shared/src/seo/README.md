# SEO Library

Shared SEO utilities for generating metadata and JSON-LD schemas across all documentation sites.

## Quick Start

```tsx
import { generateDocsMetadata, generateTechArticleSchema } from '@repo/shared';
import { SEOHead } from '@/components/SEOHead';
import { siteConfig } from '@config/site.config';

export const metadata = generateDocsMetadata(siteConfig, {
  title: 'Getting Started',
  description: 'Learn how to get started',
  path: '/guides/getting-started',
  keywords: ['tutorial', 'guide'],
});

export default function Page() {
  const schema = generateTechArticleSchema(siteConfig, {
    title: 'Getting Started',
    description: 'Learn how to get started',
    path: '/guides/getting-started',
  });

  return (
    <>
      <SEOHead schemas={schema} />
      {/* Your content */}
    </>
  );
}
```

## Metadata Generators

- `generateHomeMetadata(config)` - Homepage metadata
- `generateDocsMetadata(config, params)` - Documentation pages
- `generateGuideMetadata(config, params)` - Tutorial/guide pages
- `generateAuthorMetadata(config, author)` - Author profiles
- `generateAPIMetadata(config, params)` - API documentation

## Schema Generators

- `generateOrganizationSchema(config, logo?)` - Organization
- `generateWebSiteSchema(config, logo?)` - WebSite with search
- `generateTechArticleSchema(config, params)` - Articles/docs
- `generatePersonSchema(author, config)` - Author profiles
- `generateBreadcrumbSchema(config, breadcrumbs)` - Navigation
- `generateHowToSchema(name, description, steps, totalTime?)` - Step-by-step guides

## Examples

### Breadcrumbs
```tsx
generateBreadcrumbSchema(siteConfig, [
  { name: 'Home', path: '/' },
  { name: 'Guides', path: '/guides' },
  { name: 'Page', path: '/guides/page' },
]);
```

### How-To
```tsx
generateHowToSchema(
  'Deploy an Actor',
  'How to deploy to production',
  [
    { name: 'Build', text: 'Build your actor' },
    { name: 'Test', text: 'Test locally' },
    { name: 'Deploy', text: 'Push to Apify' },
  ],
  'PT15M'
);
```

### Complete Page
```tsx
import { Metadata } from 'next';
import { siteConfig } from '@config/site.config';
import {
  generateGuideMetadata,
  generateTechArticleSchema,
  generateBreadcrumbSchema,
} from '@repo/shared';
import { SEOHead } from '@/components/SEOHead';

export const metadata: Metadata = generateGuideMetadata(siteConfig, {
  title: 'Apify for SDRs',
  description: 'Lead generation guide',
  path: '/guides/apify-for-sdrs',
  keywords: ['lead generation', 'sales'],
});

export default function Page() {
  const schemas = [
    generateTechArticleSchema(siteConfig, {
      title: 'Apify for SDRs',
      description: 'Lead generation guide',
      path: '/guides/apify-for-sdrs',
    }),
    generateBreadcrumbSchema(siteConfig, [
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides' },
      { name: 'Apify for SDRs', path: '/guides/apify-for-sdrs' },
    ]),
  ];

  return (
    <>
      <SEOHead schemas={schemas} />
      {/* Your content */}
    </>
  );
}
```
