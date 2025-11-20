# Contributing

Thanks for wanting to contribute. Here's how to do it.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/apify-template.git
cd apify-template

# Install dependencies
pnpm install

# Start everything
pnpm dev
```

## Project Structure

```
apify-template/
├── apps/
│   ├── actor/          # Apify actor code
│   └── docs/           # Documentation site
├── packages/
│   └── shared/         # Shared utilities
├── config/             # Site configuration
└── scripts/            # Build/deploy scripts
```

## Making Changes

### For Actor Code

1. Make your changes in `apps/actor/src/`
2. Test locally: `cd apps/actor && pnpm start:dev`
3. Check types: `pnpm run check-types`
4. Lint: `pnpm lint`

### For Documentation

1. Edit files in `apps/docs/app/`
2. Test locally: `cd apps/docs && pnpm dev`
3. Check it looks good at http://localhost:3000

### For Shared Utilities

1. Edit files in `packages/shared/src/`
2. Make sure types are exported properly
3. Test in both actor and docs apps

## Pull Requests

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test everything still works
5. Commit with a clear message
6. Push and open a PR

### PR Guidelines

**Good commit messages:**
- "Add pagination support to scraper"
- "Fix memory leak in data processing"
- "Update docs for deployment"

**Bad commit messages:**
- "fix stuff"
- "updates"
- "wip"

**Before submitting:**
- [ ] Code runs locally
- [ ] No console errors
- [ ] Types check: `pnpm run check-types`
- [ ] Lints pass: `pnpm lint`
- [ ] Docs still build: `pnpm run docs:build`

## Code Style

We use ESLint and Prettier. Just run:

```bash
pnpm lint       # Check for issues
pnpm format     # Auto-fix formatting
```

### Guidelines

**TypeScript:**
- Use proper types, not `any`
- Export types from `packages/shared` if they're reusable
- Keep functions small and focused

**React/Docs:**
- Use functional components
- Keep MDX files clean and readable
- Use proper heading hierarchy (h1 → h2 → h3)

**Actor Code:**
- Handle errors gracefully
- Log useful information
- Don't scrape too aggressively (respect rate limits)
- Use proper selectors (prefer data attributes > IDs > classes)

## Testing

Right now we don't have comprehensive tests (PR welcome!), but at minimum:

1. Test your actor locally before committing
2. Make sure docs build without errors
3. Check that links in docs work

If you're adding tests:
- Use Vitest (already configured)
- Put tests next to the code: `foo.ts` → `foo.test.ts`
- Run tests: `pnpm test`

## Documentation

If you're adding a new feature, update the docs:

1. Add guide in `apps/docs/app/guides/` if it's a big feature
2. Update relevant existing guides
3. Add to CHANGELOG.md under `[Unreleased]`

## Reporting Bugs

Open an issue with:

1. What you expected to happen
2. What actually happened
3. Steps to reproduce
4. Your environment (Node version, OS, etc.)

**Good bug report:**
```
Actor crashes when scraping URLs with special characters

Expected: Should handle all valid URLs
Actual: Crashes with error "Invalid URL format"

Steps:
1. Run actor with input: {"url": "https://example.com/page?param=value&other=test"}
2. See error in console

Environment:
- Node v18.0.0
- macOS 13.0
- Template version 1.0.0
```

## Feature Requests

Open an issue describing:

1. What you want to do
2. Why it would be useful
3. How you imagine it working

We're especially interested in:
- New scraping utilities
- Documentation improvements
- Better DX (developer experience)
- SEO optimizations

## Questions?

- Open an issue
- Ask in [Apify Discord](https://discord.com/invite/jyEM2PRvMU)
- Check existing issues first

## License

By contributing, you agree your code will be licensed under the same ISC license as the project.

---

**Note:** This is a community template. We're all learning and building together. Don't stress about perfection - just make it better than you found it.
