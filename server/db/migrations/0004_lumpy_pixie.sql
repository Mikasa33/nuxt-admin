ALTER TABLE `data_file` MODIFY COLUMN `file_size` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `data_file` ADD `file_ext` varchar(128);