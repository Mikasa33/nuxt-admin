CREATE TABLE `data_dict` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`type_id` int,
	`parent_id` int,
	`slug` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	`order_by` int DEFAULT 0,
	CONSTRAINT `data_dict_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `data_dict_type` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`parent_id` int,
	`slug` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	`order_by` int DEFAULT 0,
	CONSTRAINT `data_dict_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `data_file` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`catalog_id` int,
	`name` varchar(255) NOT NULL,
	`size` int NOT NULL,
	`type` varchar(128) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`path` varchar(512) NOT NULL,
	`url` varchar(512) NOT NULL,
	CONSTRAINT `data_file_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `data_file_catalog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`parent_id` int,
	`name` varchar(32) NOT NULL,
	`order_by` int DEFAULT 0,
	CONSTRAINT `data_file_catalog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_department` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`parent_id` int,
	`name` varchar(64) NOT NULL,
	`order_by` int DEFAULT 0,
	CONSTRAINT `system_department_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`user_id` int,
	`nickname` varchar(32),
	`method` varchar(10) NOT NULL,
	`router` varchar(255) NOT NULL,
	`query` json,
	`body` json,
	CONSTRAINT `system_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_menu` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`parent_id` int,
	`name` varchar(32) NOT NULL,
	`type` enum('catalog','menu','permission') DEFAULT 'menu',
	`slug` varchar(32),
	`icon` varchar(64),
	`router` varchar(255),
	`order_by` int DEFAULT 0,
	CONSTRAINT `system_menu_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_role` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`slug` varchar(32) NOT NULL,
	`name` varchar(32) NOT NULL,
	CONSTRAINT `system_role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_role_menu` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`role_id` int NOT NULL,
	`menu_id` int NOT NULL,
	CONSTRAINT `system_role_menu_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`department_id` int,
	`username` varchar(32) NOT NULL,
	`password` varchar(60) NOT NULL,
	`nickname` varchar(32) NOT NULL,
	`phone` varchar(11),
	CONSTRAINT `system_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_user_role` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp,
	`user_id` int NOT NULL,
	`role_id` int NOT NULL,
	CONSTRAINT `system_user_role_id` PRIMARY KEY(`id`)
);
