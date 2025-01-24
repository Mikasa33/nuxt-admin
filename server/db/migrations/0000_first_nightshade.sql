CREATE TABLE `system_department` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`parent_id` integer,
	`name` text NOT NULL,
	`order_by` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `system_dict` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`type_id` integer,
	`parent_id` integer,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`order_by` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `system_dict_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`parent_id` integer,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`order_by` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `system_file` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`catalog_id` integer,
	`name` text NOT NULL,
	`size` integer NOT NULL,
	`type` text NOT NULL,
	`filename` text NOT NULL,
	`path` text NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `system_file_catalog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`parent_id` integer,
	`name` text NOT NULL,
	`order_by` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `system_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`user_id` integer,
	`nickname` text,
	`method` text NOT NULL,
	`router` text NOT NULL,
	`query` text,
	`body` text
);
--> statement-breakpoint
CREATE TABLE `system_menu` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`parent_id` integer,
	`name` text NOT NULL,
	`type` text DEFAULT 'menu',
	`slug` text,
	`icon` text,
	`router` text,
	`order_by` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `system_role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`slug` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `system_role_menu` (
	`role_id` integer NOT NULL,
	`menu_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `system_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`update_at` integer,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`nickname` text NOT NULL,
	`phone` text(11)
);
--> statement-breakpoint
CREATE TABLE `system_user_role` (
	`user_id` integer NOT NULL,
	`role_id` integer NOT NULL
);
