#!/usr/bin/env bun
/**
 * Copies album.example.json to the first album folder in MEDIA_ROOT_PATH as data.json.
 * Run this, then trigger Media Sync in the admin UI to ingest the metadata.
 *
 * Usage: bun run scripts/seed-data-json.ts
 */

import 'dotenv/config';
import { copyFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FOLDER_PATTERN = /^(.+?)_(.+)$/;
const mediaRoot = process.env.MEDIA_ROOT_PATH;

if (!mediaRoot || !existsSync(mediaRoot)) {
  console.error(
    'MEDIA_ROOT_PATH not set or directory does not exist. Set it in .env (e.g. MEDIA_ROOT_PATH=/var/www/p-sound)',
  );
  process.exit(1);
}

const examplePath = join(process.cwd(), 'src/conf/album.example.json');
if (!existsSync(examplePath)) {
  console.error('album.example.json not found at', examplePath);
  process.exit(1);
}

const entries = readdirSync(mediaRoot);
const albumFolder = entries.find((e) => {
  const p = join(mediaRoot, e);
  return statSync(p).isDirectory() && FOLDER_PATTERN.test(e);
});

if (!albumFolder) {
  console.error('No album folders found in', mediaRoot);
  console.error('Expected folders named like: artist-slug_album-slug');
  process.exit(1);
}

const destPath = join(mediaRoot, albumFolder, 'data.json');
copyFileSync(examplePath, destPath);
console.log(`Copied album.example.json to ${destPath}`);
console.log('Now run Media Sync in the admin UI to ingest the metadata.');
