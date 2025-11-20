/**
 * JSON-LD Schema Generators for SEO
 * Provides structured data for search engines
 */

import type { Author, SiteConfig } from '../types';

export interface BaseSchema {
  '@context': string;
  '@type': string;
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    contactType: string;
    email?: string;
  };
}

export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  publisher: OrganizationSchema;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface SoftwareApplicationSchema extends BaseSchema {
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
  };
}

export interface TechArticleSchema extends BaseSchema {
  '@type': 'TechArticle';
  headline: string;
  description: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  datePublished?: string;
  dateModified?: string;
  publisher: OrganizationSchema;
  mainEntityOfPage?: string;
  image?: string[];
  keywords?: string[];
}

export interface PersonSchema extends BaseSchema {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  worksFor?: {
    '@type': 'Organization';
    name: string;
  };
  knowsAbout?: string[];
}

export interface BreadcrumbListSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface HowToSchema extends BaseSchema {
  '@type': 'HowTo';
  name: string;
  description: string;
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    url?: string;
  }>;
  totalTime?: string;
}

/**
 * Generate Organization schema from site config
 */
export function generateOrganizationSchema(config: SiteConfig, logo?: string): OrganizationSchema {
  const socialLinks: string[] = [];

  if (config.social?.twitter) socialLinks.push(config.social.twitter);
  if (config.social?.github) socialLinks.push(config.social.github);
  if (config.social?.linkedin) socialLinks.push(config.social.linkedin);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: config.url,
    logo,
    sameAs: socialLinks.length > 0 ? socialLinks : undefined,
    contactPoint: config.contact?.email ? {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: config.contact.email,
    } : undefined,
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(config: SiteConfig, logo?: string): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
    description: config.description,
    publisher: generateOrganizationSchema(config, logo),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${config.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate SoftwareApplication schema for Apify actor
 */
export function generateSoftwareApplicationSchema(config: SiteConfig): SoftwareApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: config.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

/**
 * Generate TechArticle schema for documentation pages
 */
export function generateTechArticleSchema(
  config: SiteConfig,
  params: {
    title: string;
    description: string;
    author?: Author;
    datePublished?: string;
    dateModified?: string;
    path: string;
    keywords?: string[];
    image?: string;
    logo?: string;
  }
): TechArticleSchema {
  const authorData = params.author || Object.values(config.authors)[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: params.title,
    description: params.description,
    author: {
      '@type': 'Person',
      name: authorData?.name || 'Apify Team',
      url: authorData?.website,
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    publisher: generateOrganizationSchema(config, params.logo),
    mainEntityOfPage: `${config.url}${params.path}`,
    image: params.image ? [params.image] : undefined,
    keywords: params.keywords,
  };
}

/**
 * Generate Person schema for author profiles
 */
export function generatePersonSchema(author: Author, config: SiteConfig): PersonSchema {
  const sameAs: string[] = [];

  if (author.social?.twitter) sameAs.push(author.social.twitter);
  if (author.social?.github) sameAs.push(author.social.github);
  if (author.social?.linkedin) sameAs.push(author.social.linkedin);
  if (author.website) sameAs.push(author.website);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    image: author.avatar,
    url: author.website,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    worksFor: author.company ? {
      '@type': 'Organization',
      name: author.company,
    } : undefined,
    knowsAbout: author.expertise,
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(
  config: SiteConfig,
  breadcrumbs: Array<{ name: string; path: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${config.url}${crumb.path}`,
    })),
  };
}

/**
 * Generate HowTo schema for guides
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; url?: string }>,
  totalTime?: string
): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      url: step.url,
    })),
    totalTime,
  };
}

/**
 * Combine multiple schemas into a single JSON-LD script
 */
export function combineSchemas(...schemas: BaseSchema[]): string {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
