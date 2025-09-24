CREATE TABLE IF NOT EXISTS "accounts" (
	"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'user',
	"is_active" integer DEFAULT 1,
	"last_login_at" text,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	"updated_at" text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_username_unique" ON "accounts" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_email_unique" ON "accounts" ("email");--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_public" integer DEFAULT 0,
	"owner_id" integer NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	"updated_at" text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY ("owner_id") REFERENCES "accounts"("id") ON DELETE cascade
);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audio_files" (
	"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"duration" text NOT NULL,
	"size" integer NOT NULL,
	"format" text NOT NULL,
	"uploaded_by" integer NOT NULL,
	"uploaded_at" text DEFAULT CURRENT_TIMESTAMP,
	"metadata" text,
	FOREIGN KEY ("uploaded_by") REFERENCES "accounts"("id") ON DELETE cascade
);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collection_items" (
	"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	"collection_id" integer NOT NULL,
	"audio_file_id" integer NOT NULL,
	"order" integer DEFAULT 0,
	"added_at" text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE cascade,
	FOREIGN KEY ("audio_file_id") REFERENCES "audio_files"("id") ON DELETE cascade
);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	"account_id" integer NOT NULL,
	"token" text NOT NULL,
	"expires_at" text NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	"last_used_at" text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE cascade
);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sessions_token_unique" ON "sessions" ("token");--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stream_configs" (
	"id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	"name" text NOT NULL,
	"rtmp_url" text NOT NULL,
	"stream_key" text NOT NULL,
	"input_url" text NOT NULL,
	"is_active" integer DEFAULT 0,
	"created_by" integer NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	"updated_at" text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY ("created_by") REFERENCES "accounts"("id") ON DELETE cascade
);



