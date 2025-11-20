import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { siteConfig } from '@config/site.config'
import { generateHomeMetadata, generateWebSiteSchema, generateOrganizationSchema } from '@repo/shared'
import { SEOHead } from '@/components/SEOHead'

export const metadata = generateHomeMetadata(siteConfig)

const banner = <Banner storageKey="nextra-banner">Nextra 4.0 is released 🎉</Banner>

const navbar = (
  <Navbar
    logo={<b>Apify Actor Docs</b>}
  />
)

const footer = <Footer>MIT {new Date().getFullYear()} © Apify Actor Template.</Footer>

export default async function RootLayout({ children }) {
  // Generate JSON-LD schemas for SEO
  const websiteSchema = generateWebSiteSchema(siteConfig)
  const organizationSchema = generateOrganizationSchema(siteConfig)

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
        <SEOHead schemas={[websiteSchema, organizationSchema]} />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/yourusername/apify-template/tree/main/apps/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
