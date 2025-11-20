# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial template setup with Turborepo monorepo structure
- Apify actor template with TypeScript + Playwright
- Nextra documentation site for SEO
- Entrepreneur-focused guides and documentation
- Apify CLI integration scripts (`setup:apify`, `apify:push`, etc.)
- Site configuration system with author profiles
- SEO-optimized documentation with metadata and sitemaps
- Deployment guides for Apify actors and docs site
- Comprehensive entrepreneur monetization playbook
- Quick start guide for 2-hour deployment

### Changed
- Updated tone to be conversational and teammate-focused
- Simplified README to remove marketing fluff
- Streamlined documentation structure

## [1.0.0] - 2024-01-20

### Added
- Initial release of Apify Actor Template for Entrepreneurs
- Complete monorepo setup with apps/actor and apps/docs
- Shared utilities package
- Configuration system
- Deployment scripts
- Documentation site with guides

---

## How to Update This Changelog

When making changes, add them under `[Unreleased]` in the appropriate category:

### Categories
- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security fixes

### When Releasing
1. Change `[Unreleased]` to `[version] - YYYY-MM-DD`
2. Add new `[Unreleased]` section at top
3. Update version numbers in:
   - `package.json`
   - `apps/actor/.actor/actor.json`
   - `apps/actor/package.json`

### Example Entry
```markdown
## [1.1.0] - 2024-02-01

### Added
- New scraping helper utilities
- Support for custom proxy configuration

### Fixed
- Bug with pagination on certain sites
- Memory leak in data processing
```
