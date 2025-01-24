PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_system_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`departmentId` integer NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`nickname` text NOT NULL,
	`phone` text(11)
);
--> statement-breakpoint
INSERT INTO `__new_system_user`("id", "created_at", "update_at", "departmentId", "username", "password", "nickname", "phone") SELECT "id", "created_at", "update_at", "departmentId", "username", "password", "nickname", "phone" FROM `system_user`;--> statement-breakpoint
DROP TABLE `system_user`;--> statement-breakpoint
ALTER TABLE `__new_system_user` RENAME TO `system_user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;