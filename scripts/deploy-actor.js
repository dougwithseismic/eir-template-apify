#!/usr/bin/env node

/**
 * Script to deploy an actor to Apify platform
 * Usage: pnpm run deploy <actor-name>
 *
 * Prerequisites:
 * - Apify CLI installed: npm install -g apify-cli
 * - Logged in: apify login
 */

import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const actorName = process.argv[2];

if (!actorName) {
  console.error('❌ Please provide an actor name');
  console.log('Usage: pnpm run deploy <actor-name>');
  console.log('\nAvailable actors:');
  const actorsDir = path.join(__dirname, '..', 'apps');
  const actors = fs.readdirSync(actorsDir).filter(name => {
    const actorPath = path.join(actorsDir, name);
    return fs.statSync(actorPath).isDirectory() &&
           name !== 'docs' &&
           fs.existsSync(path.join(actorPath, 'package.json'));
  });
  actors.forEach(name => console.log(`  - ${name}`));
  process.exit(1);
}

const actorDir = path.join(__dirname, '..', 'apps', actorName);

if (!fs.existsSync(actorDir)) {
  console.error(`❌ Actor "${actorName}" not found`);
  process.exit(1);
}

// Check if Apify CLI is installed
const versionCheck = spawnSync('apify', ['--version'], { encoding: 'utf-8' });
if (versionCheck.status !== 0) {
  console.error('❌ Apify CLI not found. Install it with: npm install -g apify-cli');
  process.exit(1);
}

console.log(`🚀 Deploying actor: ${actorName}`);

// Build the actor first
console.log('🔨 Building actor...');
const build = spawnSync('pnpm', ['run', 'build'], {
  cwd: actorDir,
  stdio: 'inherit'
});

if (build.status !== 0) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Deploy to Apify
console.log('📤 Deploying to Apify...');
const deploy = spawnSync('apify', ['push'], {
  cwd: actorDir,
  stdio: 'inherit'
});

if (deploy.status !== 0) {
  console.error('❌ Deployment failed');
  process.exit(1);
}

console.log(`✅ Actor "${actorName}" deployed successfully!`);
