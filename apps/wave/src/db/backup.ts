import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { env } from '@/utils/env';

const BACKUP_DIR = 'data/backups';

/**
 * Creates a full SQLite file backup before migrations.
 * Restore by copying the backup file over wave.sqlite.
 */
export function backupDatabaseBeforeMigration(): string | null {
  const dbPath = env.dbFileName;
  const absoluteDbPath = join(process.cwd(), dbPath);

  if (!existsSync(absoluteDbPath)) {
    console.log('📭 No existing database found - skipping backup');
    return null;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `wave-pre-migration-${timestamp}.sqlite`;
  const backupDir = join(process.cwd(), BACKUP_DIR);
  const backupPath = join(backupDir, backupFileName);

  mkdirSync(backupDir, { recursive: true });
  copyFileSync(absoluteDbPath, backupPath);

  console.log('💾 Pre-migration backup created:', backupPath);
  return backupPath;
}
