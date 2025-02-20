ALTER TABLE `data_file` RENAME COLUMN `file_type` TO `file_mime`;--> statement-breakpoint
ALTER TABLE `data_file` MODIFY COLUMN `file_mime` varchar(128);