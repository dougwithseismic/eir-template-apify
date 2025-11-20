# Apify Template for the EIR Program

Look, you don't need to build a full product to make money. Apify's marketplace already has 50M monthly visitors looking for scrapers. You just need to build something useful and put it in front of them.

## The Play

Instead of spending months building a SaaS product, acquiring customers, setting up payments, etc:

1. Build a scraper people actually need (1-2 weeks)
2. List it on Apify Store
3. They handle traffic, payments, hosting
4. You collect revenue

Top actors make $10K-50K/month. Solid ones pull $1K-10K. Even niche stuff can hit $500-3K. And with this template + Claude Code, you can bang one out in a week or two instead of grinding for a month.

## What You're Getting

This is a Turborepo monorepo with:

**Actor template** (`apps/actor`) - TypeScript + Playwright, ready to go
**Docs site** (`apps/docs`) - Nextra site for SEO (rank for "[platform] scraper" and get organic traffic)
**Shared utils** (`packages/shared`) - Reusable stuff across actors
**Scripts** - Deploy, test, etc.

The docs site is clutch because that's how you get free traffic. Apify Store search is okay, but Google searches for "[platform] scraper" send way more customers.

## Getting Started

**Sign up for Apify:** https://affiliate.apify.com/signup/32131 (use this link)

Then:
```bash
pnpm install
pnpm run setup:apify  # Installs CLI and logs you in
```

Build your scraper:
```bash
cd apps/actor
# Edit src/main.ts - or just ask Claude Code to write it for you
pnpm start:dev  # Test locally
```

Deploy:
```bash
pnpm run apify:push  # Pushes to Apify platform
# Then publish to Store via console.apify.com
```

Deploy docs (for SEO traffic):
```bash
cd apps/docs
vercel  # Or use Netlify, whatever
```

That's it. Read `ENTREPRENEUR_QUICKSTART.md` for the full walkthrough if you want step-by-step.

## Why This Works

Apify handles the annoying stuff:
- Traffic (50M+ monthly visitors)
- Payments and billing
- Platform infrastructure
- Trust/credibility

You just need to build something useful. Then the docs site you deploy helps you rank in Google for long-tail searches, which drives more customers than just relying on Apify Store search.

## Using Claude Code

This is the real hack. Instead of manually writing Playwright selectors for 2-4 hours per feature:

1. Open `apps/actor/src/main.ts`
2. Ask Claude: "Help me scrape product titles and prices from [URL]"
3. Claude writes the code
4. Test with Playwright MCP
5. Done in 15-30 minutes

That's genuinely 10x faster than doing it manually.

## Docs for SEO

The Nextra docs site isn't just for looks. It's how you rank for "[platform] scraper" searches and get organic traffic. Way more valuable than just hoping people find you in Apify Store search.

Pre-configured with SEO metadata, sitemaps, all that stuff. Just write guides about use cases and you'll start ranking.

## Files You'll Actually Edit

**apps/actor/src/main.ts** - Your scraper code
**apps/actor/.actor/actor.json** - Actor metadata (name, description)
**apps/actor/.actor/INPUT_SCHEMA.json** - What inputs users can configure
**apps/docs/app/** - Documentation pages (write guides, rank in Google)
**config/site.config.ts** - Site-wide config (your info, social links)

## Useful Scripts

```bash
# Apify stuff
pnpm run setup:apify      # One-time: install CLI and login
pnpm run apify:push       # Deploy actor to Apify
pnpm run apify:run        # Run on Apify platform
pnpm run apify:info       # Check login status

# Development
pnpm dev                  # Run everything
pnpm run dev:docs         # Just docs site
pnpm run dev:actor        # Just actor

# Docs deployment
cd apps/docs && vercel    # Deploy to Vercel
```

## More Info

**ENTREPRENEUR_QUICKSTART.md** - Full walkthrough, start to finish
**DEPLOYMENT.md** - How to deploy and price your actor
**apps/docs/app/guides/apify-for-entrepreneurs/** - Complete guide on making money with this

Apify resources:
- Store: https://apify.com/store (browse for ideas)
- Docs: https://docs.apify.com
- Discord: https://discord.com/invite/jyEM2PRvMU

---

**Referral link:** https://affiliate.apify.com/signup/32131 (use this when signing up)
