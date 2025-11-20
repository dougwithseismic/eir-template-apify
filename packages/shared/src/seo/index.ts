/**
 * SEO Library
 * Export all SEO utilities, schemas, and metadata generators
 *
 * Note: SEOHead component is React-specific and should be imported
 * from your app's components directory
 */

// Schema generators
export {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareApplicationSchema,
  generateTechArticleSchema,
  generatePersonSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  combineSchemas,
} from './schemas';

export type {
  BaseSchema,
  OrganizationSchema,
  WebSiteSchema,
  SoftwareApplicationSchema,
  TechArticleSchema,
  PersonSchema,
  BreadcrumbListSchema,
  HowToSchema,
} from './schemas';

// Metadata generators
export {
  generateMetadata,
  generateHomeMetadata,
  generateDocsMetadata,
  generateGuideMetadata,
  generateAuthorMetadata,
  generateAPIMetadata,
} from './metadata';

export type { SEOParams, Metadata } from './metadata';
