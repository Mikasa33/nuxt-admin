PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_system_role_menu` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`role_id` integer NOT NULL,
	`menu_id` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_system_role_menu`("id", "created_at", "update_at", "role_id", "menu_id") SELECT "id", "created_at", "update_at", "role_id", "menu_id" FROM `system_role_menu`;--> statement-breakpoint
DROP TABLE `system_role_menu`;--> statement-breakpoint
ALTER TABLE `__new_system_role_menu` RENAME TO `system_role_menu`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_system_user_role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`user_id` integer NOT NULL,
	`role_id` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_system_user_role`("id", "created_at", "update_at", "user_id", "role_id") SELECT "id", "created_at", "update_at", "user_id", "role_id" FROM `system_user_role`;--> statement-breakpoint
DROP TABLE `system_user_role`;--> statement-breakpoint
ALTER TABLE `__new_system_user_role` RENAME TO `system_user_role`;