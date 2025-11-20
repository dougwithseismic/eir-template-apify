/**
 * SEO Metadata Generators
 * Generates metadata objects for Next.js pages
 */

import type { Metadata } from 'next';
import type { SiteConfig, Author } from '../types';

// Re-export Metadata type for convenience
export type { Metadata };

export interface SEOParams {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  author?: Author;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  canonical?: string;
}

/**
 * Generate complete metadata for a page
 */
export function generateMetadata(config: SiteConfig, params: SEOParams): Metadata {
  const {
    title,
    description,
    path = '',
    keywords = [],
    author,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    noIndex = false,
    canonical,
  } = params;

  const fullTitle = title === config.name ? title : `${title} | ${config.name}`;
  const url = `${config.url}${path}`;
  const ogImage = image;

  // Extract Twitter handle from URL if present
  const twitterHandle = config.social?.twitter
    ? config.social.twitter.includes('twitter.com/') || config.social.twitter.includes('x.com/')
      ? `@${config.social.twitter.split('/').pop()}`
      : config.social.twitter.startsWith('@')
        ? config.social.twitter
        : `@${config.social.twitter}`
    : undefined;

  // Combine default keywords with page-specific keywords
  const allKeywords = [
    'Apify',
    'web scraping',
    'data extraction',
    'automation',
    'actor',
    ...keywords,
  ];

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author.name, url: author.website }] : undefined,
    creator: author?.name || Object.values(config.authors)[0]?.name,
    publisher: config.name,

    // Canonical URL
    alternates: {
      canonical: canonical || url,
    },

    // Robots
    robots: noIndex ? {
      index: false,
      follow: true,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Open Graph
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: config.name,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : undefined,
      locale: 'en_US',
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author.name] : undefined,
        tags: keywords,
      }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: twitterHandle,
      site: twitterHandle,
    },

    // Additional metadata
    other: {
      'application-name': config.name,
    },
  };

  return metadata;
}

/**
 * Generate metadata for the homepage
 */
export function generateHomeMetadata(config: SiteConfig): Metadata {
  return generateMetadata(config, {
    title: config.name,
    description: config.description,
    path: '',
    keywords: [
      'TypeScript',
      'Playwright',
      'template',
      'boilerplate',
      'monorepo',
      'Turbo',
    ],
  });
}

/**
 * Generate metadata for documentation pages
 */
export function generateDocsMetadata(
  config: SiteConfig,
  params: {
    title: string;
    description: string;
    path: string;
    section?: string;
    keywords?: string[];
  }
): Metadata {
  const keywords = [
    'documentation',
    'guide',
    'tutorial',
    ...(params.section ? [params.section] : []),
    ...(params.keywords || []),
  ];

  return generateMetadata(config, {
    title: params.title,
    description: params.description,
    path: params.path,
    keywords,
    type: 'article',
  });
}

/**
 * Generate metadata for guide pages
 */
export function generateGuideMetadata(
  config: SiteConfig,
  params: {
    title: string;
    description: string;
    path: string;
    targetAudience?: string;
    keywords?: string[];
  }
): Metadata {
  const keywords = [
    'guide',
    'how-to',
    'tutorial',
    ...(params.targetAudience ? [params.targetAudience] : []),
    ...(params.keywords || []),
  ];

  return generateMetadata(config, {
    title: params.title,
    description: params.description,
    path: params.path,
    keywords,
    type: 'article',
  });
}

/**
 * Generate metadata for author pages
 */
export function generateAuthorMetadata(
  config: SiteConfig,
  author: Author
): Metadata {
  return generateMetadata(config, {
    title: `${author.name} - ${author.title}`,
    description: author.bio || `${author.name} is ${author.title} specializing in ${author.expertise?.join(', ')}.`,
    path: `/authors/${author.name.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: [
      'author',
      'profile',
      'expert',
      ...(author.expertise || []),
    ],
    author,
    image: author.avatar,
  });
}

/**
 * Generate metadata for API documentation
 */
export function generateAPIMetadata(
  config: SiteConfig,
  params: {
    title: string;
    description: string;
    path: string;
  }
): Metadata {
  return generateMetadata(config, {
    title: params.title,
    description: params.description,
    path: params.path,
    keywords: [
      'API',
      'reference',
      'documentation',
      'endpoints',
      'SDK',
      'integration',
    ],
    type: 'article',
  });
}
