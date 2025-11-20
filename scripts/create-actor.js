#!/usr/bin/env node

/**
 * Script to create a new Apify actor from template
 * Usage: pnpm run create:actor <actor-name>
 */

import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const actorName = process.argv[2];

if (!actorName) {
  console.error('❌ Please provide an actor name');
  console.log('Usage: pnpm run create:actor <actor-name>');
  process.exit(1);
}

// Validate actor name
if (!/^[a-z0-9-]+$/.test(actorName)) {
  console.error('❌ Actor name must contain only lowercase letters, numbers, and hyphens');
  process.exit(1);
}

const actorsDir = path.join(__dirname, '..', 'apps');
const templateDir = path.join(actorsDir, 'actor');
const newActorDir = path.join(actorsDir, actorName);

// Check if actor already exists
if (fs.existsSync(newActorDir)) {
  console.error(`❌ Actor "${actorName}" already exists`);
  process.exit(1);
}

// Check if template exists
if (!fs.existsSync(templateDir)) {
  console.error('❌ Template actor not found at apps/actor');
  process.exit(1);
}

console.log(`📦 Creating new actor: ${actorName}`);

// Copy template recursively
console.log('📋 Copying template...');
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(templateDir, newActorDir);

// Update package.json
const packageJsonPath = path.join(newActorDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
packageJson.name = actorName;
packageJson.version = '0.0.1';
packageJson.description = `Apify Actor: ${actorName}`;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Create .actor directory for Apify metadata
const actorMetaDir = path.join(newActorDir, '.actor');
if (!fs.existsSync(actorMetaDir)) {
  fs.mkdirSync(actorMetaDir, { recursive: true });
}

// Create actor.json
const actorJson = {
  actorSpecification: 1,
  name: actorName,
  title: actorName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  description: `Actor for ${actorName}`,
  version: '0.0.1',
  storages: {
    dataset: {
      actorSpecification: 1,
      title: 'Dataset',
      description: 'Dataset for storing results',
      views: {
        overview: {
          title: 'Overview',
          transformation: {
            fields: ['url', 'title']
          },
          display: {
            component: 'table',
            properties: {}
          }
        }
      }
    }
  }
};

fs.writeFileSync(
  path.join(actorMetaDir, 'actor.json'),
  JSON.stringify(actorJson, null, 2) + '\n'
);

// Create INPUT_SCHEMA.json if it doesn't exist
const inputSchemaPath = path.join(actorMetaDir, 'INPUT_SCHEMA.json');
if (!fs.existsSync(inputSchemaPath)) {
  const inputSchema = {
    title: `${actorName} Input Schema`,
    type: 'object',
    schemaVersion: 1,
    properties: {
      startUrls: {
        title: 'Start URLs',
        type: 'array',
        description: 'URLs to start crawling from',
        editor: 'requestListSources',
        prefill: [{ url: 'https://apify.com' }]
      },
      maxRequestsPerCrawl: {
        title: 'Max Requests Per Crawl',
        type: 'integer',
        description: 'Maximum number of pages to crawl',
        minimum: 1,
        default: 100
      }
    },
    required: ['startUrls']
  };

  fs.writeFileSync(inputSchemaPath, JSON.stringify(inputSchema, null, 2) + '\n');
}

console.log(`✅ Actor "${actorName}" created successfully!`);
console.log(`\n📝 Next steps:`);
console.log(`   cd apps/${actorName}`);
console.log(`   pnpm install`);
console.log(`   pnpm run start:dev`);
console.log(`\n📚 Don't forget to update the documentation in apps/docs/content/${actorName}.mdx`);
