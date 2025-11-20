#!/usr/bin/env node

/**
 * Script to list all actors in the monorepo with their metadata
 * Usage: pnpm run list:actors
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const actorsDir = path.join(__dirname, '..', 'apps');

console.log('📦 Available Actors:\n');

const actors = fs.readdirSync(actorsDir).filter(name => {
  const actorPath = path.join(actorsDir, name);
  return fs.statSync(actorPath).isDirectory() &&
         name !== 'docs' &&
         fs.existsSync(path.join(actorPath, 'package.json'));
});

if (actors.length === 0) {
  console.log('No actors found. Create one with: pnpm run create:actor <name>');
  process.exit(0);
}

actors.forEach(name => {
  const actorPath = path.join(actorsDir, name);
  const packageJsonPath = path.join(actorPath, 'package.json');
  const actorJsonPath = path.join(actorPath, '.actor', 'actor.json');

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  let actorMeta = {};
  if (fs.existsSync(actorJsonPath)) {
    actorMeta = JSON.parse(fs.readFileSync(actorJsonPath, 'utf-8'));
  }

  console.log(`  ${name}`);
  console.log(`    Description: ${packageJson.description || 'No description'}`);
  console.log(`    Version: ${actorMeta.version || packageJson.version}`);
  console.log(`    Path: apps/${name}`);
  console.log('');
});

console.log(`Total: ${actors.length} actor(s)`);
