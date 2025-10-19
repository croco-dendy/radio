import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const accounts = sqliteTable('accounts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('user'),
  isActive: integer('is_active').default(1),
  lastLoginAt: text('last_login_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const collections = sqliteTable('collections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  isPublic: integer('is_public').default(0),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const audioFiles = sqliteTable('audio_files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  path: text('path').notNull(),
  duration: text('duration').notNull(),
  size: integer('size').notNull(),
  format: text('format').notNull(),
  uploadedBy: integer('uploaded_by')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  uploadedAt: text('uploaded_at').default(sql`CURRENT_TIMESTAMP`),
  metadata: text('metadata'),
});

export const collectionItems = sqliteTable('collection_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  collectionId: integer('collection_id')
    .notNull()
    .references(() => collections.id, { onDelete: 'cascade' }),
  audioFileId: integer('audio_file_id')
    .notNull()
    .references(() => audioFiles.id, { onDelete: 'cascade' }),
  order: integer('order').default(0),
  addedAt: text('added_at').default(sql`CURRENT_TIMESTAMP`),
});

export const sessions = sqliteTable('sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  accountId: integer('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  lastUsedAt: text('last_used_at').default(sql`CURRENT_TIMESTAMP`),
});

export const streamConfigs = sqliteTable('stream_configs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  rtmpUrl: text('rtmp_url').notNull(),
  streamKey: text('stream_key').notNull(),
  inputUrl: text('input_url').notNull(),
  isActive: integer('is_active').default(0),
  createdBy: integer('created_by')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});




