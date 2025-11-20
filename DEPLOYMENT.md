# Deployment Guide

Complete guide for deploying your Apify Actor and documentation site.

## Prerequisites

Before deploying, ensure:
- ✅ Actor works locally (`pnpm start:dev` in `apps/actor/`)
- ✅ Tests pass (`pnpm test` if you have tests)
- ✅ No linting errors (`pnpm lint`)
- ✅ Apify CLI installed and authenticated (`pnpm run setup:apify`)

## Deploying Your Actor to Apify

### Step 1: Verify Your Actor Configuration

Check `apps/actor/.actor/actor.json`:
```json
{
  "actorSpecification": 1,
  "name": "my-actor-name",
  "title": "My Actor Title",
  "description": "Clear description of what your actor does",
  "version": "1.0.0",
  "buildTag": "latest"
}
```

**Important fields:**
- `name`: URL-friendly identifier (lowercase, hyphens)
- `title`: Display name in Apify Store
- `description`: SEO-friendly description (used in search)
- `version`: Semantic versioning (1.0.0, 1.1.0, etc.)

### Step 2: Test Locally

```bash
cd apps/actor

# Run with default input
pnpm start:dev

# Or with custom input
echo '{"startUrls": [{"url": "https://example.com"}]}' | pnpm start:dev
```

Verify:
- No errors in console
- Data is extracted correctly
- Performance is acceptable

### Step 3: Build and Deploy

```bash
# From project root
pnpm run apify:push

# Or from actor directory
cd apps/actor
apify push
```

What this does:
1. Builds your TypeScript code
2. Creates Docker image
3. Uploads to Apify platform
4. Makes actor available in your account

### Step 4: Test on Apify Platform

1. Go to https://console.apify.com
2. Find your actor in "Actors" section
3. Click "Try" or "Start"
4. Enter test input
5. Run and verify results

### Step 5: Publish to Apify Store (Optional but Recommended)

**Before publishing:**
- ✅ Actor runs reliably (test multiple times)
- ✅ Good error handling (doesn't crash on edge cases)
- ✅ Clear README.md in actor directory
- ✅ Input schema is user-friendly
- ✅ Competitive pricing researched

**To publish:**
1. In Apify Console, go to your actor
2. Click "Publication" tab
3. Click "Publish to Apify Store"
4. Fill in required information:
   - Categories (choose relevant ones)
   - Tags (searchable keywords)
   - Pricing (see pricing guide below)
   - SEO title and description
5. Submit for review

**Apify reviews typically take 1-3 business days.**

## Deploying Your Documentation Site

### Option 1: Vercel (Recommended - Free for hobby)

**Quick deploy:**
```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Deploy
cd apps/docs
vercel --prod
```

**Or use GitHub integration:**
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Framework: Next.js (auto-detected)
6. Root Directory: `apps/docs`
7. Deploy

**Custom domain:**
1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

### Option 2: Netlify (Also free)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd apps/docs
pnpm build
netlify deploy --prod
```

**Or use GitHub integration:**
1. Push to GitHub
2. Go to https://app.netlify.com
3. "New site from Git"
4. Choose repository
5. Build command: `cd apps/docs && pnpm build`
6. Publish directory: `apps/docs/.next`
7. Deploy

### Option 3: Self-hosted

**Requirements:**
- Node.js server
- Nginx or similar reverse proxy

```bash
# Build for production
cd apps/docs
pnpm build

# Start production server
pnpm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "docs" -- start
```

## Pricing Strategy

### Research Competition

Before setting prices:
1. Find similar actors on Apify Store
2. Check their pricing tiers
3. Read reviews (do users complain about price?)
4. Consider value you provide (better/faster/more features?)

### Recommended Pricing Models

**1. Usage-based (Most common)**
```
Free tier: 10-100 results (for testing)
Starter: $0.01-0.10 per 100 results
Pro: $0.50-2.00 per 1000 results
Enterprise: Custom pricing

Example tiers:
- 100 results: $0.10
- 1,000 results: $0.50
- 10,000 results: $2.50
- 100,000 results: $15.00
```

**2. Subscription-based**
```
Basic: $19/mo for 10,000 results
Pro: $49/mo for 50,000 results
Business: $149/mo for unlimited
```

**3. Hybrid (Usage + subscription)**
```
Free tier: 100 results/day
Pay-as-you-go: $0.05 per 100 results
Subscription: $99/mo unlimited
```

### Pricing Tips

- **Start competitive:** Slightly cheaper than established actors
- **Increase gradually:** Raise prices as you add value
- **Free tier:** Essential for discovery and testing
- **Volume discounts:** Encourage larger usage
- **Enterprise tier:** Custom pricing for big clients

### Calculate Your Costs

**Apify charges for compute resources:**
```
Basic pricing:
- $1 = ~400-800 actor runs (depends on complexity)
- Average run: 1-5 minutes
- Proxy costs: $0.80-15 per GB (datacenter vs residential)

Example calculation:
User runs actor with 1000 results
→ Takes 2 minutes
→ Uses datacenter proxy (0.1 GB)
→ Cost to you: ~$0.10

Your price: $0.50
Your profit: $0.40
Margin: 80%
```

**Optimize costs:**
- Use datacenter proxies when possible (10x cheaper)
- Efficient selectors (less page loads)
- Batch requests where possible
- Set reasonable defaults (don't over-scrape)

## Continuous Deployment

### Automated Actor Deployment

**Option 1: GitHub Actions**

Create `.github/workflows/deploy-actor.yml`:
```yaml
name: Deploy Actor

on:
  push:
    branches: [main]
    paths:
      - 'apps/actor/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Apify CLI
        run: npm install -g apify-cli

      - name: Deploy to Apify
        env:
          APIFY_TOKEN: ${{ secrets.APIFY_TOKEN }}
        run: |
          cd apps/actor
          apify push
```

**Setup:**
1. Get your Apify API token from https://console.apify.com/account/integrations
2. Add to GitHub Secrets (Settings → Secrets → New secret)
3. Name: `APIFY_TOKEN`, Value: your token
4. Push changes - auto-deploys on commit

**Option 2: Apify GitHub Integration**

1. In Apify Console, go to your actor
2. Settings → Source code
3. Choose "GitHub"
4. Authorize and select repository
5. Apify auto-deploys on push to main branch

### Automated Docs Deployment

**Vercel GitHub Integration** (auto-deploys on push):
1. Connect GitHub to Vercel (one-time setup)
2. Every push to main auto-deploys
3. Pull requests get preview deployments

**Netlify GitHub Integration** (same as Vercel):
1. Connect repository
2. Auto-deploys on push
3. Preview deployments for PRs

## Post-Deployment Checklist

### After Deploying Actor

- [ ] Test actor on Apify platform (not just locally)
- [ ] Check error logs (console.apify.com → your actor → Runs)
- [ ] Verify data output format
- [ ] Test with different inputs
- [ ] Check performance (run time, memory usage)
- [ ] Set up monitoring/alerts (optional but recommended)

### After Publishing to Store

- [ ] Verify listing appears in Apify Store
- [ ] Check all metadata displays correctly
- [ ] Test as a new user (different account or incognito)
- [ ] Pricing is set correctly
- [ ] README renders properly
- [ ] Categories and tags are accurate

### After Deploying Docs

- [ ] Site loads correctly
- [ ] All pages render properly
- [ ] Links work (internal and external)
- [ ] Search functionality works
- [ ] Mobile responsive
- [ ] SEO metadata present (check with view-source:)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up analytics (Google Analytics, Plausible, etc.)

## Versioning Strategy

### Semantic Versioning

Follow semantic versioning (semver):
```
MAJOR.MINOR.PATCH

1.0.0 → Initial release
1.0.1 → Bug fix (backwards compatible)
1.1.0 → New feature (backwards compatible)
2.0.0 → Breaking change
```

**Update version in:**
- `apps/actor/.actor/actor.json`
- `apps/actor/package.json`

**When to increment:**
- **Patch (x.x.1):** Bug fixes, small improvements
- **Minor (x.1.x):** New features, no breaking changes
- **Major (2.x.x):** Breaking changes to input/output

### Changelog

Maintain a CHANGELOG.md in your actor:
```markdown
# Changelog

## [1.1.0] - 2024-01-15
### Added
- New parameter for filtering results
- Better error messages

### Fixed
- Bug with pagination on certain sites

## [1.0.0] - 2024-01-01
### Added
- Initial release
```

## Monitoring & Maintenance

### Monitor Actor Performance

**Apify Console provides:**
- Run statistics (success/failure rate)
- Average runtime
- Memory usage
- Error logs
- User feedback/ratings

**Set up alerts:**
1. Apify Console → Monitoring
2. Configure email alerts for:
   - High failure rate (> 5%)
   - Slow performance (> X minutes)
   - Memory issues

### Regular Maintenance Tasks

**Weekly:**
- [ ] Check error logs
- [ ] Respond to user questions/issues
- [ ] Monitor competitor changes

**Monthly:**
- [ ] Review performance metrics
- [ ] Update dependencies (`pnpm update`)
- [ ] Test actor still works (websites change)
- [ ] Analyze user feedback for improvements

**Quarterly:**
- [ ] Major feature additions
- [ ] Documentation updates
- [ ] Pricing review
- [ ] Competitive analysis

## Rollback Strategy

### If Actor Deployment Fails

```bash
# Revert to previous version
cd apps/actor

# Check deployment history
apify info

# Rollback (deploy previous commit)
git checkout <previous-commit>
apify push
git checkout main
```

### If Breaking Changes Deployed

**Option 1: Quick fix and redeploy**
```bash
# Fix the issue
# Increment patch version
# Deploy immediately
apify push
```

**Option 2: Maintain multiple versions**
- Keep old version as "actor-name-v1"
- Deploy new version as "actor-name-v2"
- Give users time to migrate
- Eventually deprecate v1

## Scaling Considerations

### When Actor Gets Popular

**Performance optimization:**
- Cache frequently accessed data
- Optimize selectors (reduce page loads)
- Use cheaper proxies when possible
- Batch requests efficiently

**Infrastructure:**
- Apify auto-scales (no action needed)
- Monitor costs in Apify Console
- Set spending limits if concerned

**Support:**
- Prepare FAQ based on common questions
- Consider community Discord/Slack
- Hire support help if needed (VA on Upwork)

### When Revenue Grows

**Reinvest in:**
1. Better documentation (hire technical writer)
2. Video tutorials (hire videographer)
3. Marketing (SEO, content, ads)
4. More actors (build portfolio)
5. Support team (customer success)

## Troubleshooting Deployments

### Common Issues

**1. "Build failed"**
```bash
# Check syntax locally
pnpm run lint
pnpm run build

# Review Apify build logs
# Usually TypeScript errors or missing dependencies
```

**2. "Actor times out"**
```bash
# Increase timeout in actor.json
{
  "timeout": 3600  // seconds (default 3600 = 1 hour)
}

# Or optimize your scraper (faster selectors, less waiting)
```

**3. "Out of memory"**
```bash
# Increase memory in actor settings
# Or process data in batches (don't load everything at once)
```

**4. "Proxy errors"**
```bash
# Switch to residential proxies
# Or add retry logic with exponential backoff
```

**5. "Site blocking requests"**
```bash
# Use residential proxies
# Add random delays
# Rotate user agents
# Respect rate limits
```

## Resources

### Apify Documentation
- [Actor Development](https://docs.apify.com/actors)
- [Publishing to Store](https://docs.apify.com/actors/publishing)
- [Pricing Guide](https://docs.apify.com/actors/publishing/pricing)

### This Template
- [Entrepreneur Guide](./apps/docs/app/guides/apify-for-entrepreneurs/page.mdx)
- [Quick Start](./ENTREPRENEUR_QUICKSTART.md)
- [Configuration](./CONFIGURATION.md)

### Support
- [Apify Discord](https://discord.com/invite/jyEM2PRvMU)
- [Apify Community](https://community.apify.com)

---

**Ready to deploy?** Start with the actor, test thoroughly, then deploy docs for SEO traffic!
