CREATE TABLE `albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`year` integer,
	`cover_art_path` text,
	`description` text,
	`tags` text,
	`is_public` integer DEFAULT 0,
	`owner_id` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`owner_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`album_id` integer NOT NULL,
	`audio_file_id` integer NOT NULL,
	`track_number` integer NOT NULL,
	`title` text NOT NULL,
	`artist` text,
	`duration` text NOT NULL,
	`format` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`audio_file_id`) REFERENCES `audio_files`(`id`) ON UPDATE no action ON DELETE cascade
);

