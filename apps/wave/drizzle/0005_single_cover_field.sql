-- SQLite doesn't support DROP COLUMN in older versions, so we need to recreate the table
-- Step 1: Create new table with cover column
CREATE TABLE `albums_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`year` integer,
	`cover` text,
	`description` text,
	`tags` text,
	`is_public` integer DEFAULT 0,
	`owner_id` integer NOT NULL,
	`folder_slug` text,
	`has_media` integer DEFAULT 0,
	`is_published` integer DEFAULT 0,
	`release_year` integer,
	`rpm_speed` text,
	`vinyl_condition` text,
	`digitization_date` text,
	`equipment_used` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`owner_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade
);

-- Step 2: Migrate data - prefer cover_filename, fallback to cover_art_path
INSERT INTO `albums_new` 
SELECT 
	`id`,
	`title`,
	`artist`,
	`year`,
	CASE 
		WHEN `cover_filename` IS NOT NULL THEN `cover_filename`
		WHEN `cover_art_path` IS NOT NULL THEN `cover_art_path`
		ELSE NULL
	END as `cover`,
	`description`,
	`tags`,
	`is_public`,
	`owner_id`,
	`folder_slug`,
	`has_media`,
	`is_published`,
	`release_year`,
	`rpm_speed`,
	`vinyl_condition`,
	`digitization_date`,
	`equipment_used`,
	`created_at`,
	`updated_at`
FROM `albums`;

-- Step 3: Drop old table
DROP TABLE `albums`;

-- Step 4: Rename new table
ALTER TABLE `albums_new` RENAME TO `albums`;

-- Step 5: Recreate unique index
CREATE UNIQUE INDEX IF NOT EXISTS `albums_folder_slug_unique` ON `albums` (`folder_slug`);
