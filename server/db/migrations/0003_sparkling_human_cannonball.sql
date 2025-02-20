ALTER TABLE `data_file` RENAME COLUMN `filename` TO `file_name`;--> statement-breakpoint
ALTER TABLE `data_file` RENAME COLUMN `path` TO `file_path`;--> statement-breakpoint
ALTER TABLE `data_file` RENAME COLUMN `size` TO `file_size`;--> statement-breakpoint
ALTER TABLE `data_file` RENAME COLUMN `type` TO `file_type`;--> statement-breakpoint
ALTER TABLE `data_dict` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `data_dict_type` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `data_file` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `data_file_catalog` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `system_department` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `system_menu` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `system_role` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `system_role_menu` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `system_user` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `system_user_role` MODIFY COLUMN `update_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `data_file` ADD `file_id` varchar(64) NOT NULL;