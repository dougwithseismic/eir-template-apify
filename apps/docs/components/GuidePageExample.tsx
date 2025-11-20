/**
 * Example Guide Page Component with Full SEO
 *
 * This component demonstrates how to implement comprehensive SEO
 * for a guide page using our SEO utilities.
 *
 * Copy this pattern for creating new guide pages with rich SEO.
 */

import { siteConfig, getAuthor } from '@config/site.config';
import {
  generateTechArticleSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generatePersonSchema,
} from '@repo/shared';
import { SEOHead } from './SEOHead';

interface GuidePageExampleProps {
  // Page-specific props
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function GuidePageExample({
  title = 'Example Guide',
  description = 'This is an example guide showing SEO implementation',
  children
}: GuidePageExampleProps) {
  // Get author information
  const author = getAuthor('john-doe');

  // 1. Article Schema - Tells search engines this is a technical article
  const articleSchema = generateTechArticleSchema(siteConfig, {
    title,
    description,
    path: '/guides/example',
    author,
    keywords: [
      'example',
      'guide',
      'tutorial',
      'Apify',
      'web scraping',
      'automation',
    ],
    datePublished: '2024-01-15',
    dateModified: new Date().toISOString().split('T')[0],
  });

  // 2. Breadcrumb Schema - Shows navigation hierarchy
  const breadcrumbSchema = generateBreadcrumbSchema(siteConfig, [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: title, path: '/guides/example' },
  ]);

  // 3. How-To Schema - For step-by-step instructions
  const howToSchema = generateHowToSchema(
    'Complete This Example Task',
    'Follow these steps to accomplish the task described in this guide',
    [
      {
        name: 'Step 1: Setup',
        text: 'Set up your environment and install required dependencies',
        url: '/guides/example#setup',
      },
      {
        name: 'Step 2: Configuration',
        text: 'Configure your actor with the necessary parameters',
        url: '/guides/example#configuration',
      },
      {
        name: 'Step 3: Execution',
        text: 'Run your actor and verify the results',
        url: '/guides/example#execution',
      },
      {
        name: 'Step 4: Optimization',
        text: 'Optimize performance and handle edge cases',
        url: '/guides/example#optimization',
      },
    ],
    'PT20M' // ISO 8601 duration: 20 minutes
  );

  // 4. Author Schema - If you want to highlight the author
  const authorSchema = author ? generatePersonSchema(author, siteConfig) : null;

  // Combine all schemas
  const allSchemas = [
    articleSchema,
    breadcrumbSchema,
    howToSchema,
    ...(authorSchema ? [authorSchema] : []),
  ];

  return (
    <>
      {/* Inject JSON-LD structured data */}
      <SEOHead schemas={allSchemas} />

      {/* Your page content */}
      <article className="guide-content">
        {children}
      </article>
    </>
  );
}

/**
 * Usage Example:
 *
 * ```tsx
 * import { Metadata } from 'next';
 * import { siteConfig } from '@config/site.config';
 * import { generateGuideMetadata } from '@repo/shared';
 * import { GuidePageExample } from '@/components/GuidePageExample';
 *
 * export const metadata: Metadata = generateGuideMetadata(siteConfig, {
 *   title: 'Your Guide Title',
 *   description: 'Your guide description for search engines',
 *   path: '/guides/your-guide',
 *   targetAudience: 'developers',
 *   keywords: ['keyword1', 'keyword2'],
 * });
 *
 * export default function YourGuidePage() {
 *   return (
 *     <GuidePageExample
 *       title="Your Guide Title"
 *       description="Your guide description"
 *     >
 *       <h1>Your Guide Content</h1>
 *       <p>Guide content goes here...</p>
 *     </GuidePageExample>
 *   );
 * }
 * ```
 */
