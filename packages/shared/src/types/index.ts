/**
 * Common TypeScript types for Apify actors
 */

export interface BaseActorInput {
  startUrls: Array<{
    url: string;
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'OPTIONS' | 'CONNECT' | 'PATCH';
    headers?: Record<string, string>;
    userData?: Record<string, unknown>;
  }>;
  maxRequestsPerCrawl?: number;
  proxyConfiguration?: {
    useApifyProxy?: boolean;
    apifyProxyGroups?: string[];
    apifyProxyCountry?: string;
  };
}

export interface ScrapedData {
  url: string;
  timestamp: string;
  [key: string]: unknown;
}

export interface ActorContext {
  actorId?: string;
  runId?: string;
  userId?: string;
  isAtHome: boolean;
}

// Site configuration types
export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  website?: string;
  social?: SocialLinks;
  location?: string;
  company?: string;
  expertise?: string[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  apifyReferralLink?: string;
  authors: Record<string, Author>;
  social?: SocialLinks;
  contact?: {
    email?: string;
    phone?: string;
  };
}
