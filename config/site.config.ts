/**
 * Site-wide configuration
 * This file contains global settings, metadata, and content that can be shared across all apps
 */

import type { SiteConfig, Author } from '@repo/shared';

export const siteConfig: SiteConfig = {
  name: "Apify Actor Template",
  description: "Build profitable web scrapers without building a full product - Leverage the Apify marketplace for rapid monetization",
  url: "https://your-domain.com", // Update with your actual domain

  // Apify Affiliate & Referral
  apifyReferralLink: "https://apify.com/marketplace?fpr=doug",

  // Authors and contributors
  authors: {
    "john-doe": {
      id: "john-doe",
      name: "John Doe",
      title: "Lead Developer",
      bio: "Full-stack developer specializing in web scraping, automation, and data extraction. Passionate about building scalable Apify actors.",
      avatar: "/avatars/john-doe.jpg",
      website: "https://johndoe.dev",
      location: "San Francisco, CA",
      company: "Apify",
      expertise: ["Web Scraping", "TypeScript", "Playwright", "Node.js"],
      social: {
        twitter: "https://twitter.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        email: "john@example.com"
      }
    },
    "jane-smith": {
      id: "jane-smith",
      name: "Jane Smith",
      title: "Automation Engineer",
      bio: "Experienced in building robust automation workflows and scalable data pipelines. Expert in Apify platform and web technologies.",
      avatar: "/avatars/jane-smith.jpg",
      website: "https://janesmith.io",
      location: "New York, NY",
      company: "Independent",
      expertise: ["Automation", "Data Engineering", "Python", "JavaScript"],
      social: {
        twitter: "https://twitter.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        github: "https://github.com/janesmith",
        email: "jane@example.com"
      }
    }
  },

  // Site-wide social links
  social: {
    twitter: "https://twitter.com/yourproject",
    github: "https://github.com/yourusername/apify-template",
    linkedin: "https://linkedin.com/company/yourcompany"
  },

  // Contact information
  contact: {
    email: "contact@example.com"
  }
};

// Helper function to get author by ID
export function getAuthor(id: string): Author | undefined {
  return siteConfig.authors[id];
}

// Helper function to get all authors
export function getAllAuthors(): Author[] {
  return Object.values(siteConfig.authors);
}

// Helper function to get authors by expertise
export function getAuthorsByExpertise(expertise: string): Author[] {
  return getAllAuthors().filter(author =>
    author.expertise?.some(e => e.toLowerCase().includes(expertise.toLowerCase()))
  );
}
