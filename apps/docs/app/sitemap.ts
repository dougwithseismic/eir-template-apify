import { MetadataRoute } from 'next'
import { siteConfig } from '@config/site.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Define all documentation pages
  const routes = [
    '',
    '/what-is-apify',
    '/guides',
    '/guides/apify-for-sdrs',
    '/guides/apify-for-founders',
    '/guides/creating-actors',
    '/guides/deployment',
    '/guides/best-practices',
    '/authors',
    '/api',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.includes('/guides/') ? 0.8 : 0.7,
  }))
}
