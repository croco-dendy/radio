import { Database } from 'bun:sqlite';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const dbPath = join(import.meta.dir, '../../data/wave.sqlite');
const db = new Database(dbPath);

console.log('Applying migration 0005_single_cover_field.sql...\n');

const sql = readFileSync(
  join(import.meta.dir, '../../drizzle/0005_single_cover_field.sql'),
  'utf-8',
);

// Parse SQL statements - remove comments and split by semicolons
const cleanSql = sql
  .split('\n')
  .map((line) => {
    // Remove single-line comments
    const commentIndex = line.indexOf('--');
    if (commentIndex >= 0) {
      return line.substring(0, commentIndex);
    }
    return line;
  })
  .join('\n');

// Split by semicolons and filter empty statements
const statements = cleanSql
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

let successCount = 0;
let errorCount = 0;

for (const stmt of statements) {
  try {
    db.exec(`${stmt};`);
    console.log(`✓ ${stmt.substring(0, 70)}...`);
    successCount++;
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error(`✗ Error: ${error.message}`);
    console.error(`  Statement: ${stmt.substring(0, 100)}...\n`);
    errorCount++;
  }
}

db.close();

if (errorCount === 0) {
  console.log(`\n✅ Migration applied successfully! (${successCount} statements)`);
} else {
  console.error(`\n❌ Migration completed with ${errorCount} errors`);
  process.exit(1);
}
