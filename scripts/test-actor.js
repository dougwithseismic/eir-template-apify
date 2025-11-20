#!/usr/bin/env node

/**
 * Script to test an actor locally with custom input
 * Usage: pnpm run test:actor <actor-name> [input-file]
 */

import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const actorName = process.argv[2];
const inputFile = process.argv[3];

if (!actorName) {
  console.error('❌ Please provide an actor name');
  console.log('Usage: pnpm run test:actor <actor-name> [input-file]');
  process.exit(1);
}

const actorDir = path.join(__dirname, '..', 'apps', actorName);

if (!fs.existsSync(actorDir)) {
  console.error(`❌ Actor "${actorName}" not found`);
  process.exit(1);
}

console.log(`🧪 Testing actor: ${actorName}`);

// Set up storage directory
const storageDir = path.join(actorDir, 'storage');
const keyValueStoreDir = path.join(storageDir, 'key_value_stores', 'default');

// Create storage structure
fs.mkdirSync(keyValueStoreDir, { recursive: true });

// Copy or create input
if (inputFile) {
  const inputPath = path.resolve(inputFile);
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }
  fs.copyFileSync(inputPath, path.join(keyValueStoreDir, 'INPUT.json'));
  console.log(`📄 Using input from: ${inputFile}`);
} else {
  // Use default input from INPUT_SCHEMA.json
  const inputSchemaPath = path.join(actorDir, '.actor', 'INPUT_SCHEMA.json');
  if (fs.existsSync(inputSchemaPath)) {
    const schema = JSON.parse(fs.readFileSync(inputSchemaPath, 'utf-8'));
    const defaultInput = {};

    Object.entries(schema.properties || {}).forEach(([key, prop]) => {
      if (prop.prefill) {
        defaultInput[key] = prop.prefill;
      } else if (prop.default !== undefined) {
        defaultInput[key] = prop.default;
      }
    });

    fs.writeFileSync(
      path.join(keyValueStoreDir, 'INPUT.json'),
      JSON.stringify(defaultInput, null, 2)
    );
    console.log('📄 Using default input from INPUT_SCHEMA.json');
  }
}

// Run the actor
console.log('🏃 Running actor...\n');
const result = spawnSync('pnpm', ['run', 'start:dev'], {
  cwd: actorDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    APIFY_LOCAL_STORAGE_DIR: storageDir
  }
});

if (result.status === 0) {
  console.log('\n✅ Actor run completed!');
  console.log(`📊 Check results in: ${storageDir}`);
} else {
  console.error('\n❌ Actor run failed');
  process.exit(1);
}
