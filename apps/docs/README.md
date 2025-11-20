# Apify Actor Template Documentation

This is the documentation site for the Apify Actor template, built with [Nextra](https://nextra.site/).

## Getting Started

Run the development server:

```bash
pnpm dev:docs
```

Open [http://localhost:3001](http://localhost:3001) to view the documentation.

## Project Structure

```
apps/docs/
├── app/
│   ├── layout.jsx       # Main layout with Nextra theme
│   ├── page.mdx         # Homepage
│   └── _meta.json       # Navigation configuration
├── next.config.js       # Next.js configuration with Nextra
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Adding Documentation

1. Create `.mdx` files in the `app/` directory
2. Update `_meta.json` to configure navigation
3. Use Markdown and React components in your MDX files

## Learn More

- [Nextra Documentation](https://nextra.site)
- [Next.js Documentation](https://nextjs.org/docs)
