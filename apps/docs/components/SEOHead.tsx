/**
 * SEO Head Component
 * Injects JSON-LD structured data into the page
 */

import type { BaseSchema } from '@repo/shared';

interface SEOHeadProps {
  schemas: BaseSchema | BaseSchema[];
}

/**
 * Component to inject JSON-LD structured data
 * Use this in your page components to add rich SEO metadata
 *
 * @example
 * ```tsx
 * import { generateTechArticleSchema, generateBreadcrumbSchema } from '@repo/shared';
 * import { SEOHead } from '@/components/SEOHead';
 * import { siteConfig } from '@config/site.config';
 *
 * export default function Page() {
 *   const articleSchema = generateTechArticleSchema(siteConfig, {
 *     title: 'My Guide',
 *     description: 'A helpful guide',
 *     path: '/guides/my-guide',
 *   });
 *
 *   const breadcrumbSchema = generateBreadcrumbSchema(siteConfig, [
 *     { name: 'Home', path: '/' },
 *     { name: 'Guides', path: '/guides' },
 *     { name: 'My Guide', path: '/guides/my-guide' },
 *   ]);
 *
 *   return (
 *     <>
 *       <SEOHead schemas={[articleSchema, breadcrumbSchema]} />
 *       <div>Page content...</div>
 *     </>
 *   );
 * }
 * ```
 */
export function SEOHead({ schemas }: SEOHeadProps) {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {schemaArray.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Safe: JSON.stringify on controlled typed data structures, not user input
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  );
}
