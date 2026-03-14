ALTER TABLE `albums` ADD `folder_slug` text;--> statement-breakpoint
ALTER TABLE `albums` ADD `has_media` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `albums` ADD `is_published` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `albums` ADD `release_year` integer;--> statement-breakpoint
ALTER TABLE `albums` ADD `rpm_speed` text;--> statement-breakpoint
ALTER TABLE `albums` ADD `vinyl_condition` text;--> statement-breakpoint
ALTER TABLE `albums` ADD `digitization_date` text;--> statement-breakpoint
ALTER TABLE `albums` ADD `equipment_used` text;--> statement-breakpoint
CREATE UNIQUE INDEX `albums_folder_slug_unique` ON `albums` (`folder_slug`);--> statement-breakpoint
ALTER TABLE `songs` ADD `file_slug` text;--> statement-breakpoint
ALTER TABLE `songs` ADD `audio_url` text;--> statement-breakpoint
CREATE UNIQUE INDEX `songs_album_id_file_slug_unique` ON `songs` (`album_id`,`file_slug`);